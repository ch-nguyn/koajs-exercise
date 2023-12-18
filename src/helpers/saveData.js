import fs from "fs";

export const saveData = (data) => {
  fs.writeFileSync("./src/database/productsData.json", JSON.stringify(data));
};
