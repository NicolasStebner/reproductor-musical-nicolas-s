import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box sx={{ margin: "0 auto" }}>
      <CircularProgress
        sx={{
          color: "var(--spotify-color)",
        }}
      />
    </Box>
  );
}
