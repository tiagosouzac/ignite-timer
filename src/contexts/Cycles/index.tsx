import { createContext, useState } from 'react'

import { ContextProps, CreateCycleData, ProviderProps } from './types'
import { Cycle } from '../../@types/cycle'

export const CyclesContext = createContext({} as ContextProps)

export const CyclesContextProvider = ({ children }: ProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const createNewCycle = ({ task, minutes }: CreateCycleData) => {
    const cycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      minutes,
      startDate: new Date(),
    }

    setCycles((prev) => [...prev, cycle])
    setActiveCycleId(cycle.id)
    setSecondsPassed(0)
    // reset()
  }

  const interruptCurrentCycle = () => {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (!(cycle.id === activeCycleId)) return cycle

        return { ...cycle, interruptedDate: new Date() }
      }),
    )

    setActiveCycleId(null)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (!(cycle.id === activeCycleId)) return cycle

        return { ...cycle, finishedDate: new Date() }
      }),
    )
  }

  const setSecondsAmountPassed = (seconds: number) => setSecondsPassed(seconds)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        secondsPassed,
        setSecondsAmountPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
