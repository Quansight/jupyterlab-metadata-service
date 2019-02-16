const { gql, makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');

// schemas
const Main = require('./schemas/main');

const Annotation = require('./schemas/annotation');
const CreativeWork = require('./schemas/creative_work');
const Dataset = require('./schemas/dataset');
const Person = require('./schemas/person');
const Organization = require('./schemas/organization');

module.exports = makeExecutableSchema({
  typeDefs: [
    Main.typeDef,
    Annotation.typeDef,
    CreativeWork.typeDef,
    Dataset.typeDef,
    Person.typeDef,
    Organization.typeDef
  ],
  resolvers: merge(
    Main.resolvers,
    Annotation.resolvers,
    CreativeWork.resolvers,
    Dataset.resolvers,
    Person.resolvers,
    Organization.resolvers
  ),
});