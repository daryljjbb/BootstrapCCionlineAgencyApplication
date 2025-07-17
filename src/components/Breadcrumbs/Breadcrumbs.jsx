import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CustomerContext } from '../Customer Context/CustomerContext';

function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext);

  const breadcrumbTrail = [];

  breadcrumbTrail.push({ label: "Dashboard", path: "/dashboard" });

if (pathname.startsWith("/customer")) {
  breadcrumbTrail.push({ label: "Customer", path: "/customer/search" });

  if (pathname.includes("/details")) {
    breadcrumbTrail.push({ label: "Customer Details", path: pathname });
  }
}

if (pathname.startsWith("/policy")) {
  breadcrumbTrail.push({ label: "Policy", path: "/policy" });

  if (pathname.includes("/create")) {
    breadcrumbTrail.push({ label: "Create Policy", path: pathname });
  } else if (pathname.includes("/details")) {
    breadcrumbTrail.push({ label: "Policy Details", path: pathname });
  }
}

if (pathname.startsWith("/suspense")) {
  breadcrumbTrail.push({ label: "Suspense", path: "/suspense" });
}


  const handleClick = (target) => {
    if (target === 'dashboard') {
      // Clear customer context when going home
      setSelectedCustomer(null);
      navigate('/dashboard');
    } else if (target === 'customer') {
      // Keep context; we're still in customer world
      navigate('/customer/search');
    } else if (target === 'details') {
      // No-op if already here
      if (location.pathname.includes('/customer/details/')) return;
      navigate(`/customer/details/${selectedCustomer?.id}`);
    }
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
         <button
            onClick={() => handleClick('dashboard')}
            className="btn btn-link"
            title={selectedCustomer ? "Navigating to Dashboard will close the selected customer." : "Go to Dashboard"}
          >
            <i className="bi bi-house-door"></i> Dashboard
          </button>

        </li>
        <li className="breadcrumb-item">
          <button onClick={() => handleClick('customer')} className="btn btn-link"><i className="bi bi-person-circle"></i> Customer</button>
        </li>
        {selectedCustomer && (
          <li className="breadcrumb-item active" aria-current="page">
            {selectedCustomer.name}
          </li>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
