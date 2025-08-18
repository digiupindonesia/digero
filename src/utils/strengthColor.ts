export default function strengthColor(n: number) {
  if (n < 30) return "bg-red-500";
  if (n < 60) return "bg-yellow-500";
  if (n < 80) return "bg-blue-500";
  return "bg-green-500";
}