import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import SongList from "./components/SongList.jsx";
import SongCreate from "./components/SongCreate.jsx";
import "./style.css";
import SongDetail from "./components/SongDetail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <SongList />,
        index: true,
      },
      {
        path: "songs/new",
        element: <SongCreate />,
      },
      {
        path: "songs/:id",
        element: <SongDetail />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // or http://localhost:4000/graphql
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
