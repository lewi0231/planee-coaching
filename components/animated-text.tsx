import { motion } from "framer-motion";
import React from "react";

type AnimatedTextProps = {
  text: string[];
  duration?: number;
  delay?: number;
};
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  duration = 0.05,
  delay = 0,
}) => {
  const sentences = text;

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "tween",
        duration,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className=" flex-wrap w-3/4 overflow-hidden -mt-20 pb-20 flex text-lg p-10 space-y-6"
    >
      {sentences.map((sentence, index) => (
        <motion.span
          key={index}
          variants={child}
          className=" inline-block relative"
        >
          {sentence === " " ? "\u00A0" : sentence}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
