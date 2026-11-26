const fs = require("fs");
const src = process.argv[2];
const dest = process.argv[3];
const j = JSON.parse(fs.readFileSync(src, "utf8"));
const data = j.data || (j.result && j.result.data);
if (!data) {
  console.log(Object.keys(j));
  process.exit(1);
}
fs.writeFileSync(dest, Buffer.from(data, "base64"));
console.log("wrote", dest, Buffer.from(data, "base64").length);
