import ProfController from '../controllers/professores';

export default(app)=>{
	const profController = new ProfController(app.datasource.models.Professor);

	app.route('/abrirAta/:idturma')
	//.all(app.auth.authenticate())
	.get((req, res) => {
		console.log(req.params.idturma)
		const sql = `call AbrirTurma(?)`;
		app.datasource['sequelize'].query(sql,{ replacements: [req.params.idturma], type: app.datasource['sequelize'].QueryTypes.SELECT }
		).then(frequencia_turma_Aluno => {res.json({msg:"Ata Aberta!"});})
	})
	app.route('/professores')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		profController.getAll().then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.post((req, res)=>{
		profController.create(req.body).then(response =>{
			res.status(response.statusCode);
			res.json(response.data);
		});
	});

	app.route('/professores/:cpf')
	.all(app.auth.authenticate())
	.get((req, res)=> {
		profController.getById(req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.put((req, res)=> {
		profController.update(req.body, req.params).then(response => {
			res.status(response.statusCode)
			res.json(response.data)
		});
	})
	.delete((req, res)=> {
		profController.delete(req.params).then(response => {
			res.status(response.statusCode);
			res.json(response.data);
		});
	});
}
