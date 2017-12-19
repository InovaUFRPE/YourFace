import bcrypt from 'bcrypt';

export default  (sequelize, DataTypes) => {
	return sequelize.define('Coordenador', {
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
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		ativo: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '1',
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		}
	}, {
		tableName: 'Coordenador',
		hooks: {
			beforeCreate: user => {
				user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
			}
		},
	});
};
