const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql');


var Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    _empty: {
      type: GraphQLBoolean
    }
  }
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    _empty: {
      type: GraphQLBoolean
    }
  }
});

var typeDef = JSON.stringify(
  new GraphQLSchema({
    query: Query,
    mutation: Mutation
  })
);

const resolvers = {
  Query: { },
  Mutation: { },
};

module.exports = {
  typeDef,
  resolvers,
  Query,
  Mutation
};
