import * as React from 'react';

/**
 * React Props Interface
 */
interface IPersonProps {
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
export default class Person extends React.Component<IPersonProps> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IPersonProps) {
    super(props);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div>
        <div style={this.styles['jp-metadata-primary-field-area']}>
          <div style={this.styles['jp-metadata-person-info']}>
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
          <div style={this.styles['jp-metadata-person-info']}>
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
          <div style={this.styles['jp-metadata-person-info']}>
            <div style={this.styles['jp-metadata-primary-field']}>
              <div style={this.styles['jp-metadata-subtitle-primary']} />
              <div style={this.styles['jp-metadata-descrition-area']}>
                <div style={this.styles['jp-metadata-descrition-primary']} />
              </div>
            </div>
          </div>
        </div>
        <div style={this.styles['jp-metadata-secondary-field-area']}>
          <div style={this.styles['jp-metadata-person-info']}>
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
        </div>
      </div>
    );
  }

  styles = {
    'jp-metadata-primary-field-area': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      flexDirection: 'column' as 'column',
      width: '75%',
      paddingLeft: '16px',
      paddingBottom: '16px'
    },
    'jp-metadata-secondary-field-area': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      flexDirection: 'column' as 'column',
      width: '100%',
      paddingLeft: '16px',
      borderTop: '1px solid var(--jp-border-color1)'
    },
    'jp-metadata-person-info': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      flexDirection: 'row' as 'row',
      justifyContent: 'space-between' as 'space-between',
      width: '100%'
    },
    'jp-metadata-primary-field': {
      display: 'flex',
      flexDirection: 'column' as 'column',
      minWidth: '210px',
      paddingTop: '16px',
      paddingRight: '24px',
      flexGrow: 1
    },
    'jp-metadata-subtitle-primary': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      background: '#C4C4C4',
      borderRadius: '4px',
      width: '160px',
      height: '32px'
    },
    'jp-metadata-descrition-area': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      paddingTop: '8px',
      height: '92px'
    },
    'jp-metadata-descrition-primary': {
      display: 'flex',
      boxSizing: 'border-box' as 'border-box',
      background: '#C4C4C4',
      borderRadius: '4px',
      width: '100%',
      height: '84px'
    }
  };
}
