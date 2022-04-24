import {createContext, React, useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {contratAbi,address} from '../utils/constants'


export const TransactionsContext=createContext(null)



const {ethereum}=window

const getContract = ()=>{
      // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(ethereum)

    // MetaMask requires requesting permission to connect users accounts
    //await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const transactionContract=new ethers.Contract( address , contratAbi , signer )
    return transactionContract
}








const TransactionContext = ({children}) => {
  
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const[showform,setShowForm]=useState(false)
const handleShowForm = ()=>{
  setShowForm(!showform)
}
  
  
  
  
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
  const checkForWallet=async()=>{
   try{
    if(!ethereum) return alert("MetaMask Not Found.");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts)
    getAllTransaction()
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object");
  }
  }

  
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("MetaMask Not Found.");
  
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
  
      setCurrentAccount(accounts[0]);
      
    } catch (error) {
      console.log(error);
  
      throw new Error("No ethereum object");
    }
  };
  
  const sendTransaction = async()=>{
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = getContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        setIsLoading(true);
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });
        console.log(transactionsContract)
        const transactionHash = await transactionsContract.addTtansaction(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionsCount();

        setTransactionCount(transactionsCount.toNumber());
        //window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const getAllTransaction= async()=>{
    try {
      if (!ethereum) return alert("MetaMask Not Found.");
      const transactionsContract = getContract();
      const transactions=await transactionsContract.getTransactions();
      const structeredTransactions=transactions.map((transaction) => ({
        addressTo: transaction.reciever,
        addressFrom: transaction.from,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));
      console.log(structeredTransactions)
      setTransactions(structeredTransactions);
    } catch (error) {
      console.log(error);
  
      throw new Error("No ethereum object");
    }
  }
  
  
  
  useEffect(()=>{
    checkForWallet()
    
  },[])


  return (
    <TransactionsContext.Provider value={{currentAccount,formData, handleChange, connectWallet,sendTransaction,isLoading, transactions,showform,handleShowForm }}>
       {children}
    </TransactionsContext.Provider>
      
 
  )
}

export default TransactionContext

