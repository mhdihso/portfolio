---
title: Early Open Source (2021–2023)
description: Small Python libraries and services published during my NoyanFanavarArya years — an OpenCV answer-sheet scanner, Persian-language utilities, and a Django social-media automation service.
date: 2023-10-26
tags: [project, open-source, python, opencv, django, persian]
---

## Early Open Source · 2021 – 2023

These are small tools I published while running engineering at
[[experience/noyan-fanavar-arya|NoyanFanavarArya]]. Most were pieces of client
products that we split out to reuse. They are early work: small, focused, and
written to solve a problem we had that week. I keep them here because they show
where my backend habits started.

### scan_sheet_lib — answer-sheet scanner (2022)

A Python library that reads **photographed multiple-choice answer sheets** (four
options per question) and the QR code that identifies the sheet.

- Finds the sheet in a photo, orders its corners and applies a **four-point
  perspective transform** to flatten it.
- Improves contrast with **CLAHE** and thresholding, then locates the answer grid
  and reads which option is filled in for each question.
- Decodes the sheet's **QR code** with OpenCV and returns it alongside the answers.
- Installable with `pip` straight from GitHub:
  `Scan.scan('sheet.png')` returns a dictionary of answers.

`Python` · `OpenCV` · `scikit-image` · `NumPy` · [Source →](https://github.com/mhdihso/scan_sheet_lib)

### instabot — social-media automation service (2021–2022)

A **Django + Django REST Framework** service that automated Instagram and Twitter
actions: liking, retweeting and replying to specific tweets through
Tweepy, Instagram automation through InstaPy, and generated Instagram story images
with correctly shaped right-to-left Persian text (`arabic-reshaper` and
`python-bidi` with Pillow). The actions were exposed through a token-authenticated
REST API.

`Python` · `Django` · `DRF` · `Tweepy` · `InstaPy` · `Pillow` · [Source →](https://github.com/mhdihso/instabot)

### Jalali_events — Persian calendar events (2022)

A script that returns the official events and holidays for a given year and month
of the **Jalali (Persian) calendar** by scraping time.ir. It includes its own
Jalali-to-Gregorian date conversion.

`Python` · `Requests` · `BeautifulSoup` · [Source →](https://github.com/mhdihso/Jalali_events)

### convet_number — Persian ordinal numbers (2022)

A tiny package that turns numbers from 1 to 999 into their written **Persian
ordinal** form (for example `567` → «پانصد و شصت و هفتم»), for generating
natural-language text in Persian interfaces.

`Python` · `Packaging` · [Source →](https://github.com/mhdihso/convet_number)

---

[[projects/index|View all projects →]]
