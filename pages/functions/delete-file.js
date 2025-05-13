export async function onRequestDelete({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });

  await env.FILES.delete(id);
  return new Response('Deleted', { status: 200 });
}
