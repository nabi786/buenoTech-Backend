const router = require("express").Router();

const wallets = require("../controller/generateWallets");

router.post("/generateWallets", wallets.generateWallets);

module.exports = router;
