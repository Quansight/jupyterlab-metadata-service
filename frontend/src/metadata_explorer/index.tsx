import * as React from 'react';

import { JupyterFrontEnd, ILabShell } from '@jupyterlab/application';

import { ICommandPalette, ReactWidget } from '@jupyterlab/apputils';

import { UseSignal } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';
import { IMetadataPeopleService } from '../metadata_iface/people';

import App from './App';
import { Signal } from '@phosphor/signaling';
import { IDocumentWidget, DocumentRegistry } from '@jupyterlab/docregistry';

import { NotebookPanel } from '@jupyterlab/notebook';
import { Cell } from '@jupyterlab/cells';

export function activateMetadataExplore(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  datasets: IMetadataDatasetsService,
  people: IMetadataPeopleService,
  labShell: ILabShell,
  docManager: IDocumentManager
): void {
  let pathChanged = new Signal<{}, void>({});
  let path = '';
  // let type = '';

  // emits signal with a path when file changes
  labShell.currentChanged.connect((sender, args) => {
    if (args) {
      const current = args.newValue;
      if (current === null) {
        return;
      } else {
        const context = docManager.contextForWidget(current);
        if (!context) {
          return;
        }
        path = context.path;
        // type = context.contentsModel.type;
        pathChanged.emit(void 0);
      }
    }
  });

  // Create a single widget
  const widget = ReactWidget.create(
    <UseSignal signal={pathChanged}>
      {(sender, args) => {
        return (
          <App
            target={path}
            targetName={path.split('/').pop()}
            datasets={datasets}
            cellMetadata={''}
          />
        );
      }}
    </UseSignal>
  );
  widget.id = 'jlab-metadata-explorer';
  widget.title.label = 'Metadata Explorer';
  widget.title.closable = true;

  // creates a right click comand to open metadata
  app.commands.addCommand('jupyterlab-metadata:openMetadataExplorer', {
    label: 'View Metadata',
    isVisible: () => {
      const curWidget = docManager.findWidget(path);

      // If widget is active, add indicator
      if (curWidget) {
        const context = docManager.contextForWidget(curWidget);
        if (context) {
          return context.contentsModel.type === 'notebook';
        }
      }
      return false;
    },
    execute: () => {
      let panelWidget = docManager.findWidget(path) as IDocumentWidget<
        NotebookPanel,
        DocumentRegistry.IModel
      >;
      // test.content.activeCell.model.metadata
      let test = panelWidget.content as NotebookPanel;
      test;

      let panel = panelWidget.content as any; // Should be NotebookPanel

      let cell: Cell = panel.activeCell;

      let cellMetadata = cell.model.metadata.toJSON();
      console.log(cellMetadata);

      if (!widget.isAttached) {
        labShell.add(widget, 'main');
      }
      app.shell.activateById(widget.id);
      pathChanged.emit(void 0);
    }
  });

  app.contextMenu.addItem({
    command: 'jupyterlab-metadata:openMetadataExplorer',
    selector: 'body',
    rank: Infinity
  });
}
