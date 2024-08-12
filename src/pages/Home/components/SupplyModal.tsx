import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { memo, useState, ChangeEvent } from 'react';

type SupplyModalProps = {
  visible: boolean;
  onConfirm: (amount: string) => void;
  onClose: () => void;
};

const SupplyModal = ({ visible, onClose, onConfirm }: SupplyModalProps) => {
  const [amount, setAmount] = useState('');
  return (
    <Dialog fullWidth open={visible} onClose={onClose}>
      <DialogTitle>Supply</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Supply amount"
          value={amount}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setAmount(event.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={async () => {
            await onConfirm(amount);
            onClose();
          }}
        >
          Supply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(SupplyModal);
