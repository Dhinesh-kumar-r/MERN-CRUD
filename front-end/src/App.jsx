import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './components/Dashboard.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard/>}/>
          
        </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
