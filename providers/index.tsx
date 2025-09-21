"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { I18nProviderClient } from "../locales/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/contexts/cart-context";
import { useState } from "react";

function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <I18nProviderClient locale={locale}>
          <CartProvider>{children}</CartProvider>
        </I18nProviderClient>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Providers;
