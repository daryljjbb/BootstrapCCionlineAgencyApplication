import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../Glass Card/GlassCard";
import { FaPerson } from "react-icons/fa6";

function InvoiceListDashboard () {

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
        <>
            <div className="row">
                <motion.div className="col-md-12"variants={cardVariants}>
                    <GlassCard icon="📃" title="Invoices" className="mb-4 shadow-royal" animated>
                        <div className="card-body">
                            <div className="list-group">
                                {/* Corrected spacing for icons with ms-auto, and adjusted classes for active state look */}
                                <button type="button" className="list-group-item list-group-item-action rounded-pill d-flex justify-content-between align-items-center mb-2 active" aria-current="true">
                                    Invoice 1
                                    <i className="bi bi-folder2-open ms-auto"></i> 
                                </button>
                                <button type="button" className="list-group-item list-group-item-action rounded-pill d-flex justify-content-between align-items-center mb-2">
                                    Invoice 2
                                    <i className="bi bi-folder2-open ms-auto"></i>
                                </button>
                                <button type="button" className="list-group-item list-group-item-action rounded-pill d-flex justify-content-between align-items-center mb-2">
                                    Invoice 3
                                    <i className="bi bi-folder2-open ms-auto"></i>
                                </button>
                                <button type="button" className="list-group-item list-group-item-action rounded-pill d-flex justify-content-between align-items-center mb-2">
                                    Invoice 4
                                    <i className="bi bi-folder2-open ms-auto"></i>
                                </button>
                                <button type="button" className="list-group-item list-group-item-action rounded-pill d-flex justify-content-between align-items-center">
                                    Invoice 5
                                    <i className="bi bi-folder2-open ms-auto"></i>
                                </button>
                            </div>
                        </div>                          
                    </GlassCard>
                </motion.div>
            </div>
        </>
    );
}

export default InvoiceListDashboard;
