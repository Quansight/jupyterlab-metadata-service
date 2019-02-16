const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const { extendSchema } = require('graphql/utilities');

const { DataCatalog } = require('graphql-schema-org');

const { Query } = require('./main')

// Define the Query type
var DataCatalogQuery = new graphql.GraphQLObjectType({
  name: 'Query',
  types: [DataCatalog],
  fields: {
    dataCatalogs: {
      type: DataCatalogs
    },
    dataCatalog: {
      type: DataCatalog,
      args: {
        id: { type: graphql.GraphQLString }
      }
    }
  }
});


const resolvers = {
  Query: {
    dataCatalogs: (root, args, { dataSources } ) => {
      return dataSources.DataCatalogAPI.fetchall();
    },
    dataCatalog: (root, args, { dataSources } ) => {
      return dataSources.DataCatalogAPI.getByID(args.id);
    }
  },
  Mutation: {
    addDataCatalog: async (root, args, { dataSources }) => {
      let newData = {
        name: args.name
      };

      newData = dataSources.DataCatalogAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    },
    remDataCatalog: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.DataCatalogAPI.deleteByID(args.id);

      if (result == null) {
        message = 'Data not found.';
        status = false;
      }

      return {
        success: status,
        result: result,
        message: message
      };
    }
  }
};

const typeDef = extendSchema(Query, parse(DataCatalogQuery));

module.exports = { typeDef, resolvers };