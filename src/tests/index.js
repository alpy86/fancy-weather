function getTemp(temp, degree) {
  let newTemp = temp;
  if (degree === ' F\u00B0') {
    newTemp = (temp * 9) / 5 + 32;
  }
  return newTemp;
}

export default getTemp;
