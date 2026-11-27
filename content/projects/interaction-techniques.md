---
title: Interaction Techniques & Technologies
description: Sensor, signal-processing, computer-vision and machine-learning interaction prototypes from the University of Tübingen ITT course, including a replication of MatchPoint (UIST 2017).
date: 2026-07-20
tags: [project, hci, computer-vision, opencv, machine-learning, python, signal-processing]
---

## Interaction Techniques & Technologies

**University of Tübingen · Summer 2026 · Course assignments**

A semester of small, working interaction prototypes in Python. Each one takes raw
input from a phone sensor, a microphone or a webcam and turns it into something a
person can control. Several were pair projects.

### Highlight: replicating MatchPoint (UIST 2017)

_With Lukas, as a pair._ We replicated
[MatchPoint](https://eprints.lancs.ac.uk/id/eprint/88665/) (Clarke & Gellersen,
UIST 2017), a technique for **touchless pointing with an ordinary webcam**. The user
follows a dot orbiting on screen with any body part (a hand, a head, even a held
cup), and the system works out which moving object is coupled to the widget and
turns it into a cursor.

The implementation (OpenCV, NumPy, SciPy) follows the paper's pipeline:

1. **Motion matching (TraceMatch):** FAST keypoints are tracked with pyramidal
   Lucas–Kanade optical flow. Each trajectory is tested against the orbit's known
   sine and cosine signals with Pearson correlation (threshold 0.98), then confirmed
   with a RANSAC circle fit and an arc-coverage check so that a straight swipe does
   not count.
2. **ROI initialisation:** dense Farnebäck flow is filtered by the matched motion's
   direction and magnitude, then connected components seeded at the matched points
   give the region of the coupled body part. The control-display gain scales with
   the fitted circle's radius, which normalises for distance from the camera.
3. **Tracking:** a modified median-flow tracker on a lazy-caterer grid drives the
   cursor.

I wrote the first version of the replication (paper selection plus Tasks 1–2). My
partner then refactored it and added a drag menu.
[Source code →](https://github.com/UT-ITT/assignment-07-replication-mehdi-lukas-1)

### Other prototypes

| Assignment                          | What it does                                                                                                                                                                         | Tools                                    |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| **Sensor input & games**            | Streamed phone accelerometer data over UDP (DIPPID) and used it to control a small 2D game                                                                                           | Python, pyglet, UDP                      |
| **Digital signal processing**       | A karaoke game that compares live sung pitch with a MIDI melody, and whistle-controlled keyboard input, both detecting pitch from microphone audio                                   | NumPy, FFT, sounddevice, mido, pyqtgraph |
| **Activity recognition**            | _Pair project with Marius._ A fitness trainer that classifies live phone-sensor motion with a Random Forest on windowed statistical features and shows a confidence level            | scikit-learn, pyglet                     |
| **Computer vision & sensor fusion** | An ArUco-marker AR game, a click-to-rectify perspective transform, and a complementary filter that fuses camera tracking with phone accelerometer data to cut latency without drift  | OpenCV, ArUco, pyglet                    |
| **CNNs**                            | Measured how brightness augmentation affects a hand-gesture CNN on a HaGRID subset (no augmentation was best, at 90.6%), and used the trained gesture model for webcam media control | Keras, OpenCV, scikit-learn              |

### Stack and topics

`Python` · `OpenCV` · `Optical Flow` · `RANSAC` · `Sensor Fusion` · `scikit-learn` · `Keras` ·
`Signal Processing` · `HCI Research Replication`
