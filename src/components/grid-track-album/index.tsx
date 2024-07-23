import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TrackItem } from "../../domain/trackItem";
import { DelayComponent } from "../delay";

export function GridTrackAlbum({ tracks }: { tracks: TrackItem[] }) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 300, borderSpacing: "0" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "gray", borderColor: "gray" }}>#</TableCell>
            <TableCell sx={{ color: "gray", borderColor: "gray" }} align="left">
              Title
            </TableCell>
            <TableCell
              sx={{ color: "gray", borderColor: "gray" }}
              align="right"
            >
              Duration
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks?.map((t, index) => (
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
                <DelayComponent key={index} delay={index * 200}>
                  {index + 1}
                </DelayComponent>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="left"
              >
                <DelayComponent key={index} delay={index * 200}>
                  {t.name}
                </DelayComponent>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="right"
              >
                <DelayComponent key={index} delay={index * 200}>
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
