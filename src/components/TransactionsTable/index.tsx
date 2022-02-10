import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function TransactionsTable() {

  const { transactions } = useTransactions();

  console.log(transactions);

  return (
    <Container>
      {
        transactions ? (
          <table>
            <thead>
              <tr>
                <th>Titúlo</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
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
        ) : (
          <h2>Teste</h2>
        )
      }
    </Container>
  );
};