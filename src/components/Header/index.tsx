import { Container } from './styles'

import logoImg from '../../assets/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <Container>
      <img src={logoImg} alt="" />

      <nav>
        <NavLink to="/" title="Timer" end>
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Container>
  )
}
