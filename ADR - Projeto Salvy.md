# ADR - Projeto Salvy

## **Contexto e Declaração do Problema**

É necessário a criação de uma API que realize o cadastro de linhas telefônicas utilizando uma outra API externa. Para o usuário será exibido uma aplicação Web onde ele poderá ver a listagem de linhas criadas, além de solicitar a criação de uma nova linha.

O problema está na inconsistência da API Externa, chamada API TOM. Algumas vezes as requisições dão erro não gerando assim a criação de uma nova linha telefônica.

## **Direcionadores de Decisão**

- Feedbacks ao usuário: O usuário ao solicitar uma nova linha telefônica, ele deve receber um feedback imediato em relação a criação daquela linha solicitada. Existindo duas opções, a linha foi criada corretamente, ou a linha será criada e o usuário receberá informações pelo email.
- Criação de linhas em background, utilizando meios intermediários: Para tratar possível erros da API TOM, será necessário salvar o status daquela solicitação para que seja executado uma rotina onde será feita a tentativa de criar novas linhas para solicitações não concluídas com sucesso.

### Fora de escopo:

- Notificações em tempo real no momento da criação das linhas. Mesmo sendo interessante para melhorar a experiência de usuário, é um recurso que pode consumir muito tráfego com um cliente (frontend) que pode não estar sendo utilizado ou visto no momento em que a notificação foi gerada, por conta disso, prefere-se o uso do email.

## Proposta de solução

- Criar uma API que se conecte com a API TOM para a criação de novas linhas
- Criação de Linhas
  - Em caso de sucesso: Salvar no banco de dados a nova linha criada e retornar a linha ao usuário
  - Em caso de falha: Salvar no banco de dados uma nova linha como “pendente” e realizar tentativas de criação dessa nova linha até que seja possível.
  - Obs.: Ao criar uma nova linha que estava pendente, deve ser enviado ao usuário um email confirmando essa criação.
- Listagem de linhas
  - Retornar para o usuário, apenas as linhas que não estão pendentes de criação.

## Roteiro de implementação

Etapa 1 - Criação da API

Realizar a implementação da API contendo:

- Implementação de testes unitários
- Conexão com a API TOM
- Tratamento de erros da API Externa
- Criação da rotina de criação de linhas em background.
- Serviço de envio de emails para confirmar criação de linha.
- Sistema de comunicação por Socket para alerta ao Cliente de que novas linhas estão disponiveis.

Rotas:

- Criação de Linhas

Realiza a criação de novas linhas telefônicas.

- Metódo: POST
- Endpoint: `/lines`
- Corpo da Requisição:

```json
{
  "email": "teste@mail.com",
  "ddd": 41,
  "plan": 1
}
```

- Retorno esperado:
  - Código de Status: 201 (Created)
  - Corpo da Resposta:
  ```json
  {
    "_id": "...",
    "email": "teste@mail.com",
    "ddd": 41,
    "plan": 1,
    "idempotencyKey": "...",
    "phoneNumber": "...",
    "pending": false
  }
  ```

* Listagem de Linhas

Realiza o retorno de linhas criadas e que não estão pendentes.

- Metódo: GET
- Endpoint: `/lines`
- Retorno esperado:
  - Código de Status: 200 (OK)
  - Corpo da Resposta:
  ```json
  [
    {
      "_id": "...",
      "email": "teste@mail.com",
      "ddd": 41,
      "plan": 1,
      "idempotencyKey": "...",
      "phoneNumber": "...",
      "pending": false
    }
    {...}
  ]
  ```

Etapa 2 - Criação do Frontend

Realizar a implementação do Frontend utilizando NextJS, contendo:

- Implementação de testes unitários
- Conexão com a API desenvolvida anteriormente
- Criação de uma interface simples e intuitiva
- Listagem apenas de linhas criadas
- Formulário de solicitação de criação de linhas
- Feedback ao usuário sobre status da criação.
- Configuração de cliente Socket para receber comunicação de que novas linhas estão disponíveis.
