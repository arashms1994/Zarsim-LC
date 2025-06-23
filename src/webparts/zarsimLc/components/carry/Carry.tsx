import * as React from "react";
import styles from "../ZarsimLc.module.scss";
import CarryForm from "./CarryForm";

export default class Carry extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const faktorNumber = this.props.faktorNumber;

    return (
      <div className={styles.container}>
        <CarryForm faktorNumber={faktorNumber} />
      </div>
    );
  }
}
