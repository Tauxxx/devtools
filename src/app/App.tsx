import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import JsonBeautify from "../features/json-beautify/components/JsonBeautify";
import JsonMinify from "../features/json-beautify/components/JsonMinify";
import HashGenerator from "../features/hash-generator/components/HashGenerator";
import PasswordGenerator from "../features/password-generator/components/PasswordGenerator";
import UrlEncoder from "../features/url-encoder/components/UrlEncoder";
import HtmlEntities from "../features/html-entities/components/HtmlEntities";
import Base64 from "../features/base64/components/Base64";
import Serialize from "../features/serialize/components/Serialize";
import UuidGenerator from "../features/uuid-generator/components/UuidGenerator";
import JwtDecoder from "../features/jwt-decoder/components/JwtDecoder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/json-beautify",
        element: <JsonBeautify />,
      },
      {
        path: "/json-minify",
        element: <JsonMinify />,
      },
      {
        path: "/hash-generator",
        element: <HashGenerator />,
      },
      {
        path: "/password-generator",
        element: <PasswordGenerator />,
      },
      {
        path: "/url-encoder",
        element: <UrlEncoder />,
      },
      {
        path: "/html-entities",
        element: <HtmlEntities />,
      },
      {
        path: "/base64",
        element: <Base64 />,
      },
      {
        path: "/serialize",
        element: <Serialize />,
      },
      {
        path: "/uuid-generator",
        element: <UuidGenerator />,
      },
      {
        path: "/jwt-decoder",
        element: <JwtDecoder />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
