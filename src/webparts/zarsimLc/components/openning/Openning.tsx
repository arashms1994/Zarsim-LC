import * as React from "react";
import styles from "./Openning.module.scss";
import PersianDatePicker from "../persian-date-picker/PersianDatePicker";
import { FileUploader } from "../fileUploader/FileUploader";
import { formatNumberWithComma } from "../utils/formatNumberWithComma";
import { LCOpenningDates, settlementDates } from "../constants/Constants";
import { AddToOpenningDate } from "../api/AddData";

export default class Openning extends React.Component<any, any> {
  private sendRef: FileUploader | null = null;
  private reciveRef: FileUploader | null = null;

  constructor(props) {
    super(props);
    this.state = {
      LCTotalPrice: 0,
      LCNumber: "",
      LCOpenningDate: "",
      LCCommunicationDate: "",
      LCSettlementDate: "",
      LCOriginOpenningDate: "",
    };
  }

  handleChange = (event: any) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: name === "LCTotalPrice" ? Number(value.replace(/,/g, "")) : value,
    }));
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await AddToOpenningDate(this.state);
      alert("اطلاعات با موفقیت ثبت شد.");
    } catch (error) {
      console.error("خطا در ثبت اطلاعات:", error);
      alert("خطایی در ثبت اطلاعات رخ داد.");
    }
  };

  render() {
    const faktorNumber = this.props.faktorNumber;

    return (
      <div>
        <form className={styles.openningContainer} onSubmit={this.handleSubmit}>
          <div className={styles.openningDiv}>
            <label className={styles.openningLabel} htmlFor="LCOpenningDate">
              تاریخ گشایش:
            </label>
            <PersianDatePicker
              value={this.state.LCOpenningDate}
              onChange={(value: string) =>
                this.setState({
                  LCOpenningDate: value,
                })
              }
            />
          </div>

          <div className={styles.openningDiv}>
            <label className={styles.openningLabel} htmlFor="LCNumber">
              شماره اعتبار اسنادی:
            </label>
            <input
              className={styles.openningInput}
              type="text"
              name="LCNumber"
              value={this.state.LCNumber}
              onChange={this.handleChange}
              id="LCNumber"
            />
          </div>

          <div className={styles.openningDiv}>
            <label className={styles.openningLabel} htmlFor="LCTotalPrice">
              مبلغ اعتبار (ریال):
            </label>
            <input
              className={styles.openningInput}
              type="text"
              name="LCTotalPrice"
              value={formatNumberWithComma(this.state.LCTotalPrice)}
              onChange={this.handleChange}
              id="LCTotalPrice"
            />
          </div>

          <div className={styles.openningDiv}>
            <label
              className={styles.openningLabel}
              htmlFor="LCCommunicationDate"
            >
              تاریخ ابلاغ:
            </label>
            <PersianDatePicker
              value={this.state.LCCommunicationDate}
              onChange={(value: string) =>
                this.setState({
                  LCCommunicationDate: value,
                })
              }
            />
          </div>

          <div className={styles.openningDiv}>
            <label
              className={styles.openningLabel}
              htmlFor="LCOriginOpenningDate"
            >
              مبدا گشایش اعتبار:
            </label>
            <select
              name="LCOriginOpenningDate"
              id="LCOriginOpenningDate"
              className={styles.openningSelect}
              value={this.state.LCOriginOpenningDate}
              onChange={this.handleChange}
            >
              {LCOpenningDates.map(({ value, label }) => (
                <option
                  key={value || "empty"}
                  value={value}
                  className={styles.openningOption}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.openningDiv}>
            <label className={styles.openningLabel} htmlFor="LCSettlementDate">
              مدت زمان تسویه:
            </label>
            <select
              name="LCSettlementDate"
              id="LCSettlementDate"
              className={styles.openningSelect}
              value={this.state.LCSettlementDate}
              onChange={this.handleChange}
            >
              {settlementDates.map(({ value, label }) => (
                <option
                  key={value || "empty"}
                  value={value}
                  className={styles.openningOption}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.openningDiv}>
            <label
              className={styles.openningLabel}
              htmlFor="openningUploadFile"
            >
              آپلود ابلاغیه:
            </label>
            <FileUploader
              ref={(el) => (this.sendRef = el)}
              orderNumber={faktorNumber}
              subFolder={"گشایش و ابلاغ"}
            />
          </div>

          <button type="submit" className={styles.openningSubmitButton}>
            ثبت اطلاعات
          </button>
        </form>
        <p className={styles.openningFileUploaderP}>
          * آپلود ابلاغیه مهر و امضادار اجباری میباشد.
        </p>
      </div>
    );
  }
}
