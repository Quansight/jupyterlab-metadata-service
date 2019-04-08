import * as React from 'react';

import { JupyterFrontEnd, ILabShell } from '@jupyterlab/application';

import { ICommandPalette, ReactWidget } from '@jupyterlab/apputils';

import { UseSignal } from '@jupyterlab/apputils';

import { IActiveDataset, IConverterRegistry } from '@jupyterlab/databus';

import { IMetadataCommentsService } from '../metadata_iface/comments';
import { IMetadataDatasetsService } from '../metadata_iface/datasets';
import { IMetadataPeopleService } from '../metadata_iface/people';
import App from './App';

export function activateMetadataExplore(
  app: JupyterFrontEnd,
  activeDataset: IActiveDataset,
  palette: ICommandPalette,
  comments: IMetadataCommentsService,
  datasets: IMetadataDatasetsService,
  people: IMetadataPeopleService,
  labShell: ILabShell,
  converters: IConverterRegistry
): void {
  console.log(
    'JupyterLab extension jupyterlab-metadata-explorer is activated!'
  );

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
  widget.id = 'jlab-metadata-explorer';
  widget.title.label = 'Metadata Explorer';
  widget.title.closable = true;

  const command: string = 'metadataExplorer:open';
  app.commands.addCommand(command, {
    label: 'Metadata Explorer',
    execute: () => {
      if (!widget.isAttached) {
        labShell.add(widget, 'main');
      }
      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({ command, category: 'Metadata' });
}
