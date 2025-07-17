import React, { useState } from 'react';
function CreateCustomer() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you'd send this data to your backend API
        console.log('New Customer Data:', formData);
        alert('Customer created successfully! (See console for data)');
        // Optionally reset form
        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
            email: '',
            birthDate: '',
        });
    };
    return (
       <>
       <div className="customer-create-container card shadow-sm">
            <div className="card-body">
                <h4 className="card-title mb-4">Create New Customer Account</h4>
                <form onSubmit={handleSubmit}>
                    {/* First Row: First Name & Last Name */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Second Row: Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Third Row: City, State, Zip */}
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="zipCode" className="form-label">Zip Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Fourth Row: Phone & Email */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="birthDate" className="form-label">Birthday</label>
                            <input
                                type="text"
                                className="form-control"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">
                        <i className="bi bi-person-plus-fill me-2"></i> Create Customer
                    </button>
                </form>
            </div>
        </div>
       
       </> 
    )
}

export default CreateCustomer;