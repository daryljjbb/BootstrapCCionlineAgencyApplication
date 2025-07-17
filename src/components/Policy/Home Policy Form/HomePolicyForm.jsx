import React, { useState } from "react";

function HomePolicyForm({ customer }) {
  const [formData, setFormData] = useState({
    customerId: customer?.id || "",
    type: "Home",
    status: "Pending",
    effectiveDate: "",
    expirationDate: "",
    propertyAddress: "",
    dwellingCoverage: "",
    personalPropertyCoverage: "",
    liabilityCoverage: "",
    medicalPaymentsCoverage: "",
    deductible: "",
    hasSecuritySystem: "No",
    hasFireAlarm: "No",
    constructionType: "",
    roofType: "",
    yearBuilt: "",
    squareFootage: "",
    premium: "",
    agencyFee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Home Policy Submitted:", formData);
    alert("Home policy submitted! Check console for details.");
    // Reset or redirect logic here
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h5 className="mb-3">Create Homeowners Insurance Policy</h5>

      <div className="mb-3">
        <label>Effective Date</label>
        <input type="date" name="effectiveDate" className="form-control" value={formData.effectiveDate} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Expiration Date</label>
        <input type="date" name="expirationDate" className="form-control" value={formData.expirationDate} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Property Address</label>
        <input type="text" name="propertyAddress" className="form-control" value={formData.propertyAddress} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Dwelling Coverage ($)</label>
        <input type="number" name="dwellingCoverage" className="form-control" value={formData.dwellingCoverage} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Personal Property Coverage ($)</label>
        <input type="number" name="personalPropertyCoverage" className="form-control" value={formData.personalPropertyCoverage} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Liability Coverage ($)</label>
        <input type="number" name="liabilityCoverage" className="form-control" value={formData.liabilityCoverage} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Medical Payments Coverage ($)</label>
        <input type="number" name="medicalPaymentsCoverage" className="form-control" value={formData.medicalPaymentsCoverage} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Deductible ($)</label>
        <input type="number" name="deductible" className="form-control" value={formData.deductible} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Security System Installed?</label>
        <select name="hasSecuritySystem" className="form-select" value={formData.hasSecuritySystem} onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Fire Alarm Installed?</label>
        <select name="hasFireAlarm" className="form-select" value={formData.hasFireAlarm} onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Construction Type</label>
        <input type="text" name="constructionType" className="form-control" value={formData.constructionType} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Roof Type</label>
        <input type="text" name="roofType" className="form-control" value={formData.roofType} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Year Built</label>
        <input type="number" name="yearBuilt" className="form-control" value={formData.yearBuilt} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Square Footage</label>
        <input type="number" name="squareFootage" className="form-control" value={formData.squareFootage} onChange={handleChange} />
      </div>

      <hr />

      <div className="mb-3">
        <label>Premium ($)</label>
        <input type="number" name="premium" className="form-control" value={formData.premium} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Agency Fee ($)</label>
        <input type="number" name="agencyFee" className="form-control" value={formData.agencyFee} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-success">Submit Home Policy</button>
    </form>
  );
}

export default HomePolicyForm;
