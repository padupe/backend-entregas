![img](https://github.com/padupe/backend-entregas/blob/master/images/backend_entregas.svg)
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

2. Crie o arquivo <code>.env</code> na raiz do Projeto

3. Copie o código do <code>example.env</code> para o <code>.env</code>

4. Instale as dependências
```
yarn install
```

5. Suba o contêiner do Banco de Dados
```
docker-compose -f docker/docker-compose.yaml up -d
```

6. Popule o Banco de Dados
```
yarn seed
```

7. Rode a Aplicação
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