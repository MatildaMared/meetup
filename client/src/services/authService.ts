export async function login(username: string, password: string): Promise<any> {
  try {
    console.log("Login");
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
