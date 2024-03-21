// import { Link } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Hero from "../components/Hero";
import DataSiswa from "../components/DataSiswa";
import AppCollection from "../components/AppCollection";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Hero />
      <Box >
        <DataSiswa/>
        <AppCollection/>
      </Box>
    </>

  )
}
