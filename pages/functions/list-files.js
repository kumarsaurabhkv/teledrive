export async function onRequestGet({ env }) {
  const list = await env.FILES.list();
  const data = await Promise.all(list.keys.map(async key => {
    const val = await env.FILES.get(key.name, { type: 'json' });
    return val;
  }));
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
