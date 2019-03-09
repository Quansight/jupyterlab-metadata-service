const { gql } = require('apollo-server');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql');

const { Person } = require('graphql-schema-org');

const Annotation = new GraphQLObjectType({
  name: 'Annotation',
  fields: () => ({
    body: { type: GraphQLList(AnnotationTextualBody) },
    context: { type: GraphQLString }, // http://www.w3.org/ns/anno.jsonld
    created: { type: GraphQLString }, // ISO DateTime
    creator: { type: Person },
    id: { type: GraphQLString },
    label: { type: GraphQLString },
    motivation: { type: GraphQLString }, // (default: commenting)
    resolved: { type: GraphQLBoolean },
    target: { type: GraphQLString },
    total: { type: GraphQLInt },
    type: { type: GraphQLString }, // (default: Annotation)
  })
});

const AnnotationTextualBody = new GraphQLObjectType({
  name: 'AnnotationTextualBody',
  fields: () => ({
    created: { type: GraphQLString }, // ISO DateTime
    creator: { type: Person },
    type: { type: GraphQLString }, // (default: TextualBody)
    value: { type: GraphQLString }
  })
});

const W3CTypeDefs = { Annotation, AnnotationTextualBody };
module.exports = W3CTypeDefs;