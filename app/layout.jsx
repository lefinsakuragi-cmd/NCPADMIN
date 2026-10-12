import "./styles/index.css";
import AuthProvider from "./components/AuthProvider";

function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/ncpLogo.jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NewCentralAdmin</title>
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout