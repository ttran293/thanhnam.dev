import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import findDescriptions, { marks } from "../../data/slider_data";
import styles from "./Slider.module.css";

export default function BackgroundInfo(props: any) {
  const [value, setValue] = React.useState<number | number[]>(100);
  return (
    <div>
      <Box
        sx={{
          height: 150,
        }}
      >
        {" "}
        <p className={styles.description}>{findDescriptions(value)}</p>
      </Box>
      <Box width={"100%"}>
        <Slider
          aria-label="Restricted values"
          defaultValue={100}
          step={null}
          valueLabelDisplay="off"
          marks={marks}
          onChange={(_, value) => setValue(value)}
          onChangeCommitted={(_, value) => setValue(value)}
          sx={{ color: "#eee" }}
        />
      </Box>
    </div>
  );
}
