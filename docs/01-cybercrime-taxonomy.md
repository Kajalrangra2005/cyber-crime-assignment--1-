# Operation Ghost Card
## Part 1 — Cybercrime Classification & Modelling

---

## 1.1 Case Scenario (Working Narrative)

> This narrative is a constructed fictional scenario, created to give the
> rest of the assignment (evidence simulation, artefact analysis,
> cryptography, legal report) a single consistent case to work from.

**Case ID:** OGC-2026-031 "Operation Ghost Card"
**Jurisdiction:** Primary — Mumbai Metropolitan Region, Maharashtra, India.
Secondary — Gulf region (cash-out runner network), Eastern Europe
(stolen card-data resale channel).

Between March and June 2026, the Cyber Crime Cell of the Mumbai Police
received a cluster of complaints from four private-sector banks reporting
fraudulent ATM withdrawals and card-not-present (CNP) transactions
affecting over 250 customers. Investigation traced the pattern to a
two-person cell operating out of the western suburbs:

1. **Skimming stage** — A covert skimming overlay (disguised as a brochure
   holder above the ATM keypad, hiding a pinhole camera, with a fake
   card-slot bezel beneath) was fitted to ATMs across four bank branches.
   The device captured magnetic-stripe track data and PIN entry via the
   hidden camera. Captured data was periodically offloaded via Bluetooth
   to a paired Android phone.
2. **App stage** — The same phone ran a sideloaded application disguised
   as a cashback/rewards wallet ("PayBoost Cashback"). The app requested
   SMS-read and accessibility permissions and was used to harvest OTPs and
   card details from a separate set of victims who installed it after
   receiving a WhatsApp link (a form of "smishing"/social-media phishing).
3. **Cloning & cash-out stage** — Captured track data was encoded onto
   blank magnetic-stripe cards using a handheld MSR encoder. Cloned cards
   were used for domestic ATM withdrawals and handed to a runner network
   for cash-out abroad, indicating cross-border organised involvement.
4. **Laundering stage** — CNP purchase proceeds and cash-out funds were
   routed through a small number of mule bank accounts opened with forged
   KYC documents, then partly converted to cryptocurrency.

Two devices were seized under panchnama during a raid on the suspects'
rented flat:

- **Exhibit A** — ATM skimmer unit (card-slot overlay, micro-camera, BT
  data module, onboard flash storage).
- **Exhibit B** — Suspect's Android phone (fraud app, chat logs with a
  runner, saved GPS coordinates of target ATMs, image gallery).

---

## 1.2 Identification & Classification of Crimes

| # | Observed Act | Crime Category | Description |
|---|---|---|---|
| 1 | Covert skimmer installed on ATM | **ATM Skimming (Data Interception)** | Unauthorised interception of card track data and PIN at the point of capture. |
| 2 | Encoding stolen data onto blank cards | **Credit/Debit Card Cloning (Forgery)** | Creation of a counterfeit payment instrument from stolen data. |
| 3 | Sideloaded fake "cashback wallet" app harvesting OTP/SMS | **Phishing / Smishing + Unauthorised Access** | Social-engineering delivery of malicious app to gain unauthorised access to victims' financial credentials. |
| 4 | Use of cloned cards to withdraw cash / make purchases | **Identity Theft & Financial Fraud** | Fraudulent use of another person's financial identity for gain. |
| 5 | Cross-border runner cash-out network | **Organised/Transnational Cybercrime** | Coordinated cross-jurisdiction offending, raising mutual-legal-assistance issues. |
| 6 | Mule accounts opened on forged KYC, partial crypto conversion | **Money Laundering** | Layering and integration of criminal proceeds through the banking system and crypto assets. |

---

## 1.3 Mapping to Legal Frameworks

### A. Information Technology Act, 2000 (India, as amended 2008)

| Section | Provision | Applicability to this case |
|---|---|---|
| **Sec. 43** | Penalty for unauthorised access, downloading, extraction of data from a computer/computer system without permission | Covers the unauthorised capture of card-track data by the skimmer and the app's unauthorised read of SMS/OTP data. |
| **Sec. 43A** | Compensation for failure of a body corporate to protect sensitive personal data | Relevant if a bank/merchant's negligent security practices contributed to data exposure. |
| **Sec. 66** | Computer-related offences — Sec. 43 acts done dishonestly or fraudulently | Applies once the Sec. 43 acts (data capture) are shown to be done fraudulently, i.e. the core skimming + app-harvesting conduct. |
| **Sec. 66C** | Identity theft — fraudulent/dishonest use of another person's electronic signature, password, or unique identification feature | Directly covers use of stolen card numbers/PINs/OTPs to impersonate the cardholder. |
| **Sec. 66D** | Cheating by personation using a computer resource | Covers the fake cashback-wallet app posing as a legitimate service to deceive victims. |
| **Sec. 72** | Breach of confidentiality and privacy by a person who has secured access to data under the Act | Applicable to onward disclosure/sale of harvested card data to the cash-out network. |

### B. Indian Penal Code, 1860

| Section | Provision | Applicability |
|---|---|---|
| **Sec. 379** | Theft | Underlying theft of cardholder funds. |
| **Sec. 420** | Cheating and dishonestly inducing delivery of property | Covers fraudulent ATM withdrawals/CNP purchases obtained by deception. |
| **Sec. 465 / 468** | Forgery / Forgery for the purpose of cheating | Cloned magnetic-stripe cards and forged KYC documents used to open mule accounts. |
| **Sec. 471** | Using a forged document as genuine | Presenting cloned cards at ATMs/POS terminals. |
| **Sec. 120B** | Criminal conspiracy | Coordinated multi-actor scheme (skimming, encoding, running, mule accounts). |
| **Sec. 34** | Acts done by several persons in furtherance of common intention | Joint liability of the two-person cell and runner network. |

*(Note: The Prevention of Money Laundering Act, 2002 (PMLA) would also apply
to the mule-account/crypto-conversion stage; it is flagged here for
completeness though outside the assignment's named frameworks.)*

### C. Budapest Convention on Cybercrime (2001)

| Article | Provision | Applicability |
|---|---|---|
| **Art. 2** | Illegal access | Unauthorised access to card data via skimmer/app. |
| **Art. 3** | Illegal interception | Interception of card track data / OTP-SMS in transit. |
| **Art. 7** | Computer-related forgery | Creation of cloned cards from captured data. |
| **Art. 8** | Computer-related fraud | Fraudulent withdrawal/purchase causing loss to victims. |
| **Art. 25 / 27** | International cooperation, mutual legal assistance | Governs the cross-border request/response process needed to pursue the cash-out network abroad. |

> **Important caveat:** India has **not signed or ratified** the Budapest
> Convention (it was not involved in drafting it and has expressed concerns
> over foreign data-sharing obligations). It has, since 2018, periodically
> reconsidered its position but remains a non-party. The mapping above is
> therefore used as a **comparative/analytical framework** — showing that
> India's domestic law (IT Act + IPC) substantively covers the same conduct
> — rather than as a directly enforceable treaty basis for this
> investigation. Cross-border cooperation here would instead rely on
> bilateral Mutual Legal Assistance Treaties (MLATs) or informal
> law-enforcement channels.

---

## 1.4 Cybercrime Taxonomy (with Justification)

```
Operation Ghost Card – Crime Taxonomy
│
├── 1. Data-Capture Offences
│   ├── ATM Skimming (physical device)         → IT Act 43/66, Budapest Art. 3
│   └── Credential Phishing via malicious app   → IT Act 43/66D, Budapest Art. 2
│
├── 2. Instrument-Forgery Offences
│   └── Magnetic-stripe card cloning            → IPC 465/468/471, Budapest Art. 7
│
├── 3. Financial-Fraud Offences
│   ├── Fraudulent ATM cash withdrawal          → IPC 379/420, IT Act 66C, Budapest Art. 8
│   └── Card-not-present (CNP) online fraud     → IPC 420, IT Act 66C/66D, Budapest Art. 8
│
├── 4. Identity-Related Offences
│   └── Identity theft (use of stolen PII)      → IT Act 66C
│
├── 5. Organised/Transnational Offences
│   └── Cross-border cash-out runner network    → IPC 120B/34, Budapest Art. 25 (analytical only – India non-party)
│
└── 6. Proceeds-of-Crime Offences
    └── Money laundering via mule accounts/crypto → PMLA 2002 (supplementary), IPC 468 (forged KYC)
```

**Justification for structure:** The taxonomy is organised by *stage of the
crime lifecycle* (capture → forge → defraud → conceal identity → organise →
launder) rather than by device or actor, because this mirrors how a digital
forensics investigation actually proceeds — each stage leaves a distinct
category of digital evidence (skimmer firmware/storage, app permissions,
cloned-card encoder logs, transaction records, chat/GPS metadata, banking
KYC records) and maps cleanly onto a different legal provision. This
structure carries into Part 2 (evidence collection) and Part 3 (artefact
extraction), where each evidence item is tagged back to the taxonomy
category it supports.

---

*Next: Part 2 — Electronic Evidence Collection Simulation (chain of custody,
disk image/file set generation, SHA-256 hashing).*
