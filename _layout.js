import React from 'react';
import { Slot } from 'expo-router';
import { SavedItemsProvider } from '../context/SavedItemsContext';

export default function Layout() {
  return (
    <SavedItemsProvider>
      <Slot />
    </SavedItemsProvider>
  );
}
