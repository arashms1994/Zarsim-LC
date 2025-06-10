import * as React from "react";
import styles from "./Opening.module.scss";
import PersianDatePicker from "../persian-date-picker/PersianDatePicker";
import { FileUploader } from "../file-uploader/FileUploader";

export interface OpeningState {
  LCTotalPrice: string;
  LCOpeningDate: string;
  settlementDate: string;
}

const LCOpeningDates = [
  { value: "", label: "لطفا یک گزینه را انتخاب کنید" },
  { value: "openingDate", label: "تاریخ گشایش/ابلاغ" },
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

export default class Opening extends React.Component<{}, OpeningState> {
  state: OpeningState = {
    LCTotalPrice: "",
    LCOpeningDate: "",
    settlementDate: "",
  };

  handleChange = (event: any) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<OpeningState, keyof OpeningState>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", this.state);
  };

  render() {
    return (
      <div>
        <form className={styles.openingContainer} onSubmit={this.handleSubmit}>
          <div className={styles.openingDiv}>
            <label className={styles.openingLabel} htmlFor="LCTotalPrice">
              تاریخ گشایش:
            </label>
            <PersianDatePicker />
          </div>

          <div className={styles.openingDiv}>
            <label className={styles.openingLabel} htmlFor="LCTotalPrice">
              مبلغ اعتبار (ریال):
            </label>
            <input
              className={styles.openingInput}
              type="text"
              name="LCTotalPrice"
              value={this.state.LCTotalPrice}
              onChange={this.handleChange}
              id="LCTotalPrice"
            />
          </div>

          <div className={styles.openingDiv}>
            <label className={styles.openingLabel} htmlFor="LCOpeningDate">
              مبدا گشایش اعتبار:
            </label>
            <select
              name="LCOpeningDate"
              id="LCOpeningDate"
              className={styles.openingSelect}
              value={this.state.LCOpeningDate}
              onChange={this.handleChange}
            >
              {LCOpeningDates.map(({ value, label }) => (
                <option
                  key={value || "empty"}
                  value={value}
                  className={styles.openingOption}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.openingDiv}>
            <label className={styles.openingLabel} htmlFor="settlementDate">
              مدت زمان تسویه:
            </label>
            <select
              name="settlementDate"
              id="settlementDate"
              className={styles.openingSelect}
              value={this.state.settlementDate}
              onChange={this.handleChange}
            >
              {settlementDates.map(({ value, label }) => (
                <option
                  key={value || "empty"}
                  value={value}
                  className={styles.openingOption}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.openingDiv}>
            <label className={styles.openingLabel} htmlFor="openingUploadFile">
              آپلود ابلاغیه:
            </label>
            <FileUploader />
          </div>

          <button type="submit" className={styles.openingSubmitButton}>ثبت تغییرات</button>
        </form>
        <p className={styles.openingFileUploaderP}>
          آپلود ابلاغیه مهر و امضادار اجباری میباشد.
        </p>
      </div>
    );
  }
}
