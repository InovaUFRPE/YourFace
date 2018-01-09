export default(app)=>{

	app.route('/frequencia_turma_Aluno/:cpf')
	.get((req, res)=> {	
		app.datasource['sequelize'].query('SELECT * FROM frequencia_turma_aluno WHERE cpf = ?',
		{ replacements: [req.params.cpf], type: app.datasource['sequelize'].QueryTypes.SELECT }
		).then(frequencia_turma_Aluno => {
			res.json(frequencia_turma_Aluno);
		}).catch(function(e) {
			res.json([]);
		})
	})
}
