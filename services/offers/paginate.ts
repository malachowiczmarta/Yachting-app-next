import { config } from '@/config';

type offset = string | string[] | undefined;
type category = string | string[] | undefined;

const paginateOffers = async (offset?: offset, category?: category) => {
  let apiUrl = `https://api.airtable.com/v0/${config.AIRTABLE_BASE}/offers?pageSize=2&view=onlyActive`;
  if (offset) {
    apiUrl += `&offset=${offset}`;
  }
  if (category) {
    apiUrl += '&' + encodeURI(`filterByFormula=(category="${category}")`);
  }

  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${config.AIRTABLE_API_KEY}` }
  });

  const records = await response.json();

  return records;
};

export default paginateOffers;
