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
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
      // api.get("transactions")
      //   .then(response => setTransactions(response.data.transactions));

    getTransaction();
  }, []);

  async function getTransaction() {
    const response = localStorage.getItem("@transactions");

    if (response) {
      const data = JSON.parse(response);

      console.log([data]);
      setTransactions(data);
    }
  };

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", { ...transactionInput, createdAt: new Date() });
    const { transaction } = response.data;

    localStorage.setItem("@transactions", JSON.stringify(transaction));
    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};