const fs = require("node:fs/promises");
const path = require("node:path");

const datasource = {
  filePath: path.resolve(__dirname, "../data/inventory.json"),

  async load() {
    const jsonInventory = await fs.readFile(this.filePath, "");
    const inventory = JSON.parse(jsonInventory);
    return inventory;
  },
  async save(data) {
    const jsonInventory = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonInventory, "utf-8");
  },
  async removeFile(filePath){
    const file = path.join(__dirname, '../public/', filePath);
    try{
      await fs.unlink(file);
      console.log(`file ${filePath} has been deleted.`);
    }catch (err){
      console.error(err.message);
    }
  }
};

module.exports = datasource;
