
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




















// searchToken by token address
const searchTokenByAddress  = async (req,res)=>{
    try{

        var tokens = await model.tokenLockInfo.findOne({tokenAddress : req.body.tokenAddress})
        console.log('this is token', tokens)
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
const getLockedTokenDataByAddressAndChainID  = async (req,res)=>{

    try{

        var tokens; 
        if(!req.body.walletAddress || !req.body.chainID){
            
            res.status(404).json({success : false, msg : "invalid Creditionals"})

        }else{
            


            tokens = await model.tokenLockInfo.find({walletAddress : req.body.walletAddress, chainID : req.body.chainID, isLpToken : req.body.isLpToken})
        
        }


        // workingHere

         // get Data that has sameTokens
         var tokenAddress = []
         tokens.forEach((item,index)=>{
             tokenAddress.push(item.tokenAddress)
             
         })
 
         // get Unique items in aray 
         var uniqueAry = tokenAddress.filter((v, i, a) => a.indexOf(v) === i);
 
         console.log("tokens Array", uniqueAry)
 
         var multPleAry= []
         uniqueAry.forEach((item,index)=>{
             var price = 0;
             var tokenName = "";
             var tokenSymbol = "";
             tokens.forEach((item2,index)=>{
                 if(item == item2.tokenAddress){
                     var ary = [item2]
                     price += Number(item2.total_Locked_Amount)
                     tokenName = item2.tokenName
                     tokenSymbol = item2.tokenSymbol
                 }
                 
             })
 
 
             multPleAry.push({tokenAddress : item, tokenName : tokenName, tokenSymbol : tokenSymbol, total_Locked_Amount : price})
         })



         tokens = multPleAry



        
        
        
        var itemPerPage = req.body.itemPerPage;
        var pageNum = req.body.pageNum;
        // console.log("tokens",tokens)
        if(tokens.length > 0){
            
            var totalPages =  Math.ceil(tokens.length / itemPerPage)
            


             // function to get pagination
            function paginate(array, page_size, page_number) {
                // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
                return array.slice((page_number - 1) * page_size, page_number * page_size);
            }

            var itemList = await paginate(tokens,itemPerPage, pageNum)

            


            res.status(200).json({success : true, data : itemList, totalPages : totalPages, itemLength : tokens.length})
            
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
        
        if(tokens.length > 0){

            
             


            
            res.status(200).json({success : true, data : unique});

        }else{
            res.status(200).json({success : false, data : []})
        }

    }catch(err){
        res.status(500).json({success : false, msg : 'something went wrong serverside'})
    }

}














// get Token for listingPage 
const getTokensForListingPage  = async (req,res)=>{
    try{

        console.log("this is body",req.body)
        var tokens;
            if(req.body.chainID == 0){
                 tokens = await model.tokenLockInfo.find({isLpToken : req.body.isLpToken})
            }else{
                 tokens = await model.tokenLockInfo.find({chainID : req.body.chainID, isLpToken : req.body.isLpToken})
            }




        
            // get Data that has sameTokens
            var tokenAddress = []
            tokens.forEach((item,index)=>{
                tokenAddress.push(item.tokenAddress)
                
            })
    
            // get Unique items in aray 
            var uniqueAry = tokenAddress.filter((v, i, a) => a.indexOf(v) === i);
    
            console.log("tokens Array", uniqueAry)
    
            var multPleAry= []
            uniqueAry.forEach((item,index)=>{
                var price = 0;
                var tokenName = "";
                var tokenSymbol = "";
                tokens.forEach((item2,index)=>{
                    if(item == item2.tokenAddress){
                        var ary = [item2]
                        price += Number(item2.total_Locked_Amount)
                        tokenName = item2.tokenName
                        tokenSymbol = item2.tokenSymbol
                    }
                    
                })
    
    
                multPleAry.push({tokenAddress : item, tokenName : tokenName, tokenSymbol : tokenSymbol, total_Locked_Amount : price})
            })



            tokens = multPleAry
            
            


            
            var itemPerPage = req.body.itemPerPage;
            var pageNum = req.body.pageNum
            if(tokens.length > 0){

                // console.log("these are tokens", tokens)
                var totalPages =  Math.ceil(tokens.length / itemPerPage)
                

                // function to get pagination
                function paginate(array, page_size, page_number) {
                    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
                    return array.slice((page_number - 1) * page_size, page_number * page_size);
                  }

                var itemList = await paginate(tokens,itemPerPage, pageNum)
                
                // console.log(filteredTokens)
                res.status(200).json({success : true, Data : itemList, length : tokens.length, totalPages : totalPages})
                
            }else{
                res.status(404).json({success : false, Data : [], length : 0})
            }

        
    }catch(err){
        console.log()
        res.status(500).json({success : false, msg : 'something went wrong serverside'})
    }
}








const getAllTokenAddressUsingAddress = async(req,res)=>{

    var tokens = await model.tokenLockInfo.find({tokenAddress : req.body.tokenAddress})

    if(tokens.length > 0){
        
        console.log('tokens', tokens)
        res.status(200).json({success : false, Data : tokens, length : 0}) 
    }else{
        res.status(404).json({success : false, Data : "no data found", length : 0}) 
    }

}








// making object to export uisng moduel
const tokensObj = {
    LockedToken,
    searchTokenByAddress,
    getLockedTokenDataByAddressAndChainID,
    getLockedTokensByWalletAddress,getTokensForListingPage,
    getAllTokenAddressUsingAddress
}



module.exports = tokensObj