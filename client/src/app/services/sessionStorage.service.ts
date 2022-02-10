const SEARCH_QUERY = 'search-query';

type Keys = {
  SEARCH_QUERY: typeof SEARCH_QUERY;
};

export function setSessionStorageData(payload: { [Property in keyof Keys]?: string } | string) {
  sessionStorage.setItem(SEARCH_QUERY, JSON.stringify(payload));
}

export function getSearchQueryData() {
  return JSON.parse(sessionStorage.getItem(SEARCH_QUERY)!);
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
