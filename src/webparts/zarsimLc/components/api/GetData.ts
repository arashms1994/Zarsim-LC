import { BASE_URL } from "./BaseUrl";

export async function getOpenningListItems() {
  const listTitle = "LC_Openning";

  const metadataRes = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')`,
    {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  );

  if (!metadataRes.ok) {
    const err = await metadataRes.text();
    throw new Error("خطا در گرفتن metadata لیست: " + err);
  }

  const metadataData = await metadataRes.json();
  const entityType = metadataData.d.ListItemEntityTypeFullName;
  console.log("Entity Type:", entityType);

  const itemsRes = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items`,
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

  const itemsData = await itemsRes.json();
  console.log("آیتم‌ها:", itemsData.d.results);

  return {
    entityType,
    items: itemsData.d.results,
  };
}

export async function getCustomerFactor(factorNumber: string) {
  const listTitle = "customer_factor";

  const itemsRes = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$filter=Title eq '${factorNumber}'`,
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

export async function getCustomerFactorDetails() {
  const listTitle = "detail_customer_factor";

  const metadataRes = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')`,
    {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  );

  if (!metadataRes.ok) {
    const err = await metadataRes.text();
    throw new Error("خطا در گرفتن metadata لیست: " + err);
  }

  const metadataData = await metadataRes.json();
  const entityType = metadataData.d.ListItemEntityTypeFullName;
  console.log("Entity Type:", entityType);

  const itemsRes = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items`,
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

  const itemsData = await itemsRes.json();
  console.log("آیتم‌ها:", itemsData.d.results);

  return {
    entityType,
    items: itemsData.d.results,
  };
}
