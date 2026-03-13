    import { motion } from 'framer-motion';

    const HandDrawnScratch = ({ scratch, position, delay, opacity, className }) => {
        return (
            <motion.svg
                className={className ?? `absolute hidden lg:block ${position}`}
                width="140"
                height="40"
                viewBox="0 0 150 75"
                fill="none"
                style={{ overflow: "visible", opacity }}
            >
                <motion.path
                    d={scratch}
                    stroke="#FFFFFF70"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        times: [0, 0.3, 0.7, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 3,
                        delay: delay
                    }}
                />
            </motion.svg>
        );
    }

    export default HandDrawnScratch;