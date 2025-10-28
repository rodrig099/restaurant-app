import { createContext, useContext, useState } from 'react';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Casa',
      fullAddress: 'Calle 123 #45-67',
      city: 'Neiva',
      department: 'Huila',
      instructions: 'Apartamento 301, tercer piso',
      isDefault: true,
    },
  ]);

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
  };

  const updateAddress = (id, updatedAddress) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, ...updatedAddress } : addr
    ));
  };

  const deleteAddress = (id) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    
    if (addresses.length === 1) {
      alert('Debes tener al menos una dirección');
      return;
    }

    setAddresses(addresses.filter(addr => addr.id !== id));

    // Si era la predeterminada, hacer otra predeterminada
    if (addressToDelete.isDefault) {
      const remainingAddresses = addresses.filter(addr => addr.id !== id);
      if (remainingAddresses.length > 0) {
        setDefaultAddress(remainingAddresses[0].id);
      }
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const getDefaultAddress = () => {
    return addresses.find(addr => addr.isDefault) || addresses[0];
  };

  return (
    <AddressContext.Provider value={{
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      getDefaultAddress,
    }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);