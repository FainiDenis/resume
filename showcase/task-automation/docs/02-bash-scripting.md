# Bash Scripting

**What I did: wrote structured Bash scripts with functions, command-line arguments, and file I/O to automate two very different admin tasks.**

Below are my own cleaned-up, demonstration versions of the two scripts I wrote. They're refactored for clarity and correctness — shown here to illustrate the technique, not to mirror any single graded submission.

## 1. Random Number Generator

The first script generates a requested batch of random numbers (optionally within a `min`–`max` range), writes each to a file, and reports the smallest, largest, and true average of the batch.

```bash
#!/bin/bash

# Generate num_rands random numbers, optionally within [min, max].
# Usage: ./rand_gen.sh <num_rands> [min] [max]

num_rands=$1
min=${2:-1}      # default to 1 if no range given
max=${3:-32767}  # default to the generator's natural max

num_writer () {
    echo "$1" >> "rands_${num_rands}.txt"
}

# collect the numbers
i=0
while (( i < num_rands )); do
    num_writer $(( RANDOM % (max - min + 1) + min ))
    ((i++))
done

# summarize the batch by sorting the output file
sort -n "rands_${num_rands}.txt" > .sorted.txt
smallest=$(head -n 1 .sorted.txt)
largest=$(tail -n 1 .sorted.txt)

# true average: sum the file, divide by the count
total=$(awk '{ s += $1 } END { print s }' "rands_${num_rands}.txt")
average=$(awk -v t="$total" -v n="$num_rands" 'BEGIN { printf "%.2f", t / n }')

echo "You requested $num_rands numbers [between $min and $max]"
echo "The smallest value generated was $smallest"
echo "The largest value generated was $largest"
echo "The average value generated was $average"

rm -f .sorted.txt
```

This script demonstrates **command-line arguments**, **a reusable function** (`num_writer`), **a loop** to control generation, **redirection** to write each number to a file, and using standard tools (`sort`, `awk`) to compute summary statistics.

## 2. HR New-Employee Provisioning

The second script automates the whole job of giving a new employee an account. Running with administrator privileges, it prompts for details and builds out the account, home directory, and a personalized welcome letter with the right ownership and permissions.

```bash
#!/bin/bash

# Automatically provision a new employee's Linux account.
# Requires sudo. Loops to add multiple users.

letter_writer () {
    cat > "/home/$username/welcome.txt" <<EOF
Dear $first_name,

Welcome to the company! We're happy to have you in the $dept Department as a $job_title.
Please don't forget to submit your paperwork on time.

Sincerely,
Your HR Team
EOF
    chown "$username:$username" "/home/$username/welcome.txt"
    chmod 444 "/home/$username/welcome.txt"      # read-only letter
}

file_system_writer () {
    mkdir -p "/home/$username"/{Desktop,Documents,Downloads,Pictures}
    cp company_logo.png "/home/$username/Pictures/"
    chown -R "$username:$username" "/home/$username"
}

while true; do
    read -p "Username: " username
    read -p "Full Name: " name
    read -p "Department: " dept
    read -p "Job Title: " job_title

    useradd "$username"                 # create the account
    first_name=$(echo "$name" | awk '{ print $1 }')

    file_system_writer
    letter_writer

    echo "User $username added!"
    read -p "Add another user? (y/n): " response
    [[ "$response" == "n" ]] && break
done
```

This demonstrates the three core concerns of good provisioning automation: a **function per responsibility** (`file_system_writer`, `letter_writer`), **heredoc** file generation for the welcome letter, and careful **ownership + permission** handling so the new user owns their files and the letter is write-protected.

---

**Key takeaway:** Bash is more than glue between commands. With functions, arguments, loops, heredocs, and file handling it can implement real business logic — like provisioning an employee — reliably and repeatably, without clicking through a GUI.
