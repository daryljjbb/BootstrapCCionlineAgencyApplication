// src/components/Customer Page/CustomerPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import CustomerSearch from './Customer Search/CustomerSearch';
import CreateCustomer from './Create Customer/CreateCustomer';
import CustomerDetails from './Customer Details/CustomerDetails';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

// IMPORTANT: VERIFY THIS PATH CAREFULLY AGAINST YOUR ACTUAL FILE SYSTEM.
// The error suggests: src/components/Customer/Edit Customer/EditCustomer.jsx
// If your folders are:
// src/components/
//   Customer Page/
//   Edit Customer/  <-- If EditCustomer is here
// Then the path is:
import EditCustomer from './Edit Customer/EditCustomer';

// If your folders are:
// src/components/
//   Customer Page/
//     EditCustomer.jsx  <-- If EditCustomer is inside Customer Page
// Then the path is:
// import EditCustomer from './EditCustomer';

// If your error message path is accurate: src/components/Customer/Edit Customer/EditCustomer.jsx
// And CustomerPage.jsx is in src/components/Customer Page/, then the path would be:
// import EditCustomer from '../../Customer/Edit Customer/EditCustomer'; // This is complex, and suggests a problematic structure.
// I strongly recommend moving EditCustomer.jsx to be a direct sibling of CustomerPage.jsx or CustomerDetails.jsx



function CustomerPage({ customers, onUpdateCustomer, onNavigateToPolicyDetails, mockPolicies }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to determine the active tab based on the current URL path
    const getInitialActiveTab = (path) => {
        // Include /customer/edit/ in the check for details-tab active state
        if (path.startsWith('/customer/details/') || path.startsWith('/customer/edit/')) {
            return 'details-tab';
        } else if (path.startsWith('/customer/create')) {
            return 'create-tab';
        }
        return 'search-tab'; // Default for /customer or /customer/search
    };

    const [activeTab, setActiveTab] = useState(() => getInitialActiveTab(location.pathname));

    useEffect(() => {
        setActiveTab(getInitialActiveTab(location.pathname));
    }, [location.pathname]);

    const handleViewCustomerDetails = (customerId) => {
        navigate(`/customer/details/${customerId}`);
    };

    const handleClearSelectedCustomer = () => {
        navigate('/customer/search');
    };

const handleNavigateToPolicyDetails = (policyId, customerId) => {
console.log("Navigating to customer", customerId);
  navigate(`/policy/details/${policyId}`, {
    state: { customerId }
  });
};

    const handleTabClick = (tabId) => {
        if (tabId === 'search-tab') {
            navigate('/customer/search');
        } else if (tabId === 'create-tab') {
            navigate('/customer/create');
        } else if (tabId === 'details-tab') {
            // If the current path is already a details or edit path, stay on it.
            if (location.pathname.startsWith('/customer/details/') || location.pathname.startsWith('/customer/edit/')) {
                navigate(location.pathname);
            } else {
                // If not on a details/edit page, but tried to click details tab, go to search
                navigate('/customer/search');
            }
        }
    };

    // Determine if we are on a customer details or edit URL
    const isCustomerDetailsOrEditPath = location.pathname.startsWith('/customer/details/') || location.pathname.startsWith('/customer/edit/');


    return (
        <motion.div 
        className="customer-section p-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        >
            <div>
            </div>
            <h2 className="mb-4">Customer Management</h2>

            <ul className="nav nav-tabs mb-4" id="customerTabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === 'search-tab' ? 'active' : ''}`}
                        id="search-tab"
                        type="button"
                        role="tab"
                        aria-controls="search-tab-pane"
                        aria-selected={activeTab === 'search-tab'}
                        onClick={() => handleTabClick('search-tab')}
                    >
                        Search Customers
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === 'create-tab' ? 'active' : ''}`}
                        id="create-tab"
                        type="button"
                        role="tab"
                        aria-controls="create-tab-pane"
                        aria-selected={activeTab === 'create-tab'}
                        onClick={() => handleTabClick('create-tab')}
                    >
                        Create New Customer
                    </button>
                </li>
                {(isCustomerDetailsOrEditPath || activeTab === 'details-tab') && (
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'details-tab' ? 'active' : ''}`}
                            id="details-tab"
                            type="button"
                            role="tab"
                            aria-controls="details-tab-pane"
                            aria-selected={activeTab === 'details-tab'}
                            onClick={() => handleTabClick('details-tab')}
                        >
                            Customer Details
                        </button>
                    </li>
                )}
            </ul>

            <div className="tab-content" id="customerTabsContent">
                <Routes>
                    <Route path="/" element={<CustomerSearch customers={customers} onViewDetails={handleViewCustomerDetails} />} />
                    <Route path="/search" element={<CustomerSearch customers={customers} onViewDetails={handleViewCustomerDetails} />} />
                    <Route path="/create" element={<CreateCustomer />} />

                    <Route
                        path="/details/:customerId"
                        element={
                            isCustomerDetailsOrEditPath ? (
                                <CustomerDetails
                                    customers={customers}
                                    mockPolicies={mockPolicies}
                                    onNavigateToPolicyDetails={handleNavigateToPolicyDetails}
                                    onClearCustomer={handleClearSelectedCustomer}
                                />
                            ) : (
                                <p className="text-muted p-4">Invalid customer selected or URL. Please select a customer from the search tab.</p>
                            )
                        }
                    />

                    {/* ADD THIS MISSING ROUTE FOR EDIT CUSTOMER! */}
                    <Route
                        path="/edit/:customerId"
                        element={
                            isCustomerDetailsOrEditPath ? (
                                <EditCustomer
                                    customers={customers} // Pass customers down
                                    onUpdateCustomer={onUpdateCustomer} // Pass the update function
                                />
                            ) : (
                                <p className="text-muted p-4">Invalid customer selected for editing or URL. Please select a customer from the search tab.</p>
                            )
                        }
                    />
                </Routes>
            </div>
        </motion.div>
    );
}

export default CustomerPage;