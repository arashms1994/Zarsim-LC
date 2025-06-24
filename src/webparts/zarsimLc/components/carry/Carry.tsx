import * as React from "react";
import styles from "../ZarsimLc.module.scss";
import CarryForm from "./CarryForm";

export default class Carry extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { faktorNumber } = this.props;

    return (
      <div className={styles.LCContainer}>
        <CarryForm faktorNumber={faktorNumber} />
      </div>
    );
  }
}
