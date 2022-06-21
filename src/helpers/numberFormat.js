/* eslint-disable space-before-blocks */
export default function numberFormat(value){
  return new Intl.NumberFormat().format(value);
}
