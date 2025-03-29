import { Navigate, Route, Routes } from "react-router-dom"
import { About, Home, Login, PageNotFound, Register } from "./pages"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/page-not-found" element={<PageNotFound />} />

      <Route path="/*" element={<Navigate to="/page-not-found" />} />
    </Routes>
  )
}

export default App
