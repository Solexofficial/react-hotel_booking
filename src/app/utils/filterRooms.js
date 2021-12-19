export default function useFilters(data, filters) {
  if (!data) return;
  // let filteredData = data.filter(el => el.isBooked === 'false');
  let filteredData = data;
  console.log(filteredData);
  console.log(filters);

  if (filters.isBooked) {
    filteredData = filteredData.filter(el => el.isBooked);
  }

  if (filters.hasWifi) {
    filteredData = filteredData.filter(el => (el.comforts ? el.comforts.includes('hasWifi') : false));
  }
  if (filters.hasConditioner) {
    filteredData = filteredData.filter(el => (el.comforts ? el.comforts.includes('hasConditioner') : false));
  }
  if (filters.hasWorkSpace) {
    filteredData = filteredData.filter(el => (el.comforts ? el.comforts.includes('hasWorkSpace') : false));
  }

  if (filters.canSmoke) {
    filteredData = filteredData.filter(room => room.canSmoke);
  }

  if (filters.rentPerDay) {
    filteredData = filteredData.filter(
      room => room.rentPerDay >= filters.rentPerDay[0] && room.rentPerDay <= filters.rentPerDay[1]
    );
  }
  return filteredData;
}
