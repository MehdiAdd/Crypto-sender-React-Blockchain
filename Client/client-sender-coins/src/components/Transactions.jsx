import React,{useContext} from 'react'
import { TransactionsContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetsh";
import dummyData from "../utils/DummyData";
import { shortenAddress } from "../utils/ShortenAddress";

function TransactionCard({ addressTo, addressFrom, timestamp, message, keyword, amount, url,transactions }) {
    const gifUrl = useFetch({ keyword });
  return (
    <div className=' border-2 p-4 rounded-3xl flex-col backdrop-blur-sm hover:bg-[#005a69]/30 hover:px-5  '>
    <div className='text-left text-white py-2 '>
      <div className='m-2 bg-[#00d8ff] inline-block rounded-full p-1' >
      <img
          src={gifUrl || url}
          alt="nature"
          className="w-[100px] h-[100px]  rounded-full shadow-lg object-cover"
        />
      </div>
      <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <h3 className="text-white text-base">From: <span className="font-bold text-[#37c7da]">{shortenAddress(addressFrom)}</span> </h3>
        </a>
        <a href={`https://rinkeby.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <h3 className="py-4 text-white text-base">To: <span className="font-bold text-[#37c7da]">{shortenAddress(addressTo)}</span></h3>
        </a>
      
        <p className="text-white text-base">Amount: <span className="font-bold text-[#37c7da]">{amount}</span> <span className="font-italic">ETH</span> </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        
     
        <div className=" py-2 mt-6 w-max rounded-3xl  shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
    </div>
    </div>
  )
}


const Transactions = () => {

    const { transactions, currentAccount } = useContext(TransactionsContext);
  return (
    <div className='bg-black  '>
        <div className=' px-4 text-center py-8 max-w-[1424px] mx-auto'>
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2 text-bold m-2 py-10 my-4 blue font-bold">
            LATEST TRANSACTIONS
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2 blue font-bold">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-4'>

        
          {[...transactions].reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        
        </div>
        
        </div>
        </div>
  )
}



export default Transactions