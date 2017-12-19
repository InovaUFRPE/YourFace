import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};
export default (app) => {
	if(!database){
		const config = app.config;
		const sequelize = new Sequelize(
			config.database,
			config.username,
			config.password,
			config.params
		);
		database = {
			sequelize,
			Sequelize,
			models:{}
		}
		database.models = loadModels(sequelize);
		sequelize.sync().done(() => {
			database;
			let sql = `CREATE VIEW IF NOT EXISTS frequencia_turma_Aluno AS
			SELECT aluno.name, aluno.cpf, frequencia.presenca, frequencia.data, frequencia.id_freq, turmas.name_turma FROM frequencia 
			LEFT JOIN aluno ON (frequencia.cpf_aluno = aluno.cpf) 
			LEFT JOIN turmas_alunos ON (frequencia.cpf_aluno = turmas_alunos.cpf_aluno) 
			LEFT JOIN turmas ON (turmas_alunos.id_turma = turmas.id_turma);`;
			sequelize.query(sql).then(ratings =>{});
			
		});
	}
	return database;
}
