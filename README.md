# Encurtador de URL

Este é um projeto full-stack de um encurtador de URLs, construído com Vue.js no frontend e Node.js/Express no backend.

## Funcionalidades

-   **Encurtar URLs:** Insira uma URL longa e obtenha uma versão curta e fácil de compartilhar.
-   **Redirecionamento:** Acesse a URL original através do link encurtado.
-   **Listagem de Links:** Visualize todos os links já encurtados.
-   **Contador de Cliques:** Monitore quantas vezes cada link encurtado foi acessado.
-   **Validação de URL:** Garante que apenas URLs válidas sejam encurtadas.
-   **Notificações:** Feedback em tempo real para o usuário sobre as ações (sucesso, erro, aviso).
-   **Cópia para Área de Transferência:** Copie facilmente o link encurtado com um clique.

## Tecnologias Utilizadas

### Frontend

-   **Vue.js 3:** Framework progressivo para construção de interfaces de usuário.
-   **Pinia:** Gerenciamento de estado para Vue.js.
-   **PrimeVue:** Biblioteca de componentes de UI para Vue.
-   **Tailwind CSS:** Framework de CSS utility-first para estilização.
-   **Vite:** Ferramenta de build para o frontend.
-   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
-   **Axios:** Cliente HTTP para realizar requisições à API.

### Backend

-   **Node.js:** Ambiente de execução JavaScript no servidor.
-   **Express:** Framework para construção de APIs web.
-   **TypeScript:** Para um desenvolvimento mais robusto e seguro no backend.
-   **nanoid:** Para geração de IDs e códigos curtos únicos.
-   **cors:** Para habilitar o Cross-Origin Resource Sharing.

## 🛠️ Metodologia de Desenvolvimento

Este projeto utiliza o **Gitflow** como modelo de ramificação (branching model). Esta abordagem ajuda a manter a estabilidade do código em produção enquanto novas funcionalidades são desenvolvidas de forma isolada.

### Estrutura de Branches:
- **main**: Contém o código estável e pronto para produção.
- **develop**: Branch principal onde ocorre a integração de novas funcionalidades.
- **feature/**: Ramificações temporárias para o desenvolvimento de tarefas específicas (ex: `feature/funcao-url`).

## Como Iniciar

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    https://github.com/annygabriellycavalcanti/encurtador-url.git
    cd encurtador-url
    ```

2.  **Instale as dependências do Backend:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Instale as dependências do Frontend:**
    ```bash
    cd frontend
    npm install
    ```

4.  **Execute o projeto (Frontend e Backend simultaneamente):**

    Ainda no diretório `frontend`, execute o comando abaixo. Ele iniciará o servidor de desenvolvimento do Vite para o frontend e, ao mesmo tempo, o servidor do Node.js para o backend.

    ```bash
    npm run dev
    ```

    -   O frontend estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).
    -   O backend estará rodando em `http://localhost:3333`.

## API do Backend

A API RESTful do backend é responsável por toda a lógica de encurtamento e gerenciamento dos links.

### Endpoints

#### `POST /links`

Encurta uma nova URL.

-   **Request Body:**
    ```json
    {
      "originalUrl": "[https://www.exemplo.com/url-muito-longa](https://www.exemplo.com/url-muito-longa)"
    }
    ```
-   **Success Response (201 Created):**
    ```json
    {
      "id": "abcdef123",
      "originalUrl": "[https://www.exemplo.com/url-muito-longa](https://www.exemplo.com/url-muito-longa)",
      "shortCode": "xY_zAb",
      "clicks": 0
    }
    ```
-   **Error Response (400 Bad Request):**
    -   Se a `originalUrl` não for fornecida:
        ```json
        { "error": "URL é obrigatória" }
        ```
    -   Se a `originalUrl` for inválida:
        ```json
        { "error": "Formato de URL inválido" }
        ```

#### `GET /links`

Retorna uma lista de todos os links encurtados.

-   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "abcdef123",
        "originalUrl": "[https://www.exemplo.com/url-muito-longa](https://www.exemplo.com/url-muito-longa)",
        "shortCode": "xY_zAb",
        "clicks": 5
      }
    ]
    ```

#### `GET /:code`

Redireciona para a URL original correspondente ao código curto e incrementa o contador de cliques.

-   **Exemplo:** Acessar `http://localhost:3333/xY_zAb` irá redirecionar para `https://www.exemplo.com/url-muito-longa`.
-   **Error Response (404 Not Found):**
    ```json
    { "error": "Link não encontrado" }
    ```

## Estrutura do Frontend

-   `src/App.vue`: Componente principal da aplicação, onde a interface do usuário é renderizada.
-   `src/stores/linkStore.ts`: Store do Pinia que gerencia o estado dos links, incluindo as chamadas à API para buscar e criar links.
-   `src/interfaces/ILink.ts`: Define a interface `Link` para garantir a tipagem correta dos dados em toda a aplicação.
-   `src/main.ts`: Ponto de entrada da aplicação Vue, onde o Pinia e o PrimeVue são inicializados.

