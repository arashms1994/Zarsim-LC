import { BASE_URL } from "./BaseUrl";

export async function getLCNumber(
  faktorNumber: string
): Promise<string | null> {
  const listName = "LC_Openning";

  const response = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listName}')/items?$filter=Title eq '${faktorNumber}'`,
    {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  );

  if (!response.ok) {
    console.error("خطا در دریافت اطلاعات LC_Number:", await response.text());
    return null;
  }

  const data = await response.json();
  const items = data.d.results;

  if (items.length === 0) {
    console.warn("هیچ آیتمی با این فاکتور پیدا نشد.");
    return null;
  }

  return data.d.results.at(0).LCNumber;
}

export async function getCustomerFactor(faktorNumber: string) {
  const listTitle = "customer_factor";

  const itemsRes = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$filter=Title eq '${faktorNumber}'`,
    {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  );

  if (!itemsRes.ok) {
    const err = await itemsRes.text();
    throw new Error("خطا در گرفتن آیتم‌ها: " + err);
  }

  const itemData = await itemsRes.json();

  return {
    item: itemData.d.results.at(0),
  };
}

export async function getCustomerFactorDetails(faktorNumber: string) {
  const listTitle = "detail_customer_factor";
  let allResults: any[] = [];
  let nextUrl: string | null = `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$filter=OrderNumber eq '${faktorNumber}'`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      if (!response.ok) {
        throw new Error(`خطا در دریافت داده‌ها: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.d || !data.d.results) {
        break;
      }

      allResults = [...allResults, ...data.d.results];

      if (data.d.__next) {
        nextUrl = data.d.__next.startsWith("http")
          ? data.d.__next
          : `${BASE_URL}${data.d.__next}`;
      } else {
        nextUrl = null;
      }
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

