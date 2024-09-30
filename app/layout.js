"use client"
import './ui/globals.css'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@safaricom/sui";

// export const metadata = {
//   title: 'SMS Dashboard',
//   description: 'Next.js',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
