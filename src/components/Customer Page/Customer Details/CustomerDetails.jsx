// src/components/Customer Details/CustomerDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SmartBreadcrumbs from '../../Breadcrumbs/Smart Breadcrumbs/SmartBreadcrumbs';

// IMPORTANT: Provide a default empty array for 'customers'
function CustomerDetails({ customers = [], mockPolicies, onNavigateToPolicyDetails, onClearCustomer }) {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [customerPolicies, setCustomerPolicies] = useState([]);
    const location = useLocation();
    const lastViewedPolicyId = location.state?.lastViewedPolicyId;

    useEffect(() => {
        // Defensive check: Ensure 'customers' is an array before using .find()
        const customersArray = Array.isArray(customers) ? customers : [];

        const foundCustomer = customersArray.find(c => c.id === parseInt(customerId)); // This is line 19, or near it
        setCustomer(foundCustomer);

        if (foundCustomer && Array.isArray(mockPolicies)) {
            const policiesForCustomer = mockPolicies.filter(
                (policy) => policy.customerId === foundCustomer.id
            );
            setCustomerPolicies(policiesForCustomer);
        } else {
            setCustomerPolicies([]);
        }
    }, [customerId, customers, mockPolicies]); // Dependency array includes customers and mockPolicies

    useEffect(() => {
  const idToFind = parseInt(customerId);
  if (
    customers.length > 0 && // data loaded
    customerId !== undefined && !Number.isNaN(idToFind)
  ) {
    const found = customers.find(c => c.id === idToFind);
    if (!found) {
      console.warn(`Customer with ID ${customerId} not found`);
    }
  }
}, [customers, customerId]);

useEffect(() => {
  console.log("CustomerDetails mounted or customerId changed");
}, [customerId]);

    // Render a loading/not found state if customer is not yet loaded or not found
    if (!customer) {
        return (
            <div className="customer-details-container card shadow-sm p-4">
                <p className="text-muted text-center">
                    {customers.length === 0 ? "Loading customers..." : "Customer not found. Please verify the ID."}
                </p>
                <button className="btn btn-outline-secondary mt-3" onClick={onClearCustomer}>Back to Search</button>
            </div>
        );
        
    }

    

    return (
        <>
             <div className="customer-details-container card shadow-sm p-4">
            <h4 className="mb-4">Customer Details for {customer.name}</h4>

            {/* Customer Info Card */}
            <div className="card mb-4">
                <div className="card-header bg-primary text-white">Customer Information</div>
                <div className="card-body">
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p><strong>Address:</strong> {customer.address}, {customer.city}, {customer.state}, {customer.zipCode}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm" onClick={() => navigate(`/customer/edit/${customer.id}`)}>Edit Customer</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={onClearCustomer}>Back to Search</button>
                </div>
            </div>

            {/* Policies Card */}
            <div className="card mb-4">
                <div className="card-header bg-success text-white">Policies</div>
                <div className="card-body">
                    {customerPolicies.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {customerPolicies.map(policy => (
                                console.log("lastViewedPolicyId:", lastViewedPolicyId, "policy.id:", policy.id),

                                <li
                                key={policy.id}
                                className={`list-group-item d-flex justify-content-between align-items-center ${
                                    policy.id === lastViewedPolicyId ? 'highlighted-policy' : ''
                                }`}
                                >

                                    <span>Policy #: {policy.policyNumber} (Type: {policy.type})</span>
                                   <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => {
                                        console.log("Clicked View Policy for", policy.id, policy.customerId);
                                        navigate(`/policy/details/${policy.id}`, {
                                        state: {
                                            customerId: customer.id,
                                            customerName: customer.name // ✅ for breadcrumb clarity
                                        }
                                        });

                                    }}
                                    >
                                    View Policy
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No policies found for this customer.</p>
                    )}
                </div>
                <div className="card-footer">
                    <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate('/policy/create', { state: { customerId: customer.id, customerName: customer.name } })}
                    >
                    Add New Policy
                    </button>
                </div>
            </div>
        </div>
        </>
       
    );
}

export default CustomerDetails;