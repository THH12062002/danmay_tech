"use client";

import React, { useState } from "react";
import Link from "next/link";

const UserLayoutHeader = () => {
  const messages = [
    { text: "Join Our Group on Facebook.", url: "https://www.facebook.com" },
    { text: "Join Our Group on Discord.", url: "https://www.discord.com" },
    { text: "Follow Us on Twitter.", url: "https://www.twitter.com" },
    {
      text: "Subscribe to Our YouTube Channel.",
      url: "https://www.youtube.com",
    },
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? messages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === messages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-black text-white text-center py-4 text-sm flex justify-center items-center">
      <span className="cursor-pointer px-2" onClick={handlePrev}>
        &lt;
      </span>
      <div className="w-72 text-center">
        <Link href={messages[index].url}>{messages[index].text}</Link>
      </div>
      <span className="cursor-pointer px-2" onClick={handleNext}>
        &gt;
      </span>
    </div>
  );
};

export default UserLayoutHeader;
