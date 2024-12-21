const initialState = {
    notes: [],      
    loading: false, 
    error: null,   
  };
  
  const noteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTES':
        return {
          ...state,
          notes: action.payload,
          loading: false,
          error: null,
        };
      case 'SET_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };
  
  
  
  export default noteReducer;
  