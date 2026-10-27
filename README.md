# thekyria.github.io

Source of <https://thekyria.com>.

- `site/` — static site content, deployed to GitHub Pages by `.github/workflows/pages.yaml` on every push to `main`.
- `cv/` — CV source (`thekyria_CV.yaml`), rendered to PDF with [RenderCV](https://github.com/rendercv/rendercv). The PDF is published at <https://thekyria.com/thekyria_CV.pdf>.
- `radar/` — tech radar data (`tech_radar.json`) in [build-your-own-radar](https://github.com/thoughtworks/build-your-own-radar) format. Published at <https://thekyria.com/tech_radar.json> and rendered via [radar.thoughtworks.com](https://radar.thoughtworks.com/?documentId=https%3A%2F%2Fthekyria.com%2Ftech_radar.json). See `radar/README.md`. Previously its own repository, `thekyria/tech_radar`.

The CV setup is based on <https://github.com/sinaatalay/rendercv-pipeline> (see `cv/LICENSE`) and was previously its own repository, `thekyria/rendercv-pipeline`.

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

The release pipeline (`.github/workflows/release.yaml`) triggers upon pushing a tag and attaches the PDF to a GitHub release.

```bash
git tag v2026.04.30
git push origin --tags
```
