import logoSvg from "../../assets/Logo.svg" 
import { Container, Content } from "./styles"

interface HeaderProps{
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}:HeaderProps){
    return (
        <>
            <Container>
                <Content>
                    <img src={logoSvg} alt="dt money" />
                    <button 
                        type="button" 
                        onClick={()=>onOpenNewTransactionModal()}>
                            Nova Transação
                    </button>
                </Content>
            </Container>
        </>
    )
}