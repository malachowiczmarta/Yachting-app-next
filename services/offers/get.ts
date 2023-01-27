import airDB from 'services/airtableClient';

const get = async (id: number) => {
  const offers = await airDB('offers')
    .select({
      filterByFormula: `id = ${id}`
    })
    .firstPage();

  if (!offers.length) throw new Error('Offer not found!');

  if (offers && offers[0]) return offers[0].fields;
};

export default get;
