// app/components/scroll-demo.js
"use client";
import React from "react";
import { ContainerScroll } from "./scroll-animation";
import BackgroundImage from "./ui/Gradient";
export function ScrollDemo() {
  return (
    <BackgroundImage imagePath="/reference/Gradient1.png">
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll>
        <video
          controls
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        >
          <source src="/videos/Buildspace intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </ContainerScroll>
    </div>
    </BackgroundImage>  
  );
}