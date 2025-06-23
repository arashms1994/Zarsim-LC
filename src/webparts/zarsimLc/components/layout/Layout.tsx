import * as React from "react";
import styles from "./Layout.module.scss";
import {
  goCarry,
  goOpenning,
  goPeyment,
  goPreInvoice,
} from "../utils/ChangeTabs";

export class Layout extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      faktorNumber: "",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  getButtonClass(targetPath) {
    const { pathname } = this.props.location;
    return pathname === targetPath ? styles.activeTabBtn : styles.tabBtn;
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    // const faktorNumber = params.get("Factor_ID");
    const faktorNumber = "4-70105-1";

    this.setState({ faktorNumber: faktorNumber });
  }

  public render() {
    const { faktorNumber, searchQuery } = this.state;

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
            پیگیری تعهد پرداخت{" "}
          </button>
        </header>
        <main>
          {React.cloneElement(this.props.children, {
            searchQuery: searchQuery,
            faktorNumber: faktorNumber,
          })}
        </main>
      </div>
    );
  }
}
