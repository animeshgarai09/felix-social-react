import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Error404 } from './pages'
import { Layout1 } from "./components"

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout1 />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="*" element={<Error404 />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
