import * as React from "react";
import { Component } from "react";
import styles from "./Carry.module.scss";
import { FileUploader } from "../fileUploader/FileUploader";
import ChooseProduct from "./product/ChooseProduct";
import { getCustomerFactorDetails, getLCNumber } from "../api/GetData";
import { AddToCarryReceipt } from "../api/AddData";
import Guid from "../utils/CreateGUID";

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
    };

    this.uploadAllFiles = this.uploadAllFiles.bind(this);
  }

  uploadAllFiles = () => {
    this.fileUploaders.forEach((uploader) => {
      if (uploader && uploader.uploadFile) {
        uploader.uploadFile();
        localStorage.removeItem("GUID");
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

    setTimeout(async () => {
      const lcNumber = await getLCNumber(faktorNumber);
      this.setState({ lcNumber });
    }, 1000);

    this.setState({ products, faktorNumber });
  }

  render() {
    const { products, faktorNumber } = this.state;
    const subFolder = Guid();

    return (
      <div className={styles.carryContainer}>
        <form className={styles.carryForm} onSubmit={this.handleSubmit}>
          <div className={styles.caryReceiptContainer}>
            <div className={styles.carrySelectedProductContainer}>
              <div className={styles.carrySelectedProductUL}>
                {this.state.selectedProducts.length === 0 ? (
                  <p className={styles.carrySelectedProductParaph}>
                    هنوز محصولی انتخاب نشده است
                  </p>
                ) : (
                  this.state.selectedProducts.map((item) => (
                    <div
                      key={item.Product}
                      className={styles.carrySelectedProductDiv}
                    >
                      <p className={styles.carrySelectedProductText}>
                        {item.Title}
                      </p>
                      <p className={styles.carrySelectedProductText}>
                        <span className={styles.carrySelectedProductText}>
                          ریال:
                        </span>
                        {item.Price}
                      </p>
                      <div className={styles.carrySelectedProductInputDiv}>
                        <label
                          className={styles.carrySelectedProductText}
                          htmlFor="count"
                        >
                          مقدار ارسالی (متر):
                        </label>
                        <input
                          className={styles.carrySelectedProductInput}
                          type="text"
                          name="count"
                          value={this.state.productCounts[item.Product] || ""}
                          onChange={(e) =>
                            this.handleCountChange(
                              item.Product,
                              e.currentTarget.value
                            )
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className={styles.carryRemoveProductButton}
                        onClick={() => this.handleRemoveProduct(item.Product)}
                      >
                        حذف
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className={styles.carryFormBtnContainer}>
              <button
                className={styles.carryAddProductButton}
                type="button"
                onClick={() => {
                  this.setState({ chooseProduct: true });
                }}
              >
                انتخاب محصول
              </button>
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

        {this.state.chooseProduct && (
          <div>
            <div
              className={styles.shopPopupBackdrop}
              onClick={() => this.setState({ chooseProduct: false })}
            />
            <div className={styles.shopPopupContainor}>
              <ChooseProduct
                faktorNumber={faktorNumber}
                products={products}
                onAddProduct={this.handleAddProduct}
              />

              <button
                className={styles.closeShopPopupBtn}
                onClick={() => {
                  this.setState({ chooseProduct: false });
                }}
              >
                بستن
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
