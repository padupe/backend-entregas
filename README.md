# Backend Entregas

## Utilizando a Aplicação

**Requisitos**:
- Node.js >= 14.x;
- Docker;

**Passo a passo**
1. Clone este repositório:
> SSH
```
git clone git@github.com:padupe/backend-entregas.git
```

> HTTPS
```
git clone https://github.com/padupe/backend-entregas.git
```

2. Instal as dependências
```
yarn install
```

3. Suba o contêiner do Banco de Dados
```
docker-compose -f docker/docker-compose.yaml up -d
```

4. Popule o Banco de Dados
```
yarn seed
```

5. Rode a Aplicação
```
yarn dev
```

## Documentação
Confira a documentação [aqui](http://localhost:4444/api-docs/ "aqui")
> A aplicação deve ter sido iniciada com o comando <code>yarn dev</code>
## Comandos Úteis

### Aplicação

Rodar localmente:
```
yarn dev
```

### Banco de Dados

Comando para popular o Banco de Dados (para testes):
```
yarn seed
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