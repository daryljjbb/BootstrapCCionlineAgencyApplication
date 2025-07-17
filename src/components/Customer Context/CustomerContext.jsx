import React, { createContext, useState } from "react";

export const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}


