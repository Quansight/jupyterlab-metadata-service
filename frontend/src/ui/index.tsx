import * as React from 'react';

import { JupyterFrontEnd, ILabShell } from '@jupyterlab/application';

import { ICommandPalette, ReactWidget } from '@jupyterlab/apputils';

import { UseSignal } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';
import { IMetadataPeopleService } from '../metadata_iface/people';

import App from './components/App';

export function activateMetadataUI(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  datasets: IMetadataDatasetsService,
  people: IMetadataPeopleService,
  labShell: ILabShell,
  docManager: IDocumentManager
): void {
  console.log('JupyterLab extension jupyterlab-metadata-service is activated!');

  // Create a single widget
  const widget = ReactWidget.create(
    <UseSignal signal={labShell.currentChanged}>
      {(sender, args) => {
        if (args) {
          const current = args.newValue;
          if (current === null) {
            return <App target={''} targetName={''} datasets={datasets} />;
          } else {
            const context = docManager.contextForWidget(current);
            if (!context) {
              return <App target={''} targetName={''} datasets={datasets} />;
            }
            return (
              <App
                target={context.path}
                targetName={context.path.split('/').pop()}
                datasets={datasets}
              />
            );
          }
        }
        return <App target={''} targetName={''} datasets={datasets} />;
      }}
    </UseSignal>
  );
  widget.id = 'jlab-metadata-service';
  widget.title.iconClass = 'jp-FileIcon jp-SideBar-tabIcon';
  widget.title.caption = 'Metadata';

  labShell.add(widget, 'right');
}

// /**
//  * Handle update requests for the widget.
//  */
// onUpdateRequest(msg: Message): void {
//   console.log(msg);
//   let self = this;

//   let f = async () => {
//     let divQueryResult: HTMLDivElement = document.createElement('div');

//     console.log('mutating JSON ...');
//     const resultJSON = await this.datasets.createNewDataset({
//       name: 'JSON'
//     });
//     console.log(resultJSON);

//     const resultCSV = await this.datasets.createNewDataset({
//       name: 'CSV'
//     });
//     console.log(resultCSV);

//     console.log('quering ...');
//     this.datasets.queryAllDatasets().then(data => {
//       divQueryResult.innerHTML = JSON.stringify(data);
//       console.log(data);
//       self.node.appendChild(divQueryResult);
//     });
//   };
//   f();
// }
