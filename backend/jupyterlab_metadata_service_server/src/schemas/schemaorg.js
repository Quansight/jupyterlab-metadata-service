const SchemaOrg = require('graphql-schema-org');

const SchemaOrgTypeDefs = {};

for (let objName in SchemaOrg) {
  let obj = SchemaOrg[objName];
  if(obj._fields != undefined) {
    SchemaOrgTypeDefs[objName] = obj;
  }
}

module.exports = SchemaOrgTypeDefs;