
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLUnionType,
  GraphQLInputObjectType
} = require('graphql');

var UnionInputType = require('graphql-union-input-type');

const DatasetInput = new GraphQLInputObjectType({
  name: 'DatasetInput',
  fields: function() {
    return {
        side: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
    }
}
});

const creatorInput = new GraphQLInputObjectType({
  name: 'creatorInput',
  fields: () => ({
    identifier: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    }
  }),
});

var AnyInput = UnionInputType({
  name: 'AnyInput',
  inputTypes: [
    JediInputType, SithInputType
  ],

});

module.exports = AnyInput;
