import { ThemeProvider } from '@/components/theme-provider';
import '@/globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import {
  Inter as FontSans,
  Source_Serif_4 as FontSerif,
} from 'next/font/google';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const fontSerif = FontSerif({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'InBook',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main>{children}</main>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
