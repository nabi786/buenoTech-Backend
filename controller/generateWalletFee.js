

const model = require('../model/model')







// post gnenerate wllet Fee Method
const generateWalletfeePostmethod  = async (req,res)=>{
    try{



    
        // generateing new fee
        var flatFee = req.body.flatFee
        console.log('this is falt fee',flatFee )
        var variableFee = req.body.variableFee
        console.log('this is variableFee fee',variableFee )
        var payPerUse = flatFee+variableFee
        console.log('this is payPerUse fee',payPerUse)

        var newFee = new model.generateWalletsFee({
            FlatFee : flatFee,
            VariableFee : variableFee,
            payPerUse   : payPerUse
        })





        await newFee.save();

        res.status(200).json({success : true , msg : "fee Generated"})

    }catch(err){
        console.log('this si error', err)
        res.status(500).json({msg : "something went wrong", success : false})
    }
}











// update generate wallet fee
const generateWalletFee = async(req, res)=>{
    try{

        await model.generateWalletsFee.findOneAndUpdate({_id : req.body.id}, req.body)
        res.status(200).json({success : true, msg : "fee updated successfully"})
    }catch(err){
        res.status(500).json({success : false , msg : "something went wrong in server"})
    }
}













// get Generated WalletFee

const getGeneratedWalletFee = async(req,res)=>{
    try{

        var genGeneratedWalletFee = await model.generateWalletsFee.find()

        if(genGeneratedWalletFee != null){

            
            res.status(200).json({success : true , generatedFee : genGeneratedWalletFee})
        }else{
            res.status(404).json({success : false , msg : "not generated Fee Found"})
        }

    }catch(err){
        res.status(500).json({success : false , msg : "something went wrong"})
    }
}










const generateFeeObj = {
    generateWalletfeePostmethod,
    generateWalletFee,
    getGeneratedWalletFee
}


module.exports = generateFeeObj