import Banner from '@/components/Banner'
import { client } from '../../../sanity/lib/client'
import NewArrivals from '@/components/NewArrivals';
import HomeBanner from '@/components/HomeBanner';
import BestSellers from '@/components/BestSellers';
import YearProduct from '@/components/YearProduct';
export const revalidate = 10;
const BannerQuery = `*[_type == 'banner']{
  image,
    _id
} | order(_createdAt asc)`
const NewArrivalQuery = `*[_type == 'product' && position == 'New Arrivals']{
  ...
  } | order(_createdAt asc)`
  const bestSellersQuery =`*[_type == 'product' && position == 'Bestsellers']{
    ...
   } | order(_createdAt asc)`;
  const specialOffersQuery =`*[_type == 'product' && position == 'Special Offers']{
    ...
   } | order(_createdAt asc)`;

const page = async () => {
  const banners = await client.fetch(BannerQuery)
  const NewArrivalProducts = await client.fetch(bestSellersQuery)
  const bestSellersProducts = await client.fetch(NewArrivalQuery);
  const specialOffersProducts = await client.fetch(specialOffersQuery);
 
  
  return (
    <main className='text-sm overflow-hidden min-h-screen'>
      <Banner banners={banners} />
      <NewArrivals products={NewArrivalProducts} />
      <HomeBanner  />
      <BestSellers products={bestSellersProducts} title="Our Bestsellers" />
      <YearProduct />
    </main>
  )
}

export default page