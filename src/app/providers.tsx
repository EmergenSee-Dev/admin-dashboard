'use client';

import { Provider as JotaiProvider } from "jotai";
import { useState, useEffect } from "react";

// This component is used to suppress hydration warnings caused by browser extensions
function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {!mounted ? null : children}
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <SafeHydrate>
        {children}
      </SafeHydrate>
    </JotaiProvider>
  );
}
