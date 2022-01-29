const useRoomsFilter = (items, filters) => {
  if (!items && items.length === 0) return;

  let filteredItems = JSON.parse(JSON.stringify(items));

  // if (filters.isBooked) {
  //   filteredItems = filteredItems.filter(el => el.isBooked);
  // !TODO: create booking filters by arrivalDate & departureDate
  // }

  if (filters.hasWifi) {
    filteredItems = filteredItems.filter(el => (el.comforts ? el.comforts.includes('hasWifi') : false));
  }

  if (filters.hasConditioner) {
    filteredItems = filteredItems.filter(el => (el.comforts ? el.comforts.includes('hasConditioner') : false));
  }

  if (filters.hasWorkSpace) {
    filteredItems = filteredItems.filter(el => (el.comforts ? el.comforts.includes('hasWorkSpace') : false));
  }

  if (filters.canSmoke) {
    filteredItems = filteredItems.filter(room => room.canSmoke);
  }

  if (filters.price) {
    filteredItems = filteredItems.filter(room => room.price >= filters.price[0] && room.price <= filters.price[1]);
  }

  return { filteredItems };
};

export default useRoomsFilter;
