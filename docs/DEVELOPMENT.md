# 🚧 Guia de Desenvolvimento

## Roadmap do Projeto

### Fase 1: Infraestrutura e Setup
- [X] Criar uma estrutura via docker
- [X] Criar uma rota de /health para validação de aplicação
- [X] Criar estrutura básica para rota de /user
- [X] Configurar TypeScript e ambiente de desenvolvimento
- [X] Configurar variáveis de ambiente (.env)

### Fase 2: Persistência de Dados
- [X] Configurar Prisma ORM
- [X] Criar estrutura de persistência de dados de `/user`
- [X] Criar repository de `/user`
- [X] Implementar: create, list, show, delete (soft), reactivate
- [X] Implementar validação de email duplicado

### Fase 3: Qualidade e Testes
- [X] Padronizar as respostas HTTP em um helper
- [X] Desacoplar o Fastify da estrutura do projeto (Ports & Adapters)
- [X] Tranformar todas funções do service em casos de uso
- [X] Criar camada de dominio de user
- [X] Utilizar dominio nos casos de uso de user
  - [X] Create
  - [X] Delete
  - [X] Reactive
  - [X] Get all
  - [X] Get By Id
- [X] Configurar framework de testes (vitest @vitest/ui supertest @types/supertest com cobertura @vitest/coverage-v8 )
- [X] Criar testes unitários UserEntity
- [ ] Criar testes de integração para rotas de `/users`
- [X] Configurar cobertura de testes (coverage)
- [X] Criar rota de login
- [X] A senha esta aberta, precisa salvar criptografada

### Fase 4: Segurança e Autenticação
- [X] Implementar hash de senha (bcrypt)
- [ ] Criar sistema de autenticação JWT
- [ ] Implementar middleware de autenticação
- [ ] Adicionar controle de permissões/roles
- [ ] Implementar refresh token
- [ ] Implementar validação de senha forte

### Fase 5: Validação e Sanitização
- [ ] Integrar biblioteca de validação
- [ ] Validar dados de entrada nas rotas
- [ ] Sanitizar dados antes de persistir

### Fase 6: Logging e Monitoramento
- [ ] Configurar sistema de logs
- [ ] Implementar logs estruturados

### Fase 7: Melhorias de Código
- [ ] Criar custom exceptions
- [ ] Adicionar middleware de validação
- [ ] Implementar paginação nas listagens
- [ ] Adicionar filtros e busca avançada

### Fase 8: Documentação
- [ ] Configurar Swagger/OpenAPI
- [ ] Documentar todas as rotas da API
- [ ] Criar guia de boas práticas do projeto
- [ ] Adicionar exemplos de uso da API
- [ ] Documentar variáveis de ambiente
- [ ] Criar guia de contribuição (CONTRIBUTING.md)

### Fase 8: Desenvolvimento do MVP
- [X] Criar tabela de Realm
- [X] Criar relacionamento entre User e Realm
- [X] Adaptar user.entity para aceitar realmId
- [X] Criar testes unidarios de realm.entity
- [X] Deve ser recebido um realmId valido

### Fase 10: CI/CD e Deploy
- [ ] Configurar GitHub Actions ou GitLab CI
- [ ] Implementar pipeline de testes automatizados
- [ ] Configurar build automatizado
- [ ] Adicionar linting no CI (ESLint)
- [ ] Configurar deploy automatizado
- [ ] Implementar versionamento semântico

### Problemas para entender
- [ ] Com a transformação dos serviços em useCases o registro de rotas em app.ts ficou muito grande. Cada rota que eu criar vou ter que trazer todos os seus casos de uso. A medica vai ir crescendo exponencialmente. Buscar entender: Padrão Module ou Padrão Factory
