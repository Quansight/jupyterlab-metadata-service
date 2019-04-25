import * as React from 'react';

import { JupyterFrontEnd, ILabShell } from '@jupyterlab/application';

import { ICommandPalette, ReactWidget } from '@jupyterlab/apputils';

import { UseSignal } from '@jupyterlab/apputils';

import {
  IActiveDataset,
  IConverterRegistry,
} from '@jupyterlab/dataregistry';

import { IMetadataCommentsService } from '../metadata_iface/comments';
import { IMetadataDatasetsService } from '../metadata_iface/datasets';
import { IMetadataPeopleService } from '../metadata_iface/people';

import App from './components/App';

export function activateMetadataUI(
  app: JupyterFrontEnd,
  activeDataset: IActiveDataset,
  palette: ICommandPalette,
  comments: IMetadataCommentsService,
  datasets: IMetadataDatasetsService,
  people: IMetadataPeopleService,
  labShell: ILabShell,
  converters: IConverterRegistry
): void {
  console.log('JupyterLab extension jupyterlab-metadata-service is activated!');

  // Create a single widget
  const widget = ReactWidget.create(
    <UseSignal signal={activeDataset.signal}>
      {(sender, args) => {
        try {
          let URL = activeDataset.active.pathname;
          return (
            <App
              target={URL}
              targetName={URL.split('/').pop()}
              datasets={datasets}
            />
          );
        } catch {
          return <App target={''} targetName={''} datasets={datasets} />;
        }
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
