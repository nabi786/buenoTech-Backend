const router = require("express").Router();

const tokensObj = require("../controller/lockedTokens")




// addd locked Token
router.post("/LockedToken", tokensObj.LockedToken);


// get all locked Tokens

router.post('/getAllLockedTokens', tokensObj.getLockedTokens)



// search token by Address
router.post('/searchSingleTokenByAddress', tokensObj.searchTokenByAddress);




// get locked Tokens Data by address
router.post('/getLockedSingleTokenDataByAddress', tokensObj.getLockedTokenDataByAddress);



// get locked tokens by wallet Address
router.post('/getLockedTokensByWalletAddress', tokensObj.getLockedTokensByWalletAddress);









module.exports = router