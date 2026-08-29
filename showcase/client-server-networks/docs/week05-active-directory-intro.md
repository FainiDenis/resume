# Week 05 — Introducing Active Directory

**Objective:** install AD DS as the first domain controller in a new forest, explore Active Directory's container objects, then get a first look at Group Policy.

## Task I — Installing and configuring AD DS

**Activity 6-1 — Install AD DS and DNS on 410Server1**

![AD DS + DNS installed](../screenshots/week05/image1.png)

- After the roles install, the server needs a manual restart to complete promotion to a domain controller.
- Post-restart, the logon screen's domain changed to `410Server2012\Administrator` — visible confirmation the box is now a domain controller.
- **MMC** = Microsoft Management Console — the framework admins use to open, save, and arrange the various administrative snap-in tools Windows provides.

**Activity 6-2 — Domain/forest functional level & default groups**

![Functional level](../screenshots/week05/image2.png)

- Confirmed both the domain and forest functional levels report **Windows Server 2012 R2**.
- The default **Users** container lists **27** built-in group accounts.

![After deleting test accounts](../screenshots/week05/image3.png)

**Activity 6-3 — Simple file sharing & user properties**

![Simple file sharing](../screenshots/week05/image4.png)

- A built-in group's **Member Of** tab is empty and its Add/Remove buttons are disabled — built-in groups can't themselves be members of other groups.
- The **Operating System** tab on the domain controller's computer object reports **Windows Server 2012 R2 Datacenter, Version 6.3 (9600)**.

![New user details](../screenshots/week05/image5.png)

- Comparing the **Account** tab for the built-in **Administrator** vs. **Guest** users: Administrator has every account-restriction checkbox disabled by default, while Guest has three enabled out of the box — *User cannot change password*, *Password never expires*, and *Account is disabled*.

![Administrator vs. Guest account options](../screenshots/week05/image6.png)

**Activity 6-4 — Password policy enforcement**

- Creating a new user with a weak password fails with an error explaining the domain's password policy — minimum length, and a mix of uppercase, lowercase, numbers, and a special character (e.g. `@#!$`).

![Password policy error](../screenshots/week05/image7.png)

- Group membership after adding a test account: member shown is **Test User1**.

![Group membership](../screenshots/week05/image8.png)

**Activity 6-5 — `dsadd` from the command line**

![dsadd command](../screenshots/week05/image9.png)

Verified the new object (Test User 2) appears correctly inside its target OU (`TestOU1`).

![User appears in OU](../screenshots/week05/image10.png)

**Activities 6-6 / 6-8 — Find Now, and publishing a share in AD**

![Find Now results](../screenshots/week05/image11.png)
![PubShare found](../screenshots/week05/image12.png)
![Published share](../screenshots/week05/image13.png)

- Toggling **View → Users, Contacts, Groups, and Computers as containers** off changes what the right pane shows when clicking **Domain Controllers** on the left — it switches from showing that container's contents to showing the domain controller computer object itself.

![View toggle effect](../screenshots/week05/image14.png)

## Task II — Introducing Group Policy

**Activity 6-11 — Default Domain Policy**

![Editing Default Domain Policy](../screenshots/week05/image15.png)

- Editing the **Default Domain Policy** triggers a warning because it's *linked* — any change made here applies everywhere the GPO is linked, not just to the object you clicked from.

![Password policy settings](../screenshots/week05/image16.png)

Reviewing **Account Policies / Password Policy**:
- *Enforce password history: 24 remembered* — prevents users from cycling back to recently-used passwords.
- *Maximum password age: 42 days* — forces expiration on a schedule that roughly matches typical business cycles, limiting the exposure window if a password leaks.
- *Password must meet complexity requirements: Enabled* — requires the same length/character-mix rule seen earlier (600 minutes, for reference, is 10 hours).
- The **User Configuration** node shows no settings yet because nothing has been configured there.
- The Policies folder splits into three subfolders: **Software Settings**, **Windows Settings**, **Administrative Templates**.
- The three defined policies visible under **Local Policies**: **Audit Policy**, **User Rights Assignment**, **Security Options**.
- On a fresh domain, **Account Policies** has no explicit settings, but a number of **User Rights Assignments** are already defined — by default, most administrative actions are restricted to the Administrators, Backup Operators, and Server Operators groups.

**Activity 6-12 — Testing a Control Panel restriction policy**

- With **Enabled**, users covered by the policy lose access to Control Panel/PC Settings; **Disabled** restores access; **Not Configured** means the policy has no effect either way.
- Logging in as `testuser1` under the enabled restriction produced a sign-in error — the account is blocked from logging on locally to the server.

![Sign-in blocked](../screenshots/week05/image17.png)

- After adjusting the policy, `testuser1` was able to log on successfully.
- Opening Control Panel produced a restriction message; opening **Screen Resolution** produced the same restriction plus an `explorer.exe` error.
- Opening **Server Manager** prompted a User Account Control box asking for administrator credentials — `testuser1` doesn't have permission to change system configuration.
- `testuser1` was also unable to shut down the server (true) — another effect of the same restricted rights assignment.
- 
---
**Next Section**: [Week 06 — Managing OUs and Active Directory Accounts](week06-ch7-ous-and-ad-accounts.md)