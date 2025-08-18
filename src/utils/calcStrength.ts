export default function calcStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score += 25;
  if (/[a-z]/.test(pw)) score += 25;
  if (/[A-Z]/.test(pw)) score += 25;
  if (/[0-9]/.test(pw)) score += 15;
  if (/[^a-zA-Z0-9]/.test(pw)) score += 10;
  return Math.min(score, 100);
}