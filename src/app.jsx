import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, Authentication, Error404, Profile } from './pages'
import { Layout1 } from "./components"
import RestrictAuth from "./components/auth/restrict-auth";
import useDarkMode from "use-dark-mode";

function App() {
    const darkMode = useDarkMode();

    return (
        <Router>
            <Routes>
                <Route element={<Layout1 />}>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="*" element={<Error404 />}></Route>
                </Route>
                <Route path='/' element={<Navigate to='signin' replace />} />
                <Route element={<RestrictAuth />}>
                    <Route index path="signin" element={<Authentication />}></Route>
                    <Route path="signup" element={<Authentication />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
