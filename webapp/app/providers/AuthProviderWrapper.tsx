// app/providers/AuthProviderWrapper.tsx
"use client"; // Essential: This marks the component as a Client Component

import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';

interface AuthProviderWrapperProps {
    children: ReactNode;
}

// This client component wraps the AuthProvider around the rest of the application.
export default function AuthProviderWrapper({ children }: AuthProviderWrapperProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}