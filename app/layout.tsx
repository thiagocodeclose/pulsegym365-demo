import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DemoProvider } from '@/components/DemoProvider';
import { DemoController } from '@/components/DemoController';
import { GlobalWidgets } from '@/components/WidgetZone';
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
        <DemoProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <DemoController />
          <GlobalWidgets />
        </DemoProvider>
      </body>
    </html>
  );
}
