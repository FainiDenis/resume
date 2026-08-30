# Python Data Processing

**What I did: wrote Python programs that process real datasets from the command line — computing statistics, and hunting for signs of tampering in system files.**

Below are my own cleaned-up, demonstration versions of the two programs I wrote, refactored for clarity.

## 1. Statistics on a Real Dataset

This program processes a tabular dataset — the classic Iris flower dataset, where each record has four numeric measurements and a flower type — and prints a clean statistical report.

```python
#!/usr/bin/python3
import sys


def read_data(file_name):
    """Return a list of records (rows) parsed from a CSV-style file."""
    records = []
    with open(file_name) as f:
        for line in f:
            line = line.strip()
            if line and line[0].isdigit():     # skip any non-data header lines
                records.append(line.split(","))
    return records


def process_numeric_field(records, field_num):
    """Return (min, max, average) for one 1-based numeric column."""
    values = [float(r[field_num - 1]) for r in records]
    return min(values), max(values), sum(values) / len(values)


def count_labels(records, label_col):
    """Count how many times each distinct label appears."""
    counts = {}
    for r in records:
        key = r[label_col]
        counts[key] = counts.get(key, 0) + 1
    return counts


def main():
    if len(sys.argv) != 2:
        print("Usage: iris_stats.py <datafile>")
        return

    data = read_data(sys.argv[1])
    field_names = ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"]

    for i, name in enumerate(field_names, start=1):
        lo, hi, avg = process_numeric_field(data, i)
        print(f"{name:<13}: min = {lo:>5}, max = {hi:>5}, average = {avg:.2f}")

    print("Labels:", count_labels(data, 4))


if __name__ == "__main__":
    main()
```

This demonstrates **reading raw data**, **breaking work into small single-purpose functions**, computing **min/max/average**, and reporting results in a readable format.

## 2. Integrity Checking for a Breach

After a suspected compromise, the worry is that system executables were swapped for malicious versions. This program compares **message digests** (hashes) recorded before the incident against the current ones, and flags anything that changed.

```python
#!/usr/bin/python3
import sys


def load_hashes(file_name):
    """Return {name: digest} from a "<digest> <name>" file."""
    result = {}
    with open(file_name) as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) >= 2:
                digest, name = parts[0], parts[1:]
                result[" ".join(name)] = digest
    return result


def main():
    if len(sys.argv) != 3:
        print("Usage: check_integrity.py <known_good_hashes> <current_hashes>")
        return

    known = load_hashes(sys.argv[1])
    current = load_hashes(sys.argv[2])

    print("Files whose hash changed (possibly compromised):")
    found = False
    for name, digest in current.items():
        if known.get(name) != digest:
            print(f"  {name:<30} known={known.get(name)}  current={digest}")
            found = True
    if not found:
        print("  (none — all hashes match)")


if __name__ == "__main__":
    main()
```

Because a digest is unique to a file's exact contents, any mismatch flags a real problem. This is a practical, scripted way to quickly **scope the damage after an incident**, comparing a known-good baseline against the current state of the filesystem.

---

**Key takeaway:** Python turns messy real-world data into answers — whether that's summarizing a dataset or catching files that have been tampered with. Small, focused functions keep the logic readable and reusable.
