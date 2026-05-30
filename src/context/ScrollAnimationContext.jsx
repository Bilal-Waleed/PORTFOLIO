import { createContext, useCallback, useContext, useState } from "react";

const ScrollAnimationContext = createContext(null);

export function ScrollAnimationProvider({ children }) {
  const [heroPhase, setHeroPhase] = useState("idle");

  const hideHeroForReplay = useCallback(() => {
    setHeroPhase("hidden");
  }, []);

  const playHeroReplay = useCallback(() => {
    setHeroPhase("replay");
  }, []);

  const resetHeroPhase = useCallback(() => {
    setHeroPhase("idle");
  }, []);

  return (
    <ScrollAnimationContext.Provider
      value={{ heroPhase, hideHeroForReplay, playHeroReplay, resetHeroPhase }}
    >
      {children}
    </ScrollAnimationContext.Provider>
  );
}

export function useScrollAnimation() {
  const ctx = useContext(ScrollAnimationContext);
  if (!ctx) {
    throw new Error("useScrollAnimation must be used within ScrollAnimationProvider");
  }
  return ctx;
}
