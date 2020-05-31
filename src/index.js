const express = require('express'); 
const cors = require('cors');
const {uuid, isUuid} = require('uuidv4'); 

const app = express(); 
app.use(cors());
app.use(express.json());

const projects = []


//middlares , usa quando quer q um trecho de codigo seja disparado
//para não atrapalhar o outros midwares usa next no final 
// se vc ão chaamr o next() no fim do miwdawre o proximo midware não sera disparado

// para usar um midware dentro de uma rota ou outro midware coloca "", nomedomidware" na rota
// ex: app.get('..', logRequests , (request,response)...)
// funções dps do next são ignoradas dai ele pula pro midware mais proximo e 
//dps de executa-lo ele volta as funções dps do next
//midware é usado para validação, eles tem acesso a tds os parametro das rotas
//inicio midware

function logRequests(request,response,next ) {
  const {method,url} = request; 
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);
  return next();
}
// midware são funções que recebem a requisição e a resposata que podem ou interromper a requisição ou continuar ou chamar o next para

/*Formas de uso de um midware : 
1) como app.use(midware)
2) botando direto na rota ou outro midware
3) usar app.use e falar parte do caminho que vc quer aplicar o midzinho e bota
os midzinho como parametros
ex: app.use('/projects/:id' , midware)
 */
//fimmidware

function validateProjectId(request,response,next){
  const { id} = request.params; 

  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid project Id'})
  }
  return next();
}
app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get('/projects', logRequests,  (request, response) => {
  // Começo Filtro 
  //para achar todos os projetos que contenham a palavra projeto 
  //se o title for preenchido "? array.filter(pracadaprojeto => vai verificar"
  //Fica assim : ? projects.filter(project => project.title.includes(title))
  //includes verifica se o texto dentro dele ta contido no outro texto
  // ? = if , : = se não 

  const {title,owner} = request.query; 

    const results = title
      ? projects.filter(project => project.title.includes(title))
      : projects;
  // Fim do filtro
  return response.json(results);})

app.post('/projects' , (request,response) => {
   const {title,owner} = request.body

   const project = {id: uuid() , title,owner}
   projects.push(project)

  return response.json(project);});

app.put('/projects/:id'  , (request,response) => {
  const {id} = request.params; 
  const {title,owner} = request.body

  const projectIndex = projects.findIndex(project => project.id == id );

if(projectIndex < 0) {
  return response.status(400).json({error: 'Project not found'})
}
  
  const project = {
    id,
    title,
    owner,
  }; 
  //procurar na posição projectindex = substituir o valor armazenado nessa posição pelo valor que tu acabou de colocar
  projects[projectIndex] = project;



  return response.json(project)
})


app.delete('/projects/:id', (request,response) => {
  const {id}  = request.params;

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0 ) {
    return response.status(400).json({error: 'Project not found'})
  }

//splice serve para retirar uma informação de dentro do array
// array.splice(IndiceQueQueroRemover, quantasPosiçõesRemoverApartirdoIndice)
 projects.splice(projectIndex, 1);

//AO remover informação nós retornamos .send() em branco + status(204)

return response.status(204).send();
})

app.listen(3333, () => {
  console.log("Back-end starded")
});



