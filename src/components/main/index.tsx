import { Box } from "@mui/material";

export function Main({ children }: any) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        backgroundColor: "var(--onyx-gray)",
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
}
