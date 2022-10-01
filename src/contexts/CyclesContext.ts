import { createContext } from 'react'

import { Cycle } from '../@types/cycle'

type ContextProps = {
  activeCycle?: Cycle
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  secondsPassed: number
  setSecondsAmountPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as ContextProps)
