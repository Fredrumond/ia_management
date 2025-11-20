# Easy Control

Aplicação Node.js com Fastify e TypeScript.

## 🚀 Começando

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

O arquivo `.env` já está criado com as configurações básicas.

### Executar a aplicação

**Modo de desenvolvimento (com auto-reload):**

```bash
npm run dev
```

**Build para produção:**

```bash
npm run build
```

**Executar em produção:**

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

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
- [ ] Implementar: show, update, delete

### Fase 3: Qualidade e Testes
- [ ] Padronizar as repostas HTTP em um helper
- [ ] Desacoplar o Fastify da estrutura do projeto, para permitir a troca
- [ ] Configurar testes para `/user`

### Fase 4: Documentação
- [ ] Criar guia de boas praticas do projeto