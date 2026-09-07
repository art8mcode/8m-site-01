import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8m — Marketing i produkcja Reels',
  description:
    '8m łączy rozwój marketingowy z profesjonalną produkcją Reels. Zobacz realizacje, usługi i ceny, a następnie opowiedz nam o swoim projekcie.',
  alternates: {
    canonical: '/pl',
    languages: { uk: '/', en: '/en', pl: '/pl' },
  },
};

export default function PolishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
