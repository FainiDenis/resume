# User Lifecycle Automation

**What I did: automated creating and removing user accounts in bulk — the kind of task that's far too tedious and error-prone to do by hand.**

Below are my own cleaned-up, demonstration versions of the two programs I wrote, covering both halves of the user lifecycle.

## Bulk User Creation

This program reads employee records from a CSV (name, department, group, etc.) and creates a Linux account for each, with a consistent username, home directory, group membership, and correct permissions.

```python
#!/usr/bin/python3
import csv
import subprocess


def read_csv(filename):
    with open(filename) as f:
        return list(csv.DictReader(f))


def make_username(first, last):
    """Build a consistent username like 'jdohn' from first + last name."""
    if not first or not last:
        return None
    clean = "".join(ch for ch in last if ch.isalnum())
    return f"{first[0].lower()}{clean.lower()}"


def run(cmd):
    subprocess.run(["sudo", *cmd], check=True)


def provision(employee):
    first, last = employee["FirstName"], employee["LastName"]
    dept, group = employee["Department"], employee["Group"]
    username = make_username(first, last)

    if not username:
        print(f"  skipping {employee['EmployeeID']}: insufficient name data")
        return

    run(["groupadd", group])
    run(["useradd", "-g", group, "-d", f"/home/{dept}/{username}", username])
    run(["mkdir", "-p", f"/home/{dept}/{username}"])
    run(["chown", "-R", f"{username}:{group}", f"/home/{dept}/{username}"])
    print(f"  created {username} -> /home/{dept}/{username}")


def main():
    for emp in read_csv("employees.csv"):
        provision(emp)


if __name__ == "__main__":
    main()
```

One CSV can seed a whole department's worth of accounts in a single run — applying the same logic to every record consistently.

## Bulk Cleanup

The companion program does the reverse: it **removes user accounts, their groups, and leftover home directories**, by scanning the account databases for regular users (identified by UID range) and cleaning them all up.

```python
#!/usr/bin/python3
import os
import subprocess


def regular_users():
    """Yield usernames whose UID falls in the regular-user range."""
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.split(":")
            uid = int(parts[2])
            if 1000 <= uid < 2000:          # regular, non-system users
                yield parts[0]


def main():
    for user in regular_users():
        print(f"removing {user}")
        subprocess.run(["userdel", "-r", "-f", user])

    with open("/etc/group") as f:
        for line in f:
            parts = line.split(":")
            gid = int(parts[2])
            if 1000 <= gid < 2000:
                subprocess.run(["groupdel", "-f", parts[0]])

    # reset any leftover user directories back to a clean baseline
    for entry in os.listdir("/home"):
        p = f"/home/{entry}"
        if os.path.isdir(p):
            print(f"removing leftover dir {p}")
            os.system(f"rm -rf {p}")


if __name__ == "__main__":
    main()
```

This makes it trivial to **reset a lab environment back to a clean baseline** — exactly what you need when the same test machines get reused.

---

**Key takeaway:** The user lifecycle — create, manage, and remove — is a perfect candidate for automation because it's repetitive, identical across many records, and unforgiving of manual mistakes. Scripting both directions turns a chore into a single command.
