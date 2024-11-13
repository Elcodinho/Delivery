export function getInitialSize(category, subCat, size, type) {
  if (category === "pizza" && type === "classic") {
    return size ? size.small : null;
  } else if (subCat === "rolli") {
    return size ? size.large : null;
  }
  return null; // по умолчанию
}
