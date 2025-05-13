export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const record = await env.FILES.get(id, { type: 'json' });
  if (!record) return new Response('Not found', { status: 404 });

  const api = `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/getFile?file_id=${record.fileId}`;
  const tgRes = await fetch(api);
  const json = await tgRes.json();

  if (!json.ok) return new Response('Invalid file', { status: 404 });

  const path = json.result.file_path;
  const tgUrl = `https://api.telegram.org/file/bot${env.TELEGRAM_TOKEN}/${path}`;

  return Response.redirect(tgUrl, 302);
}
