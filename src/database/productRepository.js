import pick from "../helpers/pick.js";
import { saveData } from "../helpers/saveData.js";
import sortData from "../helpers/sortData.js";
import products from "./productsData.json" assert { type: "json" };

/**
 *
 * @param {limit, orderBy} query
 * @return {Object}
 */
export const getData = (query) => {
  const { limit, orderBy } = query;
  let data = [...products];
  if (orderBy) {
    sortData(data, "createdAt", orderBy);
  }
  if (limit) {
    data = data.slice(0, limit);
  }

  return data;
};

/**
 *
 * @param {number} id
 * @param {*} fields
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

export const deleteOne = (product) => {
  let data = products.filter((el) => el.id !== product.id);
  saveData(data);
};

export const addOne = (product) => {
  let data = [...products, product];
  saveData(data);
};

export const updateOne = (product, body) => {
  let data = [...products];

  const updatedProduct = { ...product, ...body };

  const updatedData = data.map((singleProduct) =>
    singleProduct.id === product.id ? updatedProduct : singleProduct
  );
  saveData(updatedData);
};
