import { Cycle } from '../../@types/cycle'
import { ActionTypes } from './actions'

export type NewCycleActionPayload = {
  newCycle: Cycle
}

export type Action = {
  type: ActionTypes
  payload?: NewCycleActionPayload
}
