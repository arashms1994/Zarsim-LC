import * as React from "react";
import styles from "./ZarsimLc.module.scss";
import { IZarsimLcProps } from "./IZarsimLcProps";
import { getCustomerFactor } from "./api/GetData";
import Faktor from "./faktor/Faktor";
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
    const params = new URLSearchParams(window.location.search);
    const faktorNumber = params.get("Factor_ID") || "4-70105-1";

    try {
      const customer = (await getCustomerFactor(faktorNumber)).item;

      this.setState({ customer });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  public render(): React.ReactElement<IZarsimLcProps> {
    const { customer, products } = this.state;

    return (
      <div className={styles.LCContainer}>
        <Faktor customer={customer} />
      </div>
    );
  }
}
