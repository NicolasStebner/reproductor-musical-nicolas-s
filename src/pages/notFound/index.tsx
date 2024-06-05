import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SAPE from "../../assets/spotify.png";

export function NotFoundPage() {
  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      <Box margin={"auto auto"}>
        <Box display={"flex"} justifyContent={"center"}>
          <img
            className="img"
            srcSet={`${SAPE}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${SAPE}?w=164&h=164&fit=crop&auto=format`}
            alt={""}
            loading="lazy"
          />
        </Box>
        <Typography variant="h3" align="center">
          Página no encontrada
        </Typography>
        <Typography variant="h4" align="center">
          <Link className="link redirect" to="/">
            Ir a Home
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
