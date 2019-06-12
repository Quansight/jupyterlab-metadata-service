import * as React from 'react';

/**
 * React Props Interface
 */
interface IHeaderProps {
  /**
   * File name that data applies to. Equals '' if no data
   *
   * @type string
   */
  targetName: string;
}

/**
 * React Header component
 */
export default class Header extends React.Component<IHeaderProps> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IHeaderProps) {
    super(props);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div>
        <div style={this.styles['jp-metadata-title-box']} />
      </div>
    );
  }

  /**
   * Header styles
   */
  styles = {
    'jp-metadata-title-box': {
      display: 'flex',
      background: '#C4C4C4',
      borderRadius: '4px',
      width: '75%',
      height: '32px',
      marginTop: '16px',
      marginLeft: '16px'
    }
  };
}
