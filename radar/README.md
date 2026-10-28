# thekyria's tech radar

Based on: <https://github.com/thoughtworks/build-your-own-radar>

Published at <https://thekyria.com/tech_radar.json> (copied into the site by `.github/workflows/pages.yaml`) and rendered at <https://thekyria.com/radar/?documentId=https%3A%2F%2Fthekyria.com%2Ftech_radar.json> by a self-hosted build of BYOR.

The hosted BYOR at radar.thoughtworks.com only knows its default rings (Adopt, Trial, Assess, Caution) and drops blips in any other ring, so it can't render this radar. Instead, `.github/workflows/byor.yaml` builds BYOR from source on every deploy, the way the Docker image below does when it starts:

- the rings are taken from `RINGS` in `env.list`, so that file is the single place to change them;
- BYOR's images are moved under `/radar/images/`, since it refers to them from the domain root;
- BYOR's renaming of a `hold` ring to "Caution" is turned off, as it would drop the `hold` blips.

Validate the json (also run on every PR by `.github/workflows/pr.yaml`):

```bash
python3 radar/check.py
```

## Running BYOR locally

git-bash example on windows, run from within `radar/`, please adapt accordingly.

The image is pinned to the BYOR version the site is built from (`BYOR_REF` in `.github/workflows/byor.yaml`, currently v1.2.1). The container builds BYOR when it starts, with the rings from `env.list`; the command turns off BYOR's renaming of `hold` to "Caution" first, as the site build does, so the `hold` blips (Perl, Ruby, PowerShell) are kept.

```bash
# fetch the image - only once
docker pull wwwthoughtworks/build-your-own-radar:v1.2.1

# start the localhost BYOR server (the build takes a minute or so)
docker run --rm -p 8080:80 --env-file env.list -v /${PWD}:/opt/build-your-own-radar/files wwwthoughtworks/build-your-own-radar:v1.2.1 \
  sh -c "sed -i 's/normalizeRingNameHoldToCaution: true/normalizeRingNameHoldToCaution: false/' src/config.js && ./build_and_start_nginx.sh"

# hit the page pointing to the self-hosted .json
start http://localhost:8080/?documentId=http%3A%2F%2Flocalhost%3A8080%2Ffiles%2Ftech_radar.json
```

Notes:

- "/" in the `-v` argument is due to a [mingw bug](https://stackoverflow.com/questions/50608301/docker-mounted-volume-adds-c-to-end-of-windows-path-when-translating-from-linux)
- Beware of escaping in `env.file`: <https://stackoverflow.com/a/30494145/10955074>
- On start, the image copies its own sample radars into the mounted directory; `.gitignore` keeps them out of git.
- Locally BYOR is served from the root, so it needs no image path changes, unlike the site's `/radar/`.
- When bumping `BYOR_REF`, use the image tag of the same release here.

## json options

- `name`: any string
- `ring`: `use`, `learn`, `evaluate`, `hold`
- `quadrant`: `tools`, `languages & frameworks`, `platforms`, `techniques`
- `isNew`: `TRUE`, `FALSE`
- `description`: any string
