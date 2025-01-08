"use client";

import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

interface GateInProps {}

const GateIn: React.FC<GateInProps> = () => {
  const [data, setData] = useState<string>("No result");

  const handleResult = async (result: any) => {
    try {
      const text = result?.getText?.(); // Gunakan metode getText() jika tersedia

      if (text) {
        const response = await fetch(text, {
          method: "PATCH",
        });

        if (response.ok) {
          setData(`Success: ${text}`);
        } else {
          setData(`Error: Failed to update`);
        }
      } else {
        setData("Invalid QR code data");
      }
    } catch (err) {
      console.error("Request error:", err);
      setData("Request failed");
    }
  };

  return (
    <div style={{ width: "40%", height: "40%", margin: "auto" }}>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleResult(result); // Panggil fungsi async di sini
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
      <p>{data}</p>
    </div>
  );
};

export default GateIn;
