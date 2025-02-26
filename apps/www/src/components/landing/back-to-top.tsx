"use client";

import { scrollToTop } from "@/lib/utils";
import { Button } from "../ui/button";
import UpArrow from "@/assets/icons/misc/up-arrow";

export const BackToTop = () => {
  return (
    <div className="fixed bottom-8 right-8 shadow-2xl">
      <Button
        size="lg"
        variant="surface"
        onClick={scrollToTop}
        className="rounded-full shadow-lg [&_svg]:size-5"
      >
        <UpArrow />
        <span>Back to Top</span>
      </Button>
    </div>
  );
};
