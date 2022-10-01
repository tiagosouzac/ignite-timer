import { ReactNode } from 'react'
import { Cycle } from '../../@types/cycle'

export type CreateCycleData = {
  task: string
  minutes: number
}

export type ContextProps = {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  secondsPassed: number
  setSecondsAmountPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export type ProviderProps = {
  children: ReactNode
}
