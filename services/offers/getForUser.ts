import airDB from 'services/airtableClient';

const getForUser = async (email: string) => {
  console.log('getForUser', email);
  const offers = await airDB('offers')
    .select({
      filterByFormula: `userEmail="${email}"`
      // sort: [{ field: 'id', direction: 'desc' }],
    })
    .firstPage();

  return offers?.map((offer) => offer.fields);
};

export default getForUser;
