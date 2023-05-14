import React from "react";
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddFilm from "../components/AddFilm";
import FilmList from "../components/FilmList";
import AddShow from "../components/AddShow";
import ShowList from "../components/ShowList";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddFilm />
      <FilmList />
      <AddShow />
      <ShowList />
    </Container>
  )
};
