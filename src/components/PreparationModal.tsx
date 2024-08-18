import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

interface PreparationModalProps {
  open: boolean;
  preparationTime: number;
  onClose: () => void;
}

const PreparationModal: React.FC<PreparationModalProps> = ({
  open,
  preparationTime,
  onClose,
}) => {
  const [timeLeft, setTimeLeft] = useState(preparationTime);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeLeft(preparationTime);
      setShowCongratulations(false);

      const startTime = Date.now();
      const endTime = startTime + preparationTime * 1000;

      const timer = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = Math.max(
          0,
          Math.round((endTime - currentTime) / 1000)
        );
        setTimeLeft(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(timer);
          setShowCongratulations(true);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open, preparationTime]);

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      PaperProps={{
        onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          event.stopPropagation(),
      }}
    >
      <DialogContent className="flex flex-col items-center">
        {!showCongratulations ? (
          <>
            <DialogTitle>Preparing Your Order</DialogTitle>
            <CircularProgress />
            <Typography variant="h6" className="mt-2">
              Time left: {timeLeft}s
            </Typography>
          </>
        ) : (
          <Typography variant="h6" className="mt-2">
            Felicidades orden lista!
          </Typography>
        )}
        {showCongratulations && (
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={onClose}
          >
            Retire su orden
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreparationModal;
