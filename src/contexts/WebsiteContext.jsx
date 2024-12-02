import React, { createContext, useContext, useState } from 'react';

const WebsiteContext = createContext(null);

export const WebsiteProvider = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [framework, setFramework] = useState('bootstrap');
  const [primaryColor, setPrimaryColor] = useState('#5A1818');
  const [secondaryColor, setSecondaryColor] = useState('#1E0000');

  const addComponent = (componentId) => {
    setSelectedComponents(prev => [...prev, componentId]);
  };

  const removeComponent = (componentId) => {
    setSelectedComponents(prev => prev.filter(id => id !== componentId));
  };

  const value = {
    selectedComponents,
    framework,
    primaryColor,
    secondaryColor,
    setFramework,
    setPrimaryColor,
    setSecondaryColor,
    addComponent,
    removeComponent,
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsiteContext = () => {
  const context = useContext(WebsiteContext);
  if (context === null) {
    throw new Error('useWebsiteContext must be used within a WebsiteProvider');
  }
  return context;
};