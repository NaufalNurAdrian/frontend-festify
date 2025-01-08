"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

interface GateInProps {}

const GateIn: React.FC<GateInProps> = () => {
  const [data, setData] = useState<string>("No result");

  return (
    <div style={{ width: "40%", height: "40%", margin: "auto" }}>
      <QrReader
        onResult={(result: any, error: any) => {
          if (result?.text) {
            setData(result.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints    ={{ facingMode:  "environment"  }}
      />
      <p>{data}</p>
    </div>
  );
};

export default GateIn;
