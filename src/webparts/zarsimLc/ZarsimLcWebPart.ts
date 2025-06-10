import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "ZarsimLcWebPartStrings";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";
import AppRouter from "./components/router/AppRouter";
import { IZarsimLcWebPartProps } from "./components/IZarsimLcProps";

export default class ZarsimLcWebPart extends BaseClientSideWebPart<IZarsimLcWebPartProps> {
  public render(): void {
    ReactDom.render(
      React.createElement(AppRouter, {
        description: this.properties.description,
      }),
      this.domElement
    );
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
