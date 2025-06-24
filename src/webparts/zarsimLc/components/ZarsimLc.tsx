import * as React from "react";
import styles from "./ZarsimLc.module.scss";
import { IZarsimLcProps } from "./IZarsimLcProps";
import { getCustomerFactor, getCustomerFactorDetails } from "./api/GetData";
require("./Font.css");

export default class ZarsimLc extends React.Component<IZarsimLcProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      faktorNumber: "",
      products: [],
      customer: [],
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    // const faktorNumber = params.get("Factor_ID");
    const faktorNumber = "4-70105-1";
    const customer = await getCustomerFactor(faktorNumber);
    const products = await getCustomerFactorDetails(faktorNumber);

    this.setState({
      faktorNumber: faktorNumber,
      products: products,
      customer: customer,
    });
  }

  public render(): React.ReactElement<IZarsimLcProps> {
    console.log(this.state.faktorNumber);
    return (
      <div className={styles.LCContainer}>
        
      </div>
    );
  }
}
