import * as React from "react";
import {
  pad,
  getTodayPersianDate,
  formatPersianDate,
} from "../utils/PersianCalendarUtils";
import styles from "./PersianDatePicker.module.scss";
import moment = require("moment");
import { PersianDatePickerProps } from "../IZarsimLcProps";

export class PersianDatePicker extends React.Component<any, any> {
  private inputElement: HTMLInputElement | null;

  constructor(props: PersianDatePickerProps) {
    super(props);
    const today = getTodayPersianDate();
    console.log("today from jdToPersian:", today);

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
    console.log("ورودی selectDate:", { year, month, day });

    const formatted = formatPersianDate(year, month, day);
    console.log("تاریخ انتخاب شده:", formatted);

    this.setState({
      selectedDate: formatted,
      showCalendar: false,
    });
    if (this.props.onChange) {
      this.props.onChange(formatted);
    }
  }

  renderDays() {
    const daysInMonth = moment(
      `${this.state.currentYear}/${pad(this.state.currentMonth)}/01`,
      "jYYYY/jMM/jDD"
    ).daysInMonth();

    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(
        <button
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
      console.log("ماه قبلی:", year, month);
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
      console.log("ماه بعدی:", year, month);
    }
    this.setState({
      currentMonth: month,
      currentYear: year,
    });
  }

  renderCalendar() {
    console.log("نمایش تقویم:", !this.state.showCalendar);

    if (!this.state.showCalendar) return null;

    return (
      <div className={styles.calendarPopup}>
        <div className={styles.calendarHeader}>
          <button onClick={this.prevMonth}>«</button>
          <span>
            {this.state.currentYear} / {this.state.currentMonth}
          </span>
          <button onClick={this.nextMonth}>»</button>
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
        />
        {this.renderCalendar()}
      </div>
    );
  }
}

export default PersianDatePicker;
