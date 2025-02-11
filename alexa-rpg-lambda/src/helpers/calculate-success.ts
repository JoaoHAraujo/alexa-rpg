export function calculateSuccess(rate: number): boolean {
  if (rate < 0 || rate > 100) {
    throw new Error('SuccessRate should be between 0 and 100.');
  }

  const randomValue = Math.random() * 100; // Gera um número entre 0 e 100
  return randomValue <= rate;
}
