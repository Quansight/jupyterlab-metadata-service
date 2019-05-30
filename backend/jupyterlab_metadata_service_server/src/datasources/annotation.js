const {
    DataSource
} = require('apollo-datasource');

// test data
let store = [];
let nextId = 1;

class AnnotationAPI extends DataSource {
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
        return {
            id: data.id || 0,
            body: data.body,
            context: data.context,
            created: data.created,
            creator: data.creator,
            label: data.label,
            resolved: data.resolved,
            target: data.target,
            indicator: data.indicator,
            total: data.body.length || 0
        }
    }

    reducer_update_resolved(resolved) {
        return {
            resolved: resolved
        }
    }

    reducer_update_text_editor_indicator_current(current) {
        return {
            indicator: {
                current
            }
        }
    }

    reducer_body_textual(data) {
        return {
            created: data.created,
            creator: data.creator,
            value: data.value
        };
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

    filterByField(field_name, value) {
        let result = [];
        for (let i in store) {
            if (store[i][field_name] == value) {
                result.push(this.reducer(store[i]));
            }
        }
        return result;
    }

    getByField(field_name, value) {
        for (let i in store) {
            if (store[i][field_name] == value) {
                return this.reducer(store[i]);
            }
        }
        return null;
    }

    insert(data) {
        data.id = "anno/" + nextId++;
        store.push(data);
        return this.reducer(data);
    }

    /**
     *
     * @param {Object} annotation
     * @param {Boolean} resolved
     * @returns {Object}
     */
    updateResolve(annotation) {
        for (let i in store) {
            if (store[i].id == annotation.id && store[i].target == annotation.target) {
                store[i].resolved = annotation.resolved;
                return this.reducer_update_resolved(annotation.resolved)
            }
        }
        return null
    }

    /**
     *
     */
    updateTextEditorIndicatorCurrent(annotation) {
        for (let i in store) {
            if (store[i].id == annotation.id && store[i].target == annotation.target) {
                store[i].indicator.current = annotation.indicator.current;
                return this.reducer_update_text_editor_indicator_current(annotation.indicator.current)
            }
        }
        return null
    }

    /**
     *
     * @param {Object} annotation
     * @param {Object} body
     * @param {Boolean} resolved
     * @returns {Object}
     */
    update(annotation, body) {
        for (let i in store) {
            if (store[i].id == annotation.id) {
                if (body.index !== undefined) {
                    store[i].body[body.index] = body;
                    return this.reducer_body_textual(body)
                } else {
                    store[i].body.push(body);
                    return this.reducer_body_textual(body)
                }
            }
        }
        return null
    }

    deleteByID(id) {
        let result = null;

        for (let i in store) {
            if (store[i].id == id) {
                result = store.splice(i, 1)[0];
                break;
            }
        }

        return this.reducer(result);
    }
}

module.exports = AnnotationAPI;