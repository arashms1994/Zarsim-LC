import * as React from "react";
import styles from "./Faktor.module.scss";

export default class FaktorDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { products } = this.props;

    if (!products || Object.keys(products).length === 0) {
      return <div>در حال بارگذاری...</div>;
    }

    console.log(products);
    return (
      <div className={styles.faktorContainer}>
        <div className={styles.faktorHeaderDiv}>
          <h1>جزئیات پیش فاکتور</h1>
        </div>
        {products.map((p) => (
          <div style={{display:"flex", justifyContent:"space-around"}} key={p.id}>
            <p>{p.Title}</p>
            <p>{p.colertitle}</p>
            <p>{p.Category}</p>
            <p>{p.Packing}</p>
            <p>{p.Price}</p>
            <p>{p.Value}</p>
          </div>
        ))}
      </div>
    );
  }
}
