import * as React from "react";
import styles from "./Faktor.module.scss";

export default class Faktor extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { customer } = this.props;

    if (!customer || Object.keys(customer).length === 0) {
      return <div>در حال بارگذاری...</div>;
    }

    return (
      <div className={styles.faktorContainer}>
        <div className={styles.faktorHeaderDiv}>
          <h1>مشخصات مشتری</h1>
        </div>

        <div className={styles.faktorHero}>
          <div className={styles.faktorLinkDiv}>
            <a
              href={`http://portal/Lists/customer_factor/DispForm.aspx?ID=${customer.ID}`}
              className={styles.faktorLink}
            >
              مشاهده کامل پیش فاکتور
            </a>
          </div>
          
          <div className={styles.faktorParaphDiv}>
            <p className={styles.faktorLabel}>شماره پیش فاکتور:</p>
            <p className={styles.faktorParaph}>{customer.Title}</p>
          </div>

          <div className={styles.faktorParaphDiv}>
            <p className={styles.faktorLabel}>تاریخ ثبت پیش فاکتور:</p>
            <p className={styles.faktorParaph}>{customer.Date}</p>
          </div>

          <div className={styles.faktorParaphDiv}>
            <p className={styles.faktorLabel}>نام مشتری:</p>
            <p className={styles.faktorParaph}>{customer.Customer}</p>
          </div>

          <div className={styles.faktorParaphDiv}>
            <p className={styles.faktorLabel}>نوع پیش فاکتور:</p>
            <p className={styles.faktorParaph}>{customer.type_factor}</p>
          </div>
        </div>
      </div>
    );
  }
}
