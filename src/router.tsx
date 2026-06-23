import { createBrowserRouter } from "react-router-dom";
import { GalleryLayout } from "./gallery/GalleryLayout";

// Single full-height scrollable page; navigation is in-page via hash anchors.
// basename matches the Vite base so it works under /aevox-design/ on Pages.
export const router = createBrowserRouter(
  [{ path: "*", element: <GalleryLayout /> }],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" },
);
