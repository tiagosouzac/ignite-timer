import { useState } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import { Cycle } from '../../@types/cycle'

import { Container, StartCountdownButton, StopCountdownButton } from './styles'
import { HandPalm, Play } from 'phosphor-react'

const NEW_CYCLE_FORM_VALIDATION_SCHEMA = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutes: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof NEW_CYCLE_FORM_VALIDATION_SCHEMA>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NEW_CYCLE_FORM_VALIDATION_SCHEMA),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const cycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    }

    setCycles((prev) => [...prev, cycle])
    setActiveCycleId(cycle.id)
    setSecondsPassed(0)
    reset()
  }

  const handleInterruptCycle = () => {
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
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            secondsPassed,
            setSecondsAmountPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </Container>
  )
}
