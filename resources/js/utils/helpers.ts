import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

/**
 * Formats a number as currency according to the specified locale and currency.
 * @param amount - The amount to format.
 * @param currency - The currency code (default is "USD").
 * @param locale - The locale to use for formatting (default is "en-US").
 */
export function formatMoney(amount: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
}

/**
 * Formats a date string, number, or Date object into a human-readable format.
 * @param date - The date to format (string, number, or Date object).
 * @param full
 */
export const dateFormat = (date: string | number | Date, full = false) => {
  const currentYear = dayjs().year()
  const formattedDate = dayjs(date)
  const formatString = formattedDate.year() === currentYear ? "MMM D" : "MMM D, YYYY"
  return full
    ? formattedDate.format(`${formatString} - h:mm a`)
    : formattedDate.format(formatString)
}

export const getColumns = <T extends Record<string, any>>(products: T[], rowHeaderKey: keyof T) => {
  if (!products.length) return []

  return Object.keys(products[0]).map((key) => ({
    name:
      key === "id"
        ? "#"
        : key.endsWith("_id")
          ? key
              .replace(/_id$/, "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
          : key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    id: key as keyof T,
    isRowHeader: key === rowHeaderKey,
  }))
}
