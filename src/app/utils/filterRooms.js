export default function useFilters(data, filters) {
  let filteredData = data;

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
