export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }
  
  export const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  }
  
  export const listItemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  }
  
  export const coinVariants = {
    initial: { 
      opacity: 1,
      y: 0,
      rotate: 0 
    },
    animate: { 
      opacity: 0,
      y: -50,
      rotate: 360,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  }
  
  export const miningVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.1, 1.1, 1],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
  
  export const elevatorVariants = {
    initial: { scaleY: 1 },
    animate: (progress: number) => ({
      scaleY: progress === 0 ? 1.5 : 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    })
  }
  
  export const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  }