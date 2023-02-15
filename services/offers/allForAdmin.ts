import { config } from '@/config';

export default async (offset?: string) => {
  let apiUrl = `https://api.airtable.com/v0/${config.AIRTABLE_BASE}/offers?pageSize=100&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=desc`;
  if (offset) {
    apiUrl += `&offset=${offset}`;
  }

  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${config.AIRTABLE_API_KEY}` }
  });

  const records = await response.json();

  return records;
};
