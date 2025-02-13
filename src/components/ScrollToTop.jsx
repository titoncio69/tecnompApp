import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <Box
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 30 },
          left: { xs: 10, md: 20 },
          width: { xs: 80, md: 120 },
          height: { xs: 80, md: 120 },
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: 3,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "auto",
          "&:hover": { transform: "scale(1.2)" },
          overflow: "hidden",
        }}
      >
        <Box
          component="video"
          src="/images/3d.mp4"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </Box>
    )
  );
}

export default ScrollToTop;
