import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/Cycles'
import { differenceInSeconds } from 'date-fns'

import { Container, Separator } from './styles'

const calcRemainingTime = (currentSeconds: number) => {
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  return { minutes, seconds }
}

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsPassed,
    setSecondsAmountPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0
  const { minutes, seconds } = calcRemainingTime(currentSeconds)

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsAmountPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsAmountPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsAmountPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds} | Ignite Timer`
      return
    }

    document.title = 'Ignite Timer'
  }, [minutes, seconds, activeCycle])

  return (
    <Container>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </Container>
  )
}
