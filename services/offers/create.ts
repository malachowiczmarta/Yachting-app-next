import airDB from 'services/airtableClient';

const create = async (payload: any) => {
  const offer = await airDB('offers').create([
    {
      fields: {
        ...payload,
        price: Number(payload.price),
        status: 'inactive'
      }
    }
  ]);

  return offer;
};

export default create;
