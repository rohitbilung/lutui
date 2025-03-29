import { Navigate, Route, Routes } from "react-router-dom"
import { About, Home } from "./pages"
import PageNotFound from "./pages/_root/PageNotFound"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      
      <Route path="/page-not-found" element={<PageNotFound />} />

      <Route path="/*" element={<Navigate to="/page-not-found" />} />
    </Routes>
  )
}

export default App
