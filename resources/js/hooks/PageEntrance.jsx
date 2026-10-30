import { createContext, useContext } from "react";

export const PageEntranceContext = createContext(true);
export const usePageEntrance = () => useContext(PageEntranceContext);
