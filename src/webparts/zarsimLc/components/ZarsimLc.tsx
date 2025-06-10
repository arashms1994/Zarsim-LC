import * as React from 'react';
import styles from './ZarsimLc.module.scss';
import { IZarsimLcProps } from './IZarsimLcProps';

export default class ZarsimLc extends React.Component<IZarsimLcProps, {}> {
  public render(): React.ReactElement<IZarsimLcProps> {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>نمایش پیش فاکتور</h1>
      </div>
    );
  }
}
