"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const authGuard = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthGuard: React.FC<P> = (props) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }

      setIsChecking(false); // Finish token check
    }, [router]);

    if (isChecking) {
      // Show loading state while checking authentication
      return <div>Loading...</div>;
    }

    if (isAuthenticated === false) {
      // If not authenticated, do not render the wrapped component
      return null;
    }

    // Render the wrapped component when authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthGuard;
};

export default authGuard;
