# Orchestration with Kubernetes

**What we did: built a multi-node Kubernetes cluster from scratch — a control node plus worker nodes — and got Pods talking across them over a cluster network.**

---

Running containers is one thing; running dozens of them across many machines, keeping them healthy, and scaling them is why **orchestration** exists. For this project my classmates and I built a real Kubernetes cluster on-premise using `kubeadm`.

## Cluster Design
We deployed multiple Linux virtual machines and split them into roles:

- **One control node** (with more CPU) that runs the Kubernetes control plane.
- **Worker nodes** — one per team member — that actually run the workloads.

Before the cluster would even initialize, we had to meet Kubernetes' strict host prerequisites: swap had to be **disabled** on every node (the installer refuses to work otherwise), and we installed the container runtime as well as the Kubernetes tooling on each one.

## Initializing the Cluster
On the control node we ran the initialization command, which produced a **join token** — the secret that lets worker nodes authenticate into the cluster. We saved it carefully, set up the control-node configuration for a normal (non-root) user, and confirmed the **control plane was running**. The workers were then joined to the cluster using that token.

## Networking the Pods
A fresh cluster has no pod networking, so nodes can't yet route traffic between Pods. Kubernetes uses the **CNI (Container Network Interface)**, which works with add-ons to implement networking between nodes. We installed the **Weave** network add-on, then verified the add-on's Pods were running and that the nodes flipped to a `Ready` status — the signal that Pods could finally communicate with each other across the cluster.

---

**Key takeaway:** Kubernetes turns a fleet of individual machines into one logical compute environment. The hard parts aren't just installing it — it's meeting host prerequisites (like disabling swap), managing the join token securely, and wiring up a CNI network so the Pods can actually talk to each other.
