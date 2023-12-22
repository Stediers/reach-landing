export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0, // this will set a delay before the children start animating
      staggerChildren: 0.1, // this will set the time inbetween children animation
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const dropUpVariants = {
  hidden: {
    opacity: 0,
    y: "100vw",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 0.3,
      // remove delay: 0.3,
    },
  },
};
