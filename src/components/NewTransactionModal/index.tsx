import Modal from "react-modal";
import { ButtonCloseModal, Container, RadioBox, TransationTypeContainer } from "./style";
import closeSvg from "../../assets/Fechar.svg";
import entradasSvg from "../../assets/Entradas.svg";
import saidasSvg from "../../assets/Saídas.svg";
import { FormEvent, useState } from "react";
import { useTransaction } from "../../hooks/TransactionProvider";

Modal.setAppElement('#root');

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    
    const [type, setType] = useState('deposit');
    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState(0);
    const [categoria, setCategoria] = useState('');

    const {createTransaction} = useTransaction();

    const cleanUp = () => {
        setType('');
        setTitulo('');
        setValor(0);
        setCategoria('');
    }

    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        const data = {title:titulo, amount:valor, type, category:categoria};
        await createTransaction(data);
        cleanUp();
        onRequestClose();
    }
 
    return (
        <Modal isOpen={isOpen}
               onRequestClose={onRequestClose}
               overlayClassName='react-modal-overlay'
               className='react-modal-content'       
        >
            <ButtonCloseModal >
                <button type="button" onClick={onRequestClose}>
                    <img src={closeSvg} alt="Fechar modal" />
                </button>
            </ButtonCloseModal>
            <Container onSubmit={(e) => handleSubmit(e)}>
                <h2>Cadastrar transação</h2>
                <input 
                    placeholder="Título"
                    value = {titulo}
                    onChange = {event => setTitulo(event.target.value)}
                />
                <input placeholder="Valor" 
                       type="number"
                       value = {valor}
                       onChange = {event => setValor(+event.target.value)}
                />
                <TransationTypeContainer>
                    <RadioBox 
                        isActive = {type ==='deposit'}
                        activeColor = 'green'
                        type="button" 
                        onClick={() => setType('deposit')}>
                        <img src={entradasSvg} alt="entradas" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        isActive = {type ==='withdraw'}
                        activeColor = 'red'
                        type="button"
                        onClick={() => setType('withdraw')}>
                        <img src={saidasSvg} alt="saídas" />
                        <span>Saída</span>
                    </RadioBox>
                </TransationTypeContainer>

                <input 
                    placeholder="Categoria"
                    value = {categoria}
                    onChange = {event => setCategoria(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}