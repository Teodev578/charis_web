#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

/**
 * verify-gates.mjs — Oracle déterministe de vérification des gates
 * Lit GATES.md et valide les commandes CHECK / EXPECT déclarées.
 */

const gatesPath = resolve(process.cwd(), process.argv[2] || 'GATES.md');

try {
  const content = readFileSync(gatesPath, 'utf8');
  const lines = content.split('\n');

  const gates = [];
  let currentGate = null;

  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      continue;
    }

    if (line.startsWith('### Gate :') || line.startsWith('#### Gate :') || line.startsWith('- **Gate :**')) {
      if (currentGate && currentGate.check) {
        gates.push(currentGate);
      }
      currentGate = { title: line.replace(/^#+\s*Gate\s*:\s*/i, '').replace(/^- \*\*Gate\s*:\*\*\s*/i, ''), lineNum: i + 1 };
      continue;
    }

    const checkMatch = line.match(/^`?CHECK:\s*(.+?)`?$/i);
    if (checkMatch) {
      if (!currentGate) {
        currentGate = { title: `Gate Ligne ${i + 1}`, lineNum: i + 1 };
      }
      currentGate.check = checkMatch[1].trim().replace(/^`|`$/g, '');
      continue;
    }

    const expectMatch = line.match(/^`?EXPECT:\s*(.+?)`?$/i);
    if (expectMatch && currentGate) {
      currentGate.expect = expectMatch[1].trim().replace(/^`|`$/g, '');
      continue;
    }
  }

  if (currentGate && currentGate.check) {
    gates.push(currentGate);
  }

  if (gates.length === 0) {
    console.log(`[VERIFY-GATES] Aucune commande CHECK/EXPECT trouvée dans ${gatesPath}`);
    process.exit(0);
  }

  console.log(`[VERIFY-GATES] Exécution des gates de vérification (${gates.length} détectées)...`);
  let passed = 0;
  let failed = 0;

  for (const gate of gates) {
    process.stdout.write(`  ▶ [L${gate.lineNum}] ${gate.title || gate.check} : `);
    try {
      const output = execSync(gate.check, { stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8', cwd: process.cwd() });
      if (gate.expect) {
        const expectedPattern = gate.expect.trim();
        const matches = expectedPattern === 'code 0' || 
                        expectedPattern === '0' ||
                        output.includes(expectedPattern) ||
                        new RegExp(expectedPattern, 'i').test(output);

        if (matches) {
          console.log(`✓ OK`);
          passed++;
        } else {
          console.log(`✗ ÉCHEC (Attendu: "${gate.expect}")`);
          console.error(`    Sortie réelle: ${output.slice(0, 200).replace(/\n/g, ' ')}...`);
          failed++;
        }
      } else {
        console.log(`✓ OK (code 0)`);
        passed++;
      }
    } catch (err) {
      const isExpectingError = gate.expect && (gate.expect.includes('erreur') || gate.expect.includes('code != 0'));
      if (isExpectingError) {
        console.log(`✓ OK (Erreur attendue capturée)`);
        passed++;
      } else {
        console.log(`✗ ÉCHEC D'EXÉCUTION (Code: ${err.status})`);
        const stderr = (err.stderr || err.message || '').toString();
        console.error(`    Détail: ${stderr.slice(0, 200).replace(/\n/g, ' ')}...`);
        failed++;
      }
    }
  }

  console.log(`\n[VERIFY-GATES] Bilan : ${passed} passée(s), ${failed} en échec.`);
  if (failed > 0) {
    process.exit(1);
  }
} catch (error) {
  console.error(`[VERIFY-GATES] Erreur fatale : impossible de lire ${gatesPath} :`, error.message);
  process.exit(1);
}
