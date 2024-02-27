import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInSide from "./pages/SignInSide"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage"
import Profile from "./pages/Profile"
import Proposal from "./pages/Proposal"

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* no layout */}
        <Route index element={<Home />}/>
        <Route path="login" element={<SignInSide />}/>
        <Route path="/" element={<Layout />}>
          <Route path="profile" element={<Profile />}/>
          <Route path="proposal" element={<Proposal />}/>
          <Route path="*" element={<NoPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
