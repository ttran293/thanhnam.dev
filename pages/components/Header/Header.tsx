import React, { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import InfoIcon from "@mui/icons-material/Info";

 const breadcrumbs = [
   <Link href="/" key="1">
     <Button variant="text" startIcon={<HomeIcon />} sx={{ color: "black" }}>
       Home
     </Button>
   </Link>,
   <Link href="/about" key="2">
     <Button variant="text" startIcon={<InfoIcon />} sx={{ color: "black" }}>
       About
     </Button>
   </Link>,
   <Link href="/now" key="3">
     <Button
       variant="text"
       startIcon={<NotificationImportantIcon />}
       sx={{ color: "black" }}
     >
       Now
     </Button>
   </Link>,
 ];

export default function Header(props: any) {
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

