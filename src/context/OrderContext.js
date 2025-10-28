import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: '12345',
      orderNumber: '#12345',
      date: '25 Oct 2025',
      time: '14:30',
      status: 'Entregado',
      items: [
        { id: '1', name: 'Hamburguesa Clásica', quantity: 2, price: 25000, image: '🍔' },
        { id: '7', name: 'Coca Cola', quantity: 1, price: 5000, image: '🥤' },
      ],
      subtotal: 55000,
      deliveryFee: 5000,
      total: 60000,
      address: {
        name: 'Casa',
        fullAddress: 'Calle 123 #45-67',
        city: 'Neiva',
        department: 'Huila',
        instructions: 'Apartamento 301',
      },
      paymentMethod: 'Efectivo contra entrega',
    },
    {
      id: '12344',
      orderNumber: '#12344',
      date: '20 Oct 2025',
      time: '19:15',
      status: 'Entregado',
      items: [
        { id: '3', name: 'Pizza Margarita', quantity: 1, price: 35000, image: '🍕' },
        { id: '8', name: 'Limonada Natural', quantity: 2, price: 8000, image: '🥤' },
      ],
      subtotal: 51000,
      deliveryFee: 5000,
      total: 56000,
      address: {
        name: 'Oficina',
        fullAddress: 'Carrera 5 #10-20',
        city: 'Neiva',
        department: 'Huila',
      },
      paymentMethod: 'Efectivo contra entrega',
    },
  ]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      orderNumber: `#${Date.now()}`,
      date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      status: 'Confirmado',
    };
    setOrders([newOrder, ...orders]);
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const reorderItems = (orderId) => {
    const order = getOrderById(orderId);
    return order ? order.items : [];
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrderById,
      updateOrderStatus,
      reorderItems,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);