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

    return (
      <div className={styles.faktorContainer}>
        <div className={styles.faktorHeaderDiv}>
          <h1>جزئیات پیش فاکتور</h1>
        </div>
        <table className={styles.faktorTable}>
          <thead className={styles.faktorTableHeader}>
            <th className={styles.faktorTableHeaderRow}>
              <td className={styles.faktorTableHeaderCell}>ردیف</td>
              <td className={styles.faktorTableHeaderCell}>شرح محصول</td>
              <td className={styles.faktorTableHeaderCell}>رنگ</td>
              <td className={styles.faktorTableHeaderCell}>دسته بندی</td>
              <td className={styles.faktorTableHeaderCell}>بسته بندی</td>
              <td className={styles.faktorTableHeaderCell}>قیمت واحد</td>
              <td className={styles.faktorTableHeaderCell}>بهای کالا</td>
            </th>
          </thead>
          <tbody className={styles.faktorTableBody}>
            {products.map((p, i) => (
              <tr className={styles.faktorTableBodyRow} key={p.id}>
                <td className={styles.faktorTableBodyCell}>{i + 1}</td>
                <td className={styles.faktorTableBodyCell}>{p.Title}</td>
                <td className={styles.faktorTableBodyCell}>{p.colertitle}</td>
                <td className={styles.faktorTableBodyCell}>{p.Category}</td>
                <td className={styles.faktorTableBodyCell}>{p.Packing}</td>
                <td className={styles.faktorTableBodyCell}>{p.Price}</td>
                <td className={styles.faktorTableBodyCell}>{p.Value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
