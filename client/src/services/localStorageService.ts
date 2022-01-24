export function saveTokenInLocalStorage(token: string): void {
  localStorage.setItem("token", token);
}

export function saveUserInLocalStorage(user: any): void {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(): string | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem("token");
  return token ? token : null;
}
