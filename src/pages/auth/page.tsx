import { Box, Typography } from "@mui/material";
import { Loading } from "../../components/loading";

export function AuthPageSecondary() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading /> <Typography variant="h5">Redireccionando</Typography>
      </Box>
    </Box>
  );
}
