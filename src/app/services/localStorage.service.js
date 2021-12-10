const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const CURRENT_USER = 'current-user';

export function setTokens({ expiresIn = 3600, idToken, refreshToken }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;

  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function setCurrentUser(currentUser) {
  return localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER));
}

export function removeCurrentUser() {
  return localStorage.removeItem(CURRENT_USER);
}

const localStorageService = {
  setTokens,
  setCurrentUser,
  removeCurrentUser,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
};

export default localStorageService;
