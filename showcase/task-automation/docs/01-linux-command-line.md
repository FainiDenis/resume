# Linux Command-Line & Data Parsing

**What I did: sharpened my ability to compose single, powerful shell commands that inspect the system and transform real tabular data.**

---

The humble command line is where a huge amount of automation begins. Rather than clicking through a GUI, a system administrator composes a single command that does the whole job at once. This work had me solving problems with one-liners built from standard Unix text tools and filters.

## Inspecting the Filesystem with One-Liners
I wrote single commands to find specific categories of files — for example, listing all files in a core system directory (like `/usr/bin`) that matched certain naming patterns (`ip*`, `net*`, or ending in `grep`). I also worked with **permissions and access**:

- Listing all subdirectories that a standard (non-root) user **cannot access** — that is, directories where the user is denied permission.
- Redirecting command output to a log file so results were saved for later review.
- Using `cut` to clean up command output, keeping only the useful fields and stripping away formatting characters like colons.

## Parsing Real Data
The more interesting material involved turning raw data into answers. Working with the classic **TeddyBallgame** baseball statistics CSV, I used pipelines of text tools to:

- Strip the header line and replace the CSV delimiters with spaces for a cleaner layout.
- **Filter** the data to the seasons where the player had 100 or more runs batted in.
- **Sort and project** the seasons by home runs (most to least), keeping only the relevant columns (year, home runs, RBIs, batting average) — and re-sorting by RBIs as a follow-up.
- Combine **search + redirection** to save the list of configuration files containing an internal IP pattern to a file, properly discarding any error output.

---

**Key takeaway:** A single well-built shell pipeline can replace a whole series of manual steps. Mastering the standard text tools — `find`, `grep`, `awk`, `cut`, `sort`, and redirection — is the foundation of every larger automation script that came next.
