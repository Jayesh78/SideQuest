import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Create from "./pages/Create"
import NoteDetail from "./pages/NoteDetail"
import toast from "react-hot-toast"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<Create/>}/>
      <Route path="/note/:id" element={<NoteDetail/>}/>
    </Routes>
    </>
  )
}

export default App