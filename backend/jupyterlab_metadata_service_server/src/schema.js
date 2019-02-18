const { gql, makeExecutableSchema } = require('apollo-server');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { merge } = require('lodash');

// schemas

// const Annotation = require('./schemas/annotation');
// const CreativeWork = require('./schemas/creative_work');
const DataCatalog = require('./schemas/data_catalog');
// const Dataset = require('./schemas/dataset');
// const Person = require('./schemas/person');
// const Organization = require('./schemas/organization');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...DataCatalog.query,
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...DataCatalog.mutation
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});