import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddFilm from "../components/AddFilm";
import FilmList from "../components/FilmList";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddFilm />
      <FilmList />
    </Container>
  )
};
