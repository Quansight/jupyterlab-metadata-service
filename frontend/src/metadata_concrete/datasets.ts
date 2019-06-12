import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';

import { IMetadataApolloGraphQlConnection } from '../metadata_iface/apollo_connection';

import gql from 'graphql-tag';

class MetadataDatasetsService implements IMetadataDatasetsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryById(id: String): Promise<{}> {
    return this.connection.query(
      gql`
        query($id: String!) {
          dataset(id: $id) {
            id
            author {
              id
              name
            }
            category
            citation
            copyrightHolder {
              id
              name
            }
            copyrightYear
            creator {
              id
              name
              affiliation {
                id
                name
              }
            }
            dateCreated
            dateModified
            datePublished
            description
            distribution
            exampleOfWork {
              id
              name
            }
            headline
            keywords
            license
            provider {
              id
              name
            }
          }
        }
      `,
      { id: id }
    );
  }

  queryByTarget(target: String): Promise<{}> {
    return this.connection.query(
      gql`
        query($target: String!) {
          dataset(target: $target) {
            id
            author {
              id
              name
            }
            category
            citation
            copyrightHolder {
              id
              name
            }
            copyrightYear
            creator {
              id
              name
              affiliation {
                id
                name
              }
            }
            dateCreated
            dateModified
            datePublished
            description
            distribution
            exampleOfWork {
              id
              name
            }
            headline
            keywords
            license
            provider {
              id
              name
            }
          }
        }
      `,
      { target: target }
    );
  }
}

export function activateMetadataDatasets(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataDatasetsService {
  return new MetadataDatasetsService(connection);
}
