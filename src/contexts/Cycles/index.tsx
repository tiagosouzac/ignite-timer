import { createContext, useReducer, useState } from 'react'

import {
  ContextProps,
  CreateCycleData,
  CyclesState,
  ProviderProps,
} from './types'
import { Cycle } from '../../@types/cycle'

export const CyclesContext = createContext({} as ContextProps)

export const CyclesContextProvider = ({ children }: ProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (!(cycle.id === state.activeCycleId)) return cycle
              return { ...cycle, interruptedDate: new Date() }
            }),
            activeCycleId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (!(cycle.id === state.activeCycleId)) return cycle
              return { ...cycle, finishedDate: new Date() }
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    { cycles: [], activeCycleId: null },
  )

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

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
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
