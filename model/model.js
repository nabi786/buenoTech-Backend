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
    },
    Date: {type: Date, 'default': Date.now}
})





















// Services Fees 
const schema3 = new mongoose.Schema({
        FlatFee : {
            type : String,
            required : true
        },
        VariableFee : {
            type :  String,
            required : true
        },
        payPerUse : {
            type : String,
            required : true
        },
        monthly : {
            type : String,
        },
        yearly : {
            type : String
        }
})






// adminData

const schema4 = new mongoose.Schema({
    firstName : {
    type : String
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    Date: {type: Date, 'default': Date.now}
})









// generwate Walltes











// Locked TokenSchema
const tokenLockInfo = mongoose.model('tokenLockedInfo', schema)
const bnbLockInfo = mongoose.model('bnbLockedInfo', schema2)
const generateWalletsFee = mongoose.model('servicesFee', schema3)
const adminData = mongoose.model('Admin', schema4)






// models to export
const modles = {
    tokenLockInfo: tokenLockInfo,
    bnbLockInfo: bnbLockInfo,
    generateWalletsFee:generateWalletsFee,
    adminData:adminData
}














module.exports = modles;