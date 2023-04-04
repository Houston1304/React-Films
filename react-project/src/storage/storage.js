export function saveCurrentUser(user) {
  localStorage.setItem("CurrentUser", user);
}
export function getCurrentUser() {
  return localStorage.getItem("CurrentUser");
}

export function saveFavoriteFilm(film) {
  localStorage.setItem("FavoriteFilm", film);
}
export function getFavoriteFilm() {
  return localStorage.getItem("FavoriteFilm");
}

export function saveWatchLater(film) {
  localStorage.setItem("WatchLater", film);
}
export function getWatchLater() {
  return localStorage.getItem("WatchLater");
}
