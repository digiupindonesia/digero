export default function calcStrength(pw: string): number {
  let score = 0;

  // panjang
  if (pw.length >= 8) score += 20;
  if (pw.length >= 12) score += 10; // bonus panjang

  // karakter
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

  if (hasLower) score += 20;
  if (hasUpper) score += 20;
  if (hasNumber) score += 15;
  if (hasSpecial) score += 15;

  // Jika salah satu syarat utama tidak ada → batasi maksimum jadi 30 (biar tetap “Weak”)
  if (!(hasLower && hasUpper && hasNumber && hasSpecial)) {
    return Math.min(score, 30);
  }

  return Math.min(score, 100);
}