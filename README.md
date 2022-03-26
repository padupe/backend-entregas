![img](https://github.com/padupe/backend-entregas/blob/master/images/backend_entregas.svg)
# Backend Entregas

## MER (Modelo Entidade Relacionamento)
<div align="center">
      <img align="center" alt="MER-Backend-Entregas" src="https://github.com/padupe/backend-entregas/blob/master/images/mer.svg">     
</div>


## Utilizando a Aplicação

**Requisitos**:
- Node.js >= 14.x;
- Docker;
- Yarn >= 1.22.x
- Insomnia (Opcional)

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

2. Crie o arquivo `.env` na raiz do Projeto

3. Copie o código do `example.env` para o `.env`

4. Instale as dependências
```
yarn install
```

5. Suba o contêiner do Banco de Dados
```
docker-compose -f docker/docker-compose.yaml up -d
```

6. Rode o comando para instanciar o Prisma
```
yarn prisma generate
```

7. Rode o comando para rodar as migrations
```
yarn migrate:run
```

8. Popule o Banco de Dados
```
yarn seed
```

9. Rode a Aplicação
```
yarn dev
```

10. Rode os testes
```
yarn test
```

> **⚠️ ATENÇÃO:** Assim que os testes são rodados, a base do Banco de Dados é "resetada" dinamicamente, ou seja, o comando `yarn seed` é rodado de maneira que a base volte ao "estado inicial" e para garantir uma experiência melhor ao "Tester".

## Documentação
Confira a documentação [aqui](http://localhost:4444/api-docs/ "aqui")
> A aplicação deve ter sido iniciada com o comando `yarn dev`

## JSON para testes via Insomnia
Realize o _import_ deste [arquivo](https://github.com/padupe/backend-entregas/blob/master/insomnia/Insomnia.json "arquivo") no Insomnia.

## Comandos Úteis

### Aplicação

Rodar localmente:
```
yarn dev
```

Para realizar o build:
```
yarn build
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

Instanciar o Prisma no Projeto
```
yarn prisma generate
```

Rodar Migrations
```
yarn migrate:run
```

Resetar Migrations e Popular Banco de Dados
```
yarn migrate:reset
```

Corrigir formatação/relações entre tabelas
```
yarn prisma format
```

Interface visual para o banco de dados:
```
yarn prisma studio
```

### Testes Automatizados

Rodar os testes, de maneira que sejam executados um a um:
```
yarn test
```