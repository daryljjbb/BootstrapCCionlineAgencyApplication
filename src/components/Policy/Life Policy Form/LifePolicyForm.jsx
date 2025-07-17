import React, { useState } from "react";

function LifePolicyForm({ customer }) {
  const [formData, setFormData] = useState({
    customerId: customer?.id || "",
    type: "Life",
    status: "Pending",
    effectiveDate: "",
    expirationDate: "",
    premium: "",
    faceAmount: "",
    beneficiaryName: "",
    beneficiaryRelationship: "",
    healthConditions: "",
    tobaccoUse: "No",
    height: "",
    weight: "",
    occupation: "",
    income: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Life Policy Submitted:", formData);
    alert("Life policy submitted! Check console for details.");
    // Reset or redirect logic here
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h5 className="mb-3">Create Life Insurance Policy</h5>

      <div className="mb-3">
        <label>Effective Date</label>
        <input type="date" name="effectiveDate" className="form-control" value={formData.effectiveDate} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Expiration Date</label>
        <input type="date" name="expirationDate" className="form-control" value={formData.expirationDate} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Face Amount ($)</label>
        <input type="number" name="faceAmount" className="form-control" value={formData.faceAmount} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Premium ($)</label>
        <input type="number" name="premium" className="form-control" value={formData.premium} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Beneficiary Name</label>
        <input type="text" name="beneficiaryName" className="form-control" value={formData.beneficiaryName} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Beneficiary Relationship</label>
        <input type="text" name="beneficiaryRelationship" className="form-control" value={formData.beneficiaryRelationship} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Health Conditions</label>
        <textarea name="healthConditions" className="form-control" value={formData.healthConditions} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Tobacco Use</label>
        <select name="tobaccoUse" className="form-select" value={formData.tobaccoUse} onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Height (inches)</label>
        <input type="number" name="height" className="form-control" value={formData.height} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Weight (lbs)</label>
        <input type="number" name="weight" className="form-control" value={formData.weight} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Occupation</label>
        <input type="text" name="occupation" className="form-control" value={formData.occupation} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Annual Income ($)</label>
        <input type="number" name="income" className="form-control" value={formData.income} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-success">Submit Life Policy</button>
    </form>
  );
}

export default LifePolicyForm;
