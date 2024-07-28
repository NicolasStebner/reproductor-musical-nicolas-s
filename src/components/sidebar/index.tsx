import { Box, Grid, Stack, TextField } from "@mui/material";
import { Subtitle } from "../../ui/text";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CardComp } from "../card-artist";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Artist } from "../../domain/artist";
import { serviceSpotify } from "../../services/service";
import { Loading } from "../loading";
import { useAuth } from "../../providers/auth/AuthContext";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { DelayComponent } from "../delay";

export function SideBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistsFiltred, setArtistsFilter] = useState<Artist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  /*  */
  const { userFollowedSomeone, access_token } = useAuth();

  const fetchData = async () => {
    const artists = await serviceSpotify.getArtistSideBar(access_token!!);
    setArtists(artists);
    setArtistsFilter(artists);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [userFollowedSomeone, access_token]);

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
        justifyContent: "space-between",
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
          maxHeight: "85%",
          display: "flex",
          flexDirection: "column",
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
            boxSizing: "border-box",
          }}
        >
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            {access_token ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <AccountBoxIcon />
                <Subtitle text="Logged"></Subtitle>
              </Box>
            ) : (
              <Link to="/auth" className="link">
                <Box sx={{ display: "flex", gap: 1 }}>
                  <AccountBoxIcon />
                  <Subtitle text="Log In"></Subtitle>
                </Box>
              </Link>
            )}
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
                    display: "flex",
                    gap: "5px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <SearchOutlinedIcon></SearchOutlinedIcon>
                  <Subtitle text="Search in your library"></Subtitle>
                </Box>
              ) : (
                <>
                  <TextField
                    size="small"
                    onBlur={() => {
                      if (searchQuery == "") {
                        toggleIsSearching();
                      }
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
                  />
                </>
              )}
            </Grid>
            {isLoading ? (
              <Loading />
            ) : (
              artistsFiltred.map((a, index) => {
                return (
                  <Grid
                    item
                    xs={4}
                    key={a.id}
                    onClick={() => handlerArtist(a.id)}
                  >
                    <DelayComponent key={index} delay={index * 100}>
                      <CardComp
                        key={a.id}
                        avatar={{
                          src: `${a.images[0].url}`,
                          alt: `${a.name}`,
                        }}
                        title={a.name}
                        subtitle={a.type}
                      />
                    </DelayComponent>
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
