import { useEffect, useState } from "react"

export function useScrollVisibility(offset = 50) {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < offset) {
        setVisible(true)
        return
      }

      setVisible(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, offset])

  return visible
}
