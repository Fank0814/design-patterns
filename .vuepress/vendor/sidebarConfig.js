const fs = require("fs");
const path = require("path");

const sidebarConfig = (root) => {
  if (!fs.existsSync(root)) {
    return [];
  }
  try {
    let stats = fs.statSync(root);

    if (!stats.isDirectory()) {
      return [];
    }

    let result = [];
    fs.readdirSync(root).forEach(file => {
      if(!file.endsWith('pattern')) return;
      let _path = path.resolve(root, file);
      let index = fs.readdirSync(_path).findIndex(item => item === 'README.md');
      index !== -1 && result.push(`/${file}/`);
    });
    return result;
  } catch (error) {
    return [];
  }
};

module.exports = sidebarConfig;
