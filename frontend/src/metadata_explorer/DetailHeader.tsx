import * as React from 'react';

/**
 * React Props Interface
 */
interface IDetailHeaderProps {
  /**
   * File name that data applies to. Equals undefined if no data
   *
   * @type string
   */
  targetName: string;
  type: string;
}

/**
 * React Header component
 */
export default class DetailHeader extends React.Component<IDetailHeaderProps> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IDetailHeaderProps) {
    super(props);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div style={this.styles['jp-metadata-header-card']}>
        {this.renderAppHeader(this.props.targetName)}
      </div>
    );
  }

  /**
   * Header render handler
   *
   * @param header Type: string - header value
   */
  renderAppHeader(header: string): React.ReactNode {
    const extraStyle: any = {};
    const hasName = this.props.targetName !== undefined;
    if (!hasName) {
      extraStyle.color = 'var(--jp-ui-font-color2)';
    }
    return (
      <div style={{ ...this.styles['jp-metadata-header-area'], ...extraStyle }}>
        <div style={this.styles['jp-metadata-header-label-area']}>
          <label style={this.styles['jp-metadata-header-label']}>
            {hasName ? header : 'Select a field to view details'}
          </label>
        </div>
        <div style={this.styles['jp-metadata-header-file-type-area']}>
          <label style={this.styles['jp-metadata-header-file-type']}>
            {this.props.type}
          </label>
        </div>
      </div>
    );
  }

  /**
   * Header styles
   */
  styles = {
    'jp-metadata-header-card': {
      padding: '4px'
    },
    'jp-metadata-header-area': {
      display: 'flex',
      flexShrink: 1,
      flexDirection: 'column' as 'column',
      paddingLeft: '24px',
      minWidth: '52px',
      justifyContent: 'center'
    },
    'jp-metadata-header-label-area': {
      paddingLeft: '4px',
      textAlign: 'center' as 'center',
      whiteSpace: 'nowrap' as 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexShrink: 1
    },
    'jp-metadata-header-label': {
      fontSize: 'var(--jp-ui-font-size1)',
      color: 'var(--jp-ui-font-color1)'
    },
    'jp-metadata-header-file-type-area': {
      paddingLeft: '4px',
      textAlign: 'center' as 'center',
      whiteSpace: 'nowrap' as 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexShrink: 1
    },
    'jp-metadata-header-file-type': {
      fontSize: 'var(--jp-ui-font-size1)',
      color: 'var(--jp-ui-font-color1)'
    }
  };
}
