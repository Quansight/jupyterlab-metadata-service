import * as React from 'react';

/**
 * React Props Interface
 */
interface IFistOrderEntityProps {
  /**
   * Metadata to display
   */
  data: any | undefined;

  setDetailCard: (detail: Object) => void;

  itemPicked: string;
}
/**
 * Header react component
 */
export default class FistOrderEntity extends React.Component<
  IFistOrderEntityProps
> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IFistOrderEntityProps) {
    super(props);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div>
        <div style={this.styles['jp-metadata-primary-field-area']}>
          <div style={this.styles['jp-metadata-primary-field']}>
            <div style={this.styles['jp-metadata-subtitle-primary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-primary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-primary-field']}>
            <div style={this.styles['jp-metadata-subtitle-primary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-primary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-primary-field']}>
            <div style={this.styles['jp-metadata-subtitle-primary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-primary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-primary-field']}>
            <div style={this.styles['jp-metadata-subtitle-primary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-primary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-primary-field']}>
            <div style={this.styles['jp-metadata-subtitle-primary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-primary']} />
            </div>
          </div>
        </div>
        <div style={this.styles['jp-metadata-secondary-field-area']}>
          <div style={this.styles['jp-metadata-secondary-field']}>
            <div style={this.styles['jp-metadata-subtitle-secondary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-secondary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-secondary-field']}>
            <div style={this.styles['jp-metadata-subtitle-secondary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-secondary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-secondary-field']}>
            <div style={this.styles['jp-metadata-subtitle-secondary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-secondary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-secondary-field']}>
            <div style={this.styles['jp-metadata-subtitle-secondary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-secondary']} />
            </div>
          </div>
          <div style={this.styles['jp-metadata-secondary-field']}>
            <div style={this.styles['jp-metadata-subtitle-secondary']} />
            <div style={this.styles['jp-metadata-descrition-area']}>
              <div style={this.styles['jp-metadata-descrition-secondary']} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  styles = {
    'jp-metadata-primary-field-area': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      flexDirection: 'row' as 'row',
      flexWrap: 'wrap' as 'wrap',
      width: '100%',
      paddingLeft: '16px',
      paddingBottom: '16px'
    },
    'jp-metadata-secondary-field-area': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      flexDirection: 'row' as 'row',
      flexWrap: 'wrap' as 'wrap',
      width: '100%',
      paddingLeft: '16px',
      borderTop: '1px solid var(--jp-border-color1)'
    },

    'jp-metadata-primary-field': {
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '25%',
      minWidth: '210px',
      paddingTop: '16px'
    },
    'jp-metadata-secondary-field': {
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '25%',
      minWidth: '210px',
      paddingTop: '16px'
    },

    'jp-metadata-subtitle-primary': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      background: '#C4C4C4',
      borderRadius: '4px',
      width: '50%',
      height: '32px'
    },
    'jp-metadata-subtitle-secondary': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      background: '#E0E0E0',
      borderRadius: '4px',
      width: '50%',
      height: '32px'
    },

    'jp-metadata-descrition-area': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      paddingTop: '8px',
      width: '95%',
      height: '92px'
    },

    'jp-metadata-descrition-primary': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      background: '#C4C4C4',
      borderRadius: '4px',
      width: '100%',
      height: '84px'
    },
    'jp-metadata-descrition-secondary': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      background: '#E0E0E0',
      borderRadius: '4px',
      width: '100%',
      height: '84px'
    }
  };
}
