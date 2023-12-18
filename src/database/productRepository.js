import pick from "../helpers/pick.js";
import { saveData } from "../helpers/saveData.js";
import sortData from "../helpers/sortData.js";
import products from "./products.json" assert { type: "json" };

/**
 *
 * @param {limit, orderBy} query
 * @return {Object}
 */
export const getData = ({ limit = 10, orderBy = "asc" } = {}) => {
  let a;
  const data = sortData([...products], "createdAt", orderBy).slice(0, limit);
  return data;
};

/**
 *
 * @param {number} id
 * @param {string} fields
 * @return {Object}
 */
export const getOne = (id, fields) => {
  const data = products.find((product) => product.id === parseInt(id));

  if (fields) {
    const keys = fields.split(",");
    return pick(data, keys);
  }
  return data;
};

export const removeOne = (product) => {
  const data = products.filter((el) => el.id !== product.id);
  saveData(data);
};

export const addOne = (product) => {
  const data = [...products, product];
  saveData(data);
};

export const updateOne = (product, body) => {
  const updatedProduct = { ...product, ...body };

  const updatedData = products.map((singleProduct) =>
    singleProduct.id === product.id ? updatedProduct : singleProduct
  );
  saveData(updatedData);
};
