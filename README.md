<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
   Aulas conceituas de NodeJS
</h3>


## Conceitos abordados

### Midwares
São funções que recebem a requisição e a resposta é podem fazer 3 ações ,  podem interromper a requisição ou continuar ou chamar o next ( ele
pula/ignora o primeiro codigo debaixo do midware) , são geralmente usadas para fazer validações.

#### Formas de uso de um midware : 

1) Como app.use(midware)

2) Colocando direto na rota ou outro midware, considere logRequests como midware por exemplo:
`app.get('/projects', logRequests,  (request, response) => {}`

3) Usar app.use e falando parte do caminho que você quer aplicar o midware , daí coloque o midware  como parametros. 
 `app.use('/projects/:id' , midware)`
 


### Metodos https
- GET: http://minhaapi.com/users
    - Para buscar informações no servidor
- POST: http://minhaapi.com/users
    - Para criar uma informação
- PUT: http://minhaapi.com/users/1
    - Para alterar uma informação
- DELETE: http://minhaapi.com/users/1
    - Para deletar uma informação
  

### Tipos de parametros
Query params: Usados para filtrar ou paginar endereços , pois carregam o 
nome do parametro , sendo colocados após a interrogação. 
`http://localhost:3333/projects?title=React&owner=Lucas`

Route params: São parametros passados diretamente na rota,  usados para identificar recursos na hora de atualizar ou deletar uma informação.
`http://localhost:3333/projects/1`

Request body: Usadas por requisições POST e PUT , elas passam
informações mais detalhadas e não deixam os parametros ficarem visiveis na url , para isso podemos usar o formato JSON para representar estes dados.

` {
"title":"Aplicativo NodeJS ",
"owner": "Lucas Miranda"
}`


### Noções de Array
.find(): Responsavel por percorrer o array e realizar um busca.

.findIndex(): Responsavel por percorrer o array e realizar um busca e retornar o index da posição do objeto.

.includes(): Verifica se um dado está incluso em alguma informação do array.

.filter(): Cria um novo array com todos os elementos que passaram no teste  implementado pela função fornecida anteriormente. 

.use(): Função onde todas as rotas devem passar por ela , sem isso o node não reconhece o json do post.

.splice(): Remove uma informação do array .

.listen(): "Ouve" qual porta usaremos para "rodar" a aplicação.

.send(): Envia uma mensagem no formato "string".

.status(): informa o status de um elemento ou rota , serve
para identificarmos se a aplicação conectou com o servidor ou se algo deu errado. 

## Instalando dependências

 Execute o comando `yarn` no seu terminal para instalar todas as dependências .
