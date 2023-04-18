import BaseLayout from 'components/BaseLayout';
import getForUser from 'services/offers/getForUser';
import { getSession, GetSessionParams } from 'next-auth/react';
import OfferItem from '@/components/OfferItem';
import { IOffer } from '@/types/offer';

interface IMyProps {
  offers: IOffer[];
}

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/user/signin',
        permanent: false
      }
    };
  }

  const offers = await getForUser(session?.user?.email);

  return {
    props: {
      offers: offers
    }
  };
};

export default function MyOffers({ offers }: IMyProps) {
  return (
    <BaseLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {offers.length === 0 && (
              <div className="w-full text-center bg-yellow-100 py-4">
                You do not have any offers.
              </div>
            )}
            {offers?.map((offer) => (
              <OfferItem key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
