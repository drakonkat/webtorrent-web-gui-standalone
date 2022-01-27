import React, {useState} from 'react';
import {Button, Container, createTheme, CssBaseline, Stack, TextField, ThemeProvider} from "@mui/material";
import {WebTorrentGui} from "webtorrent-web-gui";
import {Save} from "@mui/icons-material";

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

function TorrentManager(props) {
    const [baseUrl, setBaseUrl] = useState("");
    const [key, setKey] = useState(null);
    let path = process.env.REACT_APP_BASE_PATH
    if (!key && path != null) {
        setKey(path);
    }
    console.log("CHECK PATH: ", path)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <Stack spacing={2} alignItems={"center"}>
                    {!path && <Stack direction={"row"} spacing={4}>
                        <TextField
                            id={"baseUrl"}
                            type="text"
                            variant={"outlined"}
                            value={baseUrl}
                            onChange={(e) => {
                                setBaseUrl(e.target.value)
                            }}
                        />
                        <Button startIcon={<Save/>} onClick={() => {
                            setKey(baseUrl)
                        }}> Save </Button>
                    </Stack>}
                    {key && <WebTorrentGui key={key} baseUrl={path}/>}
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default TorrentManager;
