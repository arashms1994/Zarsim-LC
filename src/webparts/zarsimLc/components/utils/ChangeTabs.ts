import { hashHistory } from 'react-router';

export function goCarry() {
  hashHistory.push("/carry");
}

export function goOpenning() {
  hashHistory.push("/openning");
}
export function goPeyment() {
  hashHistory.push("/payment");
}

export function goPreInvoice() {
  hashHistory.push("/");
}
