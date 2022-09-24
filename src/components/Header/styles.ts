import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      color: ${({ theme }) => theme['gray-100']};
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        border-bottom-color: ${({ theme }) => theme['green-500']};
      }

      &.active {
        color: ${({ theme }) => theme['green-500']};
      }
    }
  }
`
