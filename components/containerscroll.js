// app/components/scroll-demo.js
"use client";
import React from "react";
import { ContainerScroll } from "./scroll-animation";

export function ScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll>
        <video
          controls
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        >
          <source src="/videos/palak-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </ContainerScroll>
    </div>
  );
}