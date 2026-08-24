#!/usr/bin/env python3
"""
Dictionary attack simulation against Exhibit B's password-protected archive.
Equivalent in purpose to `zip2john protected_evidence.zip > hash.txt`
followed by `john --wordlist=password.lst hash.txt`, implemented directly
in Python because this environment's minimal `john` package does not ship
the zip2john jumbo-patch helper. The bundled `tools/password.lst` stands in
for John the Ripper's default wordlist.
"""
import zipfile
import time
import os

ZIP_PATH = "protected_evidence.zip"
WORDLIST = os.path.join(os.path.dirname(__file__), "password.lst")


def attempt(pw, zf):
    try:
        zf.extractall(pwd=pw.encode("utf-8"), path="/tmp/cracked_check")
        return True
    except Exception:
        return False


def main():
    zf = zipfile.ZipFile(ZIP_PATH)
    start = time.time()
    tried = 0
    with open(WORDLIST, "r", encoding="latin-1") as f:
        for line in f:
            pw = line.rstrip("\n")
            tried += 1
            if attempt(pw, zf):
                elapsed = time.time() - start
                print(f"[+] PASSWORD FOUND: '{pw}'")
                print(f"[+] Attempts: {tried}")
                print(f"[+] Time elapsed: {elapsed:.3f}s")
                return
    print("[-] Password not found in wordlist.")


if __name__ == "__main__":
    main()
