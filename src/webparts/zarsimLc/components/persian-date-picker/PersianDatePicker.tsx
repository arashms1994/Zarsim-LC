import * as React from "react";
import {
  pad,
  getTodayPersianDate,
  formatPersianDate,
  getJalaaliMonthLength,
} from "../utils/PersianCalendarUtils";
import styles from "./PersianDatePicker.module.scss";
import moment = require("moment");
import { PersianDatePickerProps } from "../IZarsimLcProps";

export class PersianDatePicker extends React.Component<any, any> {
  private inputElement: HTMLInputElement | null;

  constructor(props: PersianDatePickerProps) {
    super(props);
    const today = getTodayPersianDate();

    this.state = {
      showCalendar: false,
      selectedDate: props.value || "",
      currentYear: today.year,
      currentMonth: today.month,
    };
    this.inputElement = null;

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  toggleCalendar() {
    this.setState({
      showCalendar: !this.state.showCalendar,
    });
  }

  selectDate(year: number, month: number, day: number) {
    const formatted = formatPersianDate(year, month, day);

    this.setState({
      selectedDate: formatted,
      showCalendar: false,
    });
    if (this.props.onChange) {
      this.props.onChange(formatted);
    }
  }

  renderDays() {
    const daysInMonth = getJalaaliMonthLength(
      this.state.currentYear,
      this.state.currentMonth
    );

    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(
        <button
          type="button"
          key={d}
          onClick={() =>
            this.selectDate(this.state.currentYear, this.state.currentMonth, d)
          }
          className={styles.dayButton}
        >
          {d}
        </button>
      );
    }
    return days;
  }

  prevMonth() {
    let month = this.state.currentMonth - 1;
    let year = this.state.currentYear;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
    this.setState({
      currentMonth: month,
      currentYear: year,
    });
  }

  nextMonth() {
    let month = this.state.currentMonth + 1;
    let year = this.state.currentYear;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    this.setState({
      currentMonth: month,
      currentYear: year,
    });
  }

  renderCalendar() {
    if (!this.state.showCalendar) return null;

    return (
      <div className={styles.calendarPopup}>
        <div className={styles.calendarHeader}>
          <button
            type="button"
            className={styles.calendarHeaderBtn}
            onClick={this.prevMonth}
          >
            «
          </button>
          <span className={styles.calendarHeaderText}>
            {this.state.currentMonth} / {this.state.currentYear}
          </span>
          <button
            type="button"
            className={styles.calendarHeaderBtn}
            onClick={this.nextMonth}
          >
            »
          </button>
        </div>
        <div className={styles.calendarGrid}>{this.renderDays()}</div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.persianDatepicker}>
        <input
          {...this.props.inputProps}
          value={this.state.selectedDate}
          ref={(el) => {
            this.inputElement = el;
          }}
          onFocus={this.toggleCalendar}
          readOnly
          placeholder="یک تاریخ را انتخاب کنید"
          className={styles.datePickerInput}
        />
        {this.renderCalendar()}
      </div>
    );
  }
}

export default PersianDatePicker;
