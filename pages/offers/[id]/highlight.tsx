import { useRef, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { getSession } from 'next-auth/react';
import getOfferById from 'services/offers/get';
import isAuthorized from 'services/offers/isAuthorized';
import getAllProducts from 'services/products/getAll';
import { loadStripe } from '@stripe/stripe-js';
import { NextApiRequest } from 'next';
import { config } from '@/config';
import { IOffer } from '@/types/offer';

interface IProps {
  req: NextApiRequest;
  query: {
    id: string;
  };
}

interface IOfferHighlightProps {
  offer: IOffer;
  products: any[];
}

export const getServerSideProps = async ({ req, query }: IProps) => {
  const session = await getSession({ req });
  const offer = await getOfferById(query.id);

  if (!isAuthorized(offer, session) || !offer) {
    return {
      notFound: true
    };
  }

  const products = await getAllProducts();

  return {
    props: {
      offer,
      products
    }
  };
};

export default function OfferHighlight({ offer, products }: IOfferHighlightProps) {
  const offerForm = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');
  const [formProcessing, setFormProcessing] = useState(false);

  console.log(products);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formProcessing) return;
    const stripe = await loadStripe(config.NEXT_PUBLIC_STRIPE);

    setError('');
    setFormProcessing(true);
    const form = new FormData(offerForm.current as HTMLFormElement);
    console.log('form', form.get('productId'));
    const payload = {
      id: form.get('productId'),
      offerId: offer.id,
      quantity: 1
    };

    const response = await fetch(`/api/checkout`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const { checkout } = await response.json();
      stripe?.redirectToCheckout({ sessionId: checkout.id });
    } else {
      const payload = await response.json();
      console.log(payload);
      setFormProcessing(false);
      // setError(payload.error?.details[0]?.message);
      setError('error');
    }
  };

  return (
    <BaseLayout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Highlight that offer
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form className="flex flex-wrap -m-2" ref={offerForm} onSubmit={handleSubmit}>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="productId" className="leading-7 text-sm text-gray-600">
                    Choose type of product
                  </label>
                  <select
                    name="productId"
                    id="productId"
                    className="h-10 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    {products &&
                      products.length > 0 &&
                      products?.map((product) => (
                        <option value={product.airtableId} key={product.airtableId}>
                          {product.name} -{' '}
                          {/* {Number(product.priceCents / 100)?.toLocaleString('en', {
                            style: 'currency',
                            currency: product?.priceCurrency
                          })} */}
                          {Number(product.priceCents / 100)}EUR
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  disabled={formProcessing}
                  className="disabled:opacity-50 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {formProcessing ? 'Please wait...' : 'Promote this offer'}
                </button>
                {error && (
                  <div className="flex justify-center w-full my-5">
                    <span className="bg-red-600 w-full rounded text-white px-3 py-3 text-center">
                      Offer not promoted: {error}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
