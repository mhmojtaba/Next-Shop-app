import { Toaster } from "react-hot-toast";
import "../globals.css";
import Providers from "../Providers";
import Sidebar from "./profile/sidebar";
export const metadata = {
  title: "profile",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="grid grid-cols-4 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <Sidebar />
            </div>
            <div className="col-span-3 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
