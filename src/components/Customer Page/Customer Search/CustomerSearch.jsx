import React, { useState, useEffect } from 'react';



// IMPORTANT: Ensure 'customers' prop is correctly received and defaulted
function CustomerSearch({ customers = [], onViewDetails }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);



    // This useEffect handles client-side filtering based on the 'customers' prop
    useEffect(() => {
        // Defensive check: Ensure 'customers' is an array before attempting to filter
        const customersToFilter = Array.isArray(customers) ? customers : [];

        if (searchTerm.trim() === '') {
            // If search term is empty, show all customers from the prop
            setSearchResults(customersToFilter);
        } else {
            // Filter customers based on the search term
            const filtered = customersToFilter.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.includes(searchTerm)
            );
            setSearchResults(filtered);
        }
    }, [searchTerm, customers]); // Re-run effect when searchTerm or the customers prop changes

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission (no backend call needed here)
    };

    return (
        <div className="customer-search-container card shadow-sm p-4">
            <h4 className="mb-4">Search Existing Customers</h4>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name, Email, or Phone"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-primary" type="submit">
                        <i className="bi bi-search me-1"></i> Search
                    </button>
                </div>
            </form>

            <h5 className="mb-3">Search Results:</h5>
            {/* Defensive check: Ensure searchResults is truthy and has length before mapping */}
            {searchResults && searchResults.length > 0 ? (
                <div className="list-group">
                    {searchResults.map(customer => (
                        <div key={customer.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{customer.name}</strong><br />
                                <small className="text-muted">{customer.email} | {customer.phone}</small>
                            </div>
                            <button
                                className="btn btn-sm btn-outline-info"
                                onClick={() => onViewDetails(customer.id)}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">No customers found. Try a different search term or create a new customer.</p>
            )}
        </div>
    );
}

export default CustomerSearch;