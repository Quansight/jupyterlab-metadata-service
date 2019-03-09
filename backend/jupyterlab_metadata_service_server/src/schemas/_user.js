const _UserTypeDefs = {};

// Define the User type
var _Dataset = new graphql.GraphQLObjectType({
  name: '_Dataset',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

_UserTypeDefs['_Dataset'] = _Dataset;

module.exports = _UserTypeDefs;