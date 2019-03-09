const { DataSource } = require('apollo-datasource');

// test data
let store = require('./data/extradata/extradata.json');
let nextId = store.length + 1;

class ExtraDataPI extends DataSource {
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
    // TODO: generic reducer
    return data;
  }

  fetchall() {
    return store.map(obj => this.reducer(obj));
  }

  getByID(id) {
    for (let i in store) {
      if (store[i].id == value) {
        return this.reducer(store[i]);
      }
    }
    return null;
  }

  filterByTarget(value) {
    let result = [];
    for (let i in store) {
      if (store[i]['target'] == value) {
        result.push(this.reducer(store[i]));
      }
    }
    return result;
  }

  insert(data) {
    data.id = "extradata/" + nextId++;
    store.push(data);
    return this.reducer(data);
  }

  deleteByID(id) {
    let result = null;

    if (store.length >= id) {
      for (let i in store) {
        if (store[i].id == id) {
          result = store.splice(i, 1)[0];
          break;
        }
      }
    }
    return this.reducer(result);
  }
}

module.exports = ExtraDataPI;