import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TopTrackItem } from "../../domain/topTrackItem";
import { DelayComponent } from "../delay";

export function TableTrackItem({ topTracks }: { topTracks: TopTrackItem[] }) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 300, borderSpacing: "0" }}
        aria-label="simple table"
      >
        <TableBody>
          {topTracks.map((t, index) => (
            <TableRow
              key={t.id}
              sx={{
                backgroundColor: "var(--onyx-gray)",
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "var(--hover-color-gray)",
                },
              }}
            >
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                component="th"
                scope="row"
              >
                <DelayComponent key={index} delay={index * 100}>
                  {index + 1}
                </DelayComponent>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="left"
              >
                <DelayComponent key={index} delay={index * 100}>
                  <Avatar src={t.album.images[0].url}></Avatar>
                </DelayComponent>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="left"
              >
                <DelayComponent key={index} delay={index * 100}>
                  {t.name}
                </DelayComponent>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="right"
              >
                <DelayComponent key={index} delay={index * 100}>
                  {t.getDuration()}
                </DelayComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
