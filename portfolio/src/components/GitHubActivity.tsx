import { ArrowUpRight, GitMerge, GitPullRequest, GitFork } from 'lucide-react';
import { getActivity } from '@/lib/github';

export async function GitHubActivity() {
  const data = await getActivity();
  const weeks: { count: number; start: string; end: string }[] = [];
  for (let i = 0; i < data.days.length; i += 7) {
    const group = data.days.slice(i, i + 7);
    weeks.push({ count: group.reduce((sum, day) => sum + day.count, 0), start: group[0].date, end: group[group.length - 1].date });
  }
  const max = Math.max(1, ...weeks.map(week => week.count));
  const number = (value: number | null) => value === null ? '—' : value.toLocaleString('en-IN');
  const format = (date: string) => new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return <section id="activity" className="panel activity-panel" aria-labelledby="activity-title">
    <div className="section-top"><h2 id="activity-title"><GitFork size={17} /> A little, every day.</h2><a className="quiet-link" href="https://github.com/vikrant-choudhary06" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>
    <div className="activity-content">
      <div className="chart-area"><p className="eyebrow">CONTRIBUTIONS · LAST 6 MONTHS</p>
        {weeks.length ? <div className="bar-chart" role="img" aria-label={`${number(data.total)} contributions between ${format(data.from)} and ${format(data.to)}. Each bar represents one week.`}>
          {weeks.map((week, index) => <div key={week.start} className="bar-column" tabIndex={0} aria-label={`${format(week.start)} to ${format(week.end)}: ${week.count} contributions`}><span className="bar" style={{ height: `${Math.max(3, week.count / max * 100)}%`, background: week.count ? 'var(--accent)' : '#d8eeff' }} /><span className="bar-tooltip">{format(week.start)}–{format(week.end)}<br /><b>{week.count}</b> contributions</span><span className="sr-only">Week {index + 1}</span></div>)}
        </div> : <div className="chart-unavailable">Live activity couldn’t load.<br /><a href="https://github.com/vikrant-choudhary06">View it on GitHub ↗</a></div>}
        <div className="chart-axis"><span>{format(data.from)}</span><span>{format(data.to)}</span></div>
      </div>
      <div className="stats"><div className="total-stat"><strong>{number(data.total)}</strong><span>contributions</span></div><div className="pr-stats"><div><GitPullRequest size={14} /><strong>{number(data.raised)}</strong><span>PRs raised</span></div><div><GitMerge size={14} /><strong>{number(data.merged)}</strong><span>PRs merged</span></div></div></div>
    </div><p className="activity-note">Public GitHub activity · updated on deployment · <a href="https://github.com/grubersjoe/github-contributions-api" target="_blank" rel="noreferrer">contribution data source ↗</a></p>
  </section>;
}
