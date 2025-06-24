import * as React from "react";
import styles from "./ZarsimLc.module.scss";
import { IZarsimLcProps } from "./IZarsimLcProps";
import { getCustomerFactor, getCustomerFactorDetails } from "./api/GetData";
import Faktor from "./faktor/Faktor";
import FaktorDetail from "./faktor/FaktorDetail";
require("./Font.css");

export default class ZarsimLc extends React.Component<IZarsimLcProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      faktorNumber: "",
      products: [],
      customer: {},
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    // const faktorNumber = params.get("Factor_ID");
    const faktorNumber = "4-70105-1";
    await this.setState({
      faktorNumber: faktorNumber,
    });

    const customer = await getCustomerFactor(faktorNumber);
    const products = await getCustomerFactorDetails(faktorNumber);

    this.setState({
      products: products,
      customer: customer,
    });
  }

  public render(): React.ReactElement<IZarsimLcProps> {
    const { customer, products } = this.state;

    return (
      <div className={styles.LCContainer}>
        <Faktor customer={customer} />
        <FaktorDetail products={products} />
      </div>
    );
  }
}
