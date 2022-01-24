export async function getUserById(id: string): Promise<any> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}
