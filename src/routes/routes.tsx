import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts";
import { Home } from "../pages/home";
import { SearchPage } from "../pages/search";
import { AuthPage } from "../pages/auth";
import { ArtistPage } from "../pages/artist";
import { AlbumPage } from "../pages/album";
import { NotFoundPage } from "../pages/notFound";

export function RoutesPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/genre/:id" element={<Home />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
