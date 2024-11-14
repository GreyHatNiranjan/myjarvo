// import { create } from 'zustand'

// const useCart = create((set) => ({
//   count: null,
//   addToCart: () => set((state) => ({ count: state.count})),
//   fetchPosts: async () => {
//     const response = await fetch(`/api/supabase`);
//     const data = await response?.json()
//     let arrData = data.Products
//     console.log(arrData);
//     console.log(typeof arrData);
//     set({ count: arrData });
//   },
//   // addToCart: () => set((state) => ({ count: state.count + 1 })),
//   removeAllCart: () => set({ count: 0 }),
// }))

// export default useCart  

import { create } from 'zustand';
const useCart = create((set) => ({
  count: null,
  products: [], // Initialize an array to store products

  addToCart: (product) => set((state) => ({
    products: [...state.products, product],
  })),

  fetchPosts: async () => {
    try {
      const response = await fetch(`/api/mysql`);
      console.log(response);
      
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      // console.log(data);
      if(response.ok){
        
        // console.log(data);
        // const arrData = data.Products ; // Ensure it's an array
        set({ products: data }); // Update state with products
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },

  removeAllCart: () => set({ products: [] }), // Reset products array
}));

export default useCart;