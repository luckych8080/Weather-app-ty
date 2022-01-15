import React, { FC, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { setAlert } from "../store/actions/alertActions";
import { getWeather, setLoading } from "../store/actions/weatherActions";

import {Container, Paper, Button, Stack, Typography} from "@mui/material";

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === "") {
      return dispatch(setAlert("City is Required!"));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity("");
  };

  return (
    <Container maxWidth="sm" style={{marginTop: "20px"}}>
      <Paper elevation={3} style={{}}>
      <form onSubmit={submitHandler}>
        <Stack spacing={2} style={{display: "flex", alignItems: "center", margin: "15px"}}>
        <Typography variant="h4">{title}</Typography>
        <input
          type="text"
          className="input has-text-centered mb-2"
          placeholder="Enter city name"
          style={{ maxWidth: 300 }}
          value={city}
          onChange={changeHandler}
        />
        <Button color="success" size="large"
          style={{ maxWidth: 300, margin: "10px" }}
        >
          Search
        </Button>
        </Stack>
      </form>
      </Paper>
    </Container>
  );
};

export default Search;
