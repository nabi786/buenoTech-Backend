const mongoose = require('mongoose')



const schema = new mongoose.Schema({
    walletAddress : {
        type : String,
        required : true
    },
    tokenAddress : {
        type : String,
        required : true
    },
    tokenName : {
        type : String,
        required : true
    },
    tokenSymbol : {
        type : String,
        required : true
    },
    tokenDecimal : {
        type : String,
        required : true
    },
    lockTitle : {
        type : String,
        required : true,
    },
    total_Locked_Amount : {
        type : String,
        required : true
    },
    total_Locked_Value : {
        type : String,
    },
    Owner : {
        type : String,
        required : true
    },
    Lock_Date : {
        type : String,
    },
    unLock_Date : {
        type : String,
        required : true
    },
    TGE_Date : {
        type : String
    },
    tGE_Percentage : {
        type : String
    },
    cycle_Days : {
        type : String,
    },
    cycle_ReleasePercentage : {
        type : String
    },
    network : {
        type : String,
        required : true
    },
    chainID : {
        type : Number,
        required : true
    },
    isLpToken : {
        type : Boolean,
        'default': "false"
    },
    Date: {type: Date, 'default': Date.now}
})





// Locked TokenSchema
const tokenLockInfo = mongoose.model('tokenLockedInfo', schema)


const modles = {
    tokenLockInfo: tokenLockInfo,
}



module.exports = modles;