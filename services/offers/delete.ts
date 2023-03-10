import airDB from 'services/airtableClient';

const deleteOffer = async (airtableId: string) => {
  const offer = await airDB('offers').destroy([airtableId]);

  return offer;
};

export default deleteOffer;
