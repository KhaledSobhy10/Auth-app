type KeyMessage = {
  key: string;
  message: string;
};
export interface GeneralError {
  success: boolean;
  message: string;
}

export interface FormError extends GeneralError {
  errors: KeyMessage[];
}
