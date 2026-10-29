# Security Policy

## Supported Versions

This repository has no versioned releases of the site: <https://thekyria.com> is deployed
continuously from `main`. Only the live site (the latest commit on `main`) and the latest CV
release, if any, receive security fixes.

## Reporting a Vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report privately via
[GitHub Security Advisories](https://github.com/thekyria/thekyria.github.io/security/advisories/new).

Include a clear description, the affected page or file, steps to reproduce and the potential impact.

## Response Timeline

This is a personal project maintained on a best-effort basis. We aim to send an **initial
acknowledgement within 14 days** of receiving a report. There are no guaranteed fix SLAs.

## Scope

The site is static and served by GitHub Pages, with no cookies or server-side code. The home
page is HTML/CSS with no forms; `site/ui.js` adds decorative React components that load from
esm.sh and jsDelivr. The tech radar under `/radar/` is a client-side
JavaScript app built from [Build Your Own Radar](https://github.com/thoughtworks/build-your-own-radar);
it loads fonts from Google Fonts and rsms.me, and its landing page has a form that loads a radar
from a URL the visitor enters. In scope: the content of this repository, its GitHub Actions
workflows and how they build the radar app. Out of scope: GitHub Pages itself, vulnerabilities in
Build Your Own Radar itself (report those upstream) and third-party sites linked from the site.

## Security Measures

- **gitleaks** — secret scanning on every push and pull request, a weekly full-history scan,
  and a pre-commit hook
- **Binary Artifacts** — a workflow and pre-commit hook that reject binary files other than the
  site's images, icons and fonts
- **Dependabot** — monthly updates for GitHub Actions and `cv/requirements.txt`
