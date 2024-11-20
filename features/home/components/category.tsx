import Image from 'next/image';

const categories = [
  {
    name: 'Quần',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/home/cate/cate_quan.png', // Replace with the actual path
  },
  {
    name: 'Áo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/home/cate/cate_ao.png', // Replace with the actual path
  },
  {
    name: 'Phụ kiện',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/home/cate/cate_phukien.png', // Replace with the actual path
  },
];

export default function ProductCategories() {
  return (
    <section className="py-12 flex flex-col justify-center items-center mb-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold m-2">Danh mục sản phẩm</h2>
        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="flex justify-center gap-8">
        {categories.map((category, index) => (
          <a key={index} href="/shop" className="text-center">
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src={category.image}
                alt={category.name}
                width={380}       // Width of each image
                height={480}      // Height of each image
                className="object-cover"
                style={{ minHeight: '480px' }}
              />
            </div>
            <h3 className="mt-4 font-medium text-xl text-black">{category.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
