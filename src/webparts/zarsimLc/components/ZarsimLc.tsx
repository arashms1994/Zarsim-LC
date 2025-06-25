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
      products: [],
      customer: {},
    };
  }

  async componentDidMount() {
    console.log("faktorNumber from props:", this.props.faktorNumber);
    const { faktorNumber } = this.props;
    const customer = await getCustomerFactor(faktorNumber);
    const products = await getCustomerFactorDetails(faktorNumber);

    console.log(faktorNumber);

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
