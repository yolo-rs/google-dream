// SPDX-License-Identifier: Apache-2.0
// Google Official Repositories Read-Only Catalog, Upstream Watcher & Quizzes Generator

export interface GoogleOfficialRepo {
  name: string;
  url: string;
  localPath: string;
  category: "browser" | "os" | "compiler" | "cloud" | "ai";
  description: string;
}

export const GOOGLE_OFFICIAL_REPOS: GoogleOfficialRepo[] = [
  {
    name: "gvisor",
    url: "https://github.com/google/gvisor.git",
    localPath: "C:/src/google/gvisor",
    category: "os",
    description: "Container runtime sandbox with system call virtualization in Go."
  },
  {
    name: "abseil-cpp",
    url: "https://github.com/abseil/abseil-cpp.git",
    localPath: "C:/src/google/abseil-cpp",
    category: "compiler",
    description: "C++ common libraries code designed to augment the C++ standard library."
  },
  {
    name: "googletest",
    url: "https://github.com/google/googletest.git",
    localPath: "C:/src/google/googletest",
    category: "compiler",
    description: "Google Testing and Mocking Framework."
  },
  {
    name: "flatbuffers",
    url: "https://github.com/google/flatbuffers.git",
    localPath: "C:/src/google/flatbuffers",
    category: "compiler",
    description: "Memory-efficient cross-platform serialization library."
  },
  {
    name: "jax",
    url: "https://github.com/google/jax.git",
    localPath: "C:/src/google/jax",
    category: "ai",
    description: "Composable transformations of Python+NumPy programs: differentiate, vectorize, JIT to GPU/TPU."
  }
];

export interface TechnicalQuiz {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const GOOGLE_CLOUD_QUIZZES: TechnicalQuiz[] = [
  {
    id: "gcp-q1",
    domain: "Cloud Spanner & TrueTime",
    question: "Why does Cloud Spanner require atomic clocks and GPS receivers in each data center?",
    options: [
      "To measure network packet round-trip time with microsecond accuracy",
      "To bound clock uncertainty (epsilon) and guarantee strict external consistency (serializability)",
      "To synchronize CPU cycles across distributed TPU pods",
      "To prevent DDoS attacks by timestamping ingress HTTP headers"
    ],
    correctIndex: 1,
    explanation: "TrueTime API provides bounded uncertainty [now - eps, now + eps]. By waiting out 2*eps before committing, Spanner guarantees linearizability without central locks."
  },
  {
    id: "gcp-q2",
    domain: "gVisor Security Architecture",
    question: "How does gVisor protect the host Linux kernel from untrusted container payloads?",
    options: [
      "By running every container in a dedicated KVM hypervisor micro-VM",
      "By translating container syscalls to eBPF bytecode programs",
      "By intercepting syscalls in user space through the Sentry and running filesystem operations in a sandboxed Gofer",
      "By statically analyzing binaries before container boot"
    ],
    correctIndex: 2,
    explanation: "gVisor's Sentry acts as an application kernel in user space written in Go, implementing over 300 Linux syscalls without ever delegating raw privileged syscalls to the host kernel."
  }
];
