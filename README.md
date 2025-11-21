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

## 🚧 Guia de desenvolvimento
### Fase 1: Infraestrutura e Setup
- [X] Criar uma estrutura via docker
- [X] Criar uma rota de /health para validação de aplicação
- [X] Criar estrutura basica para rota de /user

### Fase 2: Persistência de Dados
- [X] Configurar Prisma ORM
- [X] Criar estrutura de persistência de dados de `/user`
- [X] Ciar repository de `/user`
- [X] Implementar: show, update, delete, reactivate

### Fase 3: Qualidade e Testes
- [X] Padronizar as repostas HTTP em um helper
- [ ] Desacoplar o Fastify da estrutura do projeto, para permitir a troca
- [ ] Configurar testes para `/user`

### Fase 4: Documentação
- [ ] Criar guia de boas praticas do projeto