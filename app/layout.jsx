import './globals.css';

export const metadata = {
  title: 'Scofield Pro Assistant',
  description: 'Assistant expert en pronostics sportifs',
  icons: { icon: '/scofield.jpeg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
