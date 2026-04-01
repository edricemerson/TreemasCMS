import { createContext, useContext } from "react"
import type { AllDataType } from "./ContextType"

export type ContextType = {
    contextData: AllDataType
    setContextData: React.Dispatch<React.SetStateAction<AllDataType>>
}

export const Context = createContext<ContextType | null>(null)

export const useData = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error("useData must be used inside HeroProvider")
    }
    return context
}