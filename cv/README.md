# Theodoros Kyriakidis' CV

This is based on <https://github.com/sinaatalay/rendercv-pipeline>.

## Usage from the CLI

Note: package `rendercv` requires Python >=3.10. For this make sure to have [pyenv](https://github.com/pyenv/pyenv) (or [pyenv-win](https://github.com/pyenv-win/pyenv-win/) installed, so that `.python-version` at repo root is respected. Also, you need to have pyenv-installed the pointed-to version.

```bash
# verify that you have installed pyenv correctly
pyenv --version
# check available local versions
pyenv versions
# if 3.10.5 is not there, install it
pyenv install 3.10.5
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
pip install -r requirements.txt
```

Render the CV.

```bash
rendercv render src/thekyria_CV.yaml --dont-generate-markdown --dont-generate-html --dont-generate-png --pdf-path build/thekyria_CV.pdf
```

Cleanup artifacts.

```bash
rm -rf rendercv_output build/thekyria_CV.pdf
```

## Using the github actions for a release

The release pipeline triggers upon pushing a tag.

```bash
git tag v2026.04.30
git push origin --tags
```
