
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
      case 'SET_LOADING':  
        return {
          ...state,
          loading: true,
        };
      case 'SET_ERROR': 
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default noteReducer;
  

  export const SET_NOTES = 'SET_NOTES';
  export const SET_LOADING = 'SET_LOADING';
  export const SET_ERROR = 'SET_ERROR';
  
 
  export const setNotes = (notes) => ({
    type: SET_NOTES,
    payload: notes,
  });
  
  export const setLoading = () => ({
    type: SET_LOADING,
  });
  
  export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
  });
  