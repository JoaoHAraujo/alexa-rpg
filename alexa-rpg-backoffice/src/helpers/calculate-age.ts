export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();

  return today < new Date(today.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()) ? age - 1 : age;
}
