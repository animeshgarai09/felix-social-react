import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home, Authentication, Error404, Profile, PostModal, EditPost } from './pages'
import { Layout1 } from "./components"
import RestrictAuth from "./components/auth/restrict-auth";
import RequireAuth from "./components/auth/require-auth";
import useDarkMode from "use-dark-mode";

function App() {
    const darkMode = useDarkMode();
    let location = useLocation();
    let background = location.state && location.state.background;;
    return (<>

        <Routes location={background || location}>
            <Route element={<RequireAuth />}>
                <Route element={<Layout1 />}>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/profile/:username" element={<Profile />}></Route>
                    <Route path="*" element={<Error404 />}></Route>
                </Route>
            </Route>
            <Route path='/' element={<Navigate to='signin' replace />} />
            <Route element={<RestrictAuth />}>
                <Route index path="signin" element={<Authentication />}></Route>
                <Route path="signup" element={<Authentication />}></Route>
            </Route>
        </Routes>
        {background && (
            <Routes>
                <Route path="/post/:postId" element={<PostModal />} />
                <Route path="/edit-post/:postId" element={<EditPost />} />
            </Routes>
        )}

    </>
    );
}

export default App;
