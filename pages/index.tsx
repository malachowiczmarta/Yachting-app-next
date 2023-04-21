import Link from 'next/link';
import Image from 'next/image';
import BaseLayout from '@/components/BaseLayout';
import getFeatured from '@/services/offers/getFeatured';
import yachtBg from '@/public/yacht-bg.webp';

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
      <section className="text-gray-600 body-font relative justify-self-start">
        <div className="absolute inset-0 z-[-1]">
          <Image src={yachtBg} priority alt="background image" fill />
        </div>
        <div className="container px-5 pt-16 lg:pt-28 pb-60 lg:pb-72 mx-auto ">
          <div>
            <h1 className="text-4xl lg:text-6xl text-white bold w-full lg:w-5/6">
              Set sail for success with our yacht rental and sales platform.
            </h1>
            <Link
              className="inline-block mt-10 text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-400 rounded text-lg"
              href="/offers"
            >
              See all offers
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

export default Home;
