import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

interface TransactionProviderProps {
  children: ReactNode; // ReactNode é uma tipagem que aceita qualquer tipo de dado como filho de um component
};

interface TransactionsContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>;

// Usar {} as TransactionsContextData é para forçar o Typescript a entender que o valor inicial possui sim uma tipagem.
export const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  // Sempre começar um estado com o mesmo tipo do que nós iremos armazenar.
  /* 
    <TransactionProps[]> Diz que nós iremos armazenar um array de transactions. Se caso nós não passarmos
    os colchetes [] para o generic o TypeScript entende que irá ser armazenado apenas uma informação.
  */
  const [transactions, setTransactions] = useState<TransactionProps[]>(() => {
    const transactions = localStorage.getItem("@transactions");

    if (transactions) {
      return JSON.parse(transactions);
    }

    return [];
  });

  // useEffect(() => {
  //     api.get("transactions")
  //       .then(response => setTransactions(response.data.transactions));
  // }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const updatedTransaction = [...transactions];

    const transaction = {...transactionInput, createdAt: Date(), id: Math.random()}
    updatedTransaction.push(transaction);

    setTransactions(updatedTransaction);
    localStorage.setItem("@transactions", JSON.stringify(updatedTransaction));
    
    // const response = await api.post("/transactions", { ...transactionInput, createdAt: new Date() });
    // const response = await api.post("/transactions", { ...transactionInput });
    // const { transaction } = response.data;
  
    // setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};