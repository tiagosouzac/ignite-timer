import { createContext, useEffect, useReducer, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (!activeCycle) return 0

    return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
  })

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
