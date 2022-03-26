import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/TransactionProvider";
import { GlobalStyle } from "./styles/global";



export function App() {
  
  const [isOpenNewTransactionModal, setIsOpenTransactionModal] = useState(false);

  function handleOpenNewTransactionModal(){
      setIsOpenTransactionModal(true)
  }

  function handleCloseNewTransactionModal(){
      setIsOpenTransactionModal(false)
  }

  return (
    <TransactionProvider>
        <Header onOpenNewTransactionModal = {handleOpenNewTransactionModal}/>
        <Dashboard/>
        <GlobalStyle/>
        <NewTransactionModal 
          isOpen={isOpenNewTransactionModal}
          onRequestClose={handleCloseNewTransactionModal}
        />
    </TransactionProvider>
    
  );
}


