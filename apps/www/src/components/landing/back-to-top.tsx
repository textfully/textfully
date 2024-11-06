"use client";

import { scrollToTop } from "@/utils/helper";

export const BackToTop = () => {
  return (
    <div className="fixed bottom-8 right-8 shadow-2xl">
      <button
        onClick={scrollToTop}
        className="bg-zinc-800 hover:brightness-110 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2">Back to Top</span>
      </button>
    </div>
  );
};
