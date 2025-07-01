import * as React from "react";
import styles from "./Faktor.module.scss";
import { formatNumberWithComma } from "../utils/formatNumberWithComma";

export default class Faktor extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { customer } = this.props;

    const customerDetails = [
      { label: "شماره پیش فاکتور:", value: customer.Title },
      { label: "تاریخ ثبت پیش فاکتور:", value: customer.Date },
      { label: "نام مشتری:", value: customer.Customer },
      { label: "نوع پیش فاکتور:", value: customer.type_factor },
      { label: "مجموع مس (CU):", value: customer.MainTotalCu },
      { label: "مجموع مس-قلع (TICU):", value: customer.MainTotakTICU },
      { label: "جمع کل (ريال):", value: customer.total_SUM },
      {
        label: "تخفیف (ريال):",
        value: formatNumberWithComma(customer.takhfif),
      },
      {
        label: "عوارض و مالیات (ريال):",
        value: formatNumberWithComma(customer.avarez),
      },
      {
        label: "مبلغ کل (ريال):",
        value: formatNumberWithComma(customer.total_mani),
      },
    ];

    if (!customer || Object.keys(customer).length === 0) {
      return (
        <div className={styles.faktorLoadingContainer}>
          <div className={styles.faktorLoadingSpinner}></div>
          <span className={styles.faktorLoadingSpinnerSpan}>
            در حال بارگذاری...
          </span>
        </div>
      );
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

          {customerDetails.map((item, index) => (
            <div key={index} className={styles.faktorParaphDiv}>
              <p className={styles.faktorLabel}>{item.label}</p>
              <p className={styles.faktorParaph}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
