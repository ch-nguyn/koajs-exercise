import fs from "fs";
import { faker } from "@faker-js/faker";
import { saveData } from "../helpers/saveData.js";

const generateProducts = () => {
  let products = [];
  for (let i = 1; i <= 1000; i++) {
    let singleProduct = {
      id: i,
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      product: faker.commerce.product(),
      color: faker.color.rgb(),
      createdAt: faker.date.recent().toISOString(),
      image: faker.image.url(),
    };
    products = [...products, singleProduct];
  }
  return products;
};

const data = generateProducts();
saveData(data);
