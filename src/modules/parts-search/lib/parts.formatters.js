const stockFormatter = new Intl.NumberFormat('ru-RU');
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
});

export const formatStock = (value) => (value == null ? '—' : `${stockFormatter.format(value)} шт.`);

export const formatPrice = (value) => (value == null ? '—' : priceFormatter.format(value));

export const formatShipmentDate = (value) => {
  if (!value) return 'Не указана';

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) return value;

  const [, year, month, day] = match;

  return `${day}.${month}.${year}`;
};

export const formatOrderDeadline = (value) => {
  const match = value?.match(/[T ](\d{2}:\d{2})/);

  return match ? `Заказать до ${match[1]}` : '';
};
