// import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import SessionWrapper from "./components/SessionWrapper";
// const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Jarvo Cotton - Best Kurtas",
  description: "Best  Kurtas in India Buy Kurtas Online at Jarvo Cotton",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      {/* <body className={inter.className}> */}
     
        <StoreProvider>
          <SessionWrapper>
          {children}
          </SessionWrapper>
        </StoreProvider>
      </body>

    </html>
  );
}
