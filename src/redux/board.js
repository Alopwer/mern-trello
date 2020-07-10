const initialState = {
  
}

export default function board(state = initialState, action) {
  switch (action.type) {
    case '':
      return {
        ...state
      }
    default:
      return state
  }
}