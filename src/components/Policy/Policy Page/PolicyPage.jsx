import { Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom';
import CreatePolicy from '../Policy Create/PolicyCreate';
import PolicyDetails from '../Policy Details/PolicyDetails';
import { useContext } from 'react';
import { CustomerContext } from '../../Customer Context/CustomerContext';   
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';


function PolicyPage({ policyId, policies, onNavigateToCustomerDetails }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext);
  const isDetailsView = location.pathname.startsWith('/policy/details/');

  return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3 }} 
    className="policy-section p-3"
    >
        <div>
        </div>
      <h2 className="mb-4">Policy Management</h2>

      {/* Route-aware Bootstrap tabs */}
      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${location.pathname === '/policy/create' ? 'active' : ''}`}
            onClick={() => navigate('/policy/create', {
            state: { selectedCustomer }
            })}
          >
            Create New Policy
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${location.pathname === '/policy/search' ? 'active' : ''}`}
            onClick={() => navigate('/policy/search')}
          >
            Search Policies
          </button>
        </li>
        {isDetailsView && (
          <li className="nav-item">
            <button
              className="nav-link active"
              onClick={() => navigate(location.pathname)}
            >
              Policy Details
            </button>
          </li>
        )}
      </ul>

      {/* Actual route content */}
      <Routes>
        <Route path="/" element={<p>Select a tab to begin</p>} />
        <Route path="create" element={<CreatePolicy />} />
        <Route path="search" element={<p className="p-4 text-muted">Search functionality coming soon.</p>} />
        <Route
          path="details/:policyId"
          element={
            <PolicyDetails
              policyId={policyId}
              policies={policies}
              onNavigateToCustomerDetails={onNavigateToCustomerDetails}
            />
          }
        />
      </Routes>
    </motion.div>
  );
}

export default PolicyPage;
