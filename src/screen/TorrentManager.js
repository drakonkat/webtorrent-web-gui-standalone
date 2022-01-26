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
    const [host, setHost] = useState("");
    const [port, setPort] = useState(3000);
    const [key, setKey] = useState(null);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <Stack spacing={2} alignItems={"center"}>
                    <Stack direction={"row"} spacing={4}>
                        <TextField
                            id={"host"}
                            type="text"
                            variant={"outlined"}
                            value={host}
                            onChange={(e) => {
                                setHost(e.target.value)
                            }}
                        />
                        <TextField
                            id={"port"}
                            type="number"
                            variant={"outlined"}
                            value={port}
                            onChange={(e) => {
                                setPort(e.target.value)
                            }}
                        />
                        <Button startIcon={<Save/>} onClick={() => {
                            setKey(host + ":" + port)
                        }}> Save </Button>
                    </Stack>
                    {key && <WebTorrentGui key={key} host={host} port={port}/>}
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default TorrentManager;
