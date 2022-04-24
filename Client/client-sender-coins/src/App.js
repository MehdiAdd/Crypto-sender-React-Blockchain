
import { useState ,useContext} from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import Welcome from './components/Welcome';
import  TransactionContext  from './context/TransactionContext';


function App() {

  return (
    
      
    
    <div >
      <TransactionContext>
      <Navbar />
     <Welcome/>
     <Transactions/>
   
     </TransactionContext>
     </div>
      
    
  );
}

export default App;
