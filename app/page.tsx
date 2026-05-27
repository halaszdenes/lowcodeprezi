import { Suspense } from "react";
import { SlideDeck } from "@/components/slide-deck";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SlideDeck />
    </Suspense>
  );
}
