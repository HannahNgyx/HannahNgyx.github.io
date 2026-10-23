import { createContext, useContext } from "react";

// Named places where the enhance layer may add decorative markup (house rule L-4).
// The enhance module registers components by slot name; with enhance off the map is
// empty and every Slot renders nothing, so base never depends on enhance (L-3).
export const EnhanceContext = createContext({});

export function Slot({ name, ...props }) {
  const Enhancement = useContext(EnhanceContext)[name];
  return Enhancement ? <Enhancement {...props} /> : null;
}
