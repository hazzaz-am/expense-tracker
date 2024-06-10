export default function thousandsSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}