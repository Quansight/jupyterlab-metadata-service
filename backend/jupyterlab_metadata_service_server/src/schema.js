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
const W3CTypeDefs = require('./schemas/w3c');
const ExtraDataTypeDefs = require('./schemas/extradata');

var AnyType = new GraphQLUnionType({
  name: 'Any',
  types: [].concat(
    Object.values(SchemaOrgTypeDefs),
    Object.values(W3CTypeDefs),
    Object.values(ExtraDataTypeDefs)
  ),
  resolveType(value) {
    let _type = 'dataset';
    let _context = 'schemaorg';

    if (value.id.includes('/')) {
      _context = value.id.split('/')[0];
      _type = value.id.split('/')[1]
    }

    if (_context == 'schemaorg') {
      for (let k in SchemaOrgTypeDefs) {
        if (_type.toLowerCase() == k.toLowerCase()) {
            return SchemaOrgTypeDefs[k];
        }
      }
    }

    if (_context == 'extradata') {
      return ExtraDataTypeDefs['ExtraData'];
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

// Define the Query type
var query = {
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
  },
  filterByTarget: {
    type: new GraphQLList(ExtraDataTypeDefs['ExtraData']),
    args: {
      target: { type: GraphQLString }
    },
    resolve: (_, { target }, { dataSources } ) => {
      return dataSources.ExtraDataAPI.filterByTarget(target);
    }
  },
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...query,
  }
});

/*
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...DataCatalog.mutation
  }
});
*/

module.exports = new GraphQLSchema({
  Any: AnyType,
  query: RootQuery
  /* mutation: Mutation */
});