import * as React from "react";
import styles from "../ZarsimLc.module.scss";
import CarryForm from "./CarryForm";
import { getCustomerFactorDetails } from "../api/GetData";

export default class Carry extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: "",
      faktorNumber: "",
    };
  }

  public render() {
    const { faktorNumber } = this.props;

    return (
      <div className={styles.container}>
        <CarryForm
          faktorNumber={faktorNumber}
        />
      </div>
    );
  }
}
