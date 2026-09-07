import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://forma-studio-artem.art8m.chatgpt.site'),
  title: '8m — Маркетинг & Reels-продакшн',
  description:
    '8m — маркетингове просування та професійний Reels-продакшн. Перегляньте портфоліо, послуги та обговоріть свій проєкт.',
  alternates: {
    canonical: '/',
    languages: { uk: '/', en: '/en', pl: '/pl' },
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
