import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ZarsimLcWebPartStrings';
import ZarsimLc from './components/ZarsimLc';
import { IZarsimLcProps } from './components/IZarsimLcProps';

export interface IZarsimLcWebPartProps {
  description: string;
}

export default class ZarsimLcWebPart extends BaseClientSideWebPart<IZarsimLcWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IZarsimLcProps > = React.createElement(
      ZarsimLc,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
