export function saveCurrentUser(user) {
  localStorage.setItem("CurrentUser", user);
}
export function getCurrentUser() {
  return localStorage.getItem("CurrentUser");
}
