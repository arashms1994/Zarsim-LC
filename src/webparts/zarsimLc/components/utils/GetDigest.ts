import { BASE_URL } from "../api/BaseUrl";

export async function getDigest(): Promise<string> {
  return fetch(`${BASE_URL}/_api/contextinfo`, {
    method: "POST",
    headers: { Accept: "application/json;odata=verbose" },
  })
    .then((res) => res.json())
    .then((data) => data.d.GetContextWebInformation.FormDigestValue);
}