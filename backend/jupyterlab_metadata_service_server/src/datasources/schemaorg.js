const { DataSource } = require('apollo-datasource');

let store = require('./data/schemaorg.json');
let nextId = {};

for (i in store) {
  nextId[i] = store[i].length + 2;
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

  fetchall() {
    return store.map(obj => this.reducer(obj));
  }

  getByID(id) {
    // TODO: change to filter
    let typename = id.split('/')[1];
    for (let i in store[typename]) {
      if (store[typename][i].identifier == id) {
        return this.reducer(store[typename][i]);
      }
    }
    return null;
  }

  create(data) {
    if (data.__typename === undefined) {
      console.error('Data needs `__typename` information.');
      return {
        result: null,
        success: false,
        message: 'Data needs `__typename` information.'
      };
    }

    data.identifier = (
      'schemaorg/'
      + data.__typename
      + "/"
      + nextId[data.__typename]++
    );

    store[data.__typename].push(data);

    return {
      result: data,
      success: true,
      message: '',
    };
  }

  delete(id) {
    for (let i in store) {
      if (store[i].identifier == id) {
        return this.reducer(store.splice(i, 1)[0]);
      }
    }
    return null;
  }
}

module.exports = SchemaOrgAPI;
