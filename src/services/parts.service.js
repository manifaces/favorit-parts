import { API_CONFIG } from '@/config';

const requestParts = async (parameters, { signal } = {}) => {
  if (!parameters.number?.trim()) throw new Error('Empty number goods!');

  if (parameters.analogues && !parameters.brand?.trim()) throw new Error('Missing brand');

  if (!API_CONFIG.key) throw new Error('Missing API key');

  const url = new URL(API_CONFIG.url);
  url.search = new URLSearchParams({ key: API_CONFIG.key, ...parameters, info: 'on' });

  const response = await fetch(url, { signal });
  const data = await response.json();

  if (data?.error) throw new Error(data.error);

  if (!response.ok || !Array.isArray(data?.goods)) {
    throw new Error('Invalid API response');
  }

  return data.goods;
};

export const searchParts = (number, options) => requestParts({ number }, options);

export const fetchPartsWithAnalogues = (number, brand, options) =>
  requestParts({ number, brand, analogues: 'on' }, options);
