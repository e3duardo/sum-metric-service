export default function dateTwoHourBefore() {
  const d = new Date();
  d.setHours(d.getHours() - 2);
  return d;
}
