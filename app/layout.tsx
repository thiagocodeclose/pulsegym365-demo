import type { Metadata } from 'next';
import { Bebas_Neue, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteModeProvider } from '@/components/SiteModeProvider';
import { PromoBanner } from '@/components/PromoBanner';
import { GlobalWidgets } from '@/components/GlobalWidgets';
import { site } from '@/lib/site-data';

const headingFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headings'
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: `${site.name} | Demo Gym Website`,
  description: site.subtitle,
  metadataBase: new URL(`https://${site.domain}`)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <SiteModeProvider>
          <PromoBanner />
          <Header />
          <main>{children}</main>
          <Footer />
          <GlobalWidgets />
        </SiteModeProvider>
      </body>
    </html>
  );
}
