# Containerization with Docker

**What we did: learned how containers work by running and managing Docker containers, building images, publishing to a shared repository, and — most importantly — locking them down with SELinux so a container can't reach the host.**

---

Containers aren't virtual machines, but the two share one idea: **abstraction**. In this project my classmates and I worked through how containers package an application with its libraries and binaries, so you can move and run it anywhere consistently.

## Running Containers
We installed Docker, pulled base images (Fedora, Ubuntu, busybox), and started containers in both **interactive** and **detached** modes — learning how a container is identified by an ID, how Docker can pull an image automatically when you run it, and how to list, stop, and remove containers.

## Building Images
Beyond using someone else's images, we built our own in two ways:

- **From a running container** — we started a container, installed a web server into it, then *committed* those changes into a new image, tagged it, and **pushed it to a private repository on Docker Hub** that our group shared. Finally we pulled it back down, proving the whole publish/reuse cycle.
- **From a Dockerfile** — we wrote a Dockerfile that declaratively defines how to build an image (which base image to start from, software to install, files to add, ports to expose, and the command to run). We used this to build an **Nginx web server** image serving our own simple page, ran it, and reached it through the browser. A Dockerfile makes image builds reproducible anywhere.

## Container Security with SELinux
The most valuable part was the security material. By default, a container running as a local user can be used to reach the host: we demonstrated this by mounting the host filesystem into a container and shutting the system down from inside it. The fix is **SELinux**.

- **Type enforcement** applies labels (`svirt_lxc_net_t` for container processes, `svirt_sandbox_file_t` for container files) so a container process can only touch its own files, not the host's.
- **Multi-category security (MCS)** goes further, giving each container a unique category label so containers are isolated from each other too.

We enabled SELinux support in the Docker daemon, ran a container as a dedicated non-root Docker user, and confirmed it could **no longer write to host directories** — the permission was denied. We also learned the general security hygiene: use official base images, run Docker as a dedicated non-root user, keep the host kernel patched, enforce SELinux, and collect logs for auditing.

---

**Key takeaway:** Containers are a powerful abstraction, but by default they don't sandbox a user. Combining a dedicated Docker user, official images, and SELinux type/multi-category enforcement is what keeps a container from becoming a doorway into the host.
