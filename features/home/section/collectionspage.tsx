import Image from 'next/image';

export default function CollectionsPage (){
  // Static image URLs for demonstration purposes, update as needed
  const collections = [
    { imageUrl: '/home/grid/collect-5.jpg', title: 'Collection 1' },
    { imageUrl: '/home/grid/collect-2.jpg', title: 'Collection 2' },
    { imageUrl: '/home/grid/collect-3.jpg', title: 'Collection 3' },
    { imageUrl: '/home/grid/collect-4.jpg', title: 'Collection 4' },
    { imageUrl: '/home/grid/collect-9.jpg', title: 'Collection 5' },
    { imageUrl: '/home/grid/collect-7.jpg', title: 'Collection 6' },
    { imageUrl: '/home/grid/collect-6.jpg', title: 'Collection 7' },
    { imageUrl: '/home/grid/collect-1.jpg', title: 'Collection 8' },
    { imageUrl: '/home/grid/collect-8.jpg', title: 'Collection 9' },
  ];

  return (
    <div>
        <div className='item-center m-10'>
          <p className="text-xl font-semibold text-center">Share your setup with</p>
          <h2 className="text-3xl font-semibold text-center">Các bộ sưu tập khác</h2>
        </div>
        <div className="grid grid-cols-[2fr_1fr_2fr] gap-4 items-center">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <a href="/shop">
                <Image
                  src={collections[0].imageUrl}
                  alt={collections[0].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
              <a href="/shop">
                <Image
                  src={collections[1].imageUrl}
                  alt={collections[1].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href="/shop">
                <Image
                  src={collections[2].imageUrl}
                  alt={collections[2].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
              <a href="/shop">
                <Image
                  src={collections[3].imageUrl}
                  alt={collections[3].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="col-span-1 flex flex-col items-center space-y-4">
            
            <a href="/shop">
              <Image
                src={collections[4].imageUrl}
                alt={collections[4].title}
                width={200}
                height={300}
                className="w-full h-auto rounded object-cover"
              />
            </a>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <a href="/shop">
                <Image
                  src={collections[5].imageUrl}
                  alt={collections[5].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
              <a href="/shop">
                <Image
                  src={collections[6].imageUrl}
                  alt={collections[6].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href="/shop">
                <Image
                  src={collections[7].imageUrl}
                  alt={collections[7].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
              <a href="/shop">
                <Image
                  src={collections[8].imageUrl} // Reusing an image here, update as needed
                  alt={collections[8].title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded max-h-60 object-cover"
                />
              </a>
            </div>
          </div>
        </div>
    </div>
    
  );
};

