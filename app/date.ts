const dateTimeFormater = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function format(dateString: string) {
  const date = new Date(dateString);
  return dateTimeFormater.format(date);
}
