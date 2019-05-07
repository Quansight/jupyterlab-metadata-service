import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataCommentsService } from '../metadata_iface/comments';

import { IMetadataApolloGraphQlConnection } from '../metadata_iface/apollo_connection';

import gql from 'graphql-tag';

class MetadataCommentsService implements IMetadataCommentsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryAllByTarget(target: String): Promise<{}> {
    return this.connection.query(
      gql`
        query($target: String!) {
          annotationsByTarget(target: $target) {
            id
            target
            context
            label
            total
            resolved
            indicator {
              initial {
                end {
                  line
                  column
                }
                start {
                  line
                  column
                }
                context
              }
              current {
                end {
                  line
                  column
                }
                start {
                  line
                  column
                }
                context
              }
            }
            body {
              value
              created
              creator {
                id
                name
                image
              }
            }
          }
        }
      `,
      { target: target }
    );
  }

  /**
   *
   * @param target
   * @param value
   * @param {object} creator An object with `id` key and string with creator ID
   * @param label
   */
  createThread(
    target: string,
    value: string,
    creator: object,
    indicator: object,
    label?: string
  ): void {
    this.connection
      .mutate(
        /* mutation statement */
        gql`
          mutation(
            $body: AnnotationTextualBodyInput
            $creator: PersonInput
            $indicator: AnnotationTextEditorIndicatorInput
            $label: String
            $target: String
          ) {
            addAnnotation(
              body: $body
              creator: $creator
              indicator: $indicator
              label: $label
              target: $target
            ) {
              success
              message
              result {
                id
                target
                context
                indicator {
                  initial {
                    end {
                      line
                      column
                    }
                    start {
                      line
                      column
                    }
                    context
                  }
                  current {
                    end {
                      line
                      column
                    }
                    start {
                      line
                      column
                    }
                    context
                  }
                }
                label
                total
                body {
                  value
                  created
                  creator {
                    id
                    name
                    image
                  }
                }
              }
            }
          }
        `,
        /* variables */
        {
          body: { value: value },
          creator: creator,
          indicator: indicator || undefined,
          label: label || null,
          target: target
        }
      )
      .catch(err => {
        console.error(err);
      });
  }

  createComment(threadId: String, value: String, creator: Object) {
    this.connection
      .mutate(
        /* mutation statement */
        gql`
          mutation(
            $annotation: AnnotationInput
            $body: AnnotationTextualBodyInput
          ) {
            addAnnotationItem(annotation: $annotation, body: $body) {
              success
              message
              result {
                value
                created
                creator {
                  id
                  name
                  image
                }
              }
            }
          }
        `,
        /* variables */
        {
          body: { value: value, creator: creator },
          annotation: { id: threadId }
        }
      )
      .catch(err => {
        console.error(err);
      });
  }

  setResolvedValue(target: String, threadId: String, value: Boolean): void {
    this.connection
      .mutate(
        gql`
          mutation($annotation: AnnotationInput) {
            updateAnnotationResolve(annotation: $annotation) {
              success
              message
              result {
                resolved
              }
            }
          }
        `,
        {
          annotation: { target: target, id: threadId, resolved: value }
        }
      )
      .catch(err => {
        console.error(err);
      });
  }

  setCurrentIndicator(target: String, threadId: String, value: Object): void {
    this.connection
      .mutate(
        gql`
          mutation($annotation: AnnotationInput) {
            updateAnnotationTextEditorIndicatorCurrent(
              annotation: $annotation
            ) {
              success
              message
              result {
                indicator {
                  current {
                    end {
                      line
                      column
                    }
                    start {
                      line
                      column
                    }
                    context
                  }
                }
              }
            }
          }
        `,
        {
          annotation: { target: target, id: threadId, indicator: value }
        }
      )
      .catch(err => {
        console.error(err);
      });
  }
}

export function activateMetadataComments(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataCommentsService {
  return new MetadataCommentsService(connection);
}
