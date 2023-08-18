import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Shopping Project",
  description: "Generated by Mojtaba",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <header className="mx-auto xl:max-w-screen-2xl bg-red-300">
          <ul className=" w-full flex justify-around items-center h-10">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </header>
        <div className="container mx-auto xl:max-w-screen-2xl">{children}</div>
      </body>
    </html>
  );
}
