const {
  graphql,
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const { extendSchema } = require('graphql/utilities');

const { DataCatalog } = require('graphql-schema-org');

const DataCatalogResponse = new GraphQLObjectType({
  name: 'DataCatalogResponse',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    result: { type: DataCatalog }
  })
});

// Define the Query type
var query = {
  dataCatalogs: {
    type: new GraphQLList(DataCatalog),
    resolve: (root, args, { dataSources } ) => {
      return dataSources.DataCatalogAPI.fetchall();
    }
  },
  dataCatalog: {
    type: DataCatalog,
    resolve: (root, args, { dataSources } ) => {
      return dataSources.DataCatalogAPI.getByID(args.id);
    }
  },
};


var mutation = {
  addDataCatalog: {
    type: DataCatalogResponse,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (root, args, { dataSources }) => {
      let newData = {
        name: args.name
      };

      newData = dataSources.DataCatalogAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    }
  },
  remDataCatalog: {
    type: DataCatalogResponse,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (root, args, { dataSources }) => {
      let newData = {
        name: args.name
      };

      newData = dataSources.DataCatalogAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    }
  },
};

module.exports = { query, mutation };