const USER = 'vikrant-choudhary06';
export type Contribution = { date: string; count: number; level: number };
export type Activity = { days: Contribution[]; total: number | null; raised: number | null; merged: number | null; from: string; to: string };

async function read(url: string): Promise<unknown> {
  const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'Vikrant-Portfolio' }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('GitHub activity unavailable');
  return response.json();
}

export async function getActivity(): Promise<Activity> {
  const today = new Date();
  const start = new Date(today); start.setUTCMonth(start.getUTCMonth() - 6);
  const from = start.toISOString().slice(0, 10), to = today.toISOString().slice(0, 10);
  const search = (query: string) => `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=1`;
  const results = await Promise.allSettled([
    read(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`),
    read(search(`author:${USER} type:pr created:${from}..${to}`)),
    read(search(`author:${USER} type:pr is:merged merged:${from}..${to}`)),
  ]);
  const calendar = results[0].status === 'fulfilled' ? results[0].value as { contributions?: Contribution[] } : null;
  const days = Array.isArray(calendar?.contributions) ? calendar.contributions.filter(day => day.date >= from && day.date <= to && Number.isFinite(day.count) && day.count >= 0) : [];
  const count = (index: number) => { const result = results[index]; if (result.status !== 'fulfilled') return null; const value = (result.value as { total_count?: number }).total_count; return typeof value === 'number' ? value : null; };
  return { days, total: days.length ? days.reduce((sum, day) => sum + day.count, 0) : null, raised: count(1), merged: count(2), from, to };
}
