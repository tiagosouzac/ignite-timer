import { CyclesState } from '../../contexts/Cycles/types'
import { ActionTypes } from './actions'

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const modifiedCycles = state.cycles.map((cycle) => {
        if (!(cycle.id === state.activeCycleId)) return cycle
        return { ...cycle, interruptedDate: new Date() }
      })

      return {
        ...state,
        cycles: modifiedCycles,
        activeCycleId: null,
      }
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const modifiedCycles = state.cycles.map((cycle) => {
        if (!(cycle.id === state.activeCycleId)) return cycle
        return { ...cycle, finishedDate: new Date() }
      })

      return {
        ...state,
        cycles: modifiedCycles,
        activeCycleId: null,
      }
    }

    default:
      return state
  }
}
