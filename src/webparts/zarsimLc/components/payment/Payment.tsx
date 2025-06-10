import * as React from "react";
import styles from "../ZarsimLc.module.scss";

export default class Payment extends React.Component<any, any> {
  public render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>پیگیری تعهد پرداخت</h1>
      </div>
    );
  }
}