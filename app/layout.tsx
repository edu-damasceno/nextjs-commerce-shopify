import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from 'lib/utils';
import { ReactNode } from 'react';
import './globals.css';

import type { Metadata, Viewport } from 'next';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
const APP_DESCRIPTION = 'Best PWA app in the world!';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: APP_TITLE_TEMPLATE
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    }),
  applicationName: SITE_NAME,
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
