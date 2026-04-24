export interface Project {
  category: string;
  title: string;
  summary: string;
  tech: string[];
  highlights: string[];
  github?: string;
  live?: string;
  cmd: string;
  out: string;
}

export const CATEGORY_COLORS: Record<string, string> = {
  "embedded · iot":             "#22c55e",
  "security · systems":         "#ef4444",
  "systems · performance":      "#3b82f6",
  "robotics · control systems": "#f59e0b",
  "ai · web":                   "#8b5cf6",
};

export const CATEGORIES = ["all", ...Object.keys(CATEGORY_COLORS)];

export const STATS = [
  { target: 50, suffix: "K", label: "concurrent conns" },
  { target: 20, suffix: "K", label: "req/s sustained"  },
  { target: 35, suffix: "%", label: "p95 latency cut"  },
  { target: 85, suffix: "%", label: "attacks blocked"  },
];

export const projects: Project[] = [
  {
    category: "embedded · iot",
    title: "Embedded Environmental Monitoring Device",
    summary:
      "Wall-mounted, lithium battery-powered ESP32 with BME680 (temp/humidity/AQI) and MAX9814 (noise) deployed in an early childcare home — live data streamed to the Celsius mobile app via WiFi with 3D printed interactive accessories.",
    tech: ["C/C++", "ESP32", "I2C", "BME680", "MAX9814", "WiFi", "Lithium Battery", "3D Printing"],
    highlights: [
      "Designed and deployed a wall-mounted, lithium battery-powered ESP32 device integrating a BME680 and MAX9814 over I2C; deployed in an early childcare home to continuously monitor classroom environmental conditions.",
      "Streamed sensor data over WiFi with persistent logging to the Celsius mobile application, enabling caregivers to track real-time and historical environmental readings from any device.",
      "Built 3D printed enclosure accessories designed to engage young children, making the device interactive and approachable in an early childcare environment.",
    ],
    github: "https://github.com/benfarsi/environmental-reader",
    cmd: "./monitor --deploy",
    out: "BME680: 22°C 55%RH ✓",
  },
  {
    category: "security · systems",
    title: "Secure IoT Network Gateway",
    summary:
      "mTLS device authentication gateway with a signed provisioning workflow and multi-stage certificate validation pipeline on Linux. Reduced unauthorized connection attempts by 85% under adversarial simulation.",
    tech: ["Go", "Linux", "TLS/mTLS", "iptables", "SQLite", "Fail2ban", "SSH", "STRIDE", "OpenSSL"],
    highlights: [
      "Engineered mTLS device authentication gateway with signed provisioning workflow and multi-stage certificate validation pipeline on Linux; reduced unauthorized connection attempts by 85% under adversarial simulation.",
      "Hardened OS attack surface via iptables network isolation, SSH key-only access, and Fail2ban intrusion blocking; implemented structured audit logging across all auth events enabling full forensic replay of security incidents.",
      "Produced formal STRIDE threat model spanning 4 attack classes mapping protocol-level countermeasures to each threat vector with documented risk severity ratings.",
    ],
    github: "https://github.com/benfarsi/iot-auth-gateway-",
    cmd: "./gateway --mtls on",
    out: "blocked: 85% ✓",
  },
  {
    category: "systems · performance",
    title: "Layer-4 TCP Load Balancer",
    summary:
      "Epoll-based TCP proxy in Go sustaining 50,000 concurrent connections with round-robin and least-connections scheduling. Raw Linux epoll event loop, zero per-event allocations, N worker goroutines sharing one epoll fd.",
    tech: ["Go", "Linux", "epoll", "TCP", "syscall", "Round-Robin", "Least-Connections", "Non-blocking I/O"],
    highlights: [
      "Built a Layer-4 TCP load balancer in Go using raw Linux epoll syscalls — single shared epoll fd multiplexed across N IO worker goroutines, sustaining 50,000 concurrent connections under synthetic load.",
      "Implemented two lock-free scheduling algorithms: atomic round-robin and least-connections, selectable at runtime with zero mutex overhead.",
      "Achieved zero per-event heap allocations by giving each worker goroutine a dedicated scratch buffer, eliminating GC pressure at high connection counts and keeping p99 forwarding latency stable under load.",
    ],
    github: "https://github.com/benfarsi/tcp-lb",
    cmd: "./tcp-lb -algo leastconn",
    out: "50k conns ✓",
  },
  {
    category: "systems · performance",
    title: "High-Performance Concurrent Ingestion Engine",
    summary:
      "Concurrent ingestion service sustaining 20,000 req/s under synthetic load using worker pools and connection pooling, with p95 latency cut 35% via pprof profiling and backpressure handling.",
    tech: ["Go", "Rust", "PostgreSQL", "Linux", "Worker Pools", "Connection Pooling", "pprof", "Goroutines"],
    highlights: [
      "Built concurrent ingestion service sustaining 20,000 req/s under synthetic load using worker pools and connection pooling; benchmarked REST vs. message queue ingestion patterns under memory-constrained and high-throughput conditions.",
      "Reduced p95 latency by 35% through heap allocation optimization and goroutine scheduling refinements identified via pprof CPU/memory profiling.",
      "Designed backpressure handling and graceful degradation under partial downstream failures, ensuring service stability and zero data loss during simulated outage scenarios.",
    ],
    github: "https://github.com/benfarsi/ingestion-engine",
    cmd: "wrk -t12 -c400 :8080",
    out: "20k req/s  p95: 4ms ✓",
  },
  {
    category: "robotics · control systems",
    title: "Autonomous Robotics Control Platform",
    summary:
      "Closed-loop PID controller with sub-20ms real-time latency on embedded hardware, multi-sensor fusion via Kalman filtering, and benchmarked stability across disturbance conditions.",
    tech: ["C++", "PID Control", "Kalman Filter", "Embedded Linux", "I2C", "SPI", "RTOS"],
    highlights: [
      "Implemented a discrete PID controller in C++ running on embedded Linux, tuned via Ziegler-Nichols method and validated stability margins across operating conditions.",
      "Achieved sub-20ms control loop latency through real-time scheduling (SCHED_FIFO), DMA-driven sensor reads, and elimination of dynamic allocation in the control path.",
      "Fused IMU, encoder, and proximity sensor data using a Kalman filter, reducing state estimation noise by 60% compared to raw sensor averaging.",
    ],
    github: "https://github.com/benfarsi/robotics-control-platform",
    cmd: "./controller --pid --fifo",
    out: "loop: 18ms ✓",
  },
  {
    category: "ai · web",
    title: "Stade.AI",
    summary:
      "An adaptive study platform powered by AI that personalizes learning through spaced repetition and active recall. Built with Next.js and GPT-4o.",
    tech: ["Next.js", "TypeScript", "GPT-4o", "Spaced Repetition", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Built an AI-driven study platform that generates personalized flashcards and quiz questions from any uploaded content using GPT-4o.",
      "Implemented a spaced repetition scheduling algorithm (SM-2) that adapts review intervals based on individual recall performance.",
      "Designed an active recall engine presenting questions in varying formats to prevent pattern memorization.",
    ],
    github: "https://github.com/benfarsi/stade.ai",
    live: "https://stade-ai.com",
    cmd: "npm run dev",
    out: "stade.ai ready on :3000 ✓",
  },
];

export const socials = [
  { label: "github",    href: "https://github.com/benfarsi" },
  { label: "linkedin",  href: "https://linkedin.com/in/benfarsi" },
  { label: "instagram", href: "https://instagram.com/benfarsii" },
  { label: "email",     href: "mailto:farsijaniben@gmail.com" },
];
