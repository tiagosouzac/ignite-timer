import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Container,
  CountdownContainer,
  FormContainer,
  MinutesInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

import { Play } from 'phosphor-react'

const NEW_CYCLE_FORM_VALIDATION_SCHEMA = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutes: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof NEW_CYCLE_FORM_VALIDATION_SCHEMA>

type Cycle = {
  id: string
  task: string
  minutes: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NEW_CYCLE_FORM_VALIDATION_SCHEMA),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const cycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
    }

    setCycles((prev) => [...prev, cycle])
    setActiveCycleId(cycle.id)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>

          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutes">durante</label>

          <MinutesInput
            id="minutes"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutes', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </Container>
  )
}
