import styled from 'styled-components'

export const Container = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  padding: 2.5rem;
  margin: 5rem auto;
  border-radius: 8px;
  background-color: ${({ theme }) => theme['gray-800']};
  display: flex;
  flex-direction: column;
`
