import { useContext } from "react";

import { TransactionContext } from "../context/TransactionsContext";

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context;
};