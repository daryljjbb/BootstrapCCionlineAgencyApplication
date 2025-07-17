import React, { useContext } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CustomerPage from './components/Customer Page/CustomerPage';
import PolicyPage from './components/Policy/Policy Page/PolicyPage';
import SuspensePage from './components/Suspense/SuspensePage';
import PolicyDetails from './components/Policy/Policy Details/PolicyDetails';
import customerData from './components/Customer Page/data/customers.json';
import policyData from './components/Policy/data/policies.json';
import Reports from './components/Reports/Reports';
import BirthdaysReport from  "../src/components/Reports/Birthday Reports/BirthdayReport";
import ExpiringPoliciesReport from "../src/components/Reports/Expiring Policies Report/ExpiringPoliciesReport";
import FirstPolicyStatusReport from "../src/components/Reports/First Policy Status Report/FirstPolicyStatusReport";
import SmartBreadcrumbs from './components/Breadcrumbs/Smart Breadcrumbs/SmartBreadcrumbs';
import { CustomerContext } from './components/Customer Context/CustomerContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCustomer } = useContext(CustomerContext); // ✅ Safe now, because wrapped in Provider

  const handleUpdateCustomer = (updatedCustomer) => {
    // Stub: update logic here
  };

  const handleNavigateToCustomerDetails = (customerId) => {
    // Stub: navigation logic here
  };

  const handleClearSelectedCustomer = () => {
    navigate('/customer/search');
  };

  const handleNavigateToPolicyDetails = (policyId) => {
    navigate(`/policy/details/${policyId}`);
  };

  return (
    <>
    <SmartBreadcrumbs />
      <div className="container-fluid min-vh-100">
      {/* ✅ Tabs Navigation */}
      <nav className="nav nav-tabs mt-3">
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link" to="/customer/search">Customer</NavLink>       
        <NavLink className="nav-link" to="/suspense">Suspense</NavLink>
        <NavLink className="nav-link" to="/reports">Reports</NavLink>
      </nav>

      {/* ✅ Main Routed Content */}
      <main className="px-4 py-3">
        <AnimatePresence mode="wait">
          
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/birthdays" element={<BirthdaysReport />} />
            <Route path="/reports/expiring" element={<ExpiringPoliciesReport />} />
            <Route path="/reports/status" element={<FirstPolicyStatusReport />} />

            <Route path="/suspense" element={<SuspensePage />} />
            <Route
              path="/customer/*"
              element={
                <CustomerPage
                  customers={customerData}
                  onUpdateCustomer={handleUpdateCustomer}
                  onNavigateToPolicyDetails={handleNavigateToPolicyDetails}
                  mockPolicies={policyData}
                  onClearCustomer={handleClearSelectedCustomer}
                />
              }
            />
            <Route
              path="/policy/*"
              element={
                <PolicyPage
                  policies={policyData}
                  onNavigateToCustomerDetails={handleNavigateToCustomerDetails}
                />
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
    </>
    
  );
}

export default App;
