import React from 'react';
import ProductCard from '../components/productcard';

const products = [
  {
    title: 'Áo Cardigan',
    description: 'Xám',
    price: '300.000',
    originalPrice: '3.500.000',
    imageUrl: '/home/cate/cate_ao.png',
    badgeText: '-30%',
    currency: 'VND',
  },
  {
    title: 'Leviosa',
    description: 'Xám',
    price: '300.000',
    imageUrl: '/home/cate/cate_ao.png',
    currency: 'VND',
  },
  {
    title: 'Lolito',
    description: 'Luxury big sofa',
    price: '7.000.000',
    originalPrice: '14.000.000',
    imageUrl: '/home/cate/cate_ao.png',
    badgeText: '-50%',
    currency: 'Rp',
  },
  {
    title: 'Respira',
    description: 'Outdoor bar table and stool',
    price: '500.000',
    imageUrl: '/home/cate/cate_ao.png',
    badgeText: 'New',
    currency: 'Rp',
  },
];

const ProductList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Tất cả sản phẩm</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
