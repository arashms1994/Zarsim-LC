import * as React from "react";
import styles from "./ZarsimLc.module.scss";
import { IZarsimLcProps } from "./IZarsimLcProps";
import { getCustomerFactor } from "./api/GetData";
require("./Font.css");

export default class ZarsimLc extends React.Component<IZarsimLcProps, {}> {
  async componentDidMount() {
    const factors = await getCustomerFactor()
    console.log(factors);
  }

  public render(): React.ReactElement<IZarsimLcProps> {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>نمایش پیش فاکتور</h1>
      </div>
    );
  }
}
