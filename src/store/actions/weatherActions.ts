import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR,
} from "../types";

export const getWeather = (
  city: string
): ThunkAction<void, RootState, null, WeatherAction> => {
  return async (dispatch) => {
    try {
      // console.log(city)
      // console.log(process.env.REACT_APP_API_KEY)
      const res = await fetch(
        'api.openweathermap.org/data/2.5/weather?q=London&appid=16a66edddd6be82fcb0b257841bf7ae9'
      );


      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }
      // console.warn(xhr.res)

      console.log(res)

      const resData: WeatherData = await res.json();

      console.log( resData)

      dispatch({
        type: GET_WEATHER,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  };
};

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING,
  };
};

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: "",
  };
};
