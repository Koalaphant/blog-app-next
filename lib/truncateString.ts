export function truncateString(content: string): string {
    return content.split(/\s+/).slice(0, 10).join(' ') + (content.split(/\s+/).length > 10 ? '...' : '');
}