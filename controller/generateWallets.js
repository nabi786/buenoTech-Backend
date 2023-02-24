const ethers = require("ethers");
const model = require("../model/model");
// require("dotenv").config();
const abi = require("../abi/walletGen.json");

const generateWallets = async (req, res) => {
  try {
    if (req.body.amountOfWallets <= 1000) {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.provider
      );
      const contractInstance = new ethers.Contract(
        process.env.contractAddr,
        abi,
        provider
      );

      const userAddress = req.body.address;
      var walletToBeGenerated = req.body.amountOfWallets;
      console.log(walletToBeGenerated);
      console.log(userAddress);

      const checkPlan = await contractInstance.checkPlan(userAddress); // blockChain call
      console.log("checkPlan ", checkPlan);

      if (checkPlan) {
        var wallets = generate(walletToBeGenerated);
        res.status(200).json({ success: true, data: wallets });
        return;
      }

      const lastRec = await contractInstance.getLastFeePaid(userAddress);
      console.log("lastRec ", lastRec);
      const latestPaidFeeTime = Number(lastRec[0]); //from BlockChain

      console.log("latestPaidFeeTime ", latestPaidFeeTime);

      if (latestPaidFeeTime == 0) {
        res.status(500).json({ success: false, msg: "no fee paid" });
        return;
      }
      if (walletToBeGenerated != Number(lastRec[1])) {
        console.log(Number(lastRec[1]));
        res.status(500).json({ success: false, msg: "invalid wallet request" });
        return;
      }

      var findFeePaidRec = await model.generateWalletFeeRecords.find({
        $and: [
          { walletAddress: userAddress },
          { timeStamp: latestPaidFeeTime },
        ],
      });
      console.log("findFeePaidRec ", findFeePaidRec);
      console.log("findFeePaidRec len  ", findFeePaidRec.length);

      if (findFeePaidRec.length > 0) {
        if (!findFeePaidRec[0].isUsed) {
          var wallets = generate(walletToBeGenerated);
          findFeePaidRec[0].isUsed = true;
          console.log("findFeePaidRec.save ", findFeePaidRec);
          await findFeePaidRec.save();
          res.status(200).json({ success: true, data: wallets });
          return;
        } else {
          res
            .status(500)
            .json({ success: false, msg: "last fee paid already used" });
        }
      } else {
        const userClaim = new model.generateWalletFeeRecords({
          walletAddress: userAddress,
          timeStamp: latestPaidFeeTime,
          isUsed: true,
        });
        await userClaim.save();
        var wallets = generate(walletToBeGenerated);
        res.status(200).json({ success: true, data: wallets });
      }

      // console.log("after math hoooooooooo");
    } else {
      res.status(404).json({
        success: false,
        msg: "max limit to generate wallet in 1000",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong " + err });
  }

  function generate(amount) {
    var wallets = {
      publickeys: [],
      privateKeys: [],
      publickeys2: [],
      privateKeys2: [],
    };
    for (var i = 0; i < amount; i++) {
      var acc = ethers.Wallet.createRandom();
      //   console.log(acc);
      //   console.log(acc.address);
      //   console.log(acc.privateKey);

      wallets.publickeys[i] = acc.address;
      wallets.privateKeys[i] = acc.privateKey;
    }

    // for (var i = 0; i <= amount % 500; i++) {
    //   var acc = ethers.Wallet.createRandom();
    //   //   console.log(acc);
    //   //   console.log(acc.address);
    //   //   console.log(acc.privateKey);

    //   wallets.publickeys2[i] = acc.address;
    //   wallets.privateKeys2[i] = acc.privateKey;
    // }
    // console.log("length of ristKesy", wallets.publickeys2?.length);
    // console.log("length of ristKesy", wallets.publickeys?.length);
    return wallets;
  }
};

const wallets = {
  generateWallets,
};

module.exports = wallets;
