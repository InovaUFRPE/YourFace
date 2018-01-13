import TurmaController from '../controllers/turmas';


export default(app)=>{
	const turmaController = new TurmaController(app.datasource.models.Turmas);

  app.route('/turma')
  //.all(app.auth.authenticate())
  .get((req, res)=> {
    turmaController.getAll().then(response => {
      res.status(response.statusCode)
      res.json(response.data)
    });
  })

  app.route('/turma/:cpf_prof')
  //.all(app.auth.authenticate())
  .get((req, res)=> {
    turmaController.getAllById(req.params).then(response => {
      res.status(response.statusCode)
      res.json(response.data)
    });
  })




}
