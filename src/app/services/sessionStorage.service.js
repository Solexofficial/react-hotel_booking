const SEARCH_QUERY = 'search-query';

export function setSessionStorageData(payload) {
  sessionStorage.setItem(SEARCH_QUERY, JSON.stringify(payload));
}

export function getSearchQueryData() {
  return JSON.parse(sessionStorage.getItem(SEARCH_QUERY));
}

export function resetSessionStorageData() {
  sessionStorage.clear();
}

const sessionStorageService = {
  setSessionStorageData,
  getSearchQueryData,
  resetSessionStorageData,
};

export default sessionStorageService;
