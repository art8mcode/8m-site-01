export const contactServiceOptions = [
  { id: 'marketing', label: 'Marketing' },
  { id: 'reels', label: 'Reels Production' },
  { id: 'combined', label: 'Marketing + Reels Production' },
] as const;

export type ContactService = (typeof contactServiceOptions)[number]['label'];
