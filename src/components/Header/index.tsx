import logoImg from '../../assets/logo.svg';

import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
};

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

  async function getTransaction() {
    const response = localStorage.getItem("@transactions");

    if (response) {
      const data = JSON.parse(response);

      console.log([data]);
    }

    return;
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type='button' onClick={onOpenNewTransactionModal  }>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};