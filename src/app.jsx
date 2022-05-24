import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home, Authentication, Error404, Profile, PostModal, EditPost } from './pages'
import { Layout1, PostReactionModal, RestrictAuth, RequireAuth } from "@components";
import useDarkMode from "use-dark-mode";
import Connections from "./pages/connections/connections";

function App() {
    const darkMode = useDarkMode();
    const location = useLocation();
    const pathNames = location.pathname.split("/")
    let background = null
    if ((pathNames.includes("post") || pathNames.includes("edit-post")) && !location.state) {
        background = {
            hash: "",
            key: "jbs4rft0",
            pathname: "/home",
            search: "",
        }
    } else {
        background = location.state && location.state.background;
    }
    return (<>

        <Routes location={background || location}>
            <Route element={<RequireAuth />}>
                <Route element={<Layout1 />}>
                    <Route path="/home" element={<Home />}></Route>
                    {/* <Route path="/profile" element={<Profile />}></Route> */}
                    <Route path="/profile/:username" element={<Profile />}></Route>
                    <Route path="/profile/:username/saved" element={<Profile />}></Route>
                    <Route path="/profile/:username/followers" element={<Connections />}></Route>
                    <Route path="/profile/:username/following" element={<Connections />}></Route>
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
                <Route path="/post/:postId" st element={<PostModal />} />
                <Route path="/edit-post/:postId" element={<EditPost />} />
            </Routes>
        )}
        <PostReactionModal />
    </>
    );
}

export default App;
