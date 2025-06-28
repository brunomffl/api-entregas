# 📦 API de Entregas

Uma API REST robusta para gerenciamento de entregas e encomendas, desenvolvida com Node.js, TypeScript, Express e Prisma.

## 🚀 Tecnologias

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma**
- **PostgreSQL**
- **JWT**
- **Bcrypt**
- **Zod**
- **Jest**
- **Supertest**
- **Docker**

## 📋 Funcionalidades

### 👥 Usuários
- ✅ Cadastro de usuários
- ✅ Autenticação JWT
- ✅ Diferentes níveis de acesso (Customer/Sale)

### 📦 Entregas
- ✅ Criação de entregas (somente vendedores)
- ✅ Listagem de entregas
- ✅ Atualização de status da entrega
- ✅ Controle de acesso por role

### 📝 Logs de Entrega
- ✅ Criação de logs de acompanhamento
- ✅ Visualização restrita por permissões
- ✅ Histórico completo de entregas

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/api-entregas.git
cd api-entregas
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Crie e edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api-entrega?schema=public"
JWT_SECRET="seu-jwt-secret-aqui"
```

4. **Suba o banco de dados com Docker**
```bash
docker-compose up -d
```

5. **Execute as migrações**
```bash
npx prisma migrate dev
```

6. **Inicie o servidor**
```bash
npm run dev
```

## 📚 Endpoints da API

### 🔐 Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/users` | Criar usuário | ❌ |
| POST | `/sessions` | Login | ❌ |

### 📦 Entregas

| Método | Endpoint | Descrição | Auth | Role |
|--------|----------|-----------|------|------|
| POST | `/deliveries` | Criar entrega | ✅ | Sale |
| GET | `/deliveries` | Listar entregas | ✅ | Sale |
| PATCH | `/deliveries/:id/status` | Atualizar status | ✅ | Sale |

### 📝 Logs de Entrega

| Método | Endpoint | Descrição | Auth | Role |
|--------|----------|-----------|------|------|
| POST | `/delivery-logs` | Criar log | ✅ | Sale |
| GET | `/delivery-logs/:delivery_id/show` | Ver logs | ✅ | Sale/Customer |

## 🧪 Testes

Execute os testes automatizados:

```bash
# Todos os testes
npm run test:dev

# Testes específicos
npm test users-controller.test.ts
```
## 🔒 Autenticação e Autorização

### Níveis de Acesso

- **Customer**: Pode visualizar apenas suas próprias entregas
- **Sale**: Pode criar entregas, logs e gerenciar status

### Middleware de Segurança

- `ensureAuthenticated`: Valida token JWT
- `verifyUserAuthorizations`: Controla acesso por role

## 🐳 Docker

O projeto inclui configuração Docker para PostgreSQL:

```bash
# Subir serviços
docker-compose up -d
```
## 👤 Autor

**Bruno Cardoso**

- GitHub: [@brunomffl](https://github.com/brunomffl)
- LinkedIn: [Bruno Cardoso da Silva](https://www.linkedin.com/in/brunomffl/)
