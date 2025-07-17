import React, { useState, useEffect,} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SmartBreadcrumbs from '../../Breadcrumbs/Smart Breadcrumbs/SmartBreadcrumbs'; // Adjust the import path as necessary
// Receive policyId, onNavigateToCustomerDetails (for main app navigation),
// and onBackToParentList (NEW: for internal navigation within CustomerDetails)
function PolicyDetails({ policies = [], onNavigateToCustomerDetails, onBackToParentList }) {
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { policyId } = useParams();
    const location = useLocation();
    const customerId = location.state?.customerId;
    const navigate = useNavigate();

    // Mock Data for Policies (ensure consistent IDs with CustomerDetails mock data)
   
   useEffect(() => {
    console.log("Policy ID received:", policyId); // 👈 Log it here
  const fetchPolicyData = () => {
    setLoading(true);
    setError(null);

    try {
      const foundPolicy = policies.find(p => p.id === parseInt(policyId));
      if (foundPolicy) {
        setPolicy(foundPolicy);
      } else {
        setError(`Policy with ID "${policyId}" not found.`);
        setPolicy(null);
      }
    } catch (err) {
      console.error("Error fetching policy details:", err);
      setError("Failed to load policy.");
      setPolicy(null);
    } finally {
      setLoading(false);
    }
  };

  if (policyId && policies.length > 0) {
    fetchPolicyData();
  }
}, [policyId, policies]);



    if (loading) {
        return <div className="p-4 text-center">Loading policy details...</div>;
    }

    if (error) {
        return <div className="alert alert-danger p-4">{error}</div>;
    }

    if (!policy) {
        return <div className="p-4 text-muted">No policy selected or found.</div>;
    }

    return (
        <>
            <div className="policy-details-container card shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title mb-0">Policy Details: {policy.id} ({policy.type})</h4>
                    {/* Conditional rendering of back button based on context */}
                    {onBackToParentList ? ( // If onBackToParentList is provided (meaning we are inside CustomerDetails)
                        <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={onBackToParentList}
                            >
                            <i className="bi bi-arrow-left-circle me-1"></i> Back to Policies List
                        </button>

                    ) : ( // Otherwise, if onNavigateToCustomerDetails is provided (meaning we are on the main Policy page)
                        policy.customerId && onNavigateToCustomerDetails && (
                            <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => navigate(`/customer/details/${policy.customerId}`, {
                                    state: { lastViewedPolicyId: policy.id } })}

                            >
                            <i className="bi bi-arrow-left-circle me-1"></i> Back to Customer Policies
                            </button>

                        )
                    )}
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <p><strong>Customer ID:</strong> {policy.customerId}</p>
                        <p><strong>Status:</strong> {policy.status}</p>
                        <p><strong>Effective Date:</strong> {policy.startDate}</p>
                        <p><strong>Expiration Date:</strong> {policy.endDate}</p>
                        <p><strong>Premium:</strong> ${policy.premium.toFixed(2)}</p>
                    </div>
                    <div className="col-md-6">
                        {/* Example of showing policy-type specific details */}
                        {policy.type === 'Auto' && (
                            <>
                                <p><strong>Deductible:</strong> ${policy.deductible}</p>
                                <p><strong>Coverage:</strong> {policy.coverage}</p>
                            </>
                        )}
                        {policy.type === 'Home' && (
                            <>
                                <p><strong>Dwelling Coverage:</strong> ${policy.dwellingCoverage}</p>
                                <p><strong>Personal Property:</strong> ${policy.personalProperty}</p>
                            </>
                        )}
                        {policy.type === 'Life' && (
                            <>
                                <p><strong>Death Benefit:</strong> ${policy.deathBenefit}</p>
                                <p><strong>Beneficiary:</strong> {policy.beneficiary}</p>
                            </>
                        )}
                         {policy.type === 'Umbrella' && (
                            <>
                                <p><strong>Limit:</strong> {policy.limit}</p>
                                <p><strong>Self-Insured Retention:</strong> ${policy.selfInsuredRetention}</p>
                            </>
                        )}
                    </div>
                </div>

                <hr className="my-4" />
                <h5>More Policy Information</h5>
                <p className="text-muted">You can add more specific details, claim history, document links, etc., for this policy here.</p>

            </div>
        </div>
        </>
        
    );
}

export default PolicyDetails;