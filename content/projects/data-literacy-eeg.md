---
title: Household Resources and Neural Control — EEG Study
description: A Data Literacy team project linking household food insecurity to P3b attention markers in public EEG data, with a Streamlit quality-control dashboard.
date: 2026-02-03
tags: [project, data-science, python, eeg, statistics, streamlit, research]
---

## Everyday Context and Cognition

**University of Tübingen · Data Literacy (ML4102) · Winter 2025/26**

**Team:** Abtin Mogharabin, Mina Mikhael, Kourosh Sharifi, Seyedmehdi Hosseini

This course project asks whether everyday household resources relate to how the
brain processes attention. We used a public EEG dataset in which participants did a
visual oddball task ([Isbell et al., OpenNeuro ds005863](https://openneuro.org/datasets/ds005863/versions/1.0.0))
and related household food insecurity to the **P3b** component, a standard neural
marker of target-focused attention.

### Findings

- Higher household food insecurity was consistently associated with **longer P3b
  latency**, meaning slower evaluation of targets.
- The relationship between P3b **amplitude** and socioeconomic indicators varied
  across strata and showed no single clear direction.

### What I worked on

I built the project's **interactive Streamlit dashboard** (about 1,000 lines of
Python with MNE, Pandas, Matplotlib and Altair). It walks through every stage of
the preprocessing pipeline for EEG quality control: raw signal inspection, spectra,
channel loss, ICA component classifications, and averaged ERPs such as the P3b,
with sidebar filters for subjects, demographics and task. I also deployed it. The
preprocessing notebooks and the regression analysis were shared team work.

### Explore

- **[Interactive dashboard →](https://dataliteracy-aeardzhvggvfgwzmcvwgvh.streamlit.app/)**
- **[Project report (PDF) →](https://github.com/mhdihso/DATA_LITERACY/blob/website/Data%20Literacy%20Project%20Report.pdf)**
- **[Source code →](https://github.com/mhdihso/DATA_LITERACY)**

### Stack and topics

`Python` · `Streamlit` · `MNE` · `Pandas` · `Altair` · `EEG / ERP` ·
`Data Visualization` · `Team Research`
