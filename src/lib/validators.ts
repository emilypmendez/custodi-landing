export function isValidEmail(email: string): boolean {
  // Simple but solid check. Replace with stricter if needed.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}