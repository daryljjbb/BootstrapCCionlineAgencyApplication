import React from "react";

function PolicyTypeQuestion({ selectedType, onSelectType }) {
  return (
    <div className="card mb-3">
      <div className="card-header">Select Policy Type</div>
      <div className="card-body">
        <select
          className="form-select"
          value={selectedType}
          onChange={(e) => onSelectType(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Auto">Auto</option>
          <option value="Home">Home</option>
          <option value="Life">Life</option>
          {/* Add more options here */}
        </select>
      </div>
    </div>
  );
}

export default PolicyTypeQuestion;
