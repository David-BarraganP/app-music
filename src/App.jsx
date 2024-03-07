import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PlayListDetail from "./pages/PlayListDetail";
import TrackDetail from "./pages/TrackDetail";
import ArtistsDetail from "./pages/ArtistsDetail";
import PlayLists from "./pages/PlayLists";
import PlaylistsPublic from "./pages/PlaylistsPublic";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import Page404 from "./pages/Page404";

function App() {
  return (
    <>
      {/* aqui vamos a definir todos nuestras rutas  */}
      {/* rutas publicas */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playlists/public/:id" element={<PlaylistsPublic />} />

        {/* rutas privada  */}
        <Route element={<PrivateRoutes/> }>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<PlayLists />} />
          <Route path="/playlists/:id" element={<PlayListDetail />} />
          <Route path="/tracks/:id" element={<TrackDetail />} />
          <Route path="/artists/:id" element={<ArtistsDetail />} />
        </Route>

<Route  path="*" element={<Page404 />}/>
      </Routes>
    </>
  );
}

export default App;
