export async function login(username: string, password: string): Promise<any> {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function signup(
  firstName: string,
  username: string,
  password: string
) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, username, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
