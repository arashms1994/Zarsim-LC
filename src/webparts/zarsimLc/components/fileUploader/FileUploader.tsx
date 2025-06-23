import * as React from "react";
import styles from "./FileUploader.module.scss";
import { BASE_URL } from "../api/BaseUrl";
import { getDigest } from "../utils/GetDigest";

export class FileUploader extends React.Component<any, any> {
  private inputId: string;
  private fileInputRef: HTMLInputElement | null;

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploadStatus: "",
      uploadProgress: 0,
    };

    this.inputId = "file_" + Math.random().toString(36).substring(2, 9);
    this.fileInputRef = null;

    this.getFile = this.getFile.bind(this);
    this.clearFile = this.clearFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  getFile() {
    return this.state.selectedFile;
  }

  clearFile() {
    this.setState({
      selectedFile: null,
      uploadStatus: "",
      uploadProgress: 0,
    });

    // پاک کردن مقدار input برای اطمینان از اجرای onChange در انتخاب مجدد
    if (this.fileInputRef) {
      this.fileInputRef.value = "";
    }
  }

  async uploadFile() {
    const file = this.state.selectedFile;
    if (!file) {
      this.setState({ uploadStatus: "لطفا یک فایل انتخاب کنید" });
      return;
    }
    if (!this.props.orderNumber) {
      this.setState({ uploadStatus: "شماره سفارش معتبر نیست" });
      return;
    }

    const orderNumber = this.props.orderNumber.replace(/[#%*<>?\/\\|]/g, "_");
    const subFolder = this.props.subFolder;
    const libraryName = "LC_AttachFiles";
    const fullFolderPath = `${libraryName}/${orderNumber}/${subFolder}`;

    try {
      const digest = await getDigest();

      // ایجاد فولدرها به ترتیب
      const createFolder = (path: string) =>
        fetch(`${BASE_URL}/_api/web/folders/add('${path}')`, {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "X-RequestDigest": digest,
          },
        }).catch(() => {}); // خطا در ایجاد فولدرها نادیده گرفته می‌شود

      await createFolder(`${libraryName}/${orderNumber}`);
      await createFolder(`${libraryName}/${orderNumber}/${subFolder}`);
      await createFolder(fullFolderPath);

      // آماده‌سازی نام فایل بدون کاراکترهای مشکل‌ساز
      const cleanFileName = file.name.replace(/[#%*<>?\/\\|]/g, "_");
      const arrayBuffer = await file.arrayBuffer();

      // آپلود فایل
      const uploadRes = await fetch(
        `${BASE_URL}/_api/web/GetFolderByServerRelativeUrl('${fullFolderPath}')/Files/add(overwrite=true, url='${cleanFileName}')`,
        {
          method: "POST",
          body: arrayBuffer,
          headers: {
            Accept: "application/json;odata=verbose",
            "X-RequestDigest": digest,
          },
        }
      );

      if (uploadRes.ok) {
        this.setState({
          uploadStatus: "فایل با موفقیت آپلود شد",
          uploadProgress: 100,
        });
      } else {
        throw new Error("خطا در آپلود فایل");
      }
    } catch (error) {
      console.error("خطا در آپلود:", error);
      this.setState({
        uploadStatus: "خطا در آپلود فایل",
        uploadProgress: 0,
      });
    }
  }

  render() {
    return (
      <div className={styles.uploaderDiv}>
        <label htmlFor={this.inputId} className={styles.fileUploaderLabel}>
          انتخاب فایل
        </label>
        <input
          className={styles.fileUploaderInput}
          id={this.inputId}
          type="file"
          ref={(ref) => (this.fileInputRef = ref)}
          onChange={(e: any) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              this.setState({
                selectedFile: file,
                uploadStatus: "",
                uploadProgress: 0,
              });
            }
          }}
        />

        {this.state.selectedFile ? (
          <div className={styles.fileInfo}>
            <p className={styles.fileName}>{this.state.selectedFile.name}</p>
            <div
              className={styles.removeFileBtn}
              onClick={this.clearFile}
              aria-label="پاک کردن فایل"
            >
              ×
            </div>
          </div>
        ) : (
          <p className={styles.fileName}>هنوز فایلی انتخاب نشده</p>
        )}

        {this.state.uploadStatus && (
          <div
            className={
              this.state.uploadProgress === 100
                ? styles.alertStatusSuccess
                : styles.alertStatusFailed
            }
          >
            {this.state.uploadStatus}
          </div>
        )}
      </div>
    );
  }
}
