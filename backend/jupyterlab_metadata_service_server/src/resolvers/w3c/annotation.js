const resolvers = {
  Query: {
    annotations: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.AnnotationAPI.fetchall();
    },
    annotationsByTarget: (root, args, { dataSources } ) => {
      return dataSources.AnnotationAPI.filterByField('target', args.target);
    }
  },
  Mutation: {
    /**
     *
     */
    addAnnotation: async (root, args, { dataSources }) => {
      let body = args.body;
      let created = (new Date()).toISOString();

      body['created'] = created;
      body['creator'] = dataSources.PersonAPI.getByID(args.creator['id']);

      let newData = {
        body: [ args.body ],
        context: 'http://www.w3.org/ns/anno.jsonld',
        created: created,
        label: args.label || null,
        motivation: args.motivation || 'commenting',
        resolved: false,
        target: args.target,
        type: 'Annotation'
      };

      newData = dataSources.AnnotationAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    },
    /**
     *
     */
    addAnnotationItem: async (root, args, { dataSources }) => {
      let newData = args.body;
      let created = (new Date()).toISOString();

      newData['created'] = created;
      newData['creator'] = dataSources.PersonAPI.getByID(newData['creator']['id']);
      newData['motivation'] = args.motivation || 'commenting';

      newData = dataSources.AnnotationAPI.update(
        args.annotation,
        newData,
        args.resolved || false
      );

      return {
        message: null,
        result: newData,
        success: true
      };
    },
    /**
     *
     */
    remAnnotation: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.AnnotationAPI.deleteByID(args.id);

      if (result == null) {
        message = 'Data not found.';
        status = false;
      }

      return {
        success: status,
        result: result,
        message: message
      };
    }
  }
};

module.exports = { resolvers };
