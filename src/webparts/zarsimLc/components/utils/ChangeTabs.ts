import { hashHistory } from "react-router";

export function goCarry() {
  hashHistory.push("/carry");
}

export function goOpening() {
  hashHistory.push("/opening");
}
export function goPeyment() {
  hashHistory.push("/payment");
}

export function goPreInvoice() {
  hashHistory.push("/");
}
