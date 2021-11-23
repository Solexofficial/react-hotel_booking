export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  console.log(startIndex);
  return items.slice(startIndex, startIndex + pageSize);
}
