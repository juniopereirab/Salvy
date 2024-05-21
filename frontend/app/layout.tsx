import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Salvy App",
  description: "Created by Dâmaso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
