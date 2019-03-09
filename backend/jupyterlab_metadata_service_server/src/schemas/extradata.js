const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const ExtraDataTypeDefs = {};

var ExtraDataType = new GraphQLObjectType({
  name: 'ExtraData',
  fields: {
    id: { type: GraphQLString },
    target: { type: GraphQLString },
    attribute: { type: GraphQLString },
    type: { type: GraphQLString },
    value: { type: GraphQLString }
  }
});

ExtraDataTypeDefs['ExtraData'] = ExtraDataType;

module.exports = ExtraDataTypeDefs;
