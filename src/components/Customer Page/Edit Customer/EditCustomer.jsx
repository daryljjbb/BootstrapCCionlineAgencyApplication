import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditCustomer({ customers = [], onUpdateCustomer }) {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    // Effect to find the customer when component mounts or customerId/customers changes
    useEffect(() => {
        const customersArray = Array.isArray(customers) ? customers : [];
        const foundCustomer = customersArray.find(c => c.id === parseInt(customerId));
        setCustomer(foundCustomer);

        if (foundCustomer) {
            setFormData({
                name: foundCustomer.name,
                email: foundCustomer.email,
                phone: foundCustomer.phone,
                address: foundCustomer.address,
                city: foundCustomer.city,
                state: foundCustomer.state,
                zipCode: foundCustomer.zipCode
            });
        }
    }, [customerId, customers]); // Depend on customerId and customers prop

    // Redirect or show message if customer not found after data loaded
    useEffect(() => {
        if (!customer && customers.length > 0) {
            console.warn(`Customer with ID ${customerId} not found for editing.`);
            // You might want to navigate back to search or show an error
            // navigate('/customer/search'); // Uncomment if you want to redirect
        }
    }, [customer, customers.length, customerId, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customer && onUpdateCustomer) {
            const updatedCustomer = { ...customer, ...formData };
            onUpdateCustomer(updatedCustomer); // Call the update function passed from App.jsx
            navigate(`/customer/details/${customer.id}`); // Navigate back to details after update
        }
    };

    if (!customer) {
        return (
            <div className="edit-customer-container card shadow-sm p-4">
                <p className="text-muted text-center">
                    {customers.length === 0 ? "Loading customer data for editing..." : "Customer not found for editing. Please verify the ID."}
                </p>
                <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/customer/search')}>Back to Search</button>
            </div>
        );
    }

    return (
        <div className="edit-customer-container card shadow-sm p-4">
            <h4 className="mb-4">Edit Customer: {customer.name}</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label">Zip Code</label>
                    <input type="text" className="form-control" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(`/customer/details/${customer.id}`)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditCustomer;