import Sequelize, { Model, DataTypes } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

// Utilizar a API receitaws.com.br - campos seguem padrão da resposta
// https://www.receitaws.com.br/v1/cnpj/26649391000163
class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        client_code: Sequelize.STRING,
        slug: {
          type: DataTypes.STRING,
          unique: true,
        },

        // ## Informações Fiscais ##
        // razao_social: Sequelize.STRING,
        // fantasia: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        // natureza_juridica: Sequelize.STRING,
        // porte: Sequelize.STRING,
        // insc_estadual: Sequelize.STRING,
        // atividade_principal: { text: 'Atividade de contabilidade', code: '69.20-6-01'}

        // ## Contatos ##
        // email: Sequelize.STRING,
        // telefone: Sequelize.STRING, // principal RFB

        // ## Endereço ## {cep, logradouro, numero, bairro, municipio, uf, complemento}

        // ## Sócios ## {qsa: {qual: '49-Sócio Administrador', nome: 'Gustavo Ferreira Lopes'}}
      },
      {
        sequelize,
      }
    );

    SequelizeSlugify.slugifyModel(Company, {
      source: ['name'],
    });

    return this;
  }

  // static associate

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'user' });
  }

  // methods
}

export default Company;
