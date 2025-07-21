import type { ReactNode } from "react";
import Navbar from "./components/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#fdfdf6]">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
