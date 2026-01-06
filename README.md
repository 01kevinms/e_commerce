# 🛒 E-commerce Platform (Full Stack)

Plataforma completa de **e-commerce multi-loja**, desenvolvida com foco em performance, escalabilidade e boas práticas.  
O sistema permite que usuários criem lojas, cadastrem produtos com imagens, gerenciem pedidos e acompanhem métricas em um dashboard administrativo. 

acesse aos arquivos aq
👉 Acesse aqui:
https://github.com/01kevinms/e_commerce/tree/master
---

## 🚀 Funcionalidades

### 👤 Usuário
- Cadastro e login
- Atualização de senha
- Exclusão de conta (remove loja, produtos e imagens)
- Autenticação segura

### 🏬 Loja
- Criação de loja vinculada ao usuário
- Dashboard administrativo
- Visualização de faturamento, pedidos e produtos

### 📦 Produtos
- CRUD completo de produtos
- Upload de múltiplas imagens (Cloudinary)
- Busca avançada com **MongoDB Atlas Search**
- Paginação e ordenação
- Categorias e descrição

### 📑 Pedidos
- Registro de pedidos
- Status de pedido:
  - `PENDING` – Aguardando pagamento
  - `PAID` – Pagamento aprovado
  - `SHIPPED` – Enviado
  - `DELIVERED` – Entregue
  - `CANCELED` – Cancelado
- Histórico de pedidos por loja

### 📊 Dashboard
- Total de pedidos
- Faturamento
- Produtos cadastrados
- Listagem de pedidos recentes
- Listagem de produtos

---

## 🧠 Stack de Tecnologias

### 🔹 Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Hooks (`useState`, `useEffect`, `useMemo`)

### 🔹 Backend
- Node.js
- NestJS
- Prisma ORM
- MongoDB
- MongoDB Atlas Search
- Cloudinary
- JWT Authentication

---

## 🗂️ Arquitetura


```
├── frontend
│ ├── components
│ ├── pages
│ ├── services
│ ├── types
│ └── hooks
│
├── backend
│ ├── modules
│ │ ├── auth
│ │ ├── user
│ │ ├── store
│ │ ├── product
│ │ └── order
│ ├── prisma
│ └── services
```
---

## 🔍 Busca de Produtos

Busca avançada usando **MongoDB Atlas Search**, com:
- Autocomplete no nome
- Busca textual em descrição e categoria
- Relevância por score
- Paginação
- Ordenação dinâmica

---

## 🧼 Exclusão de Usuário (Fluxo Seguro)

Ao deletar um usuário:
1. Remove imagens no Cloudinary
2. Deleta imagens no banco
3. Remove produtos da loja
4. Remove pedidos relacionados
5. Deleta a loja
6. Deleta o usuário

Tudo executado dentro de uma **transaction Prisma**.

---

## 🖼️ Upload & Delete de Imagens

- Upload via Cloudinary
- Armazenamento do `publicId`
- Delete automático ao remover produto, loja ou usuário

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js
- MongoDB (local ou Atlas)
- Conta no Cloudinary

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

---

🔐 Variáveis de Ambiente

- DATABASE_URL=
- JWT_SECRET=
- CLOUDINARY_CLOUD_NAME=
- CLOUDINARY_API_KEY=
- CLOUDINARY_API_SECRET=
