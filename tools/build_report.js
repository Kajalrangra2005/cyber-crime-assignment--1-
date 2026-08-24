const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, PageNumber, TabStopType, TabStopPosition
} = require("docx");

const PAGE_WIDTH = 12240; // Letter width DXA
const PAGE_HEIGHT = 15840;

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } });
}
function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 160 },
  });
}
function bullet(text) {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}

function simpleTable(headerRow, rows, widths) {
  const totalWidth = 9360; // content width approx
  const colWidths = widths || headerRow.map(() => Math.floor(totalWidth / headerRow.length));
  const mkRow = (cells, isHeader) => new TableRow({
    children: cells.map((c, i) => new TableCell({
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: isHeader ? { type: ShadingType.CLEAR, fill: "D9E2F3" } : undefined,
      children: [new Paragraph({
        children: [new TextRun({ text: String(c), bold: isHeader, size: 20 })],
      })],
    })),
  });
  return new Table({
    columnWidths: colWidths,
    width: { size: totalWidth, type: WidthType.DXA },
    rows: [mkRow(headerRow, true), ...rows.map(r => mkRow(r, false))],
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: 1080, bottom: 1080, left: 1260, right: 1260 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Operation Ghost Card — Case OGC-2026-031", size: 16, color: "666666" })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Page ", size: 18 }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18 }),
              new TextRun({ text: " of ", size: 18 }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18 }),
            ],
          })],
        }),
      },
      children: [
        // Title page
        new Paragraph({ text: "", spacing: { after: 800 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Operation Ghost Card", bold: true, size: 56 })],
          spacing: { after: 200 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Investigating a Metro-Area ATM & Digital-Wallet Fraud Ring", italics: true, size: 28 })],
          spacing: { after: 400 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Legal-Technical Report", bold: true, size: 32 })],
          spacing: { after: 600 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Assignment 1 — Unit 1: Foundations of Digital Forensics", size: 22 })],
          spacing: { after: 800 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Case No. OGC-2026-031", size: 22 })],
          spacing: { after: 1000 },
        }),
        simpleTable(
          ["Field", "Detail"],
          [
            ["Name", "Kajal"],
            ["Roll No. / Student ID", "2301350024"],
            ["Course", "B.Tech CSE (FSD)"],
            ["Date", "24-08-2026"],
          ],
          [3120, 6240]
        ),
        new Paragraph({ children: [new (require("docx").PageBreak)()] }),

        // 1. Executive Summary
        h1("1. Executive Summary of Crimes & Digital Footprint"),
        p("Between March and June 2026, the Cyber Crime Cell (Mumbai Metropolitan Region) investigated a two-person cell running a coordinated ATM skimming and digital-wallet phishing operation, designated Case OGC-2026-031, \u201COperation Ghost Card.\u201D The operation combined a physical skimming overlay fitted to ATMs across four bank branches with a sideloaded Android application (\u201CPayBoost Cashback\u201D) that impersonated a legitimate cashback/rewards wallet to harvest OTPs and card details from a separate pool of victims."),
        p("Two exhibits were seized under panchnama: Exhibit A, the physical skimmer unit (card-slot overlay, pinhole camera, Bluetooth data module, onboard flash storage), and Exhibit B, the suspect's Android phone, which contained the fraud application, chat logs with a cash-out \u201Crunner,\u201D saved GPS coordinates of target ATMs, and a password-protected archive later found to contain money-laundering notes."),
        p("The digital footprint reconstructed from these exhibits spans the full crime lifecycle: (a) unauthorised data capture at the ATM, (b) credential harvesting via a malicious app distributed through a WhatsApp phishing link, (c) card cloning using captured track data, (d) domestic and cross-border cash-out through a runner network, and (e) layering of proceeds through mule bank accounts opened on forged KYC, with partial conversion to cryptocurrency. A full classification of these acts against the IT Act 2000, IPC 1860, and the Budapest Convention (used comparatively, since India is not a party) is provided in the accompanying docs/01-cybercrime-taxonomy.md and summarised in Section 2 below."),

        h2("1.1 Crime Classification Summary"),
        simpleTable(
          ["Stage", "Crime Category", "Primary Legal Basis"],
          [
            ["Skimming", "ATM Skimming (Data Interception)", "IT Act 43/66; Budapest Art. 3"],
            ["App harvesting", "Phishing / Smishing + Unauthorised Access", "IT Act 43/66D; Budapest Art. 2"],
            ["Cloning", "Card Cloning (Forgery)", "IPC 465/468/471; Budapest Art. 7"],
            ["Cash-out", "Financial Fraud / Identity Theft", "IPC 379/420; IT Act 66C; Budapest Art. 8"],
            ["Network", "Organised/Transnational Crime", "IPC 120B/34; Budapest Art. 25 (analytical only)"],
            ["Laundering", "Money Laundering", "PMLA 2002 (supplementary); IPC 468"],
          ],
          [2400, 3600, 3360]
        ),
        new Paragraph({ text: "", spacing: { after: 200 } }),

        // 2. Evidence handling justification
        h1("2. Evidence Handling Justification"),
        p("Evidence handling in this simulation followed the standard digital-forensics principle that the original media must never be directly analysed \u2014 only verified working copies. This section justifies each control applied and cross-references the full procedure in docs/02-evidence-collection.md."),

        h2("2.1 Isolation and Write-Blocking"),
        p("Exhibit A was powered down immediately and placed in a static-shielded bag to prevent both physical damage and any possibility of a remote or scheduled data-wipe command reaching the device. Exhibit B was placed in airplane mode and then a Faraday bag \u2014 a standard mobile-forensics control that severs the device from cellular and Wi-Fi networks, preventing remote wipe, in-flight encryption re-lock, or evidence tampering via a cloud-connected \u201Cfind my device\u201D style command before acquisition could occur."),
        p("Imaging of Exhibit A's onboard flash was performed exclusively through a hardware write-blocker, meaning the acquisition process is physically incapable of writing to the source medium. This is the single most important control for admissibility: it lets the investigator later prove, independent of testimony, that the original evidence could not have been altered during imaging."),

        h2("2.2 Hashing as the Backbone of Integrity"),
        p("A SHA-256 hash was computed for every acquired file at the moment of acquisition (16 files total, exceeding the assignment's minimum of 5 \u2014 see evidence/hashes/sha256_hashlog.txt). This hash is not a one-time formality: it is re-verified at every subsequent transfer \u2014 custodian to analyst, analyst to workstation, and again before report writing \u2014 with any mismatch treated as a signal that the copy is no longer forensically sound. This report's own CI workflow (.github/workflows/validate-structure.yml) automates that same re-verification on every push, so hash drift is caught immediately rather than discovered only at trial."),
        p("The password-protected archive on Exhibit B was deliberately hashed while still locked, before any cracking attempt (Section 4). This ordering matters: it lets the defence or a court verify that the pre-crack state of the evidence is provably unchanged, regardless of what the password recovery process later reveals inside the archive."),

        h2("2.3 Chain of Custody"),
        p("Every seizure, transfer, and access event for both exhibits is logged on a signed, timestamped chain-of-custody form (docs/02-evidence-collection.md \u00A72.3), with no gaps in custody between the scene, the lab custodian, and the assigned forensic analyst. This continuous record is what allows the acquired data to be presented as \u201Cthe same data seized from the accused\u201D rather than merely \u201Cdata that resembles what was seized.\u201D"),

        // 3. Cross-border challenges
        h1("3. Challenges in Cross-Border Investigation and Cooperation"),
        p("Operation Ghost Card's cash-out stage routed cloned cards through a runner network operating outside India, and part of the laundered proceeds were converted to cryptocurrency \u2014 both of which raise investigative challenges that a purely domestic case would not face."),

        h2("3.1 India's Non-Membership of the Budapest Convention"),
        p("The Budapest Convention on Cybercrime (2001) provides a framework for exactly this kind of cross-border evidence request, but India has not signed or ratified it, largely over concerns about not having been involved in drafting it and about the data-sharing obligations it would impose. This means the Convention's mutual-assistance articles (25/27) cannot be directly invoked here; they are used in docs/01-cybercrime-taxonomy.md only as a comparative framework to show that India's domestic law substantively covers the same conduct."),

        h2("3.2 Reliance on Bilateral MLATs"),
        p("In the absence of Budapest Convention membership, cross-border requests \u2014 for example, to identify the runner network's foreign contacts or to trace cash-out ATM transactions abroad \u2014 must proceed through bilateral Mutual Legal Assistance Treaties (MLATs) or informal law-enforcement liaison channels. These processes are typically slower than Budapest Convention's expedited preservation-request mechanism, creating a window in which foreign-held evidence (e.g. logs at a cash-out ATM operator, or a foreign messaging platform's records) may be deleted under routine retention policies before a formal request is even transmitted."),

        h2("3.3 Cryptocurrency Tracing"),
        p("The partial conversion of proceeds to cryptocurrency introduces a further jurisdictional complication: even once a wallet address is identified, attributing it to a real-world identity typically requires cooperation from an exchange that may be incorporated in a third country with its own disclosure rules, adding another layer of cross-border legal process on top of the underlying MLAT request for the fraud itself."),

        h2("3.4 Evidentiary Consistency Across Jurisdictions"),
        p("Even where cooperation is obtained, evidence gathered abroad may follow different chain-of-custody or hashing conventions than those used domestically (Section 2), raising admissibility questions about whether foreign-acquired evidence meets the same integrity bar as the exhibits seized directly by the Cyber Crime Cell. Aligning on a common hash-verification standard (e.g. SHA-256, as used throughout this case) before a request is sent can reduce \u2014 though not eliminate \u2014 this friction."),

        // 4. Recommendations
        h1("4. Recommendations for Law Enforcement SOP Improvements"),
        p("The following recommendations are drawn directly from the friction points observed while simulating this investigation."),
        bullet("Standardise an early, low-cost dictionary-attack pass (Section \u00A74.4 of docs/04-cryptography-component.md) on any password-protected evidence container before escalating to resource-intensive brute-force or vendor-assistance requests \u2014 weak/reused passwords are common enough that this should be a mandatory first step, not an afterthought."),
        bullet("Formalise a standing MLAT \u201Cfast-track\u201D template for ATM-fraud/cash-out cases specifically, pre-populated with the categories of evidence typically needed (transaction logs, CCTV, account-opening KYC), to reduce the drafting delay that currently costs valuable time before a foreign preservation request is even sent."),
        bullet("Mandate SHA-256 (or stronger) hashing at the point of acquisition for all digital evidence, domestic or received via MLAT, with the hash recorded on the custody form at first contact \u2014 this creates a common integrity baseline across jurisdictions and simplifies later cross-border evidentiary comparison."),
        bullet("Build cryptocurrency-tracing literacy and exchange-liaison contacts into the cyber cell's standard toolkit, rather than treating each crypto-laundering lead as a one-off specialist referral, given how often proceeds from ATM/CNP fraud are now partially laundered through crypto."),
        bullet("Automate evidence-integrity re-verification (as demonstrated by this case's GitHub Actions workflow) at every custody transfer point, not just at acquisition, so hash drift is caught immediately rather than discovered only when the evidence is challenged at trial."),
        bullet("Periodically revisit India's position on the Budapest Convention or an equivalent regional fast-track cooperation mechanism, given how consistently cross-border cash-out networks appear in ATM fraud casework of this kind."),

        new Paragraph({ text: "", spacing: { before: 300 } }),
        h1("5. Conclusion"),
        p("Operation Ghost Card demonstrates that the technical sophistication of a fraud scheme is often outpaced by the mundane weaknesses that expose it \u2014 a reused weak password, a Bluetooth MAC address that links two exhibits, a shared-location message that ties a chat log to a GPS point. A disciplined evidence-handling process \u2014 isolation, write-blocking, hashing, and an unbroken chain of custody \u2014 converts these small technical artefacts into a legally defensible case, while the cross-border dimension of the runner network and crypto laundering illustrates why domestic forensic rigour alone is not sufficient without corresponding improvements in cross-border cooperation infrastructure."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/home/claude/work/repo/operation-ghost-card/report/Operation-Ghost-Card-Legal-Technical-Report.docx", buffer);
  console.log("Report written.");
});
