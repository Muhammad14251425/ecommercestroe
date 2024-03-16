import React from 'react'
import Container from './Container'
import Heading from './Heading'
import { ProductProps } from '../../type'
import Product from './Product';

interface Props {
    products: ProductProps[];
    title?: string;
}
const BestSellers = ({products,title}:Props) => {
    console.log(products);
    
  return (
    <Container className='w-full pb-20 '>
        <Heading heading={title} />
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-5'>
            {
                products.map((item)=>(
                    <Product key={item._id} product={item} bg="#ffffff20" />
                ))
            }
        </div>
    </Container>
  )
}

export default BestSellers