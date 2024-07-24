//Test toastify

"use client";

import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { print } from "@/utils/toast";

export default function Home() {
  const notify = () => {
    print("Hello World", "success");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <button onClick={notify}>Click Me!!</button>
        <Footer />
      </div>
    </>
  );
}
