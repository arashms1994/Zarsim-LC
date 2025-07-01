import * as React from "react";
import { Component } from "react";
import styles from "./Carry.module.scss";
import { FileUploader } from "../fileUploader/FileUploader";
import ChooseProduct from "./product/ChooseProduct";
import {
  getCustomerFactorDetails,
  getExitRequestsByOrderNumber,
  getLCNumberAndTotalPrice,
} from "../api/GetData";
import { AddToCarryReceipt } from "../api/AddData";
import Guid from "../utils/CreateGUID";
import {
  calculateExitSummary,
  formatRial,
} from "../utils/calculateExitSummary";

export default class CarryForm extends Component<any, any> {
  private fileUploaders: any[] = [];

  constructor(props: any) {
    super(props);
    this.fileUploaders = [];

    this.state = {
      products: [],
      faktorNumber: "",
      selectedProducts: [],
      productCounts: {},
      lcNumber: "",
      exitRequests: [],
      totalMablagh: 0,
      totalMetraj: 0,
      LCNumber: "",
      TotalPrice: "",
    };

    this.uploadAllFiles = this.uploadAllFiles.bind(this);
  }

  uploadAllFiles = () => {
    this.fileUploaders.forEach((uploader) => {
      if (uploader && uploader.uploadFile) {
        uploader.uploadFile();
      }
    });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { lcNumber, selectedProducts, productCounts } = this.state;

    try {
      for (const product of selectedProducts) {
        const countStr = productCounts[product.Product] || "0";
        const count = parseFloat(countStr);
        const price = parseFloat(product.Price);

        if (isNaN(count) || count <= 0) {
          continue;
        }

        if (isNaN(price) || price <= 0) {
          console.warn(`قیمت محصول ${product.Title} نامعتبر است`);
          continue;
        }

        await AddToCarryReceipt({
          Title: product.Title,
          GUID: localStorage.getItem("GUID") || "",
          TotalPrice: price * count,
          LCNumber: lcNumber,
          Price: price,
          Count: count,
        });
      }

      alert("اطلاعات با موفقیت ثبت شد.");
      this.setState({
        selectedProducts: [],
        productCounts: {},
      });
      localStorage.removeItem("GUID");
    } catch (error) {
      console.error("خطا در ثبت اطلاعات:", error);
      alert("خطایی در ثبت اطلاعات رخ داد.");
    }
  };

  handleRemoveProduct = (productId: string) => {
    this.setState((prevState) => {
      const updatedProducts = prevState.selectedProducts.filter(
        (item) => item.Product !== productId
      );

      const updatedCounts: any = {};
      for (let key in prevState.productCounts) {
        if (key !== productId) {
          updatedCounts[key] = prevState.productCounts[key];
        }
      }

      return {
        selectedProducts: updatedProducts,
        productCounts: updatedCounts,
      };
    });
  };

  handleCountChange = (productKey: string, value: string) => {
    this.setState((prevState: any) => ({
      productCounts: {
        ...prevState.productCounts,
        [productKey]: value,
      },
    }));
  };

  handleAddProduct = (product: any) => {
    this.setState((prevState: any) => ({
      selectedProducts: [...prevState.selectedProducts, product],
      chooseProduct: false,
    }));
  };

  async componentDidMount() {
    const { faktorNumber } = this.props;
    const products = await getCustomerFactorDetails(faktorNumber);
    const exitRequests = await getExitRequestsByOrderNumber(faktorNumber);
    // const summary = calculateExitSummary(exitRequests);
    // console.log("متراژ کل:", summary.totalMetraj);
    // console.log("مبلغ کل:", formatRial(summary.totalMablagh));

    setTimeout(async () => {
      const { LCNumber, TotalPrice } = await getLCNumberAndTotalPrice(
        faktorNumber
      );
      this.setState({ LCNumber, TotalPrice });
    }, 1000);
    this.setState({
      products,
      faktorNumber,
      exitRequests,
      // totalMablagh,
      // totalMetraj,
    });
    console.log(this.state.LCNumber, this.state.TotalPrice);
    console.log(exitRequests);
    // console.log("مجموع متراژ:", totalMetraj);
    // console.log("مجموع مبلغ:", totalMablagh);
  }

  render() {
    const { products, faktorNumber, exitRequests, totalMetraj, totalMablagh } =
      this.state;
    const subFolder = Guid();

    if (!exitRequests || Object.keys(exitRequests).length === 0) {
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
      <div className={styles.carryContainer}>
        <form className={styles.carryForm} onSubmit={this.handleSubmit}>
          <div className={styles.caryReceiptContainer}>
            <div className={styles.carrySelectedProductContainer}>
              <div className={styles.carrySelectedProductUL}>
                {exitRequests &&
                  exitRequests.map(
                    (item: {
                      ID: React.Key;
                      goodsname: any;
                      metrajdarkhast: any;
                      date_k: any;
                    }) => (
                      <div
                        key={item.ID}
                        className={styles.carrySelectedProductDiv}
                      >
                        <p className={styles.carrySelectedProductText}>
                          {item.goodsname}
                        </p>
                        <p className={styles.carrySelectedProductText}>
                          <span className={styles.carrySelectedProductText}>
                            متر:
                          </span>
                          {item.metrajdarkhast}
                        </p>
                        <p className={styles.carrySelectedProductText}>
                          <span className={styles.carrySelectedProductText}>
                            ریال:
                          </span>
                          {item.date_k}
                        </p>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className={styles.carrySelectedProductDiv}>
              <div className={styles.carrySelectedProductDiv}>
                <p className={styles.carrySelectedProductText}>
                  <span className={styles.carrySelectedProductText}>
                    مجموع متراژ:
                  </span>
                  {totalMetraj}
                </p>
              </div>
              <div className={styles.carrySelectedProductDiv}>
                <p className={styles.carrySelectedProductText}>
                  <span className={styles.carrySelectedProductText}>
                    مبلغ کل:
                  </span>
                  {totalMablagh}
                </p>
              </div>
            </div>
            <div className={styles.carryFormBtnContainer}>
              <button type="submit" className={styles.carrySubmitButton}>
                ثبت اطلاعات رسید حمل
              </button>
            </div>
          </div>
        </form>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel}>آپلود صورتحساب فروش:</label>
          <FileUploader
            ref={(el) => el && (this.fileUploaders[0] = el)}
            orderNumber={faktorNumber}
            subFolder={subFolder}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel}>آپلود لیست دسته بندی:</label>
          <FileUploader
            ref={(el) => el && (this.fileUploaders[1] = el)}
            orderNumber={faktorNumber}
            subFolder={subFolder}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel}>آپلود گواهی بازرسی:</label>
          <FileUploader
            ref={(el) => el && (this.fileUploaders[2] = el)}
            orderNumber={faktorNumber}
            subFolder={subFolder}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel}>آپلود بارنامه:</label>
          <FileUploader
            ref={(el) => el && (this.fileUploaders[3] = el)}
            orderNumber={faktorNumber}
            subFolder={subFolder}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel}>آپلود برگه باسکول:</label>
          <FileUploader
            ref={(el) => el && (this.fileUploaders[4] = el)}
            orderNumber={faktorNumber}
            subFolder={subFolder}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel}>
            آپلود نامه رسمی شرکت زرسیم:
          </label>
          <FileUploader
            ref={(el) => el && (this.fileUploaders[5] = el)}
            orderNumber={faktorNumber}
            subFolder={subFolder}
          />
        </div>

        <button
          type="button"
          className={styles.carrySubmitButton}
          onClick={this.uploadAllFiles}
        >
          آپلود فایل‌ها
        </button>
        <button onClick={() => {
                  console.log(getLCNumberAndTotalPrice(faktorNumber));
                }}>ddddddddddddd</button>
      </div>
    );
  }
}
