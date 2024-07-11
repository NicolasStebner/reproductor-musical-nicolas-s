import { Box } from "@mui/material";
import { ButtonOutlinedRoundedSmall, ButtonWithLink } from "../../ui/button";
import GetAppIcon from "@mui/icons-material/GetApp";
import { AvatarHeader } from "../../ui/avatar";
import { useEffect, useState } from "react";
import { serviceSpotify } from "../../services/service";
import { useAuth } from "../../providers/auth/AuthContext";

export function Header() {
  const { access_token } = useAuth();
  const [letter, setLetter] = useState<string>("?");

  const getUserData = async () => {
    const rta = await serviceSpotify.getUserData(access_token!!);
    let letterC = rta.display_name[0];
    setLetter(letterC);
  };

  useEffect(() => {
    getUserData();
  }, [access_token]);

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
      <AvatarHeader
        alt=""
        src=""
        text={letter}
        backgroundColor="var(--spotify-color)"
        backgroundColorHover="#9effb6"
      />
    </Box>
  );
}
