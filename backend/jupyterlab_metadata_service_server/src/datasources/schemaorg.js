const { DataSource } = require("apollo-datasource");

let store = require("./data/schemaorg.json");
let nextId = {};

for (i in store) {
  nextId[i] = store[i].length + 2;
}

function getNextID(typename) {
  if (!(typename in nextId)) {
    nextId[typename] = 1;
    store[typename] = [];
  }
  return "schemaorg/" + typename + "/" + nextId[typename]++;
}

function createItem(item) {
  item = navigateNestedObject(item);
  item["identifier"] = getNextID(item.__typename);
  store[item.__typename].push(item);
  return item;
}

function navigateNestedObject(data) {
  for (k in data) {
    let v = data[k];
    if (v instanceof Object) {
      if (Array.isArray(v)) {
        // list
        data[k] = navigateNestedObject(data[k]);
      } else if (!("identifier" in v)) {
        // dictionary
        data[k] = createItem(data[k]);
      }
    }
  }
  return data;
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

  getByID(identifier) {
    // TODO: change to filter
    let typename = identifier.split("/")[1];
    for (let i in store[typename]) {
      if (store[typename][i].identifier == identifier) {
        return this.reducer(store[typename][i]);
      }
    }
    return null;
  }

  searchBy(input) {
    const typename = input.__typename;
    let result = [];

    for (let i in store[typename]) {
      for (let k in input) {
        if (k == "__typename") {
          continue;
        }
        let property = k;
        let value = input[k];

        if (store[typename][i][property] == value) {
          result.push(this.reducer(store[typename][i]));
        }
      }
    }
    return result;
  }

  create(data) {
    if (data.__typename === undefined) {
      console.error("Data needs `__typename` information.");
      return {
        result: null,
        success: false,
        message: "Data needs `__typename` information."
      };
    }

    let result = createItem(data);
    console.log("Oki");
    console.log(result);

    return {
      result: result,
      success: true,
      message: ""
    };
  }

  update(data) {
    let typename = data.identifier.split("/")[1];

    for (let i in store[typename]) {
      if (store[typename][i].identifier == data.identifier) {
        data = this.reducer(data);
        navigateNestedObject(data);
        store[typename][i] = data;
      }
    }

    return {
      result: data,
      success: true,
      message: ""
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
