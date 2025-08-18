export default function strengthText(n: number) {
  if (n < 30) return "Weak";
  if (n < 60) return "Fair";
  if (n < 80) return "Good";
  return "Strong";
}