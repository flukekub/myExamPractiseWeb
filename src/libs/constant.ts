export const BEZIER = [0.19, 1, 0.22, 1] as const;
export const STAGGER = 0.04;
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: STAGGER },
  },
};
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: BEZIER } },
};
