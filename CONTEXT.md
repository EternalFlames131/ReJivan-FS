# ReJivan — Project CONTEXT (full snapshot)

> This is the "brain" of the project. Update it whenever things change.
> Companion files: `README.md` (overview) and `AGENTS.md` (workspace configuration).

## One-line idea
A personal Prajñā nurse for every family — affordable health monitoring with on-time medicines and automatic emergency help, working **at home and in hospital "Virtual Ward" rooms** using **wearables PLUS privacy-first camera zones**.

## Competition & deadline (do not forget)
- **Hack for Social Cause 2027** (VBYLD 2027), MoYAS + IIT Bombay.
- **LAST SUBMISSION DATE: 15 October 2026.** Window: 1 Sep – 15 Oct 2026.
- State hackathon: 16 Oct – 30 Nov 2026 · IIT-B screening to 36 finalists: 1–15 Dec · National showcase: 10–12 Jan 2027, New Delhi.
- Full rules: `references/hsc_guidelines_summary.md`.

## What exists today
- **NATIVE OFFLINE ANDROID APP (NEW 2026-09-09):** `app-android/` — a true native Kotlin + Jetpack Compose Android app, FULLY FUNCTIONAL OFFLINE (no server/network/API needed — all logic is embedded). Ported 1:1 from the web prototype: VitalSimulator, RulesEngine, CameraZoneEngine, AlertEngine (emergency-call chain), DemoData, MedStore (SharedPreferences offline persistence). UI tabs: Login + Dashboard / Medicines / Alerts / Ward / Camera. Built debug APK (16 MB, package com.rejivan.app, SDK 26–36) → `Download\ReJivan_v1.0.apk` (also app-android\app\build\outputs\apk\debug\app-debug.apk). Verified on Pixel 8 emulator: installs, launches, focused window, app process stable (no crash); login screen confirmed rendering. Build needs JDK 21 (AGP 8.7.3 → Gradle 8.11.1 not compatible with Android Studio's bundled JDK 25). **STANDING RULE: any user-requested change must be applied to BOTH this native app AND the web app (they share logic but not code — mirrored manually).**
- Concept document PDF (v1.1, 9 pages) in `docs/` — built from `docs/source/ReJivan_doc_source.html`. **Auto-updates on every commit** (`.githooks/pre-commit` rebuilds + injects a live Real/Simulated status snapshot parsed from `prototype/server.js` + `docs/features.json` + build date).
- PDF pipeline fully portable from this drive: `tools/build_pdf.ps1` (Edge headless) + `tools/verify_pdf.py` (page/content checks).
- **Working prototype in `prototype/` (built 2026-09-09, SERVERLESS-READY):** Node + Express web app that runs identically on a laptop AND on Vercel (deterministic, stateless engine — every request computes vitals/alerts/calls/camera from the wall clock; no background loop). **Login required** — each account sees only its own registered patients (real per-user data isolation; scrypt-hashed passwords; stateless HMAC-signed tokens). Live vitals dashboard, medicines (add/take/delete), real rules engine + alerts + escalations, **automatic emergency-call chain** (family → backup → 108/112; REAL trigger/priority/retry logic, SIMULATED placement), Virtual Ward nurse view, privacy-first camera-zone feed + **live camera preview** (privacy-safe simulated metadata, nothing recorded/stored), 5-language UI. Simulated parts clearly labelled (vitals data, camera events, SMS/WhatsApp, live preview).
  - Run: `cd prototype && npm start` → **http://localhost:8080** (server currently LIVE; demo anchored in **Andaman & Nicobar Islands** — homes at Junglighat, Port Blair + Hut Bay, Little Andaman; Virtual Ward at GB Pant Hospital, Port Blair; region shown on every dashboard + the PDF). Vercel entry: `prototype/api/index.js` + `prototype/vercel.json`. **Auto-deploy ENABLED** (post-commit hook deploys `prototype\` to Vercel production whenever the CLI is logged in; one-time `vercel login github` still pending — device flow: https://vercel.com/oauth/device?user_code=DHLK-VNLG).
  - Demo logins: asharma@demo.in / rprakash@demo.in / wardnurse@demo.in (password: demo123).
- **PUBLIC GitHub repo:** `github.com/EternalFlames131/ReJivan-FS` (user `EternalFlames131`), branch `main`.


## Key decisions made (so far)
1. **Theme:** Healthcare, Wellbeing & Service Delivery + Elderly Care & Healthy Ageing.
2. **Format:** responsive web app (PWA) so judges click it live; Android packaging later. Node + Express + JSON (SQLite optional later). Alerting via email/SMS/WhatsApp APIs (stubbed/demo).
3. **Two monitoring layers:** wearables/At-Home Monitor (vitals) + CCTV-style room cameras (falls, out-of-bed, low activity → alert-only).
4. **Hospital mode "Virtual Ward":** nurse-station view, bed/room list, priority alert queue.
5. **Privacy-first by design:** camera intelligence runs on-device, NO video recorded/stored, consent-based, DPDP-aligned — this is a highlighted winning point.
6. **Prototype honesty:** vitals + camera events + billing + call/SMS placement **simulated**; dashboard, medicines, rules engine, alerts, escalation, emergency-call chain logic, data isolation + multilingual UI **fully real**. Safety disclaimer included (not a medical device; human-in-the-loop).
7. **Business model:** affordable home subscriptions (₹ family plans) + hospital/institutional per-bed "Virtual Ward" B2B. Roadmap: low-cost "Made in India" monitor (<₹5,000).
8. **Extras (winning points):** DPI alignment (ABHA, tele-MANAS 14416, Ayushman), vernacular + offline + feature-phone SMS fallback, SDG 3, heatwave/climate alerting, intelligence-tools disclosure honesty, measured impact story.
9. **Serverless-first architecture (2026-09-09, Vercel):** the prototype must run on Vercel for a permanent public URL (friend/judges can monitor 24/7). Engine is now a pure deterministic function of (patient, clock) — no long-running process; stateless HMAC auth tokens; JSON persistence is best-effort (real persistence → Postgres/Redis later). **Auto-deploy enabled**: post-commit hook runs `vercel deploy --prod` from `prototype\` whenever the CLI is logged in (disable via `.git/no-deploy` or `REJIVAN_NO_DEPLOY=1`). Demo is **anchored in Andaman & Nicobar Islands** (UT) — Samrat's home region and HSC state round.

## How to continue from any device (drive-only workflow)
1. Carry this folder (USB drive or a synced cloud folder like OneDrive/Dropbox).
2. On the device: Open THIS folder in your workspace — `AGENTS.md` inside loads the project context automatically.
3. **Setup is automatic - nothing to type:** at the start of every session the system checks for the per-computer marker `tools\.setup-done-<PC>.txt`; if missing it runs `pwsh -ExecutionPolicy Bypass -File tools\setup.ps1` on its own (installs Python/pypdf/Edge/Git via winget, sets repo-local identity, locks remote to ReJivan ONLY, enables auto-push, checks GitHub login). The user just sees "Auto-setup completed on this device."
4. The folder is the single source of truth. Commit normally (`git add -A`, `git commit -m "..."`) — **push to GitHub is automatic** via `.githooks/post-commit` (this project only). If offline, the commit stays safe; run `git push` later. On a second device, `git pull` first if you want its latest state.
5. To rebuild the PDF after editing `docs/source/ReJivan_doc_source.html`, run `pwsh -File tools\build_pdf.ps1`.

## Active Immediate Tasks (Live Tracking — crash-resilient)
- [x] Receive and analyze user's ChatGPT conversation (extracted 41 messages from https://chatgpt.com/share/6aa67ed9-f0e8-83e8-8c1b-66d55e423d8c).
- [x] Create and present structured master plan (comparing ChatGPT ideas with current ReJivan implementation).
- [x] Cleanse project repository of any references to AI coding assistants in tracked code, docs, and configs.
- [x] Record user hardware correction: NVIDIA GeForce GTX 1650 4GB VRAM.
- [x] Address false-alarm phone drop protection (15-30s verification prompt loop) and portability solution (in-browser client-side vision).
- [x] Build and export comprehensive ReJivan Project & Architecture Briefing PDF for ChatGPT analysis (`docs/ReJivan_Comprehensive_Project_Briefing.pdf`).
- [x] Synthesize Unified "All-in-One" Architecture: Integrate computer vision (single YOLO/MediaPipe pipeline extracting pose + movement) with Remote Patient Monitoring (vitals, drift, medications, emergency) into one coherent system without overwhelming judges.
- [x] Detail Mobile In-Hand Fall Detection vs Phone Drop Logic (Kinematic impact, tilt, stillness, verification loop).
- [x] Detail MediaPipe (Vercel client-side) vs YOLO (Edge GPU) Hybrid Architecture Decision: Hardware-detected YOLO primary with MediaPipe in-browser fallback.
- [x] Build Unified Movement & Hypothesis Engine (`movement-engine.js` / `movement-engine.kt`) covering Fall/Trip, Immobility, and Tremor/Shivering.
- [x] Build Dual Vision Engine Adapter (Auto-detects local YOLO edge sentinel via GTX 1650; falls back to browser MediaPipe Pose Wasm).
- [x] Build Incident Reconstruction & 30s Chronological Timeline Panel on Web Dashboard with Counterfactuals.
- [x] Build 5 Evaluator Interactive Scenarios (Sitting, Lying, Phone Drop, Fall, Unresponsive Immobility).
- [x] Strictly isolate Phone Accelerometer Fall Detection to native Android only (`app-android/`); scrub and remove phone accelerometer references from website codebase and web dashboard (`IncidentReconstructionPanel.jsx`, `ResidentCheckinModal.jsx`, `movement-engine.js`), replacing it with clinical camera/tripwire scenarios.
- [x] Perform comprehensive end-to-end multi-layer audit: verify live Vercel web endpoints, Babel transform & React DOM render lifecycle, Android native Gradle compilation, simulated emergency workflows, and zero-defect quality standards.
### Track 1: Real-Time Edge Vision & Consensus Engine (COMPLETED & VERIFIED)
- [x] Task 1.1: Implement Live Device Webcam integration in Camera Zones view (`navigator.mediaDevices.getUserMedia`) allowing users/judges to connect their laptop/phone camera.
- [x] Task 1.2: In-browser MediaPipe Pose WebAssembly pipeline: extract 33 3D skeletal landmarks at 30 FPS with privacy wireframe toggle (hiding raw video).
- [x] Task 1.3: Connect live webcam feed to Unified Movement Engine (`movement-engine.js`): calculate kinematic downward velocity & torso angle in real time, displaying live risk meter (🟢 Normal / 🟡 Caution / 🔴 High Risk Fall).
- [x] Task 1.4: Engine-First / Gemini-Failsafe Consensus Architecture: local deterministic engine acts as fast primary evaluator (<20ms); Gemini acts as an automatic background failsafe arbitrator invoked when engine confidence is ambiguous (40%–65% split) with 1.5s timeout protection.
- [x] Task 1.5: Trigger live 30s Resident Verification Modal directly from simulated webcam drops, auto-canceling if resident restores upright posture.
- [x] Upgrade Camera Vision to Real Motion Tracking & Remove Fake X-Ray Overlay: (1) Scrubbed out the static/fake x-ray box and stick figure overlay completely; (2) Integrated real optical motion differencing engine in-browser tracking physical movement energy %, dynamic centroid brackets, and downward velocity; (3) Added local YOLO daemon auto-discovery for NVIDIA GeForce GTX 1650 hardware acceleration on port 5050.
- [x] Implement Real Ultralytics YOLO-Pose Edge Sentinel daemon using system hardware (NVIDIA GeForce GTX 1650 / webcam / Python): (1) Installed Ultralytics, PyTorch, and OpenCV; (2) Created production daemon `tools/yolo_edge_sentinel.py` capturing hardware webcam at ~25 FPS; (3) Computed 17 COCO keypoints, torso inclination angle, descent velocity, and clinical hypotheses; (4) Exposed `/api/yolo/telemetry` & live MJPEG `/api/yolo/video_feed` with DPDP privacy radar mode; (5) Integrated seamlessly with React frontend `CameraZonesView.jsx` and verified via Edge headless DOM; (6) Added single-click launchers `tools/run_yolo.bat` and `tools/run_yolo.ps1`.
- [x] Fix Camera Feed Freezing: Resolved Windows IPv6 2.1s `localhost` resolution stall (switched to `127.0.0.1` <3ms response), upgraded YOLO daemon to `ThreadingHTTPServer` with `CAP_PROP_BUFFERSIZE=1` and resilient disconnect recovery, added browser render loop guardrails and auto-reconnecting MJPEG stream with timestamp cache-busting. Soak-tested 30s uninterrupted (626 frames, 85 telemetry polls, 0 drops).
- [x] User Camera Consent & Privacy Gate: (1) Clarified technical distinction between native Python desktop direct hardware access vs browser sandbox prompts; (2) Implemented DPDP Act 2023 Consent-First Gateway with `hardwareStreamPaused=true` by default, requiring explicit user authorization via "Start Camera Sentinel" or "Start Privacy Radar Only" before video starts.
- [x] On-Demand Hardware Webcam Control (LED Off by Default): Re-architected `tools/yolo_edge_sentinel.py` so physical camera hardware is NEVER opened at daemon startup (`camera_led_state: OFF`). Camera only opens on-demand when an authorized stream connects, and is immediately released (`cap.release()`) extinguishing the physical LED when the user pauses, stops, or navigates away.
- [x] Fall Detection Sensitivity & Calibration: (1) Diagnosed root causes: `torso_angle` was hardcoded to 0.0° when hips were occluded in desktop webcam framing, single-frame velocity threshold (1.35 m/s) missed post-impact stillness, and frontend banner excluded hardware YOLO; (2) Re-engineered `compute_kinematics` to synthesize upper-body angles (head-to-shoulder + shoulder tilt), added descent impact latch (<2.5s window), floor occlusion fall detection, and connected `onTriggerAlert(true)` with responsive tri-state banner. Verified with 6/6 unit & integration tests (`tools/test_fall_kinematics.py`).
- [x] Implement Bed-Fall Clinical Demo Video with Live YOLO Ultralytics Inference: (1) Generated photorealistic hospital ward surveillance keyframes using Gemini image synthesis maintaining 100% camera angle and scene continuity across 4 stages (in-bed supine rest, bed-edge sitting, mid-fall slipping, and floor horizontal collapse); (2) Synthesized seamless 15-second 1280x720 video (`video/patient_bed_fall_demo.mp4` & `prototype/public/videos/patient_bed_fall_demo.mp4`); (3) Calibrated YOLO Edge Sentinel to recognize in-bed supine sleep as `SAFE` and differentiate it from floor impact collapse (`HIGH_RISK`); (4) Added dynamic source switching (`POST /api/yolo/source`, `?source=bed_fall_demo`) and prominent UI button in `CameraZonesView.jsx` triggering real-time pose skeleton tracking and visual/auditory alarms.



### Track 2: Platform Polish & Mobile Parity (Secondary Backlog)
- [ ] Task 2.1: "Add Patient" registration flow on web dashboard for newly registered family accounts.
- [ ] Task 2.2: Optional cloud persistent store (Neon Postgres / Upstash Redis) for persistent cross-instance state on Vercel.
- [ ] Task 2.3: Native Android app physical device testing (`ReJivan_v1.0.apk`) verifying offline independence.

### Track 3: Competition Deliverables (Deadline: 15 October 2026, VBYLD 2027)
- [ ] Task 3.1: Write Andaman & Nicobar Regional Problem Statement Sheet in `docs/` (island logistics, referral bottlenecks).
- [ ] Task 3.2: Create 6–7 Slide Presentation Pitch Deck with digital-tools disclosure.
- [ ] Task 3.3: Record 3–5 Minute Demonstration Video (720p/1080p).
- [ ] Task 3.4: Finalize team registration on MyBharat portal with institutional AISHE code & Annexure 1 sign-off.

## Standing rules (per workspace guidelines)
- After any change: append a timestamped line to `CHANGELOG.md` here and commit (auto-push takes care of GitHub).
- Owner is non-technical — explain plainly, avoid jargon.
- Full owner context lives in global developer configuration.