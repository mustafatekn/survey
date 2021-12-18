import React, { createContext, useReducer, useContext } from "react";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

const surveyReducer = (state, action) => {
  switch (action.type) {
    case "SET_SURVEYS":
      return {
        ...state,
        surveys: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      };
    case "CREATE_ADMIN_SURVEY":
      return {
        ...state,
        surveys: [...state.surveys, action.payload],
      };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

export const SurveyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(surveyReducer);

  return (
    <SurveyDispatchContext.Provider value={dispatch}>
      <SurveyStateContext.Provider value={state}>
        {children}
      </SurveyStateContext.Provider>
    </SurveyDispatchContext.Provider>
  );
};

export const useSurveyState = () => useContext(SurveyStateContext);
export const useSurveyDispatch = () => useContext(SurveyDispatchContext);
