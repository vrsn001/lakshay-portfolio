import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ParallaxElement({ children, offset = 50, className = "", style = {} }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    return (
        <motion.div ref={ref} style={{ y, ...style }} className={className}>
            {children}
        </motion.div>
    );
}
