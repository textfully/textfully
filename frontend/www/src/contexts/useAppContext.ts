"use client";

import { useEffect, useState } from "react";

import constate from "constate";

const useApp = () => {
  const [shouldAnimateNav, setShouldAnimateNav] = useState(true);

  useEffect(() => {
    // Only animate on first render
    setShouldAnimateNav(false);
  }, []);

  return {
    shouldAnimateNav,
  };
};

export const [AppProvider, useAppContext] = constate(useApp);
