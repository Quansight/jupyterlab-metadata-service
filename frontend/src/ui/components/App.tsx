import * as React from 'react';

import Header from './Header';
import Body from './Body';

import { IMetadataDatasetsService } from '../..';

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
      results: { data: { searchBy: null } }
    };
  }

  /**
   * React render function
   */
  render() {
    return (
      <div className="jp-metadata-window">
        <Header targetName={this.props.targetName} />
        {this.state.results.data.searchBy !== null ? (
          <Body data={this.state.results} />
        ) : (
          <Body data={undefined} />
        )}
      </div>
    );
  }

  /**
   * Called each time component updates
   */
  componentDidUpdate(): void {
    this.props.datasets.getDataset(this.props.target).then((results: any) => {
      if (
        this.state.results &&
        this.state.results.data &&
        this.state.results.data.searchBy
      ) {
        if (
          this.state.results.data.searchBy.identifer !==
          results.data.searchBy.identifer
        ) {
          this.setState({ results: results });
        }
      } else if (results.data && results.data.searchBy) {
        this.setState({ results: results });
      } else if (
        this.state.results &&
        this.state.results.data &&
        this.state.results.data.searchBy
      ) {
        this.setState({ results: { data: { searchBy: null } } });
      }
    });
  }
}
