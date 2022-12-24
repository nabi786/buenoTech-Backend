
const model = require("../model/model")



const LockedToken = async(req,res)=>{
    try {


        var lockModel = new model.tokenLockInfo({
            walletAddress : req.body.walletAddress,
            tokenAddress : req.body.tokenAddress,
            lockTitle : req.body.title,
            total_Locked_Amount : req.body.total_Locked_Amount,
            total_Locked_Value : req.body.total_Locked_Value,
            Owner : req.body.owner,
            Lock_Date : req.body.Lock_Date,
            unLock_Date : req.body.unLock_Date,
            TGE_Date : req.body.TGE_Date,
            cycle_Minutes : req.body.cycle_Minutes,
            cycle_Relase : req.body.cycle_Relase,
            tGE_Percentage : req.body.tGE_Percentage,
            network : req.body.network,
            chainID : req.body.chainID,
            tokenName : req.body.tokenName,
            tokenSymbol : req.body.tokenSymbol,
            tokenDecimal : req.body.tokenDecimal,
            isLpToken : req.body.isLpToken
        })


        await lockModel.save();
        res.status(200).json({msg : "locked token added Successfully", success : true})
    } catch (error) {

        res.status(500).json({msg : "something went wrong", success : false})
    }
}















// get locked tokens
const getLockedTokens  = async (req,res)=>{
    try{

        console.log("this is body",req.body)
        var tokens;
            if(req.body.chainID == 0){
                 tokens = await model.tokenLockInfo.find({isLpToken : req.body.isLpToken})
            }else{
                 tokens = await model.tokenLockInfo.find({chainID : req.body.chainID, isLpToken : req.body.isLpToken})
            }

            var itemPerPage = req.body.itemPerPage;
            var pageNum = req.body.pageNum
            if(tokens.length > 0){

                console.log("these are tokens", tokens)
                var totalPages =  Math.ceil(tokens.length / itemPerPage)
                
                var filteredTokens;
                if(req.body.chainID == 0){
                     filteredTokens = await model.tokenLockInfo.find({isLpToken : req.body.isLpToken}).skip((itemPerPage * pageNum) - itemPerPage).limit(itemPerPage)
                }else{
                    filteredTokens = await model.tokenLockInfo.find({chainID : req.body.chainID, isLpToken : req.body.isLpToken}).skip((itemPerPage * pageNum) - itemPerPage).limit(itemPerPage)
                }
                            
                res.status(200).json({success : true, Data : filteredTokens, length : tokens.length, totalPages : totalPages})
                
            }else{
                res.status(404).json({success : false, Data : [], length : 0})
            }

        
    }catch(err){
        console.log(err)
        res.status(500).json({success : false, msg : 'something went wrong serverside'})
    }
}






// searchToken by token address
const searchTokenByAddress  = async (req,res)=>{
    try{

        var tokens = await model.tokenLockInfo.findOne({tokenAddress : req.body.tokenAddress})
    
        if(tokens){
            console.log(tokens.length)
            res.status(200).json({success : true, data : tokens})
        }else{
            res.status(200).json({success : false, data : []})
        }

    }catch(err){
        res.status(500).json({success : false, msg : 'something went wrong serverside'})
    }

}





// get locked token by walletAddress and chainID
const getLockedTokenDataByAddress  = async (req,res)=>{

    try{

        var tokens; 
        if(!req.body.walletAddress || !req.body.chainID){
            
            res.status(404).json({success : false, msg : "invalid Creditionals"})

        }else{
            


            tokens = await model.tokenLockInfo.find({walletAddress : req.body.walletAddress, chainID : req.body.chainID, isLpToken : req.body.isLpToken})
        
        }
        
        
        
        var itemPerPage = req.body.itemPerPage;
        var pageNum = req.body.pageNum;
        // console.log("tokens",tokens)
        if(tokens.length > 0){
            
            var totalPages =  Math.ceil(tokens.length / itemPerPage)
            
            console.log('itemPerPage',itemPerPage)
            console.log('pageNum',pageNum)
            console.log('totalPages',totalPages)
            console.log("itemPerPage*pageNum",(itemPerPage*pageNum)-itemPerPage)
            
            // filteredTokens = await model.tokenLockInfo.find({walletAddress : req.body.walletAddress, chainID : req.body.chainID, isLpToken : req.body.isLpToken}).skip((itemPerPage * pageNum) - itemPerPage).limit(itemPerPage)
            filteredTokens = await model.tokenLockInfo.find({walletAddress : req.body.walletAddress, chainID : req.body.chainID, isLpToken : req.body.isLpToken}).skip((itemPerPage*pageNum)-itemPerPage).limit(itemPerPage)
            
            console.log('filteredTokens',filteredTokens.length)
            res.status(200).json({success : true, data : filteredTokens, totalPages : totalPages, itemLength : tokens.length})
            
        }else{
            res.status(200).json({success : false, data : [], msg : "no data found"})
        }

    }catch(err){
        res.status(500).json({success : false, msg : 'something went wrong serverside'})
    }

}







// get locked Tokens by walletAddress
const getLockedTokensByWalletAddress  = async (req,res)=>{

    try{

        var tokens = await model.tokenLockInfo.find({walletAddress : req.body.walletAddress})
        
        if(tokens){

            const unique = [...new Map(tokens.map((m) => [m.tokenAddress, m])).values()];

            
            res.status(200).json({success : true, data : unique});

        }else{
            res.status(200).json({success : false, data : []})
        }

    }catch(err){
        res.status(500).json({success : false, msg : 'something went wrong serverside'})
    }

}











// making object to export uisng moduel
const tokensObj = {
    LockedToken,getLockedTokens,
    searchTokenByAddress,
    getLockedTokenDataByAddress,
    getLockedTokensByWalletAddress
}



module.exports = tokensObj