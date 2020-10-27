const init = { user: {}, scope: null };

export default (state = init, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_SCOPE':
      return {
        ...state,
        scope: action.scope,
      };
    default:
      return init;
  }
};
