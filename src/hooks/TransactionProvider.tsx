import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction{
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt:  Date
}

interface TransactionContextProps{
    children: ReactNode;   
}

interface TransactionContextData{
    transactions:Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TransactionProvider({children}: TransactionContextProps){

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() =>{
        api.get("transactions")
             .then(response =>{setTransactions(response.data.transactions)})
    },[])


    async function createTransaction(transactionInput:TransactionInput){
            const resposta = await api.post('transactions', {...transactionInput, createdAt: new Date()})
                                      .then(resposta => resposta);
            
            const {transaction} = resposta.data;

            setTransactions([...transactions, transaction])
    }

    return (
        <TransactionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )

}

export function useTransaction(){
   return useContext(TransactionContext);
}