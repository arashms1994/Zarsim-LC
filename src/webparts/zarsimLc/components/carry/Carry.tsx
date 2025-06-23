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

  async componentDidMount() {
    const { faktorNumber } = await this.props;
    const products = await getCustomerFactorDetails(faktorNumber);

    console.log(products,faktorNumber);
    this.setState({ products: products, faktorNumber: faktorNumber });
  }

  public render() {
    return (
      <div className={styles.container}>
        <CarryForm
          faktorNumber={this.state.faktorNumber}
          products={this.state.products}
        />
      </div>
    );
  }
}
