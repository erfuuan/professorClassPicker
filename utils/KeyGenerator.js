const crypto = require("crypto");
const { log: print } = console;

const key = crypto.randomBytes(42).toString("hex");
print(key)