import { Outfit, Work_Sans } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata = {
  title: "Charis",
  description: "Plateforme de messages et prédications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${workSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
