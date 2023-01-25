




const generateWallets = async(req,res)=>{
    try{


        var staticObj = {
            publickeys: [],
            privateKeys: []
            }

        res.status(200).json({success : true, data : staticObj})
    }catch(err){
        res.status(500).json({success : false, msg : "something went wrong"})
    }
}








const wallets = {
    generateWallets
}



module.exports = wallets;