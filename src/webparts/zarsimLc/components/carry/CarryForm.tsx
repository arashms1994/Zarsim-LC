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
    const faktorNumber = this.props.faktorNumber;

    return (
      <div className={styles.carryContainer}>
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
      </div>
    );
  }
}
