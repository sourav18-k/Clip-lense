export async function safeReadJson<T>(response: Response): Promise<T | null> {
  const contentType = response.headers.get('content-type') || '';
  const text = await response.text().catch(() => '');
  if (!text) return null;
  if (!contentType.includes('application/json') && text.trimStart().startsWith('<')) {
    return null;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
