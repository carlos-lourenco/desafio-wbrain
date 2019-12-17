const {app, BASE_URL, swaggerOptions} = require('../config');
const Person = require('../models/person');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = swaggerJsDoc(swaggerOptions); 

app.use(BASE_URL+"/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs', function (req, res){
  res.redirect(BASE_URL+'/api-docs')
})

app.get(BASE_URL+'/', function (req, res){
  res.redirect('/')
})

/**
 * @swagger
 * /:
 *  get:
 *    description: Retonar informações básica das API
 *    responses:
 *      '200':
 *        description: Resposta OK
 */

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

/*****************************************************************
 * @swagger
 * /pessoas:
 *  get:
 *    description: Lista todas as pessoas cadastradas no banco
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Nome da pessoa
 *      - in: query
 *        name: surname
 *        schema:
 *          type: string
 *        description: Sobrenome da pessoa
 *      - in: query
 *        name: birthday
 *        schema:
 *          type: string
 *        description: Aniversário da pessoa no formato dd/MM
 *      - in: query
 *        name: telephone.description
 *        schema:
 *          type: string
 *        description: Descrição do telefone da pessoa. Ex. celular, casa, comercial.
 *      - in: query
 *        name: telephone.number
 *        schema:
 *          type: string
 *        description: Número do telefone da pessoa.
 *      - in: query
 *        name: columns
 *        schema:
 *          type: array
 *        description: Lista de campos para visualização. Ex. columns=name surname Para remover o _id adicione -_id, colocar espaço entre os atributos.
 *    responses:
 *      '200':
 *        description: Resposta OK
 */
app.get(BASE_URL+'/pessoas', function (req, res) {
  //Person.find({ name: {'$regex' :'carlos', $options:'i'}}) case-insensitive

  let filter = {};
  let columns = {};

  keys = Object.keys(req.query);
  keys.forEach(key => {
    if (key == 'columns') {
      columns = req.query.columns;
    } else {
      filter[key]=req.query[key]
    }
  })
  
  Person
    .find(JSON.parse(JSON.stringify(filter)))
    .select(columns)
    .exec((err, doc) => {
      if (err) {
        res.status(400).send(err)
      }
      res.status(200).send(doc)  
    })
});

/*****************************************************************
 * @swagger
 * /pessoas:
 *  post:
 *    description: Insere uma pessoa no banco
 *    requestBody:
 *      content: 
 *        application/json:
 *          schema: a definir
 *    parameters:
 *       - name: Object
 *         in: header
 *         required: true
 *    responses:
 *      '201':
 *        description: Pessoa criada
 */
  app.post(BASE_URL+'/pessoas', async (req, res) => {
    try {
      const person = await Person.create(req.body);
      return res.status(201).send(person);
    } catch (err) {
        return res.status(400).send({error: 'problemas na criação'})
    }
  });

/*****************************************************************
 * @swagger
 * /pessoas:
 *  delete:
 *    description: Remove uma pessoa no banco
 *    parameters:
 *      - in: query
 *        name: Json com atributos da pessoa
 *        schema:
 *          type: string
 *    responses:
 *      '204':
 *        description: Pessoa removida com sucesso
 */
app.delete(BASE_URL+'/pessoas', function (req, res) {
  let p = req.body
  Person.findOneAndDelete(p, (err, doc) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(204).end();  
  })

});

/*****************************************************************
 * @swagger
 * /pessoas/:condicoes:
 *  put:
 *    description: Atualiza dados de uma pessoa do banco
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *      - in: query
 *        name: surname
 *        schema:
 *          type: string
 *      - in: query
 *        name: birthday
 *        schema:
 *          type: string
 *      - in: query
 *        name: telephones.description
 *        schema:
 *          type: string
 *      - in: query
 *        name: telephones.number
 *        schema:
 *          type: string
 *      - in: header
 *        name: Json com atributos da pessoa
 *    responses:
 *      '204':
 *        description: Pessoa atualizada com sucesso
 */
app.put(BASE_URL+'/pessoas', function (req, res) {
  const cond = JSON.parse(JSON.stringify(req.query));
  const params = JSON.parse(JSON.stringify(req.body));

  Person
    .updateOne(cond, {$set:params}, (err, doc) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(204).end();
    })
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`WBrain API running in ${port} port.`);
});



