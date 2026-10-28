# thekyria.github.io

Source of <https://thekyria.com>.

- `site/` — static site content, deployed to GitHub Pages by `.github/workflows/pages.yaml` on every push to `main`.
- `cv/` — CV source (`thekyria_CV.yaml`), rendered to PDF with [RenderCV](https://github.com/rendercv/rendercv). The PDF of the latest release (see [Releasing a CV version](#releasing-a-cv-version)) is published at <https://thekyria.com/thekyria_CV.pdf>.
- `radar/` — tech radar data (`tech_radar.json`) in [build-your-own-radar](https://github.com/thoughtworks/build-your-own-radar) format. Published at <https://thekyria.com/tech_radar.json> and rendered via [radar.thoughtworks.com](https://radar.thoughtworks.com/?documentId=https%3A%2F%2Fthekyria.com%2Ftech_radar.json). See `radar/README.md`. Previously its own repository, `thekyria/tech_radar`.

The CV setup is based on <https://github.com/sinaatalay/rendercv-pipeline> (see `cv/LICENSE`) and was previously its own repository, `thekyria/rendercv-pipeline`.

## Dependencies

The site itself is plain HTML/CSS with no scripts, frameworks or CDN assets; its fonts are vendored.

| Dependency | Version | Scope | Declared in |
| --- | --- | --- | --- |
| [RenderCV](https://github.com/rendercv/rendercv) (`rendercv[full]`) | 2.8 | Build only (CV PDF) | `cv/requirements.txt` |
| Python | 3.13 | Build only (RenderCV, `radar/check.py`) | `.python-version` |
| [GFS Didot](https://www.greekfontsociety-gfs.gr/) font | — | Site, vendored | `site/fonts/` (`OFL.txt`) |
| [Simple Icons](https://simpleicons.org) brand icons | 13.21.0 | Site, inlined SVG | `site/index.html` |

GitHub Actions used by the workflows are kept up to date by Dependabot (`.github/dependabot.yml`), as is `cv/requirements.txt`.

## Subprojects

There are no subprojects or additional repositories. The CV and the tech radar used to live in `thekyria/rendercv-pipeline` and `thekyria/tech_radar` and are now maintained only here.

## Contributing and reporting bugs

Report bugs at <https://github.com/thekyria/thekyria.github.io/issues> and security issues privately as described in [SECURITY.md](SECURITY.md). See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose a change, including the pre-commit hooks (`pre-commit install`).

## Rendering the CV from the CLI

Note: package `rendercv` requires Python >=3.10. For this make sure to have [pyenv](https://github.com/pyenv/pyenv) (or [pyenv-win](https://github.com/pyenv-win/pyenv-win/)) installed, so that `.python-version` at repo root is respected. Also, you need to have pyenv-installed the pointed-to version.

```bash
# verify that you have installed pyenv correctly
pyenv --version
# check available local versions
pyenv versions
# if the version in .python-version is not there, install it
pyenv install $(cat .python-version)
# normally at this point .python-version should be recognized -
# if not, restart your shell and reenter the dir
# verify that python version is the correct one
python --version
```

Setup environment in case you are not running in the Dev Container.

```bash
python -m venv venv

. venv/bin/activate
# OR (if in windows)
. venv/Scripts/activate
python -m pip install --upgrade pip
```

Install the requirements.

```bash
pip install -r cv/requirements.txt
```

Render the CV. The output options are set under `settings:` in the YAML file, so this writes `build/thekyria_CV.pdf` at the repo root.

```bash
rendercv render cv/thekyria_CV.yaml
```

Cleanup artifacts.

```bash
rm -rf cv/rendercv_output build
```

## Releasing a CV version

CV edits merged to `main` are not published on their own: the site always serves the PDF of the latest GitHub release. To publish the CV as it is on `main`, tag it with a date-based version and push the tag.

```bash
git checkout main && git pull
```

```bash
git tag v2026.10.28
```

```bash
git push origin v2026.10.28
```

The release pipeline (`.github/workflows/cv-release.yaml`) then renders the PDF, attaches it to a GitHub release marked as latest, and redeploys the site (`.github/workflows/pages.yaml`), which downloads that PDF. For a second release on the same day, add a suffix, e.g. `v2026.10.28.1`.

## License

[MIT](LICENSE), except for third-party parts under their own licenses: the CV setup derived from rendercv-pipeline (`cv/LICENSE`, MIT), the GFS Didot font (`site/fonts/OFL.txt`, SIL OFL 1.1) and the Simple Icons brand icons (CC0).
