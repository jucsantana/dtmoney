
import { useTransaction } from "../../hooks/TransactionProvider";
import { Container } from "./style";

export function TransactionsTable() {

   const { transactions }= useTransaction();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categorias</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                        {transactions.map(transaction =>(
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(transaction.amount)}
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{new Intl.DateTimeFormat('pt-BR',
                                         { month: '2-digit',
                                            day: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'}).format(new Date(transaction.createdAt))}
                                    </td>
                                </tr>
                        ))}
                </tbody>
            </table>
        </Container>
    )
}