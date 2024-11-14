import { createSlice } from '@reduxjs/toolkit';

// Function to fetch products from the server
const fetchProducts = async () => {
  const response = await fetch('/api/mysql'); // Modify this to your actual endpoint
  const data = await response.json();
  return data.products; // Assuming the API returns an array of product objects
};

const ISSERVER = typeof window === "undefined";
let initialCart = [];
if (!ISSERVER) {
  initialCart = JSON.parse(localStorage.getItem('cart')) || [];
}

let initialState = {
  cart: initialCart,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isPresent = state.cart.find((item) => item.id === action.payload.id);
      if (!isPresent) {
        state.cart.push({ ...action.payload });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    incerment: (state, action) => {
      state.cart = state.cart.map((item) => 
        item.id === action.payload.id ? { ...item, min_quantity: parseFloat(item.min_quantity) + 0.25 } : item
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decerment: (state, action) => {
      state.cart = state.cart.map((item) => 
        item.id === action.payload.id ? { ...item, min_quantity: Math.max(1, parseFloat(item.min_quantity) - 0.25) } : item
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    changeQuantity: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, min_quantity: action.payload.min_quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    validateCart: (state) => {
      fetchProducts().then(serverProducts => {
        const serverProductIds = serverProducts.map(product => product.id);
        const validCart = state.cart.filter(item => serverProductIds.includes(item.id));

        // If the cart has changed, update localStorage and state
        if (validCart.length !== state.cart.length) {
          state.cart = validCart;
          localStorage.setItem('cart', JSON.stringify(validCart));
        }
      }).catch(err => {
        console.error('Failed to validate cart:', err);
      });
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, incerment, decerment, changeQuantity, validateCart } = counterSlice.actions;

export default counterSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit'

// const ISSERVER = typeof window === "undefined";
// let initialCart
// if (!ISSERVER) {
//   initialCart = JSON.parse(localStorage.getItem('cart')) || [];
// }

// let initialState = {
//   cart: initialCart,
// }
// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       // if(cart.f)
//       const isPresent = state.cart.find((item) => {
//         return item.id === action.payload.id
//       })
//       if (isPresent) {
//         state.cart = state.cart.filter((item) => {
//           return item.id === action.payload.id ? { ...item } : item;
//           // return s =>s.id === action.payload.id ? { ...item, min_quantity: item.min_quantity++} : item
//         })
//       } else {
//         state.cart.push({ ...action.payload })
//         // state.cart.push({ ...action.payload, min_quantity: 1 })
//       }
//       localStorage.setItem('cart', JSON.stringify(state.cart));

//     },
//     deleteFromCart: (state, action) => {
//       // if(cart.f)
//       state.cart = state.cart.filter((item) => {
//         return item.id !== action.payload
//       })
//       // initialState.cart = newArray
//       // console.log(newArray);
//       // state.cart = newArray
//       localStorage.setItem('cart', JSON.stringify(state.cart));

//     },
//     incerment: (state, action) => {
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload.id) {
//           // console.log(typeof item.min_quantity);
//           console.log(typeof  item.min_quantity);

          
          
//           return { ...item, min_quantity: parseFloat(item.min_quantity) + 0.25 };
//         }
//         return item;
//       });
//       localStorage.setItem('cart', JSON.stringify(state.cart)); // Persist changes to localStorage
//     },
//     decerment: (state, action) => {
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload.id) {
//           return { ...item, min_quantity: Math.max(1, parseFloat(item.min_quantity) - 0.25) }; // Ensure min_quantity doesn't go below 1
//         }
//         return item;
//       });
//       localStorage.setItem('cart', JSON.stringify(state.cart)); // Persist changes to localStorage
//     },
//     changeQuantity: (state, action) => {
//       // console.log('Change quantity payload:', action.payload);
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload.id) {
//           return { ...item, min_quantity: action.payload.min_quantity };
//         }
//         return item;
//       });
//       localStorage.setItem('cart', JSON.stringify(state.cart));
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { addToCart, deleteFromCart, incerment, decerment, changeQuantity   } = counterSlice.actions

// export default counterSlice.reducer