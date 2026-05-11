import "./globals.css";

export const metadata = {
  title: "Charis",
  description: "Plateforme de messages et prédications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
