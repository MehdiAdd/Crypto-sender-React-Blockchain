import React, { useContext, useState } from "react";
import bgForm from "../assets/bg.jpg"
import ethlogo from "../assets/eth2.png"
import Loader from './Loader'
import { TransactionsContext } from '../context/TransactionContext'



const Input = ({ placeholder, name, type, value, handleChange }) => (
    <div className="p-3 ">
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
    className=" bg-gray-200 border-2 border-blue-500 border-black px-4 w-[400px] rounded-xl text-black  py-1  block w-full" />
  </div>
  )



function Form(props) {

  const {currentAccount,formData, handleChange,sendTransaction,isLoading }=useContext(TransactionsContext)

    const handleSubmit = (e) => {
      const { addressTo, amount, keyword, message } = formData;
  
      e.preventDefault();
  
      if (!addressTo || !amount || !keyword || !message) return;
  
      sendTransaction();
    };
  return (
    <div className="w-full  h-screen top-0 absolute  justify-center items-center h-screen mx-auto ">
        
        <div className='bg-black  w-full z-10 '> 
            <img className='w-full  transparent brightness-50 blur-md h-screen absolute ' src={bgForm}/>
            
        </div>
        <div >
            <h1 onClick={props.handleShowForm} className='text-white hover:text-gray-300 absolute cursor-pointer top-0 right-0 h-16 w-16'>X</h1>
        </div>
<div className=' h-screen z-0 justify-center  grid '>
    <div className='z-0 m-auto  justify-center '>
        <img className="max-w-[100px] mx-auto" src={ethlogo} />
        <h1 className='text-white py-5'>Send ETHs</h1></div>
    <form  action="#" className="  z-0 max-w-[1420px] px-2">
    <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
      <div className="p-3 pt-4">
    {isLoading? <Loader/> :
     <button className="w-full text-white py-2 pr-4" onClick={handleSubmit}>
       Send
     </button>}
     
      </div>
    </form>
</div>
    
    </div>
  )
}

export default Form