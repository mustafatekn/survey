import React, { createContext, useReducer, useContext } from "react";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

const surveyReducer = (state, action) => {
  switch (action.type) {
    case "SET_DISCOVER_SURVEYS":
      return {
        ...state,
        discoverSurveys: action.payload,
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
    case "CREATE_DISCOVER_SURVEY":
      return {
        ...state,
        discoverSurveys: [...state.discoverSurveys, action.payload],
      };
    case "REMOVE_DISCOVER_SURVEY":
      var index = state.discoverSurveys.findIndex(
        (survey) => survey.id === action.payload
      );
      state.discoverSurveys.splice(index, 1);
      return {
        ...state,
      };
    case "GET_SURVEYS_BY_USER":
      return {
        ...state,
        surveys:  action.payload,
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
