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

const SchemaOrgTypeDefs = require('./schemas/schemaorg-typedef');
const { AnyInput } = require('./schemas/schemaorg-input');
// const W3CTypeDefs = require('./schemas/w3c');

var AnyType = new GraphQLUnionType({
  name: 'Any',
  types: [].concat(
    Object.values(SchemaOrgTypeDefs),
    // Object.values(W3CTypeDefs),
  ),
  resolveType(value) {
    let _type = '';
    let _context = '';

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

    console.log('AnyTypeResolve null');

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
        identifier: { type: GraphQLString }
      },
      resolve: (_, { identifier }, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.getByID(identifier);
      }
    },
    searchBy: {
      type: GraphQLList(AnyType),
      args: {
        input: { type: AnyInput },
      },
      resolve: (_, { input }, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.searchBy(input);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    create: {
      type: Response,
      args: {
        input: { type: AnyInput }
      },
      resolve: (_, { input }, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.create(input);
      }
    },
    update: {
      type: Response,
      args: {
        input: { type: AnyInput }
      },
      resolve: (_, { input }, { dataSources } ) => {
        return dataSources.SchemaOrgAPI.update(input);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  Any: AnyType,
  AnyInput: AnyInput,
  query: RootQuery,
  mutation: RootMutation
});
