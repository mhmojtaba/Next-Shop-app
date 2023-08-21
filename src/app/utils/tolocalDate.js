export function toLocalDateString(date) {
  const options = {
    year: "numeric",
    // weekday: "long",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fa-IR", options);
}
