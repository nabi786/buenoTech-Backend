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
    lockID : {
        type : String,
    },
    Date: {type: Date, 'default': Date.now}
})













// lock BNB funtion
const schema2 = new mongoose.Schema({
    walletAddress : {
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
    lockID : {
        type : String,
    }
})
















// Locked TokenSchema
const tokenLockInfo = mongoose.model('tokenLockedInfo', schema)
const bnbLockInfo = mongoose.model('bnbLockedInfo', schema2)






// models to export
const modles = {
    tokenLockInfo: tokenLockInfo,
    bnbLockInfo: bnbLockInfo,
}







module.exports = modles;