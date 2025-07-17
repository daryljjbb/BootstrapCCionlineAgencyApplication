import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../../Customer Context/CustomerContext";
import { BiHome, BiUser, BiFile, BiListCheck } from "react-icons/bi";
import useWindowWidth from "../use Window Width/useWindowWidth";

function SmartBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext);

  const pathname = location.pathname;
  const state = location.state || {};
  const customerId = state.customerId;
  const customerName = state.customerName;

  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 576; // Bootstrap sm breakpoint

  const trail = [
    {
      label: "Dashboard",
      icon: <BiHome />,
      path: "/dashboard",
      clearContext: true,
      tooltip: selectedCustomer ? "Returning to Dashboard will clear the selected customer." : "Dashboard"
    }
  ];

  // ✅ CUSTOMER ROUTES
  if (pathname.startsWith("/customer")) {
    trail.push({ label: "Customer", icon: <BiUser />, path: "/customer/search" });

    if (pathname.includes("/details") && selectedCustomer) {
      trail.push({
        label: selectedCustomer.name,
        icon: <BiListCheck />,
        path: `/customer/details/${selectedCustomer.id}`
      });
    }
  }

  // ✅ CREATE POLICY with CUSTOMER CONTEXT
  else if (pathname === "/policy/create" && customerId && customerName) {
    trail.push({ label: "Customer", icon: <BiUser />, path: "/customer/search" });

    trail.push({
      label: customerName,
      icon: <BiUser />,
      path: `/customer/details/${customerId}`
    });

    trail.push({
      label: "Create Policy",
      icon: <BiFile />,
      path: pathname
    });
  }

  // ✅ POLICY DETAILS with CUSTOMER CONTEXT
  else if (pathname.startsWith("/policy/details") && customerId && customerName) {
    trail.push({ label: "Customer", icon: <BiUser />, path: "/customer/search" });

    trail.push({
      label: customerName,
      icon: <BiUser />,
      path: `/customer/details/${customerId}`
    });

    trail.push({
      label: "Policy Details",
      icon: <BiFile />,
      path: pathname
    });
  }

  // ✅ GENERIC POLICY ROUTES
  else if (pathname.startsWith("/policy")) {
    trail.push({ label: "Policy", icon: <BiFile />, path: "/policy" });

    if (pathname.includes("/create")) {
      trail.push({ label: "Create Policy", icon: <BiFile />, path: pathname });
    } else if (pathname.includes("/details")) {
      trail.push({ label: "Policy Details", icon: <BiFile />, path: pathname });
    } else if (pathname.includes("/search")) {
      trail.push({ label: "Search Policies", icon: <BiFile />, path: pathname });
    }
  }

  // ✅ SUSPENSE ROUTES
  if (pathname.startsWith("/suspense")) {
    trail.push({
      label: "Suspense",
      icon: <BiListCheck />,
      path: "/suspense"
    });
  }

  const handleClick = (crumb) => {
    if (crumb.clearContext) setSelectedCustomer(null);
    navigate(crumb.path);
  };

  return (
     <nav aria-label="breadcrumb" className="smart-breadcrumbs mt-2">
    {isMobile ? (
      <div className="dropdown">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Navigation
        </button>
        <ul className="dropdown-menu">
          {trail.map((crumb, idx) => (
            <li key={idx}>
              <button
                className="dropdown-item"
                onClick={() => handleClick(crumb)}
              >
                {crumb.icon} {crumb.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <ol className="breadcrumb">
        {trail.map((crumb, idx) => {
          const isLast = idx === trail.length - 1;
          return (
            <li
              key={idx}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                <>
                  {crumb.icon} {crumb.label}
                </>
              ) : (
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => handleClick(crumb)}
                  title={crumb.tooltip || crumb.label}
                >
                  {crumb.icon} {crumb.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    )}
  </nav>
  );
}

export default SmartBreadcrumbs;
