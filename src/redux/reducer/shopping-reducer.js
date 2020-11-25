

const initialState = {
  products: [],
  cart: [],
  currentItem: null
}



const shopReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_GOTTEN_SUCCESSFUL":
      return {
        ...state,
        products: action.payload,
      }

    case "ADD_TO_CART":
      const item = state.products.find(prod => prod.id === action.payload.id);
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart ?
          state.cart.map((item) => item.id === action.payload.id ?
            { ...item, quantity: item.quantity + 1 } : 
            item) :
          [...state.cart, { ...item, quantity: 1 }],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item =>
          item.id !== action.payload.id
        ),
      }

      case "CLEAR_ALL_ITEMS":
      return{
        ...state,
        cart: []
      }


    case "CHANGE_QUANTITY_OF_CART":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: +action.payload.quantity } : item
        ),
      }

    case "LOAD_ALL_PRODUCTS":
      return {
        ...state,
        currentItem: action.payload
      }

    default:
      // console.log(state)
      return state;
  }
}

export default shopReducerFunction