import { JupyterLab } from "@jupyterlab/application";
import { ICommandPalette } from "@jupyterlab/apputils";

import { IMetadataCommentsService } from "../metadata_iface/comments";
import { IMetadataDatasetsService } from "../metadata_iface/datasets";

import { MetadataWidget } from "./widget";

export function activateMetadataUI(
  app: JupyterLab,
  palette: ICommandPalette,
  comments: IMetadataCommentsService,
  datasets: IMetadataDatasetsService
): void {
  console.log("JupyterLab extension jupyterlab-metadata-service is activated!");
  console.log("Comments: ", comments);

  // Create a single widget
  let widget: MetadataWidget = new MetadataWidget(comments, datasets);

  // Add an application command
  const command: string = "jlab-metadata-service:open";
  app.commands.addCommand(command, {
    label: "Metadata Service",
    execute: async () => {
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.addToMainArea(widget);
      }
      widget.update();
      // Activate the widget
      app.shell.activateById(widget.id);
    }
  });

  // Add the command to the palette.
  palette.addItem({ command, category: "Metadata" });
}
