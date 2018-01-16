import FrequenciaController from '../controllers/frequencia';


export default(app)=>{
	const frequenciaController = new FrequenciaController(app.datasource.models.Frequencia);
	//Rota que retorna objeto de apenas da tabela frequencias
	app.route('/frequencia')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		frequenciaController.getAll().then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	//Rota insere uma nova apenas da tabela frequencias
	.post((req, res)=>{
		frequenciaController.create(req.body).then(response =>{
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
	//Rota que retorna objeto de apenas uma frequencias especifica pelo cpf_aluno
	app.route('/frequencia/:cpf_aluno')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		frequenciaController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});

	})
	//Rota que atualiza uma frequencias
	.put((req, res)=> {
		frequenciaController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	//Rota que deleta uma frequencias
	.delete((req, res)=> {
		frequenciaController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
	//Rota que retorna objeto de apenas uma frequencias especifica pelo id_frequencia
	app.route('/frequenciaId/:id_freq')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		frequenciaController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	//Rota que atualiza objeto de apenas uma frequencias especifica pelo id_frequencia
	.put((req, res)=> {
		frequenciaController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	//Rota que deleta objeto de apenas uma frequencias especifica pelo id_frequencia
	.delete((req, res)=> {
		frequenciaController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
}
