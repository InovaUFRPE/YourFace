export default(app)=>{



	app.route('/frequencia_turma_Aluno')
	.get((req, res)=> {
		const sql = `SELECT turmas.id_turma, frequencia.id_freq, aluno.name, aluno.cpf, frequencia.presenca, frequencia.data, frequencia.id_freq, turmas.name_turma
		FROM  frequencia
		LEFT JOIN turmas ON (frequencia.id_turma = turmas.id_turma)
		LEFT JOIN aluno ON (frequencia.cpf_aluno = aluno.cpf)`

		app.datasource['sequelize'].query(sql,{  type: app.datasource['sequelize'].QueryTypes.SELECT }
		).then(frequencia_turma_Aluno => {
			res.json(frequencia_turma_Aluno);
		}).catch(function(e) {
			res.json([]);
		})
	})
	app.route('/frequencia_turma_Aluno/:cpf_aluno')
	.get((req, res)=> {
		const sql = `SELECT frequencia.id_freq, aluno.name, aluno.cpf, frequencia.presenca, frequencia.data, frequencia.id_freq, turmas.name_turma
		FROM  frequencia
		LEFT JOIN turmas ON (frequencia.id_turma = turmas.id_turma)
		LEFT JOIN aluno ON (frequencia.cpf_aluno = aluno.cpf) WHERE cpf = ?`

		app.datasource['sequelize'].query(sql,
		{ replacements: [req.params.cpf_aluno], type: app.datasource['sequelize'].QueryTypes.SELECT }
		).then(frequencia_turma_Aluno => {
			res.json(frequencia_turma_Aluno);
		}).catch(function(e) {
			res.json([]);
		})
	})

	app.route('/frequencia_turma_Aluno_prof/:cpf_prof')
	.get((req, res)=> {
		const sql = `SELECT turmas.id_turma,turmas.cpf_prof, frequencia.id_freq, aluno.name, aluno.cpf, frequencia.presenca, frequencia.data, frequencia.id_freq, turmas.name_turma FROM frequencia
		LEFT JOIN turmas ON (frequencia.id_turma = turmas.id_turma)
		LEFT JOIN aluno ON (frequencia.cpf_aluno = aluno.cpf) WHERE cpf_prof = ?`

		app.datasource['sequelize'].query(sql,
		{ replacements: [req.params.cpf_prof], type: app.datasource['sequelize'].QueryTypes.SELECT }
		).then(frequencia_turma_Aluno => {
			res.json(frequencia_turma_Aluno);
		}).catch(function(e) {
			res.json([]);
		})
	})





}
