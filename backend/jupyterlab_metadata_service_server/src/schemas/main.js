const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');


var Query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    _empty: String
  }
});

var Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    _empty: String
  }
});

var typeDef = new graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});


