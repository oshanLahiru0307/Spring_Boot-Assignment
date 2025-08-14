import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

// Custom hook for using Valtio stores with automatic subscription
export const useStore = (store) => {
  const snapshot = useSnapshot(store);
  return snapshot;
};

// Custom hook for using Valtio stores with actions
export const useStoreWithActions = (store, actions) => {
  const snapshot = useSnapshot(store);
  return [snapshot, actions];
};

// Hook for subscribing to store changes
export const useStoreSubscription = (store, callback) => {
  useEffect(() => {
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  }, [store, callback]);
};
