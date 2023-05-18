import { useCallback, useReducer } from "react";
import { USER_TOKEN } from "../constants/keys";

export enum FetchType {
  LOAD,
  LOADED,
}

export type payloadType = { error: { message: string } } | { response: any };

export type FetchAction = {
  type: FetchType;
  payload: payloadType;
};

export type FetchState = {
  isLoading: boolean;
  response?: any;
};

export type RequestInfo = { url: string; method: string; data?: any };

const reducer = (state: FetchState, action: FetchAction) => {
  switch (action.type) {
    case FetchType.LOAD:
      if (!state.isLoading) return { isLoading: true };
      else return state;
    case FetchType.LOADED:
      return { isLoading: false, response: action.payload };
    default:
      return state;
  }
};

export const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, { isLoading: false });

  const makeRequest = useCallback(async (requestInfo: RequestInfo) => {
    try {
      const response = await fetch(requestInfo.url, {
        method: requestInfo.method, // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
        },
        body: JSON.stringify(requestInfo?.data), // body data type must match "Content-Type" header
      });
      const responseData = await response.json();
      return dispatch({
        type: FetchType.LOADED,
        payload: responseData,
      });
    } catch (errors) {
      return dispatch({
        type: FetchType.LOADED,
        payload: { error: { message: errors as string } },
      });
    }
  }, []);

  return { state, makeRequest };
};
