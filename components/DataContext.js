import React, { createContext, useState, useRef } from 'react';

// Context oluştur
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const iref = useRef(false);
    const [cata, setCata] = useState(false)

    return (
        <DataContext.Provider value={{ data, setData, iref, cata, setCata }}>
            {children}
        </DataContext.Provider>
    );
};
