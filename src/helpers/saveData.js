import fs from "fs";

export const saveData = (data) => {
  fs.writeFileSync("./src/database/products.json", JSON.stringify(data));
};
