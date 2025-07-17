import ClientListDashboard from "../Client List Dashboard/ClientListDashboard";
import SuspenseListDashboard from "../Suspense List Dashboard/SuspenseListDashboard";
import InvoiceListDashboard from "../Invoice List Dashboard/InvoiceListDashboard";
import React from "react";
import ActionListDashboard from "../Action List Dashboard/ActionListDashboard";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
function Dashboard (){
    return (

        <>
            <motion.div 
            className="d-flex flex-row w-100 min-vh-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            >
                      <motion.div
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      initial={{ x: -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                       className="d-flex flex-column justify-content-around align-items-stretch flex-stretch-screen bg-light border-end min-h-100 h-auto p-3"
                       >
                        <ul className="nav flex-column">
                            <motion.li
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 24 }} 
                            className="nav-item"
                            >
                                <NavLink to="/dashboard" className="nav-link">
                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                                </NavLink>
                            </motion.li>
                            <motion.li 
                            className="nav-item"
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            >
                                <NavLink to="/customer" className="nav-link">
                                <i className="bi bi-people-fill me-2"></i> Customers
                                </NavLink>
                            </motion.li>
                            <motion.li 
                            className="nav-item"
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            >
                                <NavLink to="/policy" className="nav-link">
                                <i className="bi bi-file-earmark-text me-2"></i> Policies
                                </NavLink>
                            </motion.li>
                            <motion.li 
                            className="nav-item"
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            >
                                <NavLink to="/suspense" className="nav-link">
                                <i className="bi bi-hourglass-split me-2"></i> Suspense
                                </NavLink>
                            </motion.li>
                        </ul>

                      </motion.div>
                      <div className="flex-grow-1 px-4 py-3">
                            <div className="row gy-4">
                                <div className="col-12 col-md-6">
                                    <ClientListDashboard />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SuspenseListDashboard />
                                </div>
                                <div className="col-12 col-md-6">
                                    <InvoiceListDashboard />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ActionListDashboard />
                                </div>
                            </div>
                      </div>                     
                  </motion.div>
        </>

    );
}

export default Dashboard;