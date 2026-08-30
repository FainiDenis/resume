# System Monitoring & Visualization

**What I did: wrote a Python program that turns captured performance metrics into easy-to-read graphs.**

Raw numbers in a CSV can be hard to act on. Below is my cleaned-up, demonstration version of the program I wrote — it reads metrics captured from processes and from the host system, then plots them as graphs (using matplotlib).

```python
#!/usr/bin/python3
import csv
import matplotlib.pyplot as plt


def read_csv(filename, keys):
    """Read a numeric CSV (with header) into {key: [values...]}."""
    data = {k: [] for k in keys}
    with open(filename) as f:
        reader = csv.reader(f)
        next(reader, None)               # skip header
        for row in reader:
            for key, cell in zip(keys, row):
                data[key].append(float(cell))
    return data


def plot_series(data, time_key, metric_keys, title, ylabel, output):
    plt.figure(figsize=(9, 6))
    for key in metric_keys:
        plt.plot(data[time_key], data[key], label=key)
    plt.title(title)
    plt.xlabel("Time (seconds)")
    plt.ylabel(ylabel)
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(output)
    plt.show()


def main():
    # process-level metrics: one CSV per process, columns: time, CPU, memory
    process_files = {f"APM{i}": f"APM{i}_metrics.csv" for i in range(1, 7)}
    process_data = {name: read_csv(f, ["Time", "CPU", "Memory"])
                    for name, f in process_files.items()}

    # overlay all processes on one CPU graph and one memory graph
    for metric, title, out in [("CPU", "CPU Utilization Over Time", "cpu.png"),
                               ("Memory", "Memory Utilization Over Time", "memory.png")]:
        plt.figure(figsize=(9, 6))
        for name, d in process_data.items():
            plt.plot(d["Time"], d[metric], label=name)
        plt.title(title)
        plt.xlabel("Time (seconds)")
        plt.ylabel(f"{metric} (%)")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(out)
        plt.show()

    # system-level metrics: columns: time, RX, TX, disk_writes, disk_capacity
    sys = read_csv("system_metrics.csv", ["Time", "RX", "TX", "Writes", "Capacity"])
    plot_series(sys, "Time", ["RX", "TX"], "Network Bandwidth", "MB/s", "bandwidth.png")
    plot_series(sys, "Time", ["Writes", "Capacity"], "Disk Utilization", "%", "disk_util.png")


if __name__ == "__main__":
    main()
```

What this demonstrates:

- **Reading structured CSV data**, skipping headers and keeping multiple time series organized in dictionaries.
- **Overlaying multiple processes** on a single CPU or memory graph so you can compare them side by side.
- **Plotting system-level trends** — inbound/outbound network bandwidth and disk behavior over time — turning a wall of numbers into graphs anyone on the team can interpret at a glance.

---

**Key takeaway:** Monitoring data is only useful if you can read it. Automating the conversion of CSV metrics into graphs is the same idea behind the dashboards used in production monitoring systems.
