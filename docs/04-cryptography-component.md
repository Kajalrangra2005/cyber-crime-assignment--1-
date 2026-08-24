# Operation Ghost Card
## Part 4 — Cryptography Component

---

## 4.1 The Password-Protected Folder

During extraction of Exhibit B, one archive on the phone's storage was
found to be password-protected:

- **File:** `evidence/exhibit-B-phone/protected_evidence.zip`
- **SHA-256 (of the still-locked archive, taken before any crack attempt):**
  `f7a4b1d6bb700521583755144e418f3d432747a2246f10d5ba292af5640dd39c`
- **Contents once opened:** `laundering_notes.txt` (dummy mule-account list
  and split ratio) and `target_bank_list.txt` (dummy list of target
  branches) — both synthetic, for this simulation.

Standard practice hashes the *locked* file first, so that the pre-crack
state is provably preserved regardless of what the password recovery
process reveals.

---

## 4.2 Cracking Approach

**Intended tool-chain (typical lab setup):** `zip2john` to extract a
crackable hash representation of the archive, then `john
--wordlist=password.lst hash.txt` (or `hashcat -m 17200` for legacy
ZipCrypto / `-m 13600` for WinZip AES) to run the dictionary attack.

**What was actually run in this environment:** the minimal Linux
environment used here does not have John the Ripper's jumbo-patch helper
scripts (including `zip2john`) installed, and no internet access was
available to fetch them. To still perform a genuine (not hand-waved)
dictionary attack, an equivalent Python script (`tools/crack_zip.py`) was
written: it iterates a bundled wordlist (`tools/password.lst`, standing in
for John's default `password.lst`) and attempts
`zipfile.extractall(pwd=...)` for each candidate. This is functionally
identical to what `zip2john` + `john` would do — same "try password, check
if it opens" logic — just implemented directly rather than through the JtR
binary.

```python
# tools/crack_zip.py (excerpt)
with open(WORDLIST, 'r', encoding='latin-1') as f:
    for line in f:
        pw = line.rstrip('\n')
        tried += 1
        if attempt(pw, zf):
            print(f"[+] PASSWORD FOUND: '{pw}'  (attempt #{tried})")
            return
```

### Result (actual run, reproducible)

```
$ cd evidence/exhibit-B-phone
$ python3 ../../tools/crack_zip.py
[+] PASSWORD FOUND: 'sunshine22'
[+] Attempts: 1587
[+] Time elapsed: 0.073s
```

The password `sunshine22` — a dictionary word plus a two-digit suffix,
positioned at line 1587 of the bundled wordlist — was recovered in under a
tenth of a second. This is a **dictionary attack**, not a brute-force
attack: it succeeded because the suspect reused a password pattern that
appears on essentially every publicly available common-password list,
rather than because of raw compute power.

*(A true exhaustive brute-force run — trying every possible character
combination up to the password's length — was not additionally executed
here, since the dictionary attack already succeeded; in a real case, a
brute-force pass is typically only escalated to after the wordlist stage
fails, since it is dramatically more time- and compute-intensive.)*

---

## 4.3 Ethical Implications: Brute-Forcing vs. Lawful Decryption

| | Brute-force / dictionary cracking by investigators | Lawful decryption request (compelled disclosure / vendor assistance) |
|---|---|---|
| **Basis** | Technical — exploits weak/reused passwords | Legal — court order, statutory power (e.g. Sec. 69 IT Act interception/decryption powers, Sec. 91 CrPC production order) |
| **Reliability** | Not guaranteed — strong/unique passwords may resist indefinitely | Compels the party who *knows* the password (or can bypass it) to cooperate; more reliable when it succeeds |
| **Rights implications** | Circumvents a person's access-control measure without their knowledge or consent, ahead of any court authorisation | Respects due process — subject typically has notice and legal recourse to challenge the order |
| **Risk of overreach** | Investigators could technically access material beyond the specific scope authorised by a search warrant | Legal orders can be scoped narrowly to what's actually needed |
| **When justified** | Widely accepted for evidence already lawfully seized under a valid warrant, applied only to that evidence, and documented | Preferred where the subject or a third party (e.g. a service provider) can be compelled — avoids self-incrimination disputes around forced password disclosure |

**Key ethical tension:** compelling a *suspect* to disclose a password can
raise self-incrimination concerns in some legal systems, which is one
reason technical cracking (applied only to already-lawfully-seized media)
is often the preferred investigative route over compelled disclosure —
provided it stays strictly within the scope of the existing search
authorisation and is fully documented (as in §4.2) so the method can be
challenged and verified in court.

---

## 4.4 Reflection: Strength of User-Created Passwords in Criminal Scenarios

This case illustrates a pattern seen repeatedly in real digital-forensics
work: **operational security failures are often the actual point of
compromise**, not sophisticated cryptanalysis.

- `sunshine22` follows a common weak-password template: a dictionary word +
  a trailing two-digit number to satisfy a "must contain a number" policy —
  it offers negligible resistance to a wordlist that any investigator (or
  attacker) can assemble for free.
- Criminal actors frequently **reuse personal passwords** across their
  legitimate accounts and their concealment archives, because remembering a
  unique strong password purely for "hiding evidence" competes with
  everyday convenience — the same psychology that makes weak passwords a
  problem for ordinary users makes them a problem (i.e. an evidentiary
  opportunity) for criminals too.
- From a forensic-readiness standpoint, this means dictionary attacks
  should always be attempted **before** committing resources to a full
  brute-force run — the cost/reward ratio strongly favours trying
  known-weak and reused passwords first.
- It also has a policy implication for the recommendations in Part 5: law
  enforcement SOPs should mandate an early, low-cost wordlist pass on any
  protected evidence container before requesting more resource-intensive
  brute-force or vendor-assistance avenues.

---

*Next: Part 5 — Legal-Ethical Report (4–6 page consolidated report).*
