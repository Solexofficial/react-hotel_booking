const DATE_OF_STAY_KEY = 'dateOfStay';
const COUNT_OF_GUESTS_KEY = 'guests';

export function setSessionStorageData(dateOfStay, guests) {
  sessionStorage.setItem(DATE_OF_STAY_KEY, JSON.stringify(dateOfStay));
  sessionStorage.setItem(COUNT_OF_GUESTS_KEY, JSON.stringify(guests));
}

export function getDateOfStayData() {
  return JSON.parse(sessionStorage.getItem(DATE_OF_STAY_KEY));
}

export function getCountGuestsData() {
  return JSON.parse(sessionStorage.getItem(COUNT_OF_GUESTS_KEY));
}

export function resetSessionStorageData() {
  sessionStorage.clear();
}

const sessionStorageService = {
  setSessionStorageData,
  getDateOfStayData,
  getCountGuestsData,
  resetSessionStorageData,
};

export default sessionStorageService;
