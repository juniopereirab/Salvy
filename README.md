# Projeto Salvy

## Descrição

Esse projeto é destinado à avaliação do processo seletivo da empresa Salvy.

Foi produzido pelo candidato: Dâmaso Júnio Pereira Brasileo

## Objetivos

Criar aplicação Web contendo:

- Backend em NodeJS
- Frontend em NextJS
- Utilização de TypeScript
- Implementação de testes unitários

## Decisões de Design

Para a implementação desse projeto, foram feitas algumas decisões relacionadas ao design do Frontend, assim como a estruturação arquitetural do Backend.

### Frontend

Foi utilizado o NextJS, a aplicação está organizada em uma única página que contém alguns componentes associados a ela. O objetivo principal era manter o design simples e intuitivo de se entender a solução como um todo, com um formulário de poucos campos para simulação de uma criação de linha telefônica de fato. Foi adicionado o campo de email como uma forma de suprir a necessidade de emitir um feedback para o usuário, caso a criação não tenha sido possível no momento da solicitação.

### Backend

Foi utilizado o NodeJS, em conjunto com o Mailhog como sistema de envio de emails, e também o MongoDB para armazenamento das linhas criadas. O Backend foi estruturado em algumas camadas, sendo elas: Rotas, Controllers, Services, Models e Jobs. Como forma de organizar a entrada de dados, tratamento dos mesmos e respostas ao usuário. Além de também contar com um Cron-Job que executa uma rotina de criação de linhas que ficaram pendentes, dessa forma, nenhuma linha telefônica fica pendente de criação para sempre.

## Como instalar e executar o projeto

Na raiz do projeto tem-se um arquivo chamado `docker-compose.yml`. Para executar o projeto basta realizar o build com o comando:

```
$ docker-compose up --build
```

Obs.: Pode ser que seja necessário que o comando seja executando com a utilização do `sudo`.

O projeto conta com 4 serviços configurados:

1. Serviço de envio de email
2. Serviço de banco de dados (Mongo)
3. Serviço do Backend (NodeJS)
4. Serviço do Frontend (NextJS)

Todos os serviços estão configurados juntos.

Após o build do projeto as rotas para acessar os ambientes são:

Frontend: [localhost:3000](http://localhost:3000)
Backend: [localhost:5050](http://localhost:5050)
Mailhog (Serviço de email): [localhost:8025](http://localhost:8025)

## Como utilizar o projeto

A interface frontend do projeto conta com uma tela de listagem de linhas telefônicas e um formulário para solicitação da criação de uma nova linha.

Ao criar uma linha, você receberá um feedback sobre o status de criação.

Caso ele seja criada no momento da requisição, então será emitido um aviso informando o novo número assim como o mesmo será exibido na listagem principal.

Porém, se a linha não foi criada no momento da requisição, o usuário receberá um email quando ela for criada além de que a interface irá ser atualizada quando receber uma mensagem da API informando que novas linhas foram criadas.
É possível acompanhar o processo de criação / envio de email no console da API, a cada 1 minuto uma rotina é executada em background para a criação de novas linhas caso existam linhas pendentes. Realizando assim, o envio do email para o usuário e emitindo uma mensagem através de socket para o Frontend informando a criação de novas linhas.

Os emails enviados, podem ser visualizados através do link acima do Mailhog. Para esse projeto foi usado um servidor local de envio.

## ADR

Está disponível uma [ADR](./ADR%20-%20Projeto%20Salvy.md) com informações sobre decisões da construção do projeto.
