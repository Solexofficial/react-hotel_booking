const useRoomsFilter = (items, filters) => {
  if (!items) return;

  let filteredItems = JSON.parse(JSON.stringify(items));

  // if (filters.isBooked) {
  //   filteredItems = filteredItems.filter(el => el.isBooked);
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

  if (filters.rentPerDay) {
    filteredItems = filteredItems.filter(
      room => room.rentPerDay >= filters.rentPerDay[0] && room.rentPerDay <= filters.rentPerDay[1]
    );
  }

  return { filteredItems };
};

export default useRoomsFilter;
