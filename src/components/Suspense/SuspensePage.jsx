import { useEffect, useState } from 'react';
import Shimmer from '../Shimmer/Shimmer';
import { motion } from 'framer-motion';
import SuspenseForm from './Suspense Form/SuspenseForm';
import SuspenseList from './Suspense List/SuspenseList';
import initialData from './data/suspense.json'; // Assuming this is the path to your mock data
import Toast from './Toast/Toast';
 function SuspensePage() {
  const [suspenseItems, setSuspenseItems] = useState(initialData); // initialData is mock array
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });

  const [history, setHistory] = useState([]);

 const handleClose = (id) => {
  const closedItem = suspenseItems.find(item => item.id === id);
  if (closedItem) {
    setHistory(prev => [...prev, { ...closedItem, closedAt: new Date().toISOString() }]);
  }
  setToast({ message: 'Suspense item closed!', visible: true });
};

  const handleCreate = item => {
  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
  const newItem = { ...item, id: uniqueId, status: 'open' };
  setSuspenseItems(prev => [...prev, newItem]);
  setToast({ message: 'New suspense created!', visible: true });
};

const [activeTab, setActiveTab] = useState('open'); // Default to "open"

  const filtered = suspenseItems.filter(item => item.status === activeTab);
  const sortedSuspense = [...filtered].sort((a, b) =>
  new Date(a.dueDate) - new Date(b.dueDate)
);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500); // simulate 1.5s load
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  localStorage.setItem('suspenseItems', JSON.stringify(suspenseItems));
}, [suspenseItems]);

useEffect(() => {
  const stored = localStorage.getItem('suspenseItems');
  if (stored) setSuspenseItems(JSON.parse(stored));
}, []);
  


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {loaded ? (
        <div>
          <h2>Suspense Page Loaded ✅</h2>
          <SuspenseList
            items={suspenseItems}
            onClose={handleClose}
            history={history}
            />

          <SuspenseForm onCreate={handleCreate} />
        </div>
      ) : (
        <Shimmer />
        
      )}
      {toast.visible && (
        <Toast
            message={toast.message}
            onClose={() => setToast({ message: '', visible: false })}
        />
        )}
    </motion.div>
  );
}

export default SuspensePage;
