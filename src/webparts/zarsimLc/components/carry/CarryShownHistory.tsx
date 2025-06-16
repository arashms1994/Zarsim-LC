import * as React from "react";
import { Component } from "react";
import styles from "./CarryShownHistory.module.scss";

export default class CarryShownHistory extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      EventRecive: [],
      EventSend: [],
    };
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.selectContainer}>
          <div className={styles.ColData}>
            <div className={styles.ColDataDiv}>
              <small className={styles.ColDataSmall}>نوع رویداد</small>
              <p
                className={
                  this.props.Event_Type === "phoneNumber"
                    ? styles.pPhone
                    : this.props.Event_Type === "whatsapp"
                    ? styles.pWhatsApp
                    : this.props.Event_Type === "telegram"
                    ? styles.pTelegram
                    : this.props.Event_Type === "email"
                    ? styles.pEmail
                    : styles.pPeresental
                }
              >
                {this.props.Event_Type === "phoneNumber"
                  ? "تماس تلفنی"
                  : this.props.Event_Type === "whatsapp"
                  ? "واتساپ"
                  : this.props.Event_Type === "telegram"
                  ? "تلگرام"
                  : this.props.Event_Type === "email"
                  ? "ایمیل"
                  : "حضوری"}
              </p>
            </div>

            <div className={styles.ColDataDiv}>
              <small className={styles.ColDataSmall}>وضعیت سفارش</small>
              <p className={styles.ColDataP}>{this.props.Order_Status}</p>
            </div>
          </div>
          <div className={styles.ColData}>
            <div className={styles.ColDataDiv}>
              <small className={styles.ColDataSmall}>ایجاد شده توسط </small>
              <p className={styles.ColDataP}>{this.props.Display_Name}</p>
            </div>
            <div className={styles.ColDataDiv}>
              <small className={styles.ColDataSmall}> تاریخ ایجاد </small>
            </div>
          </div>
        </div>
        <div className={styles.Description}>
          <p className={styles.descriptionP}>توضیحات</p>
          <div className={styles.descriptionDiv}>{this.props.Description}</div>
        </div>
        <div className={styles.colDataLinks}>
          {this.state.EventRecive.map((e, i) => (
            <div className={styles.ColDataLinkRecive}>
              <a href={e.url} key={i} download>
                {e.name}
              </a>
              <small>فایل دریافتی</small>
            </div>
          ))}
          {this.state.EventSend.map((e, i) => (
            <div className={styles.ColDataLinkSend}>
              <a href={e.url} key={i} download>
                {e.name}
              </a>
              <small>فایل ارسالی</small>
            </div>
          ))}
        </div>
      </div>
    );
  }
}