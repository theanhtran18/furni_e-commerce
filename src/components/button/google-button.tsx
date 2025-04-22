// components/GoogleAuthButton.tsx
"use client";

import React from "react";

type GoogleAuthButtonProps = {
  onClick: () => void;
  label: string;
};

const GoogleAuthButton = ({ onClick, label }: GoogleAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2 text-gray-700 hover:bg-gray-100 transition-all"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default GoogleAuthButton;
