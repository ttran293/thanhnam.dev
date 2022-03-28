// @ts-nocheck
import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import findDescriptions, { marks } from "../../data/slider_data";
import styles from "./Slider.module.css";

export default function BackgroundInfo(props: any) {
  const [value, setValue] = React.useState<number | number[]>(100);

  function valueLabelFormat(value: any) {
    return marks.find((mark) => mark.value === value).labelTop;
  }

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
      <Box width={"90%"} className={styles.SliderHelp}>
        <Slider
          aria-label="Restricted values"
          defaultValue={100}
          step={null}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="on"
          marks={marks}
          onChange={(_, value) => setValue(value)}
          onChangeCommitted={(_, value) => setValue(value)}
          sx={{ color: "black" }}
        />
      </Box>
    </div>
  );
}
