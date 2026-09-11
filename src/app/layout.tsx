import './globals.css';
import ClientAppWrapper from '../components/ClientAppWrapper';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cinzel, Playfair_Display } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Charis Nation — Une génération bâtie sur la grâce',
  description: 'Édification spirituelle, prédications audio avec prise de notes, culte et communion fraternelle à Charis Nation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`dark ${jakarta.variable} ${cinzel.variable} ${playfair.variable} overflow-x-clip`}>
      <body className="antialiased min-h-screen overflow-x-clip">
        <ClientAppWrapper>
          {children}
        </ClientAppWrapper>
      </body>
    </html>
  );
}