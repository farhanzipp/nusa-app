// import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Hero from "../components/Hero";
import DataSiswa from "../components/DataSiswa";
import AppCollection from "../components/AppCollection";
import AppBarComponent from "../components/AppBarComponent";

export default function Home() {
  return (
    <Box>
      <AppBarComponent />
      <Hero />
      <DataSiswa/>
      <AppCollection/>
    </Box>

  )
}
