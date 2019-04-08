import * as React from 'react';

/**
 * React Props Interface
 */
interface IBodyProps {
  /**
   * Metadata to display
   */
  data: any | undefined;
}

/**
 * Header react component
 */
export default class DatasetBody extends React.Component<IBodyProps> {
  0;
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IBodyProps) {
    super(props);

    this.getFormatedData = this.getFormatedData.bind(this);
    this.formatData = this.formatData.bind(this);
    this.createField = this.createField.bind(this);
  }

  /**
   * React render function
   */
  render() {
    return this.props.data !== undefined ? (
      <div>
        {this.props.data.data.dataset !== null ? this.getFormatedData() : ''}
      </div>
    ) : (
      <p />
    );
  }

  /**
   * Handles mapping the list of ReactNode objects for display in a single
   * ReactNode
   */
  getFormatedData(): React.ReactNode {
    const nodes = this.formatData();
    const items = nodes.map((node, i) => <div key={i}>{node}</div>);
    return <div style={this.styles['jp-metadata-body-area']}>{items}</div>;
  }

  /**
   * Loops through all data and formats it
   */
  formatData(): React.ReactNode[] {
    let formated: React.ReactNode[] = [];
    let data: any = this.props.data.data.dataset;

    formated.push(
      this.createField(this.nameMap['__typename'], data['__typename'])
    );
    for (let section in data) {
      if (data[section] !== null) {
        if (typeof data[section] === 'object') {
          formated.push(
            this.createField(this.nameMap[section], data[section].name)
          );
        } else if (
          section === 'dateModified' ||
          section === 'dateCreated' ||
          section === 'datePublished'
        ) {
          formated.push(
            this.createField(
              this.nameMap[section],
              this.dateTransform(data[section])
            )
          );
        } else {
          section !== 'id' &&
            section !== '__typename' &&
            formated.push(
              this.createField(this.nameMap[section], data[section])
            );
        }
      }
    }

    return formated;
  }

  /**
   * Creates a ReactNode for a key value pair
   *
   * @param key Type: string - key value of a field
   * @param value Type: string - value of field
   */
  createField(key: string, value: string, link?: string): React.ReactNode {
    return (
      <div style={this.styles['jp-metadata-body-item']}>
        <span style={this.styles['jp-metadata-body-key']}>{key}</span>
        <span style={this.styles['jp-metadata-body-value']}>
          {link !== undefined ? this.getLink(value) : this.getValue(value)}
        </span>
      </div>
    );
  }

  getLink(value: string) {
    return <a className="jp-metadata-body-value-link">{value}</a>;
  }

  getValue(value: string) {
    return <span>{value}</span>;
  }

  dateTransform(field: any): string {
    let serverTimeStamp = new Date(+field * 1000);
    let localTimeStamp = serverTimeStamp.toLocaleString();
    let fullDate = localTimeStamp.split(',')[0].split('/');
    let fullTime = localTimeStamp.split(',')[1].split(':');
    let timeIdentifier = fullTime[2].slice(3).toLowerCase();

    let month: { [key: string]: String } = {
      '1': 'Jan',
      '2': 'Feb',
      '3': 'Mar',
      '4': 'Apr',
      '5': 'May',
      '6': 'Jun',
      '7': 'Jul',
      '8': 'Aug',
      '9': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };
    let timestamp =
      month[fullDate[0]] +
      ' ' +
      fullDate[1] +
      fullTime[0] +
      ':' +
      fullTime[1] +
      timeIdentifier;

    return timestamp;
  }

  nameMap = {
    author: 'Author:',
    category: 'Category:',
    citation: 'Citation:',
    copyrightHolder: 'Copy Right Holder:',
    creator: 'Creator:',
    dateCreated: 'Date Created:',
    dateModified: 'Date Modified:',
    datePublished: 'Date Published:',
    description: 'Description:',
    distribution: 'Distribution:',
    exampleOfWork: 'Example of Work:',
    headline: 'Headline:',
    keywords: 'Keywords:',
    license: 'License:',
    provider: 'Provider:',
    __typename: 'Type:'
  };

  styles = {
    'jp-metadata-body-area': {
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'start',
      padding: '8px',
      fontSize: '11px',
      color: 'var(--jp-ui-font-color1)',
      maxHeight: '87vh',
      overflowY: 'auto' as 'auto',
      overflowX: 'hidden' as 'hidden'
    },
    'jp-metadata-body-item': {
      display: 'flex',
      flexDirection: 'row' as 'row',
      marginBottom: '5px'
    },
    'jp-metadata-body-key': {
      fontWeight: 'bold' as 'bold',
      whiteSpace: 'pre' as 'pre',
      paddingRight: '8px'
    },
    'jp-metadata-body-value': {
      whiteSpace: 'pre-line' as 'pre-line',
      wordBreak: 'break-word' as 'break-word'
    }
  };
}
