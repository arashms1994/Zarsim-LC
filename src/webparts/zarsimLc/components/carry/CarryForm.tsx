import * as React from "react";
import { Component } from "react";
import styles from "./Carry.module.scss";
import { FileUploader } from "../fileUploader/FileUploader";
import ChooseProduct from "./product/ChooseProduct";
import { getCustomerFactorDetails, getLCNumber } from "../api/GetData";
import { AddToCarryReceipt } from "../api/AddData";

export default class CarryForm extends Component<any, any> {
  private sendRef: FileUploader | null = null;
  private reciveRef: FileUploader | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      faktorNumber: "",
      selectedProducts: [],
      productCounts: {},
      lcNumber: "",
    };
  }

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
  console.log(products, "products");

  setTimeout(async () => {
    const lcNumber = await getLCNumber(faktorNumber);
    this.setState({ lcNumber });
  }, 1000);

  this.setState({ products, faktorNumber });
}


  render() {
    const { products, faktorNumber } = this.state;

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
          <label className={styles.carryLabel} htmlFor="openningUploadFile">
            آپلود صورتحساب فروش:
          </label>
          <FileUploader
            ref={(el) => (this.reciveRef = el)}
            orderNumber={faktorNumber}
            subFolder={"حمل و بارگیری"}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel} htmlFor="openningUploadFile">
            آپلود لیست دسته بندی:
          </label>
          <FileUploader
            ref={(el) => (this.sendRef = el)}
            orderNumber={faktorNumber}
            subFolder={"حمل و بارگیری"}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel} htmlFor="openningUploadFile">
            آپلود گواهی بازرسی:
          </label>
          <FileUploader
            ref={(el) => (this.sendRef = el)}
            orderNumber={faktorNumber}
            subFolder={"حمل و بارگیری"}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel} htmlFor="openningUploadFile">
            آپلود بارنامه:
          </label>
          <FileUploader
            ref={(el) => (this.sendRef = el)}
            orderNumber={faktorNumber}
            subFolder={"حمل و بارگیری"}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel} htmlFor="openningUploadFile">
            آپلود برگه باسکول:
          </label>
          <FileUploader
            ref={(el) => (this.sendRef = el)}
            orderNumber={faktorNumber}
            subFolder={"حمل و بارگیری"}
          />
        </div>

        <div className={styles.carryDiv}>
          <label className={styles.carryLabel} htmlFor="openningUploadFile">
            آپلود نامه رسمی شرکت زرسیم:
          </label>
          <FileUploader
            ref={(el) => (this.sendRef = el)}
            orderNumber={faktorNumber}
            subFolder={"حمل و بارگیری"}
          />
        </div>

        <button type="submit" className={styles.carrySubmitButton}>
          آپلود فایل ها
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
