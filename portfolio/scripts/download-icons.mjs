import { mkdir, writeFile } from 'node:fs/promises';
const names = ['typescript', 'go', 'javascript', 'python', 'react', 'nextdotjs', 'vite', 'tailwindcss', 'electron', 'nestjs', 'express', 'fastify', 'hono', 'fastapi', 'postgresql', 'prisma', 'redis', 'mongodb', 'cloudflare', 'docker', 'supabase', 'git', 'github', 'wails', 'razorpay', 'googlegemini', 'rust', 'nodedotjs', 'expo', 'tauri', 'ffmpeg', 'nginx', 'telegram'];
await mkdir('public/stack', { recursive: true });
await Promise.all(names.map(async name => {
  const response = await fetch(`https://cdn.simpleicons.org/${name}/111111`);
  if (!response.ok) throw new Error(`Icon unavailable: ${name}`);
  await writeFile(`public/stack/${name}.svg`, await response.text());
}));
console.log(`Saved ${names.length} monochrome technology logos.`);
for (const name of ['linkedin', 'playwright']) {
  const response = await fetch(`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-plain.svg`);
  if (!response.ok) throw new Error(`Icon unavailable: ${name}`);
  await writeFile(`public/stack/${name}.svg`, await response.text());
}
