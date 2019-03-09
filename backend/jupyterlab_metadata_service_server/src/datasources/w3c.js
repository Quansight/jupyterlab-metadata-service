const { DataSource } = require('apollo-datasource');

// test data
let store = {
  'annotation': require('./data/w3c/annotation.json')
}
let nextId = {
  'annotation': store['annotation'].length + 1
}

class W3CAPI extends DataSource {
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
    return data
  }

  fetchall() {
    return store['annotation'].map(obj => this.reducer(obj));
  }

  getByID(id) {
    for (let i in store['annotation']) {
      if (store['annotation'][i].id == value) {
        return this.reducer(store['annotation'][i]);
      }
    }
    return null;
  }

  filterByField(field_name, value) {
    let result = [];
    for (let i in store['annotation']) {
      if (store['annotation'][i][field_name] == value) {
        result.push(this.reducer(store['annotation'][i]));
      }
    }
    return result;
  }

  getByField(field_name, value) {
    for (let i in store['annotation']) {
      if (store['annotation'][i][field_name] == value) {
        return this.reducer(store['annotation'][i]);
      }
    }
    return null;
  }

  insert(data) {
    data.id = "anno/" + nextId['annotation']++;
    store['annotation'].push(data);
    return this.reducer(data);
  }

  /**
   *
   * @param {Object} annotation
   * @param {Object} body
   * @param {Boolean} resolved
   * @returns {Object}
   */
  update (annotation, body, resolved) {
    for (let i in store['annotation']) {
      if (store['annotation'][i].id == annotation.id) {
        store['annotation'][i].body.push(body);
        store['annotation'][i].resolved = resolved;
        return this.reducer(body)
      }
    }
    return null
  }

  deleteByID(id) {
    let result = null;

    if (store['annotation'].length >= id) {
      for (let i in store) {
        if (store['annotation'][i].id == id) {
          result = store['annotation'].splice(i, 1)[0];
          break;
        }
      }
    }
    return this.reducer(result);
  }
}

module.exports = W3CAPI;