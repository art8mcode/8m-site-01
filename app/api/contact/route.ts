export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: 'Недозволений запит.' }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 8000)
    return Response.json(
      { error: 'Повідомлення занадто довге.' },
      { status: 413 },
    );
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'Некоректний запит.' }, { status: 400 });
  }
  if (
    !data ||
    typeof data !== 'object' ||
    typeof data.name !== 'string' ||
    !data.name.trim() ||
    data.name.length > 100 ||
    typeof data.email !== 'string' ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    typeof data.message !== 'string' ||
    !data.message.trim() ||
    data.message.length > 4000 ||
    typeof data.service !== 'string' ||
    data.service.length > 150
  )
    return Response.json(
      { error: 'Перевірте ім’я, email та опис проєкту.' },
      { status: 400 },
    );
  // An explicit delivery provider must be configured before accepting applications.
  // Never report successful delivery when no recipient exists.
  return Response.json(
    {
      error:
        'Приймання заявок ще не підключено. Повідомлення не надіслано. Будь ласка, поверніться пізніше.',
    },
    { status: 503 },
  );
}
