import React, { createContext, useReducer, useContext } from "react";

const CategoryStateContext = createContext();
const CategoryDispatchContext = createContext();

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload]
      }
    case "REMOVE_CATEGORY":
      var index = state.categories.findIndex(category => category.id == action.payload);
      state.categories.splice(index,1);
      return {
        ...state
      }
    case "CHANGE_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer);

  return (
    <CategoryDispatchContext.Provider value={dispatch}>
      <CategoryStateContext.Provider value={state}>
        {children}
      </CategoryStateContext.Provider>
    </CategoryDispatchContext.Provider>
  );
};

export const useCategoryState = () => useContext(CategoryStateContext);
export const useCategoryDispatch = () => useContext(CategoryDispatchContext);
