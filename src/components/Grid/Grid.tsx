"use client";
import { Box } from "@mui/material";
import { useId } from "react";
import { CryptoPlatformCode } from "@/lib/state/cryptoPrice/cryptoPrice";
import { DataGrid } from "@mui/x-data-grid";
import { RootState } from "@/lib/store";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { columnDevs } from "./column";


function Grid() {
  // const platform:CryptoPlatformCode = useAppSelector((state: RootState) => state.persistedReducer.platform);
  // const cryptoPrice = useAppSelector((state: RootState) => state.persistedReducer.cryptoPrice.cryptos[platform]);
  const cryptoPrice = useAppSelector((state: RootState)=> state.persistedReducer.cryptoPrice.selectedData);
  const rowsWithIds = cryptoPrice.map((row, index)=> {
    const id = index;
    return { ...row, id };
  })

  return (
    <Box sx={{ height: 400, marginTop: 3, paddingInline: 2, display: "flex", justifyItems: "center"}}>
      <DataGrid rows={rowsWithIds} columns={columnDevs}  getRowId={(row) => row.id} />
    </Box>
  );
}

export default Grid;
