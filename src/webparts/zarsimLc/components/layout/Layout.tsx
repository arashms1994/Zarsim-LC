import * as React from "react";
import styles from "./Layout.module.scss";
import classNames from "classnames";
import {
  goCarry,
  goOpenning,
  goPeyment,
  goPreInvoice,
} from "../utils/ChangeTabs";

export class Layout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchQuery: "",
      faktorNumber: "",
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const faktorNumber = params.get("Factor_ID") || "4-70105-1";
    this.setState({ faktorNumber });
  }

  handleSearchChange = (event: any) => {
    this.setState({ searchQuery: event.target.value });
  };

  getButtonClass = (targetPath: string) => {
    return classNames(styles.tabBtn, {
      [styles.activeTabBtn]: this.props.location.pathname === targetPath,
    });
  };

  render() {
    const { searchQuery, faktorNumber } = this.state;

    return (
      <div className={styles.Layout}>
        <header className={styles.Header}>
          <button onClick={goPreInvoice} className={this.getButtonClass("/")}>
            نمایش پیش فاکتور
          </button>

          <button
            onClick={goOpenning}
            className={this.getButtonClass("/openning")}
          >
            گشایش و ابلاغ
          </button>

          <button onClick={goCarry} className={this.getButtonClass("/carry")}>
            حمل و بارگیری
          </button>

          <button
            onClick={goPeyment}
            className={this.getButtonClass("/payment")}
          >
            پیگیری تعهد پرداخت
          </button>
        </header>

        <main>
          {React.cloneElement(this.props.children, {
            searchQuery,
            faktorNumber,
          })}
        </main>
      </div>
    );
  }
}
