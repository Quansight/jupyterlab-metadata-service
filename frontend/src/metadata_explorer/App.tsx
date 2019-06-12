import * as React from 'react';

import Header from './Header';
// import FirstOrderEntity from './FirstOrderEntity';
// import Person from './Person';
import Article from './Article';

import { IMetadataDatasetsService } from '../';

/**
 * React Props Interface
 */
interface IAppProps {
  /**
   * Path of open file, used as unique id to fetch comments and annotations
   *
   * @type string
   */
  target: string;
  /**
   * Name of open file without path
   *
   * @type: string
   */
  targetName: string;
  /**
   * DatasetService that interacts with graphql server
   */
  datasets: IMetadataDatasetsService;
}

interface IAppStates {
  /**
   * Holds the response from querying metadata
   */
  results: any;
  details: any;
}

/**
 * App react component
 */
export default class App extends React.Component<IAppProps, IAppStates> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      results: { data: { dataset: null } },
      details: {}
    };

    this.setDetailCard = this.setDetailCard.bind(this);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div className="jp-metadata-explorer-window">
        <Header targetName={this.props.targetName} />
        {this.state.results.data.dataset !== null ? (
          this.state.results.data.dataset.id === this.props.target && (
            <Article
              data={this.state.results}
              itemPicked={this.state.details.name}
              setDetailCard={this.setDetailCard}
            />
          )
        ) : (
          <Article
            data={undefined}
            itemPicked={this.state.details.name}
            setDetailCard={this.setDetailCard}
          />
        )}
      </div>
    );
  }

  /**
   * Called each time component updates
   */
  componentDidUpdate(): void {
    this.props.datasets.queryById(this.props.target).then((results: any) => {
      if (this.state.results.data.dataset !== null) {
        if (this.state.results.data.dataset.id !== results.data.dataset.id) {
          this.setState({ results: results });
        }
      } else {
        if (results.data.dataset !== null) {
          this.setState({ results: results });
        } else {
          if (this.state.results.data.dataset !== null) {
            this.setState({ results: { data: { dataset: null } } });
          }
        }
      }
    });
  }

  setDetailCard(data: object): void {
    this.setState({ details: data });
  }
}
