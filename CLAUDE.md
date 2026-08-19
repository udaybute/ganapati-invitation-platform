@AGENTS.md
Excellent. Don't ask Claude to write code yet.

**First, create a complete project specification document and train Claude with it.**

Copy the document below and paste it into Claude as your **project context**.

---

# Project Specification: Ganapati Mandal Website

## Project Name

```text
Ganapati Bappa Morya
```

---

# Project Goal

Build a **mobile-first, highly animated, immersive Ganapati Mandal website inspired by Sacred Temple.**

This is **not** a traditional website.

The experience should feel like entering a **digital temple.**

The focus is on:

* Animation
* Spiritual atmosphere
* Smooth transitions
* Interactive darshan
* Mobile experience
* Marathi language
* Performance

---

# Target Users

```text
80% Mobile users
20% Desktop users
```

---

# Design Philosophy

```text
Not a website.

A digital temple experience.
```

The user should feel:

```text
Enter website
        ↓

Temple doors open

        ↓

Divine light appears

        ↓

Ganapati murti emerges

        ↓

Flower petals fall

        ↓

Temple music begins

        ↓

User explores the mandal
```

---

# Technology Stack

## Framework

```text
Next.js 16
```

---

## Language

```text
TypeScript
```

---

## UI

```text
React 19
```

---

## Styling

```text
Tailwind CSS 4
```

---

## Animation Engine

```text
GSAP
```

---

# Installed Packages

## GSAP

```bash
npm install gsap @gsap/react
```

Purpose:

```text
Page transitions
Murti animations
Text animations
Navbar animations
Scroll animations
Timeline sequencing
```

---

## Particle System

```bash
npm install react-tsparticles tsparticles @tsparticles/slim
```

Purpose:

```text
Floating particles
Dust particles
Temple atmosphere
Light particles
```

---

# Architecture

```text
Next.js App Router
```

---

# Current Folder Structure

```text
ganapati-mandal
│
├── app
│
├── components
│
├── public
│
├── node_modules
│
├── next.config.ts
│
├── package.json
│
└── tsconfig.json
```

---

# Asset Structure

```text
public
│
├── images
│
│── backgrounds
│     └── hero-background.png
│
│── ganapati
│     └── ganapati-murti.png
│
├── audio
│
├── videos
│
├── petals
│
├── diyas
│
└── icons
```

---

# Component Structure

```text
components
│
├── hero
│
├── navbar
│
├── about
│
├── gallery
│
├── events
│
├── donations
│
├── countdown
│
├── announcements
│
├── sponsors
│
├── aarti
│
├── mandal-members
│
└── footer
```

---

# Hero Section (Highest Priority)

The Hero section should occupy **100vh.**

---

# Hero Animation Sequence

```text
Page loads

        ↓

Background fades in

        ↓

Temple atmosphere appears

        ↓

Golden light emerges

        ↓

Ganapati murti rises from below

        ↓

Light behind the murti begins pulsing

        ↓

Ganapati Bappa text fades in

        ↓

Morya text fades in

        ↓

Flower petals begin falling

        ↓

Temple bells start moving

        ↓

Navigation bar appears
```

---

# Hero Section Layers

```text
Layer 1

Temple background

--------------------

Layer 2

Light particles

--------------------

Layer 3

Rotating halo

--------------------

Layer 4

Golden light

--------------------

Layer 5

Ganapati murti

--------------------

Layer 6

Falling petals

--------------------

Layer 7

Text

--------------------

Layer 8

Buttons

--------------------

Layer 9

Navigation
```

---

# Continuous Animations

## Murti

```text
Vertical floating

Duration: 2.5s

Loop: Infinite
```

---

## Glow

```text
Scale: 1 → 1.2

Opacity: 0.4 → 0.7

Loop: Infinite
```

---

## Petals

```text
Random X position

Falling direction

Random speed

Infinite generation
```

---

## Halo

```text
Continuous rotation

Duration: 20s

Infinite
```

---

# Website Sections

```text
Hero

↓

About Mandal

↓

Live Darshan

↓

10-Day Schedule

↓

Photo Gallery

↓

Video Gallery

↓

Announcements

↓

Online Donations

↓

Sponsors

↓

Mandal Members

↓

Aarti

↓

Contact

↓

Footer
```

---

# 10-Day Festival Schedule

Each day should have:

```text
Day number

↓

Program title

↓

Event description

↓

Photos

↓

Videos

↓

Animations
```

---

# Online Donation System

Features:

```text
Member list

↓

Donation amount

↓

Online payment

↓

UPI

↓

QR code

↓

Payment history
```

---

# Marathi Language Requirements

Everything should be in Marathi.

Examples:

```text
मुख्यपृष्ठ

मंडळाविषयी

आरती

देणगी

कार्यक्रम

गॅलरी

संपर्क
```

---

# Performance Requirements

```text
Mobile-first

Lazy loading

Image optimization

Code splitting

Dynamic imports

Lighthouse score > 90

60 FPS animations
```

---

# Animation Rules for Claude

```text
Never use CSS animations when GSAP can do the job.

Always use GSAP timelines.

Always clean up animations.

Always optimize for mobile.

Avoid heavy DOM manipulation.

Prefer transform over top/left.

Animate opacity and transform only.

Never block the main thread.
```

---

# Development Workflow

```text
Build layout

↓

Add assets

↓

Add animations

↓

Add interactions

↓

Optimize

↓

Test on mobile

↓

Deploy
```

