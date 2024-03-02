// import { Link } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Hero from "../components/Hero";
import DataSiswa from "../components/DataSiswa";
import AppCollection from "../components/AppCollection";
import AppBarComponent from "../components/AppBarComponent";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <AppBarComponent />
      <Hero />
    <Box >
      <DataSiswa/>
      <AppCollection/>
    </Box>
    </>

  )
}
