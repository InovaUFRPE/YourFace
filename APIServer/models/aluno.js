import bcrypt from 'bcrypt';
export default  (sequelize, DataTypes) => {
	return sequelize.define('Aluno', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		curso: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		dataNascimento: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		ativo: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '1'
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		}
	}, {
		tableName: 'Aluno',
		hooks: {
			beforeCreate: user => {
				user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
			}
		},
	});
};
