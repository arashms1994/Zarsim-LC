import * as React from "react";
import styles from "./Openning.module.scss";
import PersianDatePicker from "../persian-date-picker/PersianDatePicker";
import { FileUploader } from "../file-uploader/FileUploader";
import { formatNumberWithComma } from "../utils/formatNumberWithComma";

export interface OpenningState {
  LCTotalPrice: number;
  LCOpenningDate: string;
  settlementDate: string;
}

const LCOpenningDates = [
  { value: "", label: "لطفا یک گزینه را انتخاب کنید" },
  { value: "openningDate", label: "تاریخ گشایش/ابلاغ" },
  { value: "shippingDate", label: "تاریخ حمل/بارنامه" },
  { value: "invoiceDate", label: "تاریخ فاکتور" },
];
const settlementDates = [
  { value: "", label: "لطفا یک گزینه را انتخاب کنید" },
  { value: "45", label: "45" },
  { value: "60", label: "60" },
  { value: "75", label: "75" },
  { value: "90", label: "90" },
  { value: "120", label: "120" },
];

export default class Openning extends React.Component<{}, OpenningState> {
  state: OpenningState = {
    LCTotalPrice: 0,
    LCOpenningDate: "",
    settlementDate: "",
  };

  handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "LCTotalPrice") {
      const numericValue = Number(value.replace(/,/g, ""));
      this.setState({ [name]: numericValue } as Pick<
        OpenningState,
        keyof OpenningState
      >);
    } else {
      this.setState({ [name]: value } as Pick<
        OpenningState,
        keyof OpenningState
      >);
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", this.state);
  };

  render() {
    return (
      <div>
        <form className={styles.openningContainer} onSubmit={this.handleSubmit}>
          <div className={styles.openningDiv}>
            <label className={styles.openningLabel} htmlFor="LCTotalPrice">
              تاریخ گشایش:
            </label>
            <PersianDatePicker />
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
            <label className={styles.openningLabel} htmlFor="LCOpenningDate">
              مبدا گشایش اعتبار:
            </label>
            <select
              name="LCOpenningDate"
              id="LCOpenningDate"
              className={styles.openningSelect}
              value={this.state.LCOpenningDate}
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
            <label className={styles.openningLabel} htmlFor="settlementDate">
              مدت زمان تسویه:
            </label>
            <select
              name="settlementDate"
              id="settlementDate"
              className={styles.openningSelect}
              value={this.state.settlementDate}
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
            <FileUploader />
          </div>

          <button type="submit" className={styles.openningSubmitButton}>
            ثبت تغییرات
          </button>
        </form>
        <p className={styles.openningFileUploaderP}>
          آپلود ابلاغیه مهر و امضادار اجباری میباشد.
        </p>
      </div>
    );
  }
}
