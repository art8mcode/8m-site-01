import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8m — Marketing & Reels Production',
  description:
    '8m combines marketing growth and professional Reels production. Explore our work, services and pricing, then tell us about your project.',
  alternates: {
    canonical: '/en',
    languages: { uk: '/', en: '/en', pl: '/pl' },
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
