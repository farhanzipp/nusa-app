import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInSide from "./pages/SignInSide"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage"
import Profile from "./pages/Profile"
import Proposal from "./pages/Proposal"
import Siswa from "./pages/Siswa"

function App() {
  return (
    <BrowserRouter basename="/nusa/"> 
      <Routes>
        {/* no layout */}
        <Route path="login" element={<SignInSide />}/>
        {/*with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="proposal" element={<Proposal />}/>
          <Route path="datasiswa" element={<Siswa />}/>
          <Route path="*" element={<NoPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
