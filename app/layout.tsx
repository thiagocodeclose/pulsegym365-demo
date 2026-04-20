import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `${site.name} | Demo Gym Website`,
  description: site.subtitle,
  metadataBase: new URL(`https://${site.domain}`)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
