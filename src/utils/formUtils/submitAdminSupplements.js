export function submitAdminSupplements({
  id,
  name,
  img,
  weight,
  price,
  setIdError,
  setNameError,
  setImgError,
  setWeightError,
  setPriceError,
  dispatch,
  addSupplement,
}) {
  let isValid = true;

  if (id.trim() === "") {
    setIdError(true);
    isValid = false;
  }

  if (name.trim() === "") {
    setNameError(true);
    isValid = false;
  }

  if (img.trim() === "") {
    setImgError(true);
    isValid = false;
  }

  if (weight.trim() === "") {
    setWeightError(true);
    isValid = false;
  }

  if (price.trim() === "") {
    setPriceError(true);
    isValid = false;
  }

  if (!isValid) return;

  const data = {
    id: id.trim().toLowerCase(),
    name: name.trim().toLowerCase(),
    img: img.trim(),
    price: parseFloat(price.trim()),
    weight: parseFloat(weight.trim()),
  };

  dispatch(addSupplement(data));
}
