import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PolicyTypeQuestion from "../Policy Type Component/PolicyTypeQuestion";
import AutoPolicyForm from "../Auto Policy Form/AutoPolicyForm";
import HomePolicyForm from "../Home Policy Form/HomePolicyForm"; // if you have it
import LifePolicyForm from "../Life Policy Form/LifePolicyForm"; // if you have it
import SmartBreadcrumbs from "../../Breadcrumbs/Smart Breadcrumbs/SmartBreadcrumbs"; // Adjust the import path as necessary

function CreatePolicy() {
  const location = useLocation();
  const customerId = location.state?.customerId;

  const selectedCustomer = customerId
    ? { id: customerId } // or pass full object if available
    : null;

  const [policyType, setPolicyType] = useState("");

  return (
    <>
      <PolicyTypeQuestion selectedType={policyType} onSelectType={setPolicyType} />

      {policyType === '' && (
        <p className="text-muted">Please select a policy type to continue.</p>
      )}

      {policyType === 'Auto' && (
        <AutoPolicyForm customer={selectedCustomer} />
      )}

      {policyType === 'Home' && (
        <HomePolicyForm customer={selectedCustomer} />
      )}

      {policyType === 'Life' && (
        <LifePolicyForm customer={selectedCustomer} />
      )}
    </>
  );
}

export default CreatePolicy;
