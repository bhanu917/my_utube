
import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

export default function Navbar() {
    return (
        <Stack
            direction="row"
            alignitems="center"   // 👈 fixed spelling


            // spacing={2}
            sx={{
                position: "sticky",
                background: "#000",
                top: 0,
                justifyContent: "space-between",
                zIndex: 1000,
                padding: "20px 0 0 10px"       // 👈 ensures it stays above content
            }}
        >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <img src={logo} alt="logo" height={45} id="logo" />
            </Link>
            <SearchBar />
        </Stack>
    );
}
