"use client";
import Grid from "@/components/Grid/Grid";
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, IconButton, Avatar, CircularProgress } from "@mui/material";
import DialogButton from "@/components/Button/DialogButton";
import { useEffect, useCallback } from "react";
import { RootState, AppDispatch } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateShowModal } from "@/lib/state/showModal";
import { updatePlatForm } from "@/lib/state/platform/platform";
import { fetchLatestPrices, CryptoPlatformCode, getSelectedData, updatedSelectedCode } from "../lib/state/cryptoPrice/cryptoPrice";

export default function Home() {
  const dispatch: AppDispatch = useAppDispatch();
  const platforms: CryptoPlatformCode[] = ["ETH", "BNB", "SOL", "DOGE", "BTC"];
  const selectedPlatForm = useAppSelector((state: RootState) => state.persistedReducer.cryptoPrice.selectedCode);
  const cryptoPrice = useAppSelector((state: RootState) => state.persistedReducer.cryptoPrice);
  const showModal = useAppSelector((state: RootState) => state.persistedReducer.showModal);

  useEffect(() => {
    console.log("triggered by useEffect");
    dispatch(fetchLatestPrices({ fiat: "USD", code: selectedPlatForm }));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("triggered by interval");
      dispatch(fetchLatestPrices({ fiat: "USD", code: selectedPlatForm }));
    }, 60000); // 60 seconds interv
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleDialogBox = useCallback(() => {
    dispatch(updateShowModal(true));
  }, [dispatch]);

  const handleDropDialogBox = useCallback(() => {
    dispatch(updateShowModal(false));
  }, [dispatch]);

  const changePlatform = useCallback(
    (platform: CryptoPlatformCode) => {
      dispatch(updatedSelectedCode(platform));
      dispatch(updateShowModal(false));
    },
    [dispatch]
  );

  if (cryptoPrice.isError) {
    return <div>Error</div>;
  } else if (cryptoPrice.isLoading) {
    <div>
      <CircularProgress />
      Loading...
    </div>;
  } else if (cryptoPrice.isSuccess) {
    return (
      <Box>
        <Stack direction={"row"} justifyContent={"space-between"} paddingInline={2}>
          <div style={{ backgroundColor: "black", borderRadius: "0.75rem", padding: 8 }}>
            <Typography color={"white"} variant="h5">
              liveCoinWatch ranking: {cryptoPrice.cryptos[selectedPlatForm][0].rank}
            </Typography>
          </div>

          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            <IconButton size="small" disabled>
              <img src={cryptoPrice.cryptos[selectedPlatForm][0].png32} />
            </IconButton>
            <Typography variant="h5">{cryptoPrice.cryptos[selectedPlatForm][0].name}</Typography>
            <Typography color={"gray"} fontSize={"0.8rem"} fontStyle={"italic"} variant="h5">
              {cryptoPrice.cryptos[selectedPlatForm][0].code}
            </Typography>
          </Stack>
        </Stack>
        <Grid />
        <DialogButton onClick={handleDialogBox} />
        <Dialog open={showModal} onClose={handleDropDialogBox}>
          <DialogTitle>Change Crypto</DialogTitle>
          <DialogContent>
            <Stack direction={"row"} spacing={2} flexWrap={"wrap"} justifyContent={"center"}>
              {platforms.map((platform) => (
                <Button key={platform} onClick={() => changePlatform(platform)}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar alt="" src={cryptoPrice.cryptos[platform][0].png32} sx={{ width: 24, height: 24 }} />
                    <Typography>{cryptoPrice.cryptos[platform][0].name}</Typography>
                    <Typography color={"gray"} fontSize={"0.7rem"} fontStyle={"italic"}>
                      {platform}
                    </Typography>
                  </Stack>
                </Button>
              ))}
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
}
