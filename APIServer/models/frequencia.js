/* jshint indent: 1 */

export default  (sequelize, DataTypes) => {
	return sequelize.define('Frequencia', {
		id_freq: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		data: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		cpf_aluno: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'aluno',
				key: 'cpf'
			}
		},
		presenca: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '1'
		}
	}, {
		tableName: 'Frequencia'
	});
};
