import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import ClientAppWrapper from '../components/ClientAppWrapper';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: "Charis Nation — Enseignements & Prédications",
  description: "Accédez aux enseignements et prédications de l'église Charis Nation. Écoutez, prenez des notes synchronisées et suivez votre progression.",
  keywords: ["Charis Nation", "enseignements", "prédications", "foi", "église"],
  openGraph: {
    title: "Charis Nation — Enseignements & Prédications",
    description: "Plateforme d'écoute des enseignements de Charis Nation House of Excellence",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable}`}>
      <body>
        <ClientAppWrapper>
          {children}
        </ClientAppWrapper>
      </body>
    </html>
  );
}
