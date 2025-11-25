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
- [ ] Criar camada de dominio de user
- [ ] Utilizar dominio nos casos de uso de user
  - [X] Create
  - [ ] Delete
  - [ ] Reactive
  - [ ] Get all
  - [ ] Get By Id
- [ ] Configurar framework de testes 
- [ ] Criar testes unitários para UserService
- [ ] Criar testes de integração para rotas de `/users`
- [ ] Configurar cobertura de testes (coverage)
- [ ] Adicionar testes para o UserRepository
- [ ] Implementar testes para validações de negócio

### Fase 4: Segurança e Autenticação
- [ ] Implementar hash de senha (bcrypt)
- [ ] Criar sistema de autenticação JWT
- [ ] Implementar middleware de autenticação
- [ ] Adicionar controle de permissões/roles
- [ ] Implementar refresh token
- [ ] Adicionar rate limiting
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

### Fase 9: CI/CD e Deploy
- [ ] Configurar GitHub Actions ou GitLab CI
- [ ] Implementar pipeline de testes automatizados
- [ ] Configurar build automatizado
- [ ] Adicionar linting no CI (ESLint)
- [ ] Configurar deploy automatizado
- [ ] Implementar versionamento semântico

### Problemas para entender
- [ ] Com a transformação dos serviços em useCases o registro de rotas em app.ts ficou muito grande. Cada rota que eu criar vou ter que trazer todos os seus casos de uso. A medica vai ir crescendo exponencialmente. Buscar entender: Padrão Module ou Padrão Factory
