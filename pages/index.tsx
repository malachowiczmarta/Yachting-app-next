import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import paginateOffers from 'services/offers/paginate';
import { jsonFetcher } from 'utils';
import { useRouter } from 'next/router';
import BaseLayout from '@/components/BaseLayout';
import { OfferResponse } from '@/types/offer';
import getFeatured from '@/services/offers/getFeatured';

export const getStaticProps = async () => {
  const offers = await getFeatured(4);

  return {
    props: {
      offers
    }
  };
};

function Home() {
  return (
    <BaseLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>Rent or sell your Yacht</h1>
          <div>
            <Link
              className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              href="/offers">
              See all offers
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

export default Home;
