export default(app)=>{
	app.route('/frequencia_turma_Aluno/:cpf_aluno')
	.get((req, res)=> {
		const sql = `SELECT frequencia.id_freq, aluno.name, aluno.cpf, frequencia.presenca, frequencia.data, frequencia.id_freq, turmas.name_turma FROM frequencia LEFT JOIN turmas_alunos ON (frequencia.id_turma = turmas_alunos.id_turma) LEFT JOIN aluno ON (frequencia.cpf_aluno = aluno.cpf) LEFT JOIN turmas ON (turmas_alunos.id_turma = turmas.id_turma)`  
		
		app.datasource['sequelize'].query(sql,
		{ replacements: [req.params.cpf], type: app.datasource['sequelize'].QueryTypes.SELECT }
		).then(frequencia_turma_Aluno => {
			res.json(frequencia_turma_Aluno);
		}).catch(function(e) {
			res.json([]);
		})



	})
}