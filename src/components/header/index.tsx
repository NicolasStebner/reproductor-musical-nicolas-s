import { Box } from "@mui/material";
import {
  ButtonIconSmall,
  ButtonOutlinedRoundedSmall,
  ButtonWithLink,
} from "../../ui/button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GetAppIcon from "@mui/icons-material/GetApp";
import { AvatarHeader } from "../../ui/avatar";
export function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "20px",
        padding: "20px 10px",
        backgroundColor: "var(--background-color-header)",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        zIndex: 1,
      }}
    >
      <ButtonWithLink
        link="https://open.spotify.com/download"
        children={
          <ButtonOutlinedRoundedSmall
            startIcon={<GetAppIcon />}
            backgroundColor="var(--coal-black)"
            textColor="white"
            text="Install App"
          />
        }
      ></ButtonWithLink>
      <ButtonIconSmall link="/" color="black" backgroundColorHover="#9effb6">
        <NotificationsIcon />
      </ButtonIconSmall>
      <AvatarHeader
        alt=""
        src=""
        text="N"
        backgroundColor="var(--spotify-color)"
        backgroundColorHover="#9effb6"
      />
    </Box>
  );
}
