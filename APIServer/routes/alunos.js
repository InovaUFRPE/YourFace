import AlunoController from '../controllers/alunos';


export default(app)=>{
	const alunoController = new AlunoController(app.datasource.models.Aluno);


	app.route('/alunos')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		alunoController.getAll().then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});

	})
	.post((req, res)=>{
		alunoController.create(req.body).then(response =>{
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
	app.route('/alunos/:cpf')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		alunoController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.put((req, res)=> {
		alunoController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.delete((req, res)=> {
		alunoController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
}