import './globals.css';
import ClientAppWrapper from '../components/ClientAppWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charis Nation - Enseignements et Prédications',
  description: 'Écoutez et méditez les enseignements de Charis Nation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased overflow-hidden">
        <ClientAppWrapper>
          {children}
        </ClientAppWrapper>
      </body>
    </html>
  );
}