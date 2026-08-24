# Operation Ghost Card
## Part 3 — Electronic Media Search and Analysis

---

## 3.1 Search Strategy

Analysis was performed only on the **working copies** produced in Part 2
(never on the original media), using each file's SHA-256 hash to confirm
the copy matched the acquired original before analysis began.

Three search techniques were applied, matched to the type of data expected
from each exhibit:

| Technique | Applied To | Purpose |
|---|---|---|
| **String search** (`strings`-style pattern extraction over raw binary) | `skimmer_raw_dump.bin` | Recover embedded human-readable markers (firmware ID, delimiters) inside an otherwise unstructured binary dump — used to confirm device identity/firmware version without needing a full parser. |
| **Structured/metadata search** (parsing CSV/JSON exports, filtering by field) | `captured_tracks.csv`, `gps_coordinates.csv`, `harvested_sms_log.json` | Pull out specific fields (card numbers, coordinates, OTP text, timestamps) already exported in structured form by the acquisition tool. |
| **Communication / "email"-style extraction** (parsing message exports for sender, timestamp, body, and message threading) | `courier_chat_log.txt`, `harvested_sms_log.json` | Reconstruct the communication timeline between the suspect and the runner network, and identify victim-facing OTP messages intercepted by the fraud app. |

**Search terms used** (representative, not exhaustive): `OTP`, `track1`,
`track2`, `location`, `card`, `BIN`, `.apk`, `PERMISSION`, `C2`, coordinate
patterns (`\d{2}\.\d+,\s*\d{2}\.\d+`), timestamp ranges bounding the
offending period (16–21 Apr 2026).

### Real string search output (`skimmer_raw_dump.bin`)

```
$ strings evidence/exhibit-A-skimmer/skimmer_raw_dump.bin
GHOSTCARD_FW_v3.2_DUMPSTART
qU3A
Q }P
akJ
)/j.]|}
random-noise-block
P>`!
Jh~J
Jfc<J
GHOSTCARD_FW_v3.2_DUMPEND
```

The recovered `GHOSTCARD_FW_v3.2` marker string, present at both the start
and end of the dump, corroborates the firmware version already recorded in
`device_config.txt` — an independent cross-check confirming the config file
accurately describes the physical device.

---

## 3.2 Extracted Artefacts (7 — exceeds the required 5)

| # | Artefact ID | Source File | Description | Relevance |
|---|---|---|---|---|
| 1 | ART-101 | `exhibit-A-skimmer/skimmer_raw_dump.bin` | Firmware identifier string `GHOSTCARD_FW_v3.2` recovered via string search | Confirms device identity/model, corroborates config file |
| 2 | ART-102 | `exhibit-A-skimmer/captured_tracks.csv` | 6 sets of dummy Track1/Track2 magnetic-stripe data with cardholder names and expiry | Direct evidence of skimming — links device to specific capture events/timestamps |
| 3 | ART-103 | `exhibit-A-skimmer/device_config.txt` | Bluetooth pairing MAC address `D4:E5:F6:10:22:33` | Potential link between skimmer and Exhibit B (phone) if matching pairing record found on phone |
| 4 | ART-104 | `exhibit-B-phone/fraud_app_manifest.txt` | Dangerous permission set (`READ_SMS`, `BIND_ACCESSIBILITY_SERVICE`, overlay) + non-Play-Store install source | Establishes app as malicious credential harvester, not a legitimate wallet/cashback app |
| 5 | ART-105 | `exhibit-B-phone/harvested_sms_log.json` | 5 intercepted OTP messages from 5 different banks, with masked victim numbers | Direct evidence of unauthorised OTP interception; identifies victim banks for notification |
| 6 | ART-106 | `exhibit-B-phone/courier_chat_log.txt` | Message thread coordinating card batches, drop points, and cash conversion with "Runner-4" | Evidence of the cash-out/organised network and cross-border handling of cloned cards |
| 7 | ART-107 | `exhibit-B-phone/gps_coordinates.csv` | 5 coordinate points: 4 ATM targets + 1 runner drop point, matching timestamps in the chat log | Corroborates physical reconnaissance of target ATMs and ties phone location history to the chat evidence (GPS-204 timestamp matches the chat message referencing shared location) |

---

## 3.3 Evidence Log

| Log Entry | Artefact | Analyst | Date/Time | Action | Hash Verified? |
|---|---|---|---|---|---|
| EL-101 | ART-101 | Forensic Analyst-1 | 18-Apr-2026 09:20 | String search on raw dump | ✔ (matches §2.4 hash) |
| EL-102 | ART-102 | Forensic Analyst-1 | 18-Apr-2026 09:35 | Field extraction from CSV | ✔ |
| EL-103 | ART-103 | Forensic Analyst-1 | 18-Apr-2026 09:50 | Config file review | ✔ |
| EL-104 | ART-104 | Forensic Analyst-2 | 18-Apr-2026 10:15 | Manifest/permission review | ✔ |
| EL-105 | ART-105 | Forensic Analyst-2 | 18-Apr-2026 10:30 | JSON parse, filter by sender=BANK-* | ✔ |
| EL-106 | ART-106 | Forensic Analyst-2 | 18-Apr-2026 10:45 | Chat export review, timeline build | ✔ |
| EL-107 | ART-107 | Forensic Analyst-2 | 18-Apr-2026 11:00 | Coordinate cross-reference with chat timestamps | ✔ |

**Cross-artefact correlation:** ART-103 (BT MAC in skimmer config) and
ART-107 (GPS-204 drop point matching the 18-Apr chat message in ART-106)
together demonstrate the evidentiary linkage strategy used throughout: no
single artefact stands alone — each is corroborated against at least one
artefact from the *other* exhibit or against the chain-of-custody
timestamp, strengthening the evidentiary chain against a claim that any one
item was planted or misattributed.

---

*Next: Part 4 — Cryptography Component (password-protected folder,
brute-force/dictionary simulation, ethical discussion).*
