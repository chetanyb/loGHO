import React, { useState, useEffect } from 'react';
import { MoneriumClient, placeOrderMessage } from '@monerium/sdk';
import OffRamp from './OffRamp';


interface AuthContext {
  name: string;
  email: string;
}

export function Monerium() {
  const [authCtx, setAuthCtx] = useState<AuthContext | null>(null);
  const [monerium, setMonerium] = useState<MoneriumClient | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const sdk = new MoneriumClient({
      environment: 'sandbox',
      clientId: process.env.REACT_APP_MONERIUM_CLIENT_ID || '',
      redirectUrl: 'http://localhost:3000/dashboard',
    });
    setMonerium(sdk);
  }, []);

  useEffect(() => {
    const connect = async () => {
      if (monerium) {
        setIsAuthorized(await monerium.getAccess());
      }
    };

    connect();

    return () => {
      if (monerium) {
        monerium.disconnect();
      }
    };
  }, [monerium]);    

  useEffect(() => {
    const fetchData = async () => {
      if (monerium && isAuthorized) {
        try {
          setAuthCtx(await monerium.getAuthContext());
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    };
    fetchData();
  }, [monerium, isAuthorized]);

  return (
    <div>
      {!isAuthorized && <button className="btn bg-gho-dark-bg w-20" onClick={(e) => {
            e.preventDefault();
            monerium?.authorize();
          }}>Connect</button>}
      <p>{authCtx?.name || authCtx?.email}</p>
    </div>
  );
}
