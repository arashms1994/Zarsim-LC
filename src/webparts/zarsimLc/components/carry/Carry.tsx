import * as React from "react";
import styles from "../ZarsimLc.module.scss";
import CarryForm from "./CarryForm";

export default class Carry extends React.Component<any, any> {
  public render() {
    return (
      <div className={styles.container}>
        <CarryForm />
      </div>
    );
  }
}
