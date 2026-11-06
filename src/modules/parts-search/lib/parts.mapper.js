export const filterEmptyGoods = (goods = []) =>
  goods.filter(({ brand, number, name }) => brand?.trim() || number?.trim() || name?.trim());

export const getManufacturers = (goods) => {
  const brands = goods.map(({ brand }) => brand).filter((brand) => brand?.trim());
  return [...new Set(brands)];
};

export const getResultProducts = (goods) =>
  filterEmptyGoods(goods).flatMap((product) => {
    const matched = { kind: 'matched', product, parentProduct: null };
    const analogues = filterEmptyGoods(product.analogues ?? []).map((analogue) => ({
      kind: 'analogue',
      product: analogue,
      parentProduct: product
    }));
    return [matched, ...analogues];
  });

export const getOfferRows = (goods) =>
  getResultProducts(goods).flatMap((group) => {
    const warehouses = group.product.warehouses?.length ? group.product.warehouses : [null];
    return warehouses.map((warehouse) => ({ ...group, warehouse }));
  });
