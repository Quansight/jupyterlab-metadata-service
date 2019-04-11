const {
  GraphQLUnionType
} = require('graphql');

const { gql, makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');

// schemas
const Annotation = require('./schemas/annotation');
const SchemaOrg = require('./schemas/schemaorg');

const AnyType = new GraphQLUnionType({
  name: 'AnyType',
  types: [].concat(
    Annotation.TypeDef,
    Object.values(SchemaOrg),
  ),
  resolveType(value) {
    return value.__typename;
  }
});

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Query: { },
  Mutation: { },
};

module.exports = makeExecutableSchema({
  typeDefs: [
    Query,
    Annotation.typeDef,
    AnyType,
  ].concat(...Object.values(SchemaOrg)),
  resolvers: merge(
    resolvers,
    Annotation.resolvers
  ),
});
