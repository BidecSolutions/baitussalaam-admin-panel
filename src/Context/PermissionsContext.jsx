// src/Context/RolesContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Context create
const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.roles) {
      setRoles(userData.roles);
    
      const extracted = userData.roles.flatMap(role =>
        role.permissions.map(p => p.name)
      );
      setPermissions(extracted);
    }
  }, []);

  return (
    <PermissionContext.Provider value={{ roles, permissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

// ✅ custom hook
export const useRoles = () => useContext(PermissionContext);
