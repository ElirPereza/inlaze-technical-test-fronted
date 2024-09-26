"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import SessionAuthProvider from "./auth.provider";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
  return (
    <SessionAuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </SessionAuthProvider>
  );
};

export default QueryProvider;
