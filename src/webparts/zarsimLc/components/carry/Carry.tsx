import * as React from "react";
import styles from "../ZarsimLc.module.scss";
import CarryForm from "./CarryForm";

export default class Carry extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      faktorNumber: "",
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const faktorNumber = params.get("Factor_ID") || "4-70105-1";

    this.setState({ faktorNumber });
  }

  public render() {
    const { faktorNumber } = this.state;

    if (!faktorNumber || Object.keys(faktorNumber).length === 0) {
      return <div>در حال بارگذاری...</div>;
    }

    return (
      <div className={styles.LCContainer}>
        <CarryForm faktorNumber={faktorNumber} />
      </div>
    );
  }
}
