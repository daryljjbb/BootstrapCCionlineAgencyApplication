import React from 'react';
import {motion} from 'framer-motion'

function GlassCard({ icon, title, children, className = '', cta }) {
  return (
    <motion.div className={`glass-block p-4 text-center ${className}`} >
      {icon && (
        <motion.div className="fs-1 mb-3" whileHover={{ rotate: [0, 6, -6, 0], transition: { duration: 0.5 } }}>
          {icon}
        </motion.div>
      )}
      {title && <h5 className="mb-2">{title}</h5>}
      {children}
      {cta && (
        <motion.button
          className={cta.buttonClass}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={cta.to} className="text-decoration-none">
            {cta.label}
          </Link>
        </motion.button>
      )}
    </motion.div>
  );
}

export default GlassCard;