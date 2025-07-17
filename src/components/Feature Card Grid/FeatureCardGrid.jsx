import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../Glass Card/GlassCard";

function FeatureCardGrid({
  features = [],
  className = "",
  cardClass = "",
  columnClass = "col-md-3",
  iconColor = "#c62828",
}) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className={`row g-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {features.map((feature, index) => (
        <motion.div key={index} className={`${columnClass} ${cardClass}`} variants={cardVariants}>
          <GlassCard
            icon={React.cloneElement(feature.icon, {
              color: iconColor,
              size: 32,
              className: "feature-icon",
            })}
            title={feature.title}
            className={feature.className || ""}
          >
            {feature.description && <p>{feature.description}</p>}
            {feature.cta && (
              <a href={feature.cta.to} className={feature.cta.buttonClass}>
                {feature.cta.label}
              </a>
            )}
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default FeatureCardGrid;
