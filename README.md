# Theodoros Kyriakidis' CV

This is based off <https://github.com/sinaatalay/rendercv-pipeline>.    

## Usage from the CLI

Setup environment in case you are not running in the Dev Container.

```bash
python -m venv venv
. venv/bin/activate
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
