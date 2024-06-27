import { Box, Grid, Stack, TextField } from "@mui/material";
import { Subtitle } from "../../ui/text";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import EastIcon from "@mui/icons-material/East";
import { ButtonIconSmall } from "../../ui/button";
import { CardComp } from "../card-artist";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Artist } from "../../domain/artist";
import { serviceSpotify } from "../../services/service";
import { Loading } from "../loading";
import { useAuth } from "../../providers/auth/AuthContext";

export function SideBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistsFiltred, setArtistsFilter] = useState<Artist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  /*  */
  const { access_token } = useAuth();

  const fetchData = async () => {
    const artists = await serviceSpotify.getArtistSideBar(access_token!!);
    setArtists(artists);
    setArtistsFilter(artists);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [access_token]);

  useEffect(() => {
    filterArtists();
  }, [searchQuery]);

  const handlerArtist = (artistID: string) => {
    navigate("/artist/" + artistID);
  };

  const toggleIsSearching = () => {
    setIsSearching(!isSearching);
  };

  const filterArtists = () => {
    if (searchQuery != "") {
      const filterArtists = artists.filter((a) =>
        a.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
      setArtistsFilter(filterArtists);
    } else {
      setArtistsFilter(artists);
    }
  };

  const handlerChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "30%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Primera parte del SideBar */}
      <Box
        sx={{
          backgroundColor: "var(--onyx-gray)",
          padding: "21px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "20px",
          borderRadius: "8px",
        }}
      >
        <Link to="/" className="link">
          <Box sx={{ display: "flex", gap: 1 }}>
            <HomeOutlinedIcon></HomeOutlinedIcon>
            <Subtitle text="Home"></Subtitle>
          </Box>
        </Link>
        <Link to="/search" className="link">
          <Box sx={{ display: "flex", gap: 1 }}>
            <SearchOutlinedIcon></SearchOutlinedIcon>
            <Subtitle text="Search"></Subtitle>
          </Box>
        </Link>
      </Box>
      {/* Segunda parte del SideBar  */}
      <Box
        sx={{
          maxHeight: "80%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "var(--onyx-gray)",
            paddingY: "20px",
            paddingX: "15px",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            gap: "20px",
            borderRadius: "8px",
          }}
        >
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Link to="/auth" className="link">
              <Box sx={{ display: "flex", gap: 1 }}>
                <LibraryMusicIcon></LibraryMusicIcon>
                <Subtitle text="Auth"></Subtitle>
              </Box>
            </Link>
            <ButtonIconSmall>
              <EastIcon />
            </ButtonIconSmall>
          </Stack>
          {/* Grid con los artistas */}
          <Grid
            container
            spacing={"1px"}
            sx={{ height: "100vh", overflow: "auto" }}
          >
            <Grid item xs={12}>
              {!isSearching ? (
                <Box
                  onClick={toggleIsSearching}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <SearchOutlinedIcon></SearchOutlinedIcon>
                </Box>
              ) : (
                <>
                  <TextField
                    size="small"
                    onBlur={() => {
                      setSearchQuery("");
                      toggleIsSearching();
                    }}
                    value={searchQuery}
                    autoFocus
                    placeholder="Search in your library"
                    variant="standard"
                    color="success"
                    onChange={handlerChange}
                    sx={{
                      input: { color: "white" },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "var(--spotify-color)",
                      },
                    }}
                  ></TextField>
                </>
              )}
            </Grid>
            {isLoading ? (
              <Loading />
            ) : (
              artistsFiltred.map((a) => {
                return (
                  <Grid
                    item
                    xs={4}
                    key={a.id}
                    onClick={() => handlerArtist(a.id)}
                  >
                    <CardComp
                      key={a.id}
                      avatar={{
                        src: `${a.images[0].url}`,
                        alt: `${a.name}`,
                      }}
                      title={a.name}
                      subtitle={a.type}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
