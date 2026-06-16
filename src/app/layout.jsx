import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: "Charis",
  description: "Plateforme de messages et prédications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
