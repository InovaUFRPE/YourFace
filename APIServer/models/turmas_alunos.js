export default  (sequelize, DataTypes) => {
	return sequelize.define('Turmas_alunos', {
		id_turmas_alunos: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_turma: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'turmas',
				key: 'id_turma'
			}
		},
		cpf_aluno: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'aluno',
				key: 'cpf'
			}
		}
	}, {
		tableName: 'Turmas_alunos'
	});
};
