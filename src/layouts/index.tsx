import { Box, Stack } from "@mui/material";
import { SideBar } from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { Main } from "../components/main";
import { Footer } from "../components/footer";
import { MusicPlayer } from "../components/music-player";
import { Header } from "../components/header";
import { Body } from "../components/body";

export function Layout() {
  return (
    <Stack
      spacing={"10px"}
      sx={{
        width: "calc(100vw - 8px)",
        height: "calc(100vh - 8px)",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction={"row"}
        spacing={"10px"}
        sx={{ width: "100%", maxHeight: "88%", boxSizing: "border-box" }}
      >
        <SideBar />
        <Main>
          <Header />
          <Body>
            <Outlet />
            <Footer />
          </Body>
        </Main>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          padding: "2px",
          boxSizing: "border-box",
        }}
      >
        <MusicPlayer />
      </Box>
    </Stack>
  );
}
