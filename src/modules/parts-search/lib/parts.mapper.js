export const filterEmptyGoods = (goods = []) =>
  goods.filter(({ brand, number, name }) => brand?.trim() || number?.trim() || name?.trim());

export const getManufacturers = (goods) => {
  const brands = goods.map(({ brand }) => brand?.trim()).filter(Boolean);

  return [...new Set(brands)];
};

export const getResultProducts = (goods) => {
  const occurrences = new Map();
  const groups = filterEmptyGoods(goods).flatMap((product) => {
    const matched = { kind: 'matched', product, parentProduct: null };
    const analogues = filterEmptyGoods(product.analogues ?? []).map((analogue) => ({
      kind: 'analogue',
      product: analogue,
      parentProduct: product
    }));
    return [matched, ...analogues];
  });

  return groups.map((group) => {
    const identity = JSON.stringify([group.parentProduct?.goodsID, group.kind, group.product.goodsID]);
    const occurrence = (occurrences.get(identity) ?? 0) + 1;

    occurrences.set(identity, occurrence);

    return { ...group, id: `${identity}:${occurrence}` };
  });
};

export const getOfferRows = (goods) => {
  const occurrences = new Map();

  return getResultProducts(goods).flatMap((group) => {
    const warehouses = group.product.warehouses?.length ? group.product.warehouses : [null];

    return warehouses.map((warehouse) => {
      const identity = JSON.stringify([
        group.parentProduct?.goodsID,
        group.kind,
        group.product.goodsID,
        warehouse?.id ?? warehouse?.code
      ]);
      const occurrence = (occurrences.get(identity) ?? 0) + 1;

      occurrences.set(identity, occurrence);

      return { ...group, warehouse, id: `${identity}:${occurrence}` };
    });
  });
};
