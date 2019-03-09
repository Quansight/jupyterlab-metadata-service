const { DataSource } = require('apollo-datasource');

let store = {
  'dataset': require('./data/schemaorg/dataset.json'),
  'organization': require('./data/schemaorg/organization.json'),
  'person': require('./data/schemaorg/person.json')
};

let nextId = {};
for (let k in store) {
  nextId[k] = store[k].length + 1
}

class SchemaOrgAPI extends DataSource {
  constructor() {
    super();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  reducer(data) {
    return data;
  }

  fetchall(_type) {
    return store[_type].map(obj => this.reducer(obj));
  }

  get_context(id) {
    if (id.includes('/')) {
      return id.split('/')[0]
    }
    return null;
  }

  get_type(id) {
    if (id.includes('/')) {
      return id.split('/')[1]
    }
    return 'dataset';
  }

  getByID(id) {
    let _type = this.get_type(id);
    for (let i in store[_type]) {
      if (store[_type][i].id == id) {
        return this.reducer(store[_type][i]);
      }
    }
    return null;
  }

  insert(data, _type) {
    data.id = _type + '/' + nextId++;
    store[_type].push(data);
    return data;
  }

  deleteByID(id) {
    let _type = this.get_type(id);
    for (let i in store[_type]) {
      if (store[_type][i].id == id) {
        return this.reducer(store[_type].splice(i, 1)[0]);
      }
    }
    return null;
  }
}

module.exports = SchemaOrgAPI;