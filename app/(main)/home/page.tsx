import MainLayout from "../layout";
import React from 'react'
import Banner from '@/features/home/components/banner';
import ProductCategory from '@/features/home/components/category';
import Carousel_layout from '@/features/home/section/carousel-section';
import ProductList from '@/features/home/section/product-section';
import CollectionsPage from '@/features/home/section/collectionspage';



export default function HomePage(){
  return (
    <div>
      <Banner/>
      <ProductCategory/>
      <Carousel_layout/>
      <ProductList />
      <CollectionsPage/>

    </div>
  )
}
