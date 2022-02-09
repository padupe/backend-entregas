# Backend Entregas

## Comandos Úteis

### Aplicação

Rodar localmente:
```
yarn dev
```

### Docker

Criar contêiner do Bando de Dados
```
docker-compose -f docker/docker-compose.yaml up -d
```

### Prisma

Iniciar o Projeto com Prisma
```
yarn prisma init
```

Rodar Migrations
```
yarn prisma migrate dev
```

Corrigir formatação/relações entre tabelas
```
yarn prisma format
```

Interface visual para o banco de dados:
```
yarn prisma studio
```