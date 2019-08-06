import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';

import { IMetadataApolloGraphQlConnection } from '../metadata_iface/apollo_connection';

import gql from 'graphql-tag';

class MetadataDatasetsService implements IMetadataDatasetsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  getDataset(path: String): Promise<{}> {
    const input = { __typename: 'Dataset', sameAs: path };
    return this.connection.query(
      gql`
        query($input: AnyInput!) {
          searchBy(input: $input) {
            ... on Dataset {
              __typename
              identifier
              sameAs
              version
              temporalCoverage
              description
              url
              headline
              dateCreated
              datePublished
              dateModified
              keywords
              name
              headline
              creator {
                ... on Person {
                  identifier
                  name
                }
              }
              publisher {
                ... on Organization {
                  __typename
                  name
                  identifier
                  url
                }
                ... on Person {
                  __typename
                  name
                  identifier
                  url
                }
              }
            }
          }
        }
      `,
      { input: input }
    );
  }

  getPerson(identifier: String): Promise<{}> {
    return this.connection.query(
      gql`
        query($identifier: String!) {
          getByID(identifier: "schemaorg/Person/2") {
            ... on Person {
              identifier
              name
              sameAs
              email
              url
              jobTitle
              description
              worksFor {
                ... on Organization {
                  identifier
                }
              }
              affiliation {
                ... on Organization {
                  identifier
                }
              }
              colleague {
                ... on Person {
                  identifier
                }
              }
              relatedTo {
                ... on Person {
                  identifier
                }
              }
            }
          }
        }
      `,
      { identifier: identifier }
    );
  }
}

export function activateMetadataDatasets(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataDatasetsService {
  return new MetadataDatasetsService(connection);
}
