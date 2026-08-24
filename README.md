# Cyber Crime — Operation Ghost Card

**Assignment 1 — Unit 1: Foundations of Digital Forensics**
Simulated investigation of a metro-area ATM skimming & digital-wallet
cashback-app fraud ring (Case No. OGC-2026-031).

**GitHub repo name:** `operation-ghost-card`

> All data in this repository — card numbers, names, phone numbers, chat
> logs, GPS coordinates, and the "victim" bank messages — is **synthetically
> generated for coursework purposes**. No real individuals, accounts, or
> devices are represented.

---

## Repository Structure

```
operation-ghost-card/
├── README.md                      # this file — execution guide, tools, authorship
├── docs/
│   ├── 01-cybercrime-taxonomy.md      # Sub-problem 1: classification & legal mapping
│   ├── 02-evidence-collection.md      # Sub-problem 2: chain of custody, hashing
│   ├── 03-media-analysis.md           # Sub-problem 3: search strategy, artefacts
│   └── 04-cryptography-component.md   # Sub-problem 4: cracking sim, ethics
├── report/
│   └── Operation-Ghost-Card-Legal-Technical-Report.docx  # Sub-problem 5
├── evidence/
│   ├── exhibit-A-skimmer/         # dummy skimmer dump, tracks, config, photo log + photos/
│   ├── exhibit-B-phone/           # dummy app manifest, chat/GPS logs, gallery/,
│   │                               #   and protected_evidence.zip (password-protected)
│   └── hashes/
│       └── sha256_hashlog.txt     # SHA-256 of all 16 acquired files
├── tools/
│   ├── crack_zip.py               # dictionary-attack script used in Part 4
│   └── password.lst               # bundled wordlist (stand-in for John's password.lst)
├── screenshots/                   # tool-usage screenshots (hashing, cracking, search)
└── .github/workflows/
    └── validate-structure.yml     # CI: validates repo structure on push/PR
```

---

## Execution Guide

### Clone
```bash
git clone https://github.com/<your-username>/operation-ghost-card.git
cd operation-ghost-card
```

### Prerequisites
- Python 3.8+ (standard library only for `crack_zip.py`)
- `sha256sum` (coreutils — preinstalled on Linux/macOS/WSL)

### 1. Reproduce the SHA-256 hash log
```bash
cd evidence
sha256sum exhibit-A-skimmer/*.csv exhibit-A-skimmer/*.txt exhibit-A-skimmer/*.bin \
  exhibit-A-skimmer/photos/*.jpg exhibit-B-phone/*.txt exhibit-B-phone/*.json \
  exhibit-B-phone/*.csv exhibit-B-phone/*.zip exhibit-B-phone/gallery/*.jpg
```
Compare against `hashes/sha256_hashlog.txt` (16 files total) — this is the
same integrity check performed at every custody transfer in the case, and
the same check the CI workflow runs automatically on every push.

### 2. Reproduce the password-cracking simulation
```bash
cd evidence/exhibit-B-phone
python3 ../../tools/crack_zip.py
```
Expected output:
```
[+] PASSWORD FOUND: 'sunshine22'
[+] Attempts: 1587
[+] Time elapsed: ~0.07s
```
See `docs/04-cryptography-component.md` for the equivalent `zip2john` /
`john --wordlist` / `hashcat -m 17200` command-line workflow this script
substitutes for.

### 3. Read the write-up
Read `docs/01` → `docs/04` in order, then the consolidated
`report/Operation-Ghost-Card-Legal-Technical-Report.docx` for the final
legal-technical report (Sub-problem 5).

### 4. CI validation
`.github/workflows/validate-structure.yml` runs automatically on every push
and pull request. It checks that all required folders/files are present and
that no evidence file's SHA-256 hash has drifted from the recorded hash log.

---

## Tools Used

| Tool | Purpose |
|---|---|
| `sha256sum` (GNU coreutils) | Evidence integrity hashing (Part 2) |
| Python 3 (`zipfile`, `json`, `csv`) | Simulated evidence generation, strings-style search (Part 3), dictionary-attack script (Part 4) |
| Bundled `password.lst` wordlist | Source wordlist for the dictionary attack (Part 4), standing in for John the Ripper's default list |
| `python-docx` / docx tooling | Generation of the formatted Legal-Technical Report (Part 5) |
| GitHub Actions | CI structure & hash-integrity validation (Part 6) |

Tool-usage screenshots are provided in `screenshots/`:
- `01-hash-generation.png` — SHA-256 hashing of all acquired files
- `02-password-crack.png` — dictionary attack recovering the archive password
- `03-strings-search.png` — string search recovering the skimmer firmware marker

---

## Authorship Declaration

I declare that the analysis, scripts, simulated evidence, and report in
this repository were prepared by me for Assignment 1 (Unit 1: Foundations
of Digital Forensics), as an educational simulation. All "evidence" is
synthetic and was generated specifically for this exercise; no real
persons, devices, accounts, or financial data are involved.

**Name:** Kajal
**Roll No. / Student ID:** 2301350024
**Course:** B.Tech CSE (FSD)
**Date:** 24-08-2026
**Signature:** Kajal

---

## Evaluation Cross-Reference

| Criterion (Marks) | Where addressed |
|---|---|
| Cybercrime taxonomy & legal mapping (1.5) | `docs/01-cybercrime-taxonomy.md` |
| Evidence acquisition + chain of custody (2.0) | `docs/02-evidence-collection.md`, `evidence/` |
| File/media analysis and artefact extraction (2.0) | `docs/03-media-analysis.md` |
| Cryptography simulation and discussion (1.5) | `docs/04-cryptography-component.md`, `tools/crack_zip.py` |
| Final legal-technical report quality (2.0) | `report/Operation-Ghost-Card-Legal-Technical-Report.docx` |
| GitHub structure, documentation, CI compliance (1.0) | This README, `.github/workflows/validate-structure.yml` |
