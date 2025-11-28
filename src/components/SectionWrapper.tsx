import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export function SectionWrapper({ children, className = "", id, delay = 0 }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={`min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative ${className}`}
        >
            {children}
        </motion.section>
    );
}
