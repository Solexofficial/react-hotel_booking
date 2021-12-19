export default function useFilters(data, filters) {
  if (!data) return;
  // let filteredData = data.filter(el => el.isBooked === 'false');
  let filteredData = data;
  console.log(filteredData);

  if (filters.isBooked) {
    filteredData = filteredData.filter(el => el.isBooked);
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
