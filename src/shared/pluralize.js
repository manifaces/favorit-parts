const pluralRules = new Intl.PluralRules('ru');

export const pluralize = (count, one, few, many) => {
  const form = pluralRules.select(count);

  if (form === 'one') return one;
  if (form === 'few') return few;

  return many;
};
