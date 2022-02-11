import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function TransactionsTable() {

  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          {
            transactions.length == 0 ? (
              <span className="span-msg">Você não possui histórico 😢</span>
            ) : (
              <tr>
                <th>Titúlo</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            )
          }
        </thead>

        <tbody>
          {transactions.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(transaction.createdAt)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};