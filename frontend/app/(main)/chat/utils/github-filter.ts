const GITHUB_HOST_RE = /(^|\.)github\.com$/i;
const GITHUB_REFERENCE_RE = /\bgithub\b|github\.com|api\.github\.com|raw\.githubusercontent\.com/i;
const GITHUB_MARKDOWN_LINK_RE = /\[([^\]]*)\]\((?:https?:\/\/)?(?:www\.)?(?:github\.com|api\.github\.com|raw\.githubusercontent\.com)[^)]+\)/gi;
const GITHUB_BARE_URL_RE = /\bhttps?:\/\/(?:www\.)?(?:github\.com|api\.github\.com|raw\.githubusercontent\.com)\/\S+/gi;

export function isGitHubUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const raw = value.trim();
  if (!raw) return false;

  try {
    const url = new URL(raw);
    return GITHUB_HOST_RE.test(url.hostname) || url.hostname.toLowerCase() === 'raw.githubusercontent.com';
  } catch {
    return /^(?:www\.)?(?:github\.com|api\.github\.com|raw\.githubusercontent\.com)(?:\/|$)/i.test(raw);
  }
}

export function hasGitHubReference(value: unknown): boolean {
  return typeof value === 'string' && GITHUB_REFERENCE_RE.test(value);
}

export function stripGitHubUrlsFromText(value: unknown): string {
  if (typeof value !== 'string') return '';

  return value
    .replace(GITHUB_MARKDOWN_LINK_RE, '$1')
    .replace(GITHUB_BARE_URL_RE, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
