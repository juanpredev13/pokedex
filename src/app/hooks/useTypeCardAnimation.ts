import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function useTypeCardAnimation(index: number) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.1,
        },
      )
    }
  }, [index])

  return cardRef
}

