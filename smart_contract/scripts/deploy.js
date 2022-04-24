
const main = async() => {

  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();

  console.log("transaction deployed to:", transaction.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


const execMain = async () =>{

    try{
      await main()
      process.exit(0)
    }catch(error){
      console.error(error)
      process.exit(1)
    }
}

execMain()