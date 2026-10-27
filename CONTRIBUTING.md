# Contributing

Thanks for your interest. This is a personal site, so most changes are made by the owner, but
fixes (typos, broken links, accessibility, workflow issues) are welcome.

## Reporting a bug

Open an issue at <https://github.com/thekyria/thekyria.github.io/issues> with the page or file,
what you expected and what happened. For security issues, follow [SECURITY.md](SECURITY.md)
instead.

## Making a change

1. Fork the repository and create a branch from `main`.
2. Make a focused change. See [README.md](README.md) for how the site, CV and tech radar are laid
   out and how to render the CV locally.
3. Install the [pre-commit](https://pre-commit.com) hooks once with `pre-commit install`. They
   scan for secrets (gitleaks) and reject binary files other than the site's images, icons and
   fonts. To run them on demand: `pre-commit run --all-files`.
4. If you touch `radar/tech_radar.json`, run `python3 radar/check.py`.
5. Open a pull request against `main`. CI renders the CV, validates the tech radar, scans for
   secrets and checks for binary files.
