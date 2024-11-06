"use client";

import { useEffect, useState } from "react";

import constate from "constate";

const useApp = () => {
  const [shouldLoadAnimation, setShouldLoadAnimation] = useState(true);

  useEffect(() => {
    // Only animate on first render
    setShouldLoadAnimation(false);
  }, []);

  return {
    shouldLoadAnimation,
  };
};

export const [AppProvider, useAppContext] = constate(useApp);
