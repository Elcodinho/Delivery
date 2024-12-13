export function submitAdminProduct({
  name,
  category,
  subCat,
  type,
  slug,
  img,
  description,
  weight,
  price,
  largeWeight,
  largePrice,
  pizzaSize,
  largePizzaSize,
  rolliSize,
  largeRolliSize,
  setNameError,
  setCategoryError,
  setSubCatError,
  setTypeError,
  setSlugError,
  setImgError,
  setDescriptionError,
  setWeightError,
  setPriceError,
  setLargeWeightError,
  setLargePriceError,
  isRolli,
  isClassicPizza,
  dispatch,
  addMenuItem,
}) {
  let isValid = true;

  if (name.trim() === "") {
    setNameError(true);
    isValid = false;
  }

  if (category.trim() === "") {
    setCategoryError(true);
    isValid = false;
  }

  if (slug.trim() === "") {
    setSlugError(true);
    isValid = false;
  }

  if (img.trim() === "") {
    setImgError(true);
    isValid = false;
  }

  if (description.trim() === "") {
    setDescriptionError(true);
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

  if (category === "sushi-i-rolli" && subCat.trim() === "") {
    setSubCatError(true);
    isValid = false;
  }

  if ((isRolli || category === "pizza") && type.trim() === "") {
    setTypeError(true);
    isValid = false;
  }

  if ((isRolli || isClassicPizza) && largePrice.trim() === "") {
    setLargePriceError(true);
    isValid = false;
  }

  if ((isRolli || isClassicPizza) && largeWeight.trim() === "") {
    setLargeWeightError(true);
    isValid = false;
  }

  if (!isValid) return;

  const item = {
    name: name.trim(),
    category: category.trim(),
    slug: slug.trim(),
    image: img.trim(),
    description: description.trim(),
    ...(isRolli || isClassicPizza
      ? {
          weight: {
            small: parseFloat(weight.trim()),
            large: parseFloat(largeWeight.trim()),
          },
          price: {
            small: parseFloat(price.trim()),
            large: parseFloat(largePrice.trim()),
          },
        }
      : {
          price: parseFloat(price.trim()),
          weight: parseFloat(weight.trim()),
        }),
    ...(category === "sushi-i-rolli" && { subCat: subCat.trim() }),
    ...((isRolli || category === "pizza") && { type: type.trim() }),
    ...(isRolli && { size: { small: rolliSize, large: largeRolliSize } }),
    ...(category === "pizza" && {
      size: { small: pizzaSize, large: largePizzaSize },
    }),
  };

  dispatch(addMenuItem(item));
}
