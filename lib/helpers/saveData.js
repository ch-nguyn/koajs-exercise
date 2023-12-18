import fs from "fs";

/**
 *
 * @param {any[]} data
 */
export const saveData = data => {
  fs.writeFileSync("./src/database/products.json", JSON.stringify(data), 2, null);
};
//# sourceMappingURL=saveData.js.map