export function saveTokenInLocalStorage(token: string): void {
  localStorage.setItem("meetupToken", token);
}

export function saveUserInLocalStorage(user: any): void {
  localStorage.setItem("meetupUser", JSON.stringify(user));
}

export function getUserFromLocalStorage(): string | null {
  const user = localStorage.getItem("meetupUser");
  return user ? JSON.parse(user) : null;
}

export function getTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem("meetupToken");
  return token ? token : null;
}
