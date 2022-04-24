import React, { useContext } from 'react'

import globeVid from "../assets/video.mp4"
import { TransactionsContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/ShortenAddress'

const Welcome = () => {
  const {currentAccount,formData, handleChange, connectWallet,handleShowForm }=useContext(TransactionsContext)
  return (
    <div className='w-full h-[90vh] top-[90px]'>
        <video className='object-cover absolute h-full w-full z-[-1]' autoPlay loop muted  src={globeVid} />
    
    <div className=' text-white w-full h-[90%] flex flex-col items-center justify-center'>
    <h1>Send <span className='blue'>CRYPTO</span> </h1>
    <h1>across the world </h1>
    <p className='text-center py-4'>Discover The crypto world <br/> Buy and sell cryptocurrency easily and rapidly on <span className="blue font-bold">CRYPTO</span> </p>

    <div className='my-2'>

       {currentAccount?<button className='m-2 bg-red-500' onClick={handleShowForm}  >Send ETHs</button>
       :<button className='m-2 bg-gray' onClick={connectWallet}>Connect your wallet</button>
       
       } 
        
        
    </div>

    </div>
    <div className='text-white font-bold text-xl px-8'>
        {currentAccount?<p>Connected account: <span className="blue ">{shortenAddress(currentAccount)}</span></p>:<p>Not Connected ! </p>}
    </div>
    </div>
  
  )
}

export default Welcome