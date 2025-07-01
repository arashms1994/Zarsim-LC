import * as React from "react";
import styles from "./ChooseProduct.module.scss";
import { AddToCarryReceipt } from "../../api/AddData";
import SearchBar from "../search/Search";

export default class ChooseProduct extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchQuery: "",
      showMessage: false,
      faktorNumber: "",
      products: [],
    };
  }

  handleSearchChange = (e: any) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { searchQuery, showMessage } = this.state;
    const { products, onAddProduct } = this.props;

    if (!products || Object.keys(products).length === 0) {
      return <div>در حال بارگذاری...</div>;
    }

    const filteredItems = searchQuery.trim()
      ? products.filter(
          (item) =>
            (item.Title && item.Title.includes(searchQuery)) ||
            (item.Code && item.Code.includes(searchQuery))
        )
      : products;

    return (
      <div className={styles.shopPopupDiv}>
        <div className={styles.shopPopupHeader}>
          <h2 className={styles.shopPopupHeading}>لیست محصولات</h2>
          <SearchBar value={searchQuery} onChange={this.handleSearchChange} />
        </div>

        <ul className={styles.shopPopupUL}>
          {filteredItems.map((p, i) => (
            <li className={styles.shopPopupItem} key={i}>
              <span className={styles.shopPopupIndex}>{p.Product}</span>
              {p.Title}
              <button
                type="button"
                onClick={() => onAddProduct(p)}
                className={styles.shopPopupAddButton}
              >
                افزودن به سبد خرید
              </button>
            </li>
          ))}
        </ul>

        {showMessage && (
          <div className={styles.successMessage}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
            <span>کالا با موفقیت به سبد خرید اضافه شد</span>
            <button
              className={styles.closeBtn}
              onClick={() => this.setState({ showMessage: false })}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  }
}
