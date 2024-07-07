import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

const SmoothScroll = ({ children }) => {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      lenis?.stop();
      lenis?.start();
    });
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
