import FrequenciaController from '../controllers/frequencia';


export default(app)=>{
	const frequenciaController = new FrequenciaController(app.datasource.models.Frequencia);

	app.route('/frequencia')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		frequenciaController.getAll().then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});

	})
	.post((req, res)=>{
		frequenciaController.create(req.body).then(response =>{
			res.status(response.statusCode);
			res.json(response.data);
		});
	});

	app.route('/frequencia/:cpf_aluno')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		frequenciaController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});

	})
	.put((req, res)=> {
		frequenciaController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.delete((req, res)=> {
		frequenciaController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
	app.route('/frequenciaId/:id_freq')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		frequenciaController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});

	})
	.put((req, res)=> {
		frequenciaController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.delete((req, res)=> {
		frequenciaController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});	
}