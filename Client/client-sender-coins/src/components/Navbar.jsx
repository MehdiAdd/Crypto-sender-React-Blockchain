import React,{useState,useContext} from 'react'
import {AiOutlineMenu , AiOutlineClose} from 'react-icons/ai';
import ethlogo from "../assets/eth4.jpg"
import Form from './Form';
import { TransactionsContext } from '../context/TransactionContext'
const Navbar = (props) => {
    const[navBar,setNavbar]=useState(false);
    const {currentAccount,connectWallet,handleShowForm,showform}=useContext(TransactionsContext)
    const handleNav = ()=>{
        setNavbar(!navBar)
    }
  return (
      <>
    <div className="bg-black w-full h-[90px]">
        <div className="  max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full">
            <div className='flex'><img className='max-w-[45px] rounded-full' src={ethlogo}/><h1  className='text-[#00d8ff] my-auto'>CRYPTO</h1></div>
            <div className='hidden md:flex'>
                <ul className='flex text-white items-center'>
                <li className='cursor-pointer shadow-lg hover:shadow-cyan-500/50 rounded-lg '>Platform</li>
                <li className='cursor-pointer shadow-lg hover:shadow-cyan-500/50 rounded-lg ' >Community</li>
                <li className='cursor-pointer shadow-lg hover:shadow-cyan-500/50 rounded-lg '>about</li>
                <button onClick={currentAccount? handleShowForm:connectWallet} className='ml-4'>{currentAccount? "Send":"Connect"}</button>
            </ul>
            </div>
            <div className='block md:hidden' onClick={handleNav}>
                {navBar
                ?<AiOutlineClose size={30} className='text-white'/>
                :<AiOutlineMenu size={30} className='text-white'/>}
            </div>
            <div className= {navBar ?'md:hidden  absolute left-0 w-full top-[90px] bg-black flex justify-center text-center ':'absolute top-[-100%]'}>
                <ul className='text-white items-center  w-full '>
                <li className='text-xl  cursor-pointer shadow-lg hover:shadow-cyan-500/50 rounded-lg'>Platform</li>
                <li className='text-xl cursor-pointer shadow-lg hover:shadow-cyan-500/50 rounded-lg'>Community</li>
                <li className='text-xl cursor-pointer shadow-lg hover:shadow-cyan-500/50 rounded-lg'>about</li>
                <button onClick={currentAccount? handleShowForm:connectWallet} className='ml-4'>{currentAccount? "Send":"Connect"}</button>
            </ul>
            </div>
        </div>
            
        </div>
        {showform?<Form  handleShowForm={handleShowForm}/>
     :""} 
        </>
  )
}

export default Navbar
