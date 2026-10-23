# thekyria's tech radar

Based on: <https://github.com/thoughtworks/build-your-own-radar>

git-bash example on windows, please adapt accordingly.

```bash
# fetch the image - only once
docker pull wwwthoughtworks/build-your-own-radar

# start the localhost BYOR server
docker run --rm -p 8080:80 --env-file env.list -v /${PWD}:/opt/build-your-own-radar/files wwwthoughtworks/build-your-own-radar:latest

# hit the page pointing to the self-hosted .json
start http://localhost:8080/?documentId=http%3A%2F%2Flocalhost%3A8080%2Ffiles%2Ftech_radar.json
```

Notes:

- "/" in the `-v` argument is due to a [mingw bug](https://stackoverflow.com/questions/50608301/docker-mounted-volume-adds-c-to-end-of-windows-path-when-translating-from-linux)
- Beware of escaping in `env.file`: <https://stackoverflow.com/a/30494145/10955074>

## json options

- `name`: any string
- `ring`: `use`, `learn`, `evaluate`, `hold`
- `quadrant`: `tools`, `languages & frameworks`, `platforms`, `techniques`
- `isNew`: `TRUE`, `FALSE`
- `description`: any string
