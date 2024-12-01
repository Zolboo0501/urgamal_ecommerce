import sanitizeHtml from "sanitize-html";

export const PAGE_SIZE = 20;
export const regexNumber = /^\d{4}$/;
export const htmlFrom = (htmlString) => {
  const cleanHtmlString = sanitizeHtml(htmlString);
  // const html = JSON.parse(cleanHtmlString, {});
  return cleanHtmlString;
};

export const ORDER_STATUS = {
  CREATED: 100,
  INVOICED: 101,
  PAID: 200,
  CONFIRMED: 201,
  DELIVERED: 202,
  DECLINED: 301,
  EXPIRED: 302,
  CANCELED: 303,
  REFUNDED: 400,
};

export const INVOICES_STATUS = {
  CREATED: 100,
  VERIFY_REQUEST: 101,
  VERIFIED: 200,
  PAYMENT_VERIFY_REQUEST: 201,
  PAYMENT_VERIFIED: 202,
  DECLINED: 300,
  EXPIRED: 301,
};

export const REMINDER_SLUG = "getIt";
