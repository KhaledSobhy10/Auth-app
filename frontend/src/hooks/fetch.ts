import { useCallback, useReducer } from "react";

export enum FetchType {
  LOAD,
  LOADED,
}

export type payloadType =
  | { data: any }
  | { errorResponse: any }
  | { errorMessage: string };

export type FetchAction = {
  type: FetchType;
  payload: payloadType;
};

export type FetchState = {
  isLoading: boolean;
  data?: any;
  errorResponse?: any;
  errorMessage?: string;
};

export type RequestInfo = { url: string; method: string; data: any };

const reducer = (state: FetchState, action: FetchAction) => {
  switch (action.type) {
    case FetchType.LOAD:
      if (!state.isLoading) return { isLoading: true };
      else return state;
    case FetchType.LOADED:
      return { isLoading: false, ...action?.payload };
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
        },
        body: JSON.stringify(requestInfo.data), // body data type must match "Content-Type" header
      });
      const responseData = await response.json();
      if (responseData.success) {
        return dispatch({
          type: FetchType.LOADED,
          payload: { data: responseData },
        });
      }
      dispatch({
        type: FetchType.LOADED,
        payload: { errorResponse: responseData },
      });
    } catch (errors) {
      dispatch({
        type: FetchType.LOADED,
        payload: { errorMessage: errors as string },
      });
    }
  }, []);

  return { state, makeRequest };
};
