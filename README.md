A seguir, o README.md completo atualizado, com destaque especial aos pontos atendidos conforme solicitado:

---

# Qikserve Restaurant Challenge

> Este projeto foi desenvolvido como parte do processo seletivo para **Front End Developer** na Qikserve.  
> A aplicação foi construída em React (Next.js) com TypeScript, e tem como objetivo apresentar os dados de um restaurante e seu menu, permitindo a visualização dos itens e a montagem de um carrinho de compras.
>
> **Let's get started!**  
> Conforme descrito, este desafio consiste em construir uma aplicação que consome dados reais (sem mocks) dos endpoints fornecidos, garantindo que o restaurante e seu menu sejam exibidos de forma customizada e de alta qualidade, alinhada com a identidade visual (white label) de cada cliente.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Requisitos Atendidos](#requisitos-atendidos)
- [Demo ao Vivo](#demo-ao-vivo)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Iniciar](#como-iniciar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Gerenciamento de Estado (Redux)](#gerenciamento-de-estado-redux)
- [Testes](#testes)
- [Decisões & Premissas](#decisões--premissas)
- [Possíveis Melhorias](#possíveis-melhorias)
- [Contato](#contato)

---

## Visão Geral

O objetivo deste desafio é criar uma aplicação para um restaurante onde o usuário pode:

1. **Visualizar Informações do Restaurante:**  
   Exibe detalhes como nome, descrição, endereço, banner e demais informações essenciais.
2. **Explorar o Menu:**
   - O menu é organizado por seções e permite a busca e o filtro dos itens.
   - Cada item pode ser clicado para exibir uma modal com informações detalhadas (imagem, descrição, preço e modificadores).
3. **Gerenciar o Carrinho:**
   - Os usuários podem adicionar itens ao carrinho, ajustar quantidades e visualizar o total da compra em tempo real.
4. **Páginas Extras:**
   - Foram incluídas páginas ilustrativas de _Login_ e _Contato_ para demonstrar a criação de rotas adicionais e simular uma experiência completa.
5. **Customização White Label:**
   - A aplicação se adapta à identidade visual de cada restaurante, permitindo a configuração de cores, imagens e demais elementos de branding com base nos dados da API.

---

## Requisitos Atendidos

Este projeto foi desenvolvido com foco em atender aos seguintes pontos:

- **Consumo de Dados Reais:**  
  Os dados do restaurante e do menu são obtidos diretamente dos endpoints fornecidos (ex.: `/api/restaurant` e `/api/menu`).  
  **Importante:** Não foram utilizados dados mockados – a aplicação consome informações reais, garantindo a fidelidade dos dados apresentados.

- **Visualização do Menu e Itens:**

  - O menu é exibido de forma organizada, com itens agrupados por seções.
  - Cada item pode ser clicado para abrir uma modal com detalhes completos, possibilitando a visualização de imagem, descrição, preço e complementos.

- **Gerenciamento do Carrinho:**

  - Permite que o usuário adicione itens ao carrinho, ajuste quantidades e visualize o total atualizado em tempo real.
  - A implementação utiliza Redux para o gerenciamento global do estado, assegurando consistência e integridade das informações.

- **Aplicação White Label:**

  - A interface é totalmente customizável para cada restaurante, possibilitando a configuração de cores, imagens, banner e demais elementos visuais.
  - Essa abordagem garante que a aplicação se adapte à identidade visual de cada cliente, valorizando tanto a experiência do usuário final quanto a gestão do restaurante.

- **Foco na Experiência do Usuário (UX):**
  - A interface foi projetada para ser intuitiva e responsiva, com layouts adaptados para dispositivos móveis e desktops.
  - Páginas adicionais (como login e contato) foram incluídas para simular uma experiência completa, demonstrando a flexibilidade da aplicação.

---

## Demo ao Vivo

_Em breve: URL para demonstração online_

---

## Principais Funcionalidades

- **Página do Restaurante:**  
  Exibe o banner e informações essenciais do restaurante.

- **Listagem do Menu:**

  - Apresentação dos itens agrupados por seções.
  - Funcionalidade de busca e filtro para facilitar a navegação.

- **Modal de Detalhes do Item:**

  - Exibe informações detalhadas do item, incluindo imagem, descrição, preço e opções de modificadores.
  - Permite que o usuário selecione complementos e ajuste a quantidade antes de adicionar ao carrinho.

- **Carrinho de Compras:**

  - Possibilita a adição e remoção de itens, com atualização automática do subtotal e total da compra.
  - Layout adaptado para desktop e mobile.

- **Páginas de Login e Contato:**
  - Tela de login com funcionalidade para exibir/ocultar senha.
  - Página de contato com informações de e-mail e WhatsApp, personalizadas conforme as configurações do restaurante.

---

## Tecnologias Utilizadas

- **Next.js:** Framework React com suporte a SSR (Server-Side Rendering) e SSG (Static Site Generation).
- **React** e **TypeScript**
- **Redux / Redux Toolkit:** Gerenciamento global do estado (carrinho de compras).
- **Styled-components:** Estilização dinâmica e customizada dos componentes.
- **React Bootstrap:** Componentes e grid system para responsividade.
- **Jest** e **React Testing Library:** Testes unitários e de integração.
- **ES6+ e Hooks:** Utilização dos recursos modernos do JavaScript e React.

---

## Como Iniciar

### Pré-requisitos

- **Node.js** (versão 16 ou superior recomendada)
- **npm** ou **yarn**

### Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/qikserve-restaurant-challenge.git
   cd qikserve-restaurant-challenge
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

### Build para Produção

```bash
npm run build
npm run start
```

---

## Estrutura do Projeto

```
.
├── app/
│   ├── layout.tsx           # Layout global e contexto do restaurante
│   ├── page.tsx             # Página inicial (menu e carrinho)
│   ├── login/               # Página de login
│   │   └── page.tsx
│   ├── contact/             # Página de contato
│   │   └── page.tsx
│   └── __tests__/           # Testes de integração de páginas
├── components/              # Componentes reutilizáveis (MenuItem, Header, Modal, etc.)
│   ├── Basket.tsx
│   ├── Button.tsx
│   ├── ButtonCircle.tsx
│   ├── CheckoutButton.tsx
│   ├── DesktopMenu.tsx
│   ├── Header.tsx
│   ├── ItemDetailsModal.tsx
│   ├── MenuItem.tsx
│   ├── MobileMenu.tsx
│   ├── SearchBar.tsx
│   └── SectionFilter.tsx
├── functions/               # Funções utilitárias (ex.: normalizedText)
├── hooks/                   # Hooks customizados (ex.: useFetchMenu, useFetchRestaurant, useDeviceType)
├── public/                  # Arquivos estáticos (imagens, etc.)
├── store/                   # Configuração e slices do Redux
│   ├── index.ts
│   ├── Provider.tsx
│   └── slices/
│       └── basketSlice.ts
├── styles/                  # Arquivos de estilos globais e CSS Modules
├── jest.config.js           # Configuração do Jest
├── next.config.ts           # Configuração do Next.js e rewrites para API
└── README.md                # Este arquivo
```

---

## Gerenciamento de Estado (Redux)

- **Slices:**  
  Utilizamos o Redux Toolkit para definir a slice do carrinho (`basketSlice`), que inclui ações para adicionar, remover e limpar itens.
- **Store:**  
  A store é configurada no arquivo `store/index.ts` e disponibilizada para toda a aplicação por meio do componente `Providers`.
- **Integração:**  
  Componentes como **Basket**, **ItemDetailsModal** e **MenuItem** interagem com o estado global para atualizar quantidades e valores dos itens.

---

## Testes

A aplicação conta com uma suíte de testes utilizando Jest e React Testing Library, que cobre:

- **Componente Basket:**  
  Testes para renderização, adição e remoção de itens, e interações específicas (como o fechamento do modal em mobile).
- **Modal de Detalhes do Item:**  
  Testes de renderização condicional, controle de quantidade e validação da seleção de modificadores.
- **Outros Componentes:**  
  Testes unitários que garantem a integridade e o funcionamento das principais funcionalidades.

Para executar os testes, utilize:

```bash
npm run test
# ou
yarn test
```

---

## Decisões & Premissas

- **Consumo de Dados Reais:**  
  Os dados do restaurante e do menu são consumidos diretamente dos endpoints fornecidos, garantindo que a aplicação trabalhe com informações dinâmicas e reais.
- **Aplicação White Label:**  
  A interface foi desenvolvida para ser totalmente customizável, permitindo que cada restaurante ajuste o branding (cores, imagens, banners, etc.) conforme sua identidade visual.
- **Responsividade:**  
  Foram adotadas abordagens específicas para dispositivos móveis (como modais e layouts adaptados) e desktops, visando a melhor experiência do usuário.
- **Testes Automatizados:**  
  A robustez da aplicação é garantida pela implementação de testes para os componentes críticos, facilitando a manutenção e evolução do projeto.

---

## Possíveis Melhorias

- **Integração com API Real:**  
  Conectar a aplicação a serviços de backend reais para fornecer dados dinâmicos e atualizados.
- **Fluxo de Autenticação Completo:**  
  Implementar um sistema de login e gerenciamento de sessão para usuários.
- **Otimizações de Performance:**  
  Melhorar o carregamento de imagens e realizar ajustes no SSR para maior desempenho.
- **Internacionalização (i18n):**  
  Adaptar a aplicação para suportar múltiplos idiomas e formatações regionais.
- **Expansão da Cobertura de Testes:**  
  Incluir testes end-to-end e ampliar a cobertura de testes unitários para maior robustez.

---

## Contato

- **Autor:** Diego Fedrizzi Petry Becker
- **E-mail:** [diegofpetry@gmail.com](mailto:diegofpetry@gmail.com)
- **LinkedIn:** [linkedin.com/in/diego-fedrizzi-petry-becker-21668720b](https://linkedin.com/in/diego-fedrizzi-petry-becker-21668720b)

---

Obrigado por conferir este desafio! Caso tenha dúvidas ou sugestões, fique à vontade para entrar em contato.

---

> _Este README foi atualizado para refletir as recentes alterações e melhorias na estrutura e funcionalidades do projeto, destacando os requisitos atendidos conforme as diretrizes propostas._
