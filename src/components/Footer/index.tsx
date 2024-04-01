export const Footer = () => {
  const fromYear = 2024
  const currentYear = new Date().getFullYear()
  return (
    <footer className="text-white/60 font-heading text-center">
      &copy; {fromYear} {currentYear !== fromYear && `- ${currentYear}`} The Ewan Breakey Fan Club
    </footer>
  )
}
