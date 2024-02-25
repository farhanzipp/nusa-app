import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { CssBaseline } from '@mui/material'
import AppBarComponent from '../components/AppBarComponent'

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <AppBarComponent />
      <Outlet />
      <Footer />
    </>
  )
}
