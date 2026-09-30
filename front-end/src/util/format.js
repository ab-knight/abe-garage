// "2026-09-25T..." → "09 - 25 - 2026 | 14:30"
export function formatAddedDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)} - ${pad(d.getDate())} - ${d.getFullYear()} | ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
