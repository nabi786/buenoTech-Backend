
const router = require("express").Router();

const wallets= require("../controller/generateWallets")





router.get("/generateWallets", wallets.generateWallets)







module.exports = router










