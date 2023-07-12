const Moralis = require("moralis").default;
const express = require("express")
const app = express();
const cors = require("cors")
const port = 8000;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/hello", (res)=> {
  console.log("hello world")
})

app.get("/polygonTxns", async (req, res) => {
  try {
    const balance = await Moralis.EvmApi.transaction.getWalletTransactions({
      address : "0x443bde294288fc420b9cbfdf5cde7db4fa0eefd3",
      chain : EvmChain.MUMBAI,
      disableTotal:false
    });

    const result = balance.raw;
    console.log(result)

    return res.status(200).json({result})
    
  } catch (error) {
    console.log(error);
    console.log('something went wrong')
    return res.status(400).json();
    
  }
})


Moralis.start({
  apiKey:process.env.api,
}).then(()=>{
  app.listen(port, () => {
    console.log("listening to api calls")
  });
})