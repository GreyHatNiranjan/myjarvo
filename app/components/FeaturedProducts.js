import React from 'react';

const products = [
  { id: 1, name: 'Red Dress', image: '/featured1.jpg', price: '120', sale: true },
  { id: 2, name: 'Leather Jacket', image: '/featured2.jpg', price: '250', sale: true },
  { id: 3, name: 'Stylish Hat', image: '/featured3.jpg', price: '45', sale: false },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-black text-white py-12">
      <div className="container mx-auto text-center">
      <div className="flex justify-center gap-4">
                <span className="w-16 border border-white h-0 top-4 relative"></span>
                <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
                <span className="w-16 border border-white h-0 top-4 relative"></span>
            </div>
        <div className="mx-auto max-md:flex-col flex-row flex  gap-8 items-center justify-center">
          {products.map((product) => (
            <div key={product.id} className="min-w-[20%]  max-w-[30%] rounded-md overflow-hidden relative max-md:max-w-[75%]">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 p-4 w-full max-md:max-h-[30%]">
                <h4 className="font-bold">{product.name}</h4>
                <p className="text-gray-400">₹{product.price}</p>
                {product.sale && <span className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-sm">Sale</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
