import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const basePath = process.env.NODE_ENV === 'development' ? '' : '/gaurav-portfolio-2025';

export const metadata: Metadata = {
  title: "Gaurav Surtani - Software Developer (AI/ML) | Full-Stack Engineer",
  description: "Gaurav Surtani's professional portfolio showcasing projects, skills, and experience in AI/ML, Full-Stack Development, React, Node.js, Python, and more.",
  keywords: "Gaurav Surtani, AI Developer, ML Engineer, Full-Stack Developer, Software Engineer, React, Next.js, Node.js, Python, TypeScript, portfolio, AI, Machine Learning",
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://gauravsurtani.github.io/gaurav-portfolio-2025'),
  icons: {
    icon: [
      { url: `${basePath}/icon/favicon.ico` },
      { url: `${basePath}/icon/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${basePath}/icon/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: `${basePath}/icon/apple-touch-icon.png`, type: 'image/png' },
    ],
  },
  manifest: `${basePath}/manifest.json`,
  openGraph: {
    title: 'Gaurav Surtani - Software Developer (AI/ML) | Full-Stack Engineer',
    description: 'Gaurav Surtani\'s professional portfolio showcasing projects, skills, and experience in AI/ML, Full-Stack Development, React, Node.js, Python, and more.',
    url: 'https://gauravsurtani.github.io/gaurav-portfolio-2025',
    siteName: 'Gaurav Surtani Portfolio',
    images: [
      {
        url: `${basePath}/icon/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Gaurav Surtani Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaurav Surtani - Software Developer (AI/ML) | Full-Stack Engineer',
    description: 'Gaurav Surtani\'s professional portfolio showcasing projects, skills, and experience in AI/ML, Full-Stack Development, React, Node.js, Python, and more.',
    images: [`${basePath}/icon/android-chrome-512x512.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' ||
                    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
