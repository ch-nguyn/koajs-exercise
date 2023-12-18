/**
 *
 * @param {any[]} data
 * @param {string[]} keys
 * @return {}
 */
export default function pick(data, keys) {
  let dataFields = {};
  keys.forEach((key) => {
    if (data.hasOwnProperty(key)) {
      dataFields[key] = data[key];
    }
  });
  return dataFields;
}
