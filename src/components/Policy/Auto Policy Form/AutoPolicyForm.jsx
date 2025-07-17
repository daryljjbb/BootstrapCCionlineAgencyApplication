import React, { useState } from 'react';

function AutoPolicyForm() {
  const coverageTypes = [
    "LBI", "LPD", "UBI", "UPD", "MED", "COMP", "COLL", "Towing", "Rent Reimbursement"
  ];

  const createCoverageTemplate = () =>
    coverageTypes.map(type => ({
      type,
      limit: '',
      premium: '',
      active: false
    }));

  const [vehicles, setVehicles] = useState([
    {
      year: '',
      make: '',
      model: '',
      vin: '',
      coverages: createCoverageTemplate()
    }
  ]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [agencyFee, setAgencyFee] = useState(0);

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        year: '',
        make: '',
        model: '',
        vin: '',
        coverages: createCoverageTemplate()
      }
    ]);
  };

  const removeVehicle = (index) => {
  const updated = vehicles.filter((_, i) => i !== index);
  setVehicles(updated);
};


  const updateVehicleField = (index, field, value) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  const updateCoverageField = (vehicleIndex, coverageIndex, field, value) => {
    const updated = [...vehicles];
    updated[vehicleIndex].coverages[coverageIndex][field] = value;
    setVehicles(updated);
  };

  const totalPremium = vehicles.reduce((sum, v) => {
    const coveragePremium = v.coverages.reduce((cpSum, c) =>
      c.active ? cpSum + Number(c.premium || 0) : cpSum,
    0);
    return sum + coveragePremium;
  }, 0);

  const grandTotal = totalPremium + Number(agencyFee || 0);

  return (
    <div className="container-lg">
      <div className="card shadow-sm p-4 mt-4">
        <h5 className="mb-3">Create Auto Policy</h5>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Effective Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label>Expiration Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <hr className="my-4" />

        <h6>Vehicles</h6>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-sm p-3">
                <h6>Vehicle #{index + 1}</h6>
                <div className="mb-2">
                  <input type="text" className="form-control form-control-sm mb-2" placeholder="Year"
                    value={vehicle.year} onChange={e => updateVehicleField(index, 'year', e.target.value)} />
                  <input type="text" className="form-control form-control-sm mb-2" placeholder="Make"
                    value={vehicle.make} onChange={e => updateVehicleField(index, 'make', e.target.value)} />
                  <input type="text" className="form-control form-control-sm mb-2" placeholder="Model"
                    value={vehicle.model} onChange={e => updateVehicleField(index, 'model', e.target.value)} />
                  <input type="text" className="form-control form-control-sm" placeholder="VIN"
                    value={vehicle.vin} onChange={e => updateVehicleField(index, 'vin', e.target.value)} />
                </div>

                <h6 className="mt-3">Coverages</h6>
                {vehicle.coverages.map((coverage, cIdx) => (
                  <div key={cIdx} className="row gx-1 gy-1 mb-1 align-items-end">
                    <div className="col-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={coverage.active}
                          onChange={e => updateCoverageField(index, cIdx, 'active', e.target.checked)}
                        />
                        <label className="form-check-label">{coverage.type}</label>
                      </div>
                    </div>
                    {coverage.active && (
                      <>
                        <div className="col-4">
                          <input type="text" className="form-control form-control-sm"
                            placeholder="Limit"
                            value={coverage.limit}
                            onChange={e => updateCoverageField(index, cIdx, 'limit', e.target.value)} />
                        </div>
                        <div className="col-4">
                          <input type="number" className="form-control form-control-sm"
                            placeholder="Premium"
                            value={coverage.premium}
                            onChange={e => updateCoverageField(index, cIdx, 'premium', e.target.value)} />
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <p className="mt-2 mb-1"><strong>Vehicle Premium:</strong> $
                  {vehicle.coverages.reduce((sum, c) =>
                    c.active ? sum + Number(c.premium || 0) : sum, 0).toFixed(2)}
                </p>
                {vehicles.length > 1 && (
                <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeVehicle(index)}
                >
                    🗑️ Remove Vehicle
                </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-outline-success btn-sm mt-3 mb-4" onClick={addVehicle}>
          + Add Vehicle
        </button>

        <hr className="my-4" />

        <div className="row mb-4">
          <div className="col-md-4">
            <label>Agency Fee ($)</label>
            <input
              type="number"
              className="form-control"
              value={agencyFee}
              onChange={e => setAgencyFee(e.target.value)}
            />
          </div>
        </div>

        <div className="alert alert-secondary">
          <strong>Policy Premium:</strong> ${totalPremium.toFixed(2)} <br />
          <strong>+ Agency Fee:</strong> ${Number(agencyFee).toFixed(2)} <br />
          <strong>Grand Total:</strong> ${grandTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default AutoPolicyForm;
