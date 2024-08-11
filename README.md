# Theodoros Kyriakidis' CV

```bash
# setup environment
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
# up to here not necessary if you are running in the Dev Container

# render CV
rendercv render src/thekyria_CV.yaml --dont-generate-markdown --dont-generate-html --dont-generate-png --pdf-path build/thekyria_CV.pdf

# cleanup
rm -rf rendercv_output build/thekyria_CV.pdf
```
