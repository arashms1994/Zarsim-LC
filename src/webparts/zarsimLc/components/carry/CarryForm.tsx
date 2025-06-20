import * as React from "react";
import { Component } from "react";
import styles from "./CarryForm.module.scss";
import CarryShownHistory from "./CarryShownHistory";
import { FileUploader } from "../fileUploader/FileUploader";

export default class CarryForm extends Component<any, any> {
  private sendRef: FileUploader | null = null;
  private reciveRef: FileUploader | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      item_GUID: "",
      Event_Type: "chose",
      Order_Status: "chose",
      Description: "",
      Events: [],
    };

    // this.onEventAdd = this.onEventAdd.bind(this);
    // this.loadData = this.loadData.bind(this);
  }

  //   async componentDidMount() {
  //     if (this.props.parent_GUID) {
  //       this.loadData(this.props.parent_GUID);
  //     }
  //   }

  //   async componentDidUpdate(prevProps: any) {
  //     if (
  //       prevProps.parent_GUID !== this.props.parent_GUID &&
  //       this.props.parent_GUID
  //     ) {
  //       this.loadData(this.props.parent_GUID);
  //     }
  //   }

  //   async loadData(guid: string) {
  //     const EventsData = await loadEvent(guid);
  //     const newGUID = uuidv4();
  //     this.setState({
  //       Events: EventsData.reverse(),
  //       item_GUID: newGUID,
  //     });
  //   }

  //   async onEventAdd() {
  //     try {
  //       if (this.reciveRef) {
  //         await this.reciveRef.uploadFile();
  //       }
  //       if (this.sendRef) {
  //         await this.sendRef.uploadFile();
  //       }

  //       const { item_GUID, Event_Type, Order_Status, Description } = this.state;

  //       await handleAddEvent(
  //         item_GUID,
  //         this.props.parent_GUID,
  //         Event_Type,
  //         Order_Status,
  //         Description
  //       );

  //       await this.loadData(this.props.parent_GUID);

  //       this.setState({
  //         Event_Type: "chose",
  //         Order_Status: "chose",
  //         Description: "",
  //       });

  //       if (this.reciveRef) this.reciveRef.clearFile();
  //       if (this.sendRef) this.sendRef.clearFile();
  //     } catch (error) {
  //       console.error("خطا در ذخیره رویداد یا آپلود فایل:", error);
  //     }
  //   }

  render() {
    return (
      <div className={styles.Form}>
        <div className={styles.formContainer}>
          <div className={styles.upladContainer}>
            <FileUploader
              ref={(el) => (this.reciveRef = el)}
              orderNumber={this.props.parent_GUID}
              subFolder={this.state.item_GUID}
              title={"فایل دریافتی"}
            />
            <FileUploader
              ref={(el) => (this.sendRef = el)}
              orderNumber={this.props.parent_GUID}
              subFolder={this.state.item_GUID}
              title={"فایل ارسالی"}
            />
          </div>

          <div className={styles.distributerCodeDiv}>
            {this.props.distributerCode &&
              this.props.distributerCode.trim() !== "" && (
                <div className={styles.distributerCodeChildDiv}>
                  <p className={styles.distributerCodeParaph}>
                    کد نماینده:{" "}
                    <span className={styles.distributerCodeSpan}>
                      {this.props.distributerCode}
                    </span>
                  </p>
                </div>
              )}

            <div className={styles.selectContainer}>
              <select
                value={this.state.Event_Type}
                onChange={(event) =>
                  this.setState({
                    Event_Type: String(event.currentTarget.value),
                  })
                }
                name="Event_Type"
              >
                <option value="chose" disabled>
                  نوع رویداد
                </option>
                <option value="telegram">تلگرام</option>
                <option value="whatsapp">واتساپ</option>
                <option value="phoneNumber">تماس تلفنی</option>
                <option value="email">ایمیل</option>
                <option value="presental">حضوری</option>
              </select>

              <select
                value={this.state.Order_Status}
                onChange={(event) =>
                  this.setState({
                    Order_Status: String(event.currentTarget.value),
                  })
                }
                name="Order_Status"
              >
                <option value="chose" disabled>
                  وضعیت سفارش
                </option>
                <option value="درحال مذاکره">در حال مذاکره</option>
                <option value="ارجاع به کارشناس">ارجاع به کارشناس</option>
                <option value="نا موفق">ناموفق</option>
              </select>
            </div>
          </div>

          <textarea
            placeholder="توضیحات ..."
            value={this.state.Description}
            onChange={(e) =>
              this.setState({ Description: e.currentTarget.value })
            }
          />

          <div className={styles.buttonsContainer}>
            <div className={styles.buttonSave}>ذخیره</div>

            <button type="button" className={styles.preInvoiceButton}>
              ایجاد پیش فاکتور
            </button>

            {this.props.existLink === null ||
            this.props.existLink === "" ||
            this.props.existLink === undefined ? (
              <p>testConditional</p>
            ) : (
              <a
                href={this.props.existLink}
                className={styles.preInvoiceButton}
              >
                مشاهده پیش فاکتور
              </a>
            )}
          </div>
        </div>

        <div className={styles.shownHistory}>
          {this.state.Events.map((event, i) => (
            <CarryShownHistory
              key={i}
              Description={event.Description}
              Event_Type={event.Event_Type}
              Display_Name={event.Display_Name}
              Order_Status={event.Order_Status}
              Created={event.Created}
              parent_GUID={this.props.parent_GUID}
              item_GUID={event.Title}
            />
          ))}
        </div>
      </div>
    );
  }
}
