import Container from '@/components/Container'
import { client, urlFor } from '../../../../../sanity/lib/client'
import Onsale from '@/components/Onsale'
import Image from 'next/image';
import { ProductProps } from '../../../../../type';
import ProductInfo from '@/components/ProductInfo';
import { PortableText } from "@portabletext/react";
import { RichText } from '@/components/StyledText';
export const revalidate = 10;
interface Props {
  params: {
    slug: string
  }
}

export const generateStaticParams = async () => {
  const query = `*[_type == 'product']{
    slug
  }`
  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((slug:any)=>slug.slug.current)
  return slugRoutes.map((slug:string)=>({
    slug
  }))
}
const specialOfferQuery = `*[_type == 'product' && position == 'on Sale']{
  ...
} | order(_createdAt asc)`
const page = async ({params:{slug}}:Props) => {
  const query = `*[_type == 'product' && slug.current == '${slug}' ][0]{
    ...
  } `
  const product:ProductProps = await client.fetch(query,{slug});
  const specialOfferProduct = await client.fetch(specialOfferQuery)
  
  return (
    <Container className='my-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 p-4 bg-gray-100'>
      <div className=''>
        <Onsale  products={specialOfferProduct}/>
      </div>
      <div className='h-full xl:col-span-2'>
        <Image src={urlFor(product.image).url()} alt={product.title} width={500} height={500} className='w-full h-full object-contain'/>
      </div>
      <div className='w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center'>
        <ProductInfo products={product} />
      </div>
      </div>
      <PortableText value={product.body} components={RichText} />
    </Container>
  )
}

export default page