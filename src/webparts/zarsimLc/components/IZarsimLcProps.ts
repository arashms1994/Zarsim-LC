export interface IZarsimLcWebPartProps {
  description: string;
}

export interface IOpenningState {
  LCTotalPrice: number;
  LCNumber: string;
  LCOpenningDate: string;
  LCCommunicationDate: string;
  LCSettlementDate: string;
  LCOriginOpenningDate: string;
}

export interface IZarsimLcProps {
  description: string;
}

export interface PersianDatePickerProps {
  value?: string;
  onChange?: (newValue: string) => void;
  inputProps?: React.HTMLProps<HTMLInputElement>;
}

export interface PersianDatePickerState {
  showCalendar: boolean;
  selectedDate: string;
  currentYear: number;
  currentMonth: number;
}
