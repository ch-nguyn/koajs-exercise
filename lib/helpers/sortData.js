/**
 *
 * @param {string[]} arr
 * @param {string} key
 * @param {string} orderBy
 * @returns
 */
const sortData = (arr, key, orderBy) => {
  let data = [];
  if (orderBy === "asc") {
    data = arr.sort((a, b) => new Date(a[key]) - new Date(b[key]));
    return data;
  }
  if (orderBy === "desc") {
    data = arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));
    return data;
  }
};
export default sortData;
//# sourceMappingURL=sortData.js.map