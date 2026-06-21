"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const GateIn: React.FC = () => {
  const [data, setData] = useState<string>("No result");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = "qr-reader";

  const handleResult = async (text: string) => {
    try {
      const response = await fetch(text, { method: "PATCH" });

      if (response.ok) {
        setData(`Success: ${text}`);
      } else {
        setData(`Error: Failed to update`);
      }
    } catch (err) {
      console.error("Request error:", err);
      setData("Request failed");
    }
  };

  const startScanner = async () => {
    if (scannerRef.current || isScanning) return;

    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;
    setIsScanning(true);

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          await handleResult(decodedText);
        },
        (errorMessage) => {
          // scan error per-frame, tidak perlu ditampilkan
          console.debug("QR scan error:", errorMessage);
        }
      );
    } catch (err) {
      console.error("Failed to start scanner:", err);
      setData("Camera access denied or unavailable");
      scannerRef.current = null;
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
      scannerRef.current.clear();
    }
    scannerRef.current = null;
    setIsScanning(false);
  };

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div style={{ width: "40%", margin: "auto", textAlign: "center" }}>
      <div id={containerId} style={{ width: "100%" }} />
      <p style={{ marginTop: "1rem" }}>{data}</p>
      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
        {!isScanning ? (
          <button onClick={startScanner}>Start Scanner</button>
        ) : (
          <button onClick={stopScanner}>Stop Scanner</button>
        )}
      </div>
    </div>
  );
};

export default GateIn;