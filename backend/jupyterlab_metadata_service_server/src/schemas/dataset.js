const { gql } = require('apollo-server');

const typeDef = gql`

  union author = Organization | Person
  union copyrightHolder = Organization | Person
  union creator = Organization | Person
  union provider = Organization | Person
  union publisher = Organization | Person

  type Dataset {
    # Properties from Thing
    identifier: String
    name: [String]
    # Properties from CreativeWork
    author: [author]
    category: [String] # TODO: check this field: educationalUse, learningResourceType
    citation: [String]
    copyrightHolder: [copyrightHolder]
    copyrightYear: [Int]
    creator: [creator]
    dateCreated: [String]
    dateModified: [String]
    datePublished: [String]
    description: [String]
    distribution: [String]
    exampleOfWork: [CreativeWork]
    headline: [String]
    keywords: [String]
    license: [CreativeWork]  # TODO: or CreativeWork
    provider: [provider]  # TODO: or Person
    publisher: [publisher]  # TODO: or Person
    sourceOrganization: [Organization]
    spatialCoverage: [String]
    temporalCoverage: [String]
    url: [String]
    version: [String]
  }

  type DatasetResponse {
    success: Boolean!
    message: String
    result: Dataset
  }

  extend type Query {
    datasets: [Dataset]
    dataset(id: String!): Dataset
  }

  extend type Mutation {
    addDataset(
      author: PersonInput
      category: String
      citation: String
      copyrightHolder: PersonInput  # TODO: or OrganizationInput
      copyrightYear: Int
      creator: PersonInput  # TODO: or Organization
      dateCreated: String
      dateModified: String
      datePublished: String
      description: String
      distribution: String
      exampleOfWork: CreativeWorkInput
      headline: String
      keywords: String
      license: String  # TODO: or CreativeWorkInput
      name: String!
      provider: OrganizationInput  # TODO: or PersonInput
      publisher: OrganizationInput  # TODO: or PersonInput
      sourceOrganization: OrganizationInput
      spatialCoverage: String
      temporalCoverage: String
      url: String
      version: String
    ): DatasetResponse!

    remDataset(id: ID!): DatasetResponse!
  }
`;

const resolvers = {
  OrgOrPerson: {
    __resolveType(obj, context, info){
      if(obj.affiliation){
        return 'Person';
      }

      if(obj.legalName){
        return 'Organization';
      }

      return null;
    },
  },
  Query: {
    // TODO: implement pagination
    datasets: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.DatasetAPI.fetchall();
    },
    dataset: (root, args, { dataSources } ) => {
      return dataSources.DatasetAPI.getByID(args.id);
    }
  },
  Mutation: {
    addDataset: async (root, args, { dataSources }) => {

      const author = (
        args.author && args.author.id
          ? dataSources.PersonAPI.getByID(args.author.id)
          : null
      );

      const copyrightHolder = (
        args.copyrightHolder && args.copyrightHolder.id
          ? dataSources.PersonAPI.getByID(args.copyrightHolder.id)
          : null
      );

      const creator = (
        args.creator && args.creator.id
          ? dataSources.PersonAPI.getByID(args.creator.id)
          : null
      );

      const exampleOfWork = (
        args.exampleOfWork && args.exampleOfWork.id
          ? dataSources.CreativeWorkAPI.getByID(args.exampleOfWork.id)
          : null
      );

      const provider = (
        args.provider && args.provider.id
          ? dataSources.OrganizationAPI.getByID(args.provider.id)
          : null
      );

      const publisher = (
        args.publisher && args.publisher.id
          ? dataSources.OrganizationAPI.getByID(args.publisher.id)
          : null
      );

      const sourceOrganization = (
        args.sourceOrganization && args.sourceOrganization.id
          ? dataSources.OrganizationAPI.getByID(args.sourceOrganization.id)
          : null
      )

      let newData = {
        author: author,
        category: args.category,
        citation: args.citation,
        copyrightHolder: copyrightHolder,
        copyrightYear: args.copyrightYear,
        creator: creator,
        dateCreated: args.dateCreated,
        dateModified: args.dateModified,
        datePublished: args.datePublished,
        description: args.description,
        distribution: args.distribution,
        exampleOfWork: exampleOfWork,
        headline: args.headline,
        keywords: args.keywords,
        license: args.license,
        name: args.name,
        provider: provider,
        publisher: publisher,
        sourceOrganization: sourceOrganization,
        spatialCoverage: args.spatialCoverage,
        temporalCoverage: args.temporalCoverage,
        url: args.url,
        version: args.version
      };

      newData = dataSources.DatasetAPI.insert(newData);

      return {
        success: true,
        result: newData
      };
    },
    remDataset: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.DatasetAPI.deleteByID(args.id);

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

module.exports = { typeDef, resolvers };
