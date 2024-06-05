import { Box } from "@mui/material";

export function Body({ children }: any) {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        padding: "20px 25px",
        backgroundColor: "var(--onyx-gray)",
      }}
    >
      {children}
    </Box>
  );
}
