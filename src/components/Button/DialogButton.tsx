import React from 'react';
import { Button } from "@mui/material";

interface ChangeCryptoButtonProps {
  onClick: () => void;
}

const ChangeCryptoButton: React.FC<ChangeCryptoButtonProps> = ({ onClick }) => {
  return (
    <Button size="small" variant="contained" onClick={onClick} sx={{ marginLeft: 2, marginTop: 1 }}>
      Change Crypto
    </Button>
  );
};

export default React.memo(ChangeCryptoButton);
