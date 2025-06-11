import { IOpenningState } from "../IZarsimLcProps";
import { getDigest } from "../utils/GeatDigest";

export async function AddToOpenningDate(state: IOpenningState): Promise<void> {
  const digest = await getDigest();

  const response = await fetch(
    "http://portal/_api/web/lists/getbytitle('LC_Openning')/items",
    {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": digest,
      },
      body: JSON.stringify({
        __metadata: { type: "SP.Data.LC_OpenningListItem" },
        Title: "اعتبار اسنادی",
        LC_Number: String(state.LCNumber),
        Total_Price: String(state.LCTotalPrice),
        Openning_Date: String(state.LCOpenningDate),
        Communication_Date: String(state.LCCommunicationDate),
        Settlement_Period: String(state.LCSettlementDate),
        Origin_Openning_Date: String(state.LCOriginOpenningDate),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error("خطا در ثبت آیتم: " + error);
  }

  const data = await response.json();
  console.log("آیتم با موفقیت ثبت شد:", data);
}
