import NavSearch from './NavSearch'
import LinksDropdown from './LinksDropdown'
import DarkMode from './DarkMode'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl'>
      <div className='container flex flex-col flex-wrap gap-4 py-4 sm:flex-row sm:items-center sm:justify-between'>
        <Logo />
        <NavSearch />
        <div className='flex gap-4 items-center'>
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
