export async function getUserById(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
  } catch(err) {
    console.log(err)
  }
}
