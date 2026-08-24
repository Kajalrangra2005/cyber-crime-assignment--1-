# Operation Ghost Card
## Part 2 — Electronic Evidence Collection Simulation

---

## 2.1 Devices Seized

| Exhibit | Description | Seizure Location |
|---|---|---|
| **A** | ATM skimmer unit — card-slot overlay + pinhole camera + BT data module + onboard flash | ATM lobby, Branch 1, Andheri, Mumbai |
| **B** | Suspect's Android phone — contains fraud app, chat logs, GPS cache | Suspect's rented flat, Andheri, Mumbai |

Simulated data sets for each exhibit are provided in
`evidence/exhibit-A-skimmer/` and `evidence/exhibit-B-phone/`, representing
what a forensic acquisition would yield (raw dump, extracted logs,
configuration data, and a metadata log for photographic evidence).

---

## 2.2 Evidence Handling Procedure

**1. Isolation at point of seizure**
- Exhibit A (skimmer) was powered down and placed directly into a
  static-shielded evidence bag to prevent remote wipe or tampering.
- Exhibit B (phone) was placed in **airplane mode**, then into a
  Faraday bag, to sever it from network/cloud commands (remote wipe,
  encryption re-lock) before acquisition.

**2. Write-blocking**
- Prior to imaging, Exhibit A's onboard flash was connected only through a
  **hardware write-blocker** so the acquisition process cannot alter the
  source medium — any interaction is strictly read-only at the hardware
  level. This preserves the original data state and the integrity of
  subsequent hash verification.
- For Exhibit B, acquisition follows standard mobile-forensics practice:
  a validated forensic tool performs a logical/physical extraction over a
  cable connection using a **verified read-only interface mode**;
  no data is written back to the device during extraction.

**3. Imaging / extraction**
- Exhibit A: onboard flash dumped bit-for-bit to `skimmer_raw_dump.bin`;
  parsed capture records exported to `captured_tracks.csv`; device
  configuration and pairing metadata exported to `device_config.txt`.
- Exhibit B: application manifest/permissions extracted to
  `fraud_app_manifest.txt`; SMS database exported to
  `harvested_sms_log.json`; messaging app export to
  `courier_chat_log.txt`; location cache to `gps_coordinates.csv`.

**4. Hashing (integrity verification)**
- Immediately after acquisition, a **SHA-256 hash** was generated for every
  extracted file (see §2.4). This hash is recorded on the chain-of-custody
  form and in the exhibit log at the moment of acquisition.
- Hashes are re-verified at every subsequent access (transfer to analyst,
  copy to workstation, before report writing) — any mismatch would indicate
  the copy is no longer forensically sound and must be re-acquired from a
  verified source.
- Working copies only are analysed; the original media / first forensic
  image is never opened directly, to preserve an unaltered master copy for
  court production.

**5. Documentation**
- Every seizure, transfer, and access event is logged on the
  chain-of-custody form (§2.3), signed and timestamped, with no gaps in
  custody permitted.

---

## 2.3 Chain of Custody Form

**Case No.:** OGC-2026-031 — Operation Ghost Card
**Investigating Unit:** Cyber Crime Cell, Mumbai Police (simulated)

### Exhibit A

| Field | Detail |
|---|---|
| Exhibit ID | OGC-2026-031-A |
| Description | ATM skimmer unit (overlay, camera, BT module, flash storage) |
| Date/Time of Seizure | 16-Apr-2026, 19:20 IST |
| Location of Seizure | ATM lobby, Branch 1, Andheri, Mumbai |
| Seized By | Investigating Officer (IO-1) |
| Witnesses (Panchas) | Panch Witness 1, Panch Witness 2 |
| Sealed/Bagged | Yes — tamper-evident bag, seal no. TE-30291 |
| Initial Hash (SHA-256, `skimmer_raw_dump.bin`) | `8fa6beac9af573afe61c7cc5c02c810d8269766a491f51ed677810ab0f9ce694` |

| Date/Time | Released By | Received By | Purpose | Signature |
|---|---|---|---|---|
| 16-Apr-2026 19:20 | Scene (Panch witnesses) | IO-1 | Seizure | ✍ |
| 17-Apr-2026 09:00 | IO-1 | Forensic Lab Custodian | Transport for imaging | ✍ |
| 17-Apr-2026 09:50 | Lab Custodian | Forensic Analyst-1 | Write-blocked imaging & hashing | ✍ |
| 17-Apr-2026 14:10 | Forensic Analyst-1 | Evidence Locker | Return to secure storage | ✍ |

### Exhibit B

| Field | Detail |
|---|---|
| Exhibit ID | OGC-2026-031-B |
| Description | Android phone (fraud app, chat/GPS data) |
| Date/Time of Seizure | 16-Apr-2026, 19:45 IST |
| Location of Seizure | Suspect's rented flat, Andheri, Mumbai |
| Seized By | Investigating Officer (IO-1) |
| Witnesses (Panchas) | Panch Witness 1, Panch Witness 2 |
| Sealed/Bagged | Yes — Faraday bag, seal no. TE-30292 |
| Initial Hash (SHA-256, `harvested_sms_log.json`) | `6757e8205b40a1cd6761a73d96662c94fb54781a8829bc58bf0433d8ce422b80` |

| Date/Time | Released By | Received By | Purpose | Signature |
|---|---|---|---|---|
| 16-Apr-2026 19:45 | Scene (Panch witnesses) | IO-1 | Seizure | ✍ |
| 17-Apr-2026 09:00 | IO-1 | Forensic Lab Custodian | Transport for extraction | ✍ |
| 17-Apr-2026 10:15 | Lab Custodian | Forensic Analyst-2 | Mobile extraction & hashing | ✍ |
| 17-Apr-2026 15:30 | Forensic Analyst-2 | Evidence Locker | Return to secure storage | ✍ |

---

## 2.4 SHA-256 Hash Values of Acquired Files

Full log: `evidence/hashes/sha256_hashlog.txt`. Summary below (**16 files
hashed** — exceeds the minimum of 5, and includes the simulated seizure/
gallery photo files alongside the structured logs):

| File | Exhibit | SHA-256 |
|---|---|---|
| `captured_tracks.csv` | A | `d83d24f408f45fb16630301db5243e221c164935555a5ef0cc040bd15ded6437` |
| `device_config.txt` | A | `105b6a8d1e83554ad7090919353e73f936b6009f8ff98c2a6625743bb9b342d4` |
| `photo_log.txt` | A | `c206d84d123a9a81bbe96d7ca4a4b6ce706ec7684c8101bda6ed0322e3bd25e2` |
| `skimmer_raw_dump.bin` | A | `8fa6beac9af573afe61c7cc5c02c810d8269766a491f51ed677810ab0f9ce694` |
| `photos/IMG_A101.jpg` | A | `8a227c46037431d06e8d35c643e255db511bfd1417fb8dbcd82cf010dbe5736d` |
| `photos/IMG_A102.jpg` | A | `799198716243a477a93c61a5e7557aa544e776049c4c55f39204f444aab795f8` |
| `photos/IMG_A104.jpg` | A | `23107738d499c262802a403f783c364d2c94c03c1270541ec5871ad55becc680` |
| `photos/IMG_A106.jpg` | A | `25afb6812e5260442014dbb1849f646b2acd88a685ff54262442bd00295ecc03` |
| `courier_chat_log.txt` | B | `cbe8f4e5df4c9e52b2b1ebdadca0949400fdc4341b6a2caef5a6aba370245f0f` |
| `fraud_app_manifest.txt` | B | `476e81d467d80d9d5d61a6a395497d9af3e40ab439ca9fdd31c5a735275f1c2c` |
| `gallery_log.txt` | B | `8d0462a160d1b8034a9835fb2fa7348e8c9ed291a4aef4eb4734c39a35782f74` |
| `gps_coordinates.csv` | B | `38aa3f2aec80b6e4fc0646e86d732a40bf5004ee2bcf2bfa06fb493277e02dfc` |
| `harvested_sms_log.json` | B | `6757e8205b40a1cd6761a73d96662c94fb54781a8829bc58bf0433d8ce422b80` |
| `gallery/IMG_2026-03-31_1.jpg` | B | `c47f8e0e5e50b179b7ef033eca6c3458885810807d4cc602e485e6deaae90043` |
| `gallery/IMG_2026-04-18_1.jpg` | B | `60cee86ba26db9357eb2f65cc9d94a8ecd45b9bb97838b3a33dedbd296752291` |
| `protected_evidence.zip` (still locked) | B | `f7a4b1d6bb700521583755144e418f3d432747a2246f10d5ba292af5640dd39c` |

The password-protected archive is hashed here **before** any crack attempt
(see Part 4, §4.1), so the pre-crack state is provably preserved
regardless of what the password-recovery process later reveals.

> Note on data authenticity: all card numbers, phone numbers, names,
> coordinates, and image content in the evidence files are **synthetically
> generated for this simulation** and do not correspond to real
> individuals, accounts, or devices. Evidence photos are abstract
> placeholder graphics explicitly labelled "EVIDENCE PHOTO — SIMULATED".

---

*Next: Part 3 — Electronic Media Search and Analysis (artefact extraction,
search strategy, evidence log).*
