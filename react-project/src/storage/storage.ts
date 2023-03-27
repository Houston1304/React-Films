function saveCurrentUser(user: string) {
  localStorage.setItem("CurrentUser", user);
}

function getCurrentUser() {
  return localStorage.getItem("CurrentUser");
}
