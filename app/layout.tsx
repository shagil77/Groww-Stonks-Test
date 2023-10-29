import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Groww Stonks Dashboard',
    default: 'GrowwStonks',
  },
  description: 'Create a web application for a stocks/etfs broking website.',
  metadataBase: new URL('https://groww.in/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
