export async function getTelegramFileLink(fileId, botToken) {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
  const { result } = await res.json();
  return `https://api.telegram.org/file/bot${botToken}/${result.file_path}`;
}
