const { gql, makeExecutableSchema } = require('apollo-server');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLUnionType
} = require('graphql');

const { merge } = require('lodash');

const SchemaOrgTypeDefs = require('./schemas/schemaorg');
// const W3CTypeDefs = require('./schemas/w3c');

var AnyType = new GraphQLUnionType({
  name: 'Any',
  types: [].concat(
    Object.values(SchemaOrgTypeDefs),
    // Object.values(W3CTypeDefs),
  ),
  resolveType(value) {
    let _type = 'Dataset';
    let _context = 'schemaorg';

    if (value.identifier.includes('/')) {
      _context = value.identifier.split('/')[0];
      _type = value.identifier.split('/')[1]
    }

    if (_context == 'schemaorg') {
      for (let k in SchemaOrgTypeDefs) {
        if (_type.toLowerCase() == k.toLowerCase()) {
            return SchemaOrgTypeDefs[k];
        }
      }
    }

    return null;
  }
});

const Response = new GraphQLObjectType({
  name: 'Response',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    result: { type: AnyType }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    fetchall: {
      type: new GraphQLList(AnyType),
      args: {
        type: { type: GraphQLString }
      },
      resolve: (root, args, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.fetchall(args.type);
      }
    },
    getByID: {
      type: AnyType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, { id }, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.getByID(id);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    create: {
      type: AnyType,
      args: {
        data: { type: AnyType }
      },
      resolve: (_, { data }, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.create(data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  Any: AnyType,
  query: RootQuery,
  mutation: RootMutation
});
