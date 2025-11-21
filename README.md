# Easy Control

Aplicação Node.js com Fastify e TypeScript.

## 🐳 Docker

### Executar com Docker

1. Configure o arquivo `.env` baseado no `env.example`

2. Inicie os containers:

```bash
docker-compose up -d
```

3. Para parar os containers:

```bash
docker-compose down
```

A aplicação estará disponível em `http://localhost:3000` e o MySQL na porta `3306`.

## 📚 Rotas disponíveis

### GET /health
Health check da aplicação

### POST /users
Criar um novo usuário
- Body: `{ "name": "string", "email": "string", "password": "string" }`

### GET /users
Listar todos os usuários

### GET /users/:id
Buscar usuário por ID

### DELETE /users/:id
Desativar usuário (soft delete)

### PATCH /users/:id/reactivate
Reativar usuário desativado

## Prisma

- Edite o schema.prisma com as mudanças desejadas
- Execute npx prisma db push --force-reset (dropa tudo e recria)
- Apenas npx prisma db push 

## 🚧 Guia de Desenvolvimento

Para acompanhar o roadmap e progresso do projeto, consulte o [Guia de Desenvolvimento](docs/DEVELOPMENT.md).

## 📐 Padrões e Boas Práticas

### Arquitetura
- **Ports & Adapters (Hexagonal)**: Desacoplamento do framework HTTP através de interfaces genéricas
- **Dependency Injection**: Injeção de dependências manual no `app.ts`
- **Repository Pattern**: Abstração da camada de dados com interface genérica
- **Service Layer**: Lógica de negócio isolada dos controllers

### Estrutura de Camadas
```
Controllers → Services → Repositories → Database
     ↓           ↓            ↓
  HTTP Layer  Business    Data Access
```

### Princípios Aplicados
- **Single Responsibility**: Cada classe tem uma única responsabilidade
- **Dependency Inversion**: Dependência de abstrações (interfaces), não de implementações
- **Open/Closed**: Aberto para extensão (novos adapters), fechado para modificação
- **Interface Segregation**: Interfaces específicas e coesas

### Convenções do Código
- **TypeScript**: Tipagem forte em todo o projeto
- **Async/Await**: Operações assíncronas consistentes
- **Error Handling**: Tratamento de erros centralizado nos controllers
- **HTTP Responses**: Helper padronizado para respostas HTTP
- **Soft Delete**: Desativação lógica ao invés de exclusão física
- **Status Enum**: Controle de estado dos registros (ACTIVE/INACTIVE)

### Organização de Arquivos
- `adapters/`: Implementações específicas de frameworks
- `ports/`: Interfaces genéricas (contratos)
- `controllers/`: Camada de apresentação HTTP
- `services/`: Lógica de negócio
- `repositories/`: Acesso a dados
- `types/`: Definições de tipos TypeScript
- `helpers/`: Utilitários reutilizáveis

## 📖 Referências

Este projeto foi inspirado e utiliza conceitos de:

- [Easy Skeleton API Node.js](https://github.com/Fredrumond/easy-skeleton-api-nodejs/tree/master) - Estrutura base para criação rápida de APIs Node.js - Projedo realizado em 2020
- **Hexagonal Architecture** (Alistair Cockburn) - Ports & Adapters Pattern
- **Clean Architecture** (Robert C. Martin) - Separação de camadas e dependências
- **SOLID Principles** - Princípios de design orientado a objetos