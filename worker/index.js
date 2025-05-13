import { getTelegramFileLink } from './utils';

export default {
  async fetch(request, env) {
    const data = await request.json();
    const file = data.message?.document;
    if (!file) return new Response('No file', { status: 200 });

    const fileId = file.file_id;
    const timestamp = Date.now();
    const record = { fileId, timestamp };

    await env.FILES.put(fileId, JSON.stringify(record));

    return new Response('OK');
  }
}
