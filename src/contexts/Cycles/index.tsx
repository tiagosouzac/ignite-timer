import { createContext, useReducer, useState } from 'react'
import { cyclesReducer } from '../../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../../reducers/cycles/actions'

import { ContextProps, CreateCycleData, ProviderProps } from './types'
import { Cycle } from '../../@types/cycle'

export const CyclesContext = createContext({} as ContextProps)

export const CyclesContextProvider = ({ children }: ProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [secondsPassed, setSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const createNewCycle = ({ task, minutes }: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      minutes,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
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
