import { Box, Fade } from "@mui/material";
import { useEffect, useState } from "react";

interface DelayComponentProps {
  children: React.ReactNode;
  delay: number;
}

export function DelayComponent({ children, delay }: DelayComponentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Fade in={visible} timeout={1000}>
      <Box>{children}</Box>
    </Fade>
  );
}
