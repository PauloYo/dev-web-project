# 📘 Documentação do Projeto - Desenvolvimento Web

![Planejamento do Projeto](./imagens/PMC.jpeg)

---

## 🧾 Visão Geral

Este projeto visa o desenvolvimento de um sistema de pedidos online. O sistema permite que clientes visualizem produtos, adicionem ao carrinho, finalizem compras e acompanhem pedidos. A seguir, detalhamos os principais artefatos exigidos para a entrega.

---

## ✅ Backlog (MUDAR!)

| ID    | Prioridade | História de Usuário                                                                 |
|-------|------------|--------------------------------------------------------------------------------------|
| HU-1  | 1️⃣         | **No papel de cliente**, desejo **visualizar uma lista de produtos com imagem e preço**, para poder escolher o que desejo comprar. |
| HU-2  | 2️⃣         | **No papel de cliente**, desejo **filtrar os produtos por categoria**, para encontrar mais rapidamente o que procuro. |
| HU-3  | 3️⃣         | **No papel de cliente**, desejo **adicionar um produto ao carrinho**, para organizar minha compra antes de finalizar. |
| HU-4  | 4️⃣         | **No papel de cliente**, desejo **visualizar os itens no meu carrinho com totais**, para acompanhar o valor da compra. |
| HU-5  | 5️⃣         | **No papel de cliente**, desejo **remover ou alterar a quantidade de itens no carrinho**, para ajustar minha compra. |
| HU-6  | 6️⃣         | **No papel de cliente**, desejo **finalizar o pedido com um clique**, para concluir minha compra com rapidez. |
| HU-7  | 7️⃣         | **No papel de cliente**, desejo **ver uma confirmação visual do pedido após finalizar**, para ter certeza que deu tudo certo. |
| HU-8  | 8️⃣         | **No papel de cliente**, desejo **me autenticar com login e senha**, para acessar meu histórico de pedidos e carrinho. |
| HU-9  | 9️⃣         | **No papel de cliente**, desejo **visualizar o histórico de pedidos realizados**, para acompanhar minhas compras anteriores. |
| HU-10 | 🔟         | **No papel de administrador**, desejo **visualizar todos os pedidos realizados**, para acompanhar e organizar a entrega. |

---

## 🎨 Protótipo de Telas

Cada funcionalidade descrita no backlog possui ao menos uma tela representando sua interface esperada.

### 🖼️ Telas dos requisitos

[![Protótipo da tela de listagem de produtos](./prototipos/Dev-Web-Prototype.png)](./prototipos/Dev-Web-Prototype.png)

Todas as telas do sistema, também pode ser acessado pelo [figma](https://www.figma.com/design/cRnFYRXjhWQQ9i7eRKHfJk/Dev-Web-Prototype?node-id=0-1&t=6eKfZmTnOznsbiQ4-1).

---

## 🏗 Análise e Projeto 

O projeto  do sistema 

### Modelo 

![Modelo do sistema](./imagens/Modelo.png)

### Esboço da arquitetura geral (cliente-servidor)

![Esboço da arquitetura](./imagens/Arquitetura.png)

### Autorização  e Autenticação (MUDAR!)
A autorização e autenticação será realizada utilizando Express.js e banco de dados.

Serão definidos middlewares que não permitiram que usuários com perfis indevidos acessem partes da aplicação que não deveriam acessar.

### Tecnologias a serem utilizadas (REVISAR!)
Node.js, React, PostgreSQL

---

### Telas do sistema

![alt text](tela1-1.png)
**Figura 2**: Tela de listagem de produtos com imagem, nome e preço — correspondente à história de usuário HU-1.

