import { Container } from "./styles";
import incomeSVG from "../../assets/Entradas.svg";
import outcomeSVG from "../../assets/Saídas.svg";
import totalSVG from "../../assets/Total.svg";
import { useTransaction } from "../../hooks/TransactionProvider";


export function Summary(){

    const { transactions } = useTransaction();

    
   const summary = transactions.reduce((acc, transaction) => {
            if(transaction.type === 'deposit'){
                acc.deposits += transaction.amount
                acc.total += transaction.amount
            }else{
                acc.withdraws += transaction.amount
                acc.total -= transaction.amount 
            }
            return acc
        },{
            deposits:0,
            withdraws:0,
            total:0
        });
        console.log(summary)
    return (
        <Container>
           <div>
               <header>
                    <p>Entradas</p>
                    <img src={incomeSVG} alt="Entradas" />
               </header>
               <strong>
               {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(summary.deposits)}
               </strong>
           </div>
           <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeSVG} alt="Saídas" />
                </header>
                <strong>
                   - {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(summary.withdraws)}
                </strong>
           </div>
           <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalSVG} alt="Total" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(summary.total)}
                </strong>
           </div>
        </Container>
    )
}