/* jshint indent: 1 */

export default  (sequelize, DataTypes) => {
	return sequelize.define('Turmas', {
		id_turma: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name_turma: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cpf_prof: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'professor',
				key: 'cpf'
			}
		}
	}, {
		tableName: 'Turmas'
	});
};
