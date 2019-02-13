const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const { extendSchema } = require('graphql/utilities');

const { DataCatalog } = require('graphql-schema-org');

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (_, {id}) {
        return fakeDatabase[id];
      }
    }
  }
});

var typeDef = new graphql.GraphQLSchema({
  query: queryType
});

const resolvers = { };

const extendedSchema = extendSchema(schema, parse(queryType));

module.exports = { typeDef, resolvers };