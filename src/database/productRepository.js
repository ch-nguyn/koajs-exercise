import pick from "../helpers/pick.js";
import { saveData } from "../helpers/saveData.js";
import products from "./products.json" assert { type: "json" };
import fs from "fs";

export const getAll = (query) => {
  const { limit, orderBy } = query;
  let data = [...products];
  if (orderBy) {
    orderBy === "asc"
      ? (data = data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ))
      : (data = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ));
  }
  if (limit) {
    data = data.slice(0, limit);
  }

  return data;
};

export const getOne = (id, fields) => {
  const data = products.find((product) => product.id === parseInt(id));
  if (!data) {
    throw new Error("There is no product with that ID");
  }
  if (fields) {
    const keys = fields.split(",");
    return pick(data, keys);
  }
  return data;
};

export const deleteOne = (id) => {
  if (!getOne(id)) {
    throw new Error("There is no product with that ID");
  }
  let data = products.filter((product) => product.id !== Number(id));
  saveData(data);
};

export const addOne = (product) => {
  let data = [...products];
  if (getOne(product.id)) {
    throw new Error("Product has already existed");
  }
  data.push(product);
  saveData(data);
};

export const updateOne = (id, body) => {
  let data = [...products];
  const product = getOne(id);

  if (!product) {
    throw new Error("There is no product with that ID");
  }
  const updatedProduct = { ...product, ...body };

  const updatedData = data.map((singleProduct) =>
    singleProduct.id === product.id ? updatedProduct : singleProduct
  );
  saveData(updatedData);
};
