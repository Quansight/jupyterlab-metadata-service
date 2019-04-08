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
export default class DatasetHeader extends React.Component<IHeaderProps> {
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
    const hasName = this.props.targetName !== '';
    if (!hasName) {
      extraStyle.color = 'var(--jp-ui-font-color2)';
    }
    return (
      <div style={{ ...this.styles['jp-metadata-header-area'], ...extraStyle }}>
        <div style={this.styles['jp-metadata-header-icon-area']}>
          {this.props.targetName !== '' && this.getFileIcon(header)}
        </div>
        <div style={this.styles['jp-metadata-header-label-area']}>
          <label style={this.styles['jp-metadata-header-label']}>
            {hasName ? header : 'Select a file to view metadata'}
          </label>
        </div>
      </div>
    );
  }

  /**
   * File Icon handler
   *
   * @param header Type: string - header value
   */
  getFileIcon(header: string): React.ReactNode {
    try {
      let extensionName = header.slice(header.indexOf('.'));
      for (let key in this.fileTypes) {
        for (let value in this.fileTypes[key].extensions) {
          if (extensionName === this.fileTypes[key].extensions[value]) {
            return (
              <span
                className={this.fileTypes[key].iconClass}
                style={this.styles['jp-metadata-header-icon']}
              />
            );
          }
        }
      }
      return (
        <span
          className={'jp-FileIcon'}
          style={this.styles['jp-metadata-header-icon']}
        />
      );
    } catch {
      return <span />;
    }
  }

  /**
   * List of all supported extentions with their icons
   */
  fileTypes = [
    {
      extensions: ['.md'],
      mimeTypes: ['text/markdown'],
      iconClass: 'jp-Icon jp-MarkdownIcon'
    },
    {
      extensions: ['.py'],
      mimeTypes: ['text/x-python'],
      iconClass: 'jp-Icon jp-PythonIcon'
    },
    {
      extensions: ['.json'],
      mimeTypes: ['application/json'],
      iconClass: 'jp-Icon jp-JSONIcon'
    },
    {
      extensions: ['.csv'],
      mimeTypes: ['text/csv'],
      iconClass: 'jp-Icon jp-SpreadsheetIcon'
    },
    {
      extensions: ['.tsv'],
      mimeTypes: ['text/csv'],
      iconClass: 'jp-Icon jp-SpreadsheetIcon'
    },
    {
      mimeTypes: ['text/x-rsrc'],
      extensions: ['.r'],
      iconClass: 'jp-Icon jp-RKernelIcon'
    },
    {
      mimeTypes: ['text/x-yaml', 'text/yaml'],
      extensions: ['.yaml', '.yml'],
      iconClass: 'jp-Icon jp-YamlIcon'
    },
    {
      mimeTypes: ['image/svg+xml'],
      extensions: ['.svg'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/tiff'],
      extensions: ['.tif', '.tiff'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/jpeg'],
      extensions: ['.jpg', '.jpeg'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/gif'],
      extensions: ['.gif'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/png'],
      extensions: ['.png'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/bmp'],
      extensions: ['.bmp'],
      iconClass: 'jp-Icon jp-ImageIcon'
    }
  ];

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
      flexDirection: 'row' as 'row',
      paddingLeft: '24px',
      minWidth: '52px',
      justifyContent: 'center'
    },
    'jp-metadata-header-label-area': {
      paddingLeft: '4px',
      textAlign: 'left' as 'left',
      whiteSpace: 'nowrap' as 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexShrink: 1
    },
    'jp-metadata-header-label': {
      fontSize: 'var(--jp-ui-font-size1)',
      color: 'var(--jp-ui-font-color1)'
    },
    'jp-metadata-header-icon-area': { display: 'flex', paddingLeft: '4px' },
    'jp-metadata-header-icon': {
      minWidth: '20px',
      minHeight: '20px',
      backgroundSize: '20px'
    }
  };
}
