const toNumber = (value) => {
  if (value == null || (typeof value === 'string' && value.trim() === '')) return null;

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

export const getMinAvailablePrice = (product) => {
  const prices = (product.warehouses ?? [])
    .filter(({ stock }) => Number(stock) > 0)
    .map(({ price }) => toNumber(price))
    .filter((price) => price !== null);

  return prices.length ? Math.min(...prices) : null;
};

export const sortPartsResults = (items, sort, view) => {
  if (!sort.field) {
    return [
      ...items.filter(({ kind }) => kind === 'matched'),
      ...items.filter(({ kind }) => kind === 'analogue')
    ];
  }

  const entries = items.map((item) => {
    let value;

    if (view === 'offers') {
      value = item.warehouse?.[sort.field];
    } else {
      value = sort.field === 'price' ? getMinAvailablePrice(item.product) : item.product.count;
    }

    return { item, value: toNumber(value) };
  });

  entries.sort((a, b) => {
    if (a.value === b.value) return 0;
    if (a.value === null) return 1;
    if (b.value === null) return -1;

    return (a.value - b.value) * (sort.direction === 'asc' ? 1 : -1);
  });

  return entries.map(({ item }) => item);
};
