caddy adapt --config ./Caddyfile --validate
caddy start --config ./CaddyFile --adapter caddyfile
concurrently "npm run prod --prefix webtorrent-express-api/"

