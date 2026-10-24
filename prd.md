Product Requirements Document (PRD)
Personal Engineering Portfolio & Technical Blog

Version: 1.0
Author: Madalin Cotetiu
Status: Draft
Target Release: v1.0

1. Executive Summary

Build a modern, premium-quality personal website that establishes Madalin Cotetiu as an Engineering Manager, technical leader, and experienced software quality professional.

The website should function as:

Personal brand
Portfolio
Technical blog
Resume/CV
Project showcase
Knowledge hub
Lead generation website
Long-term SEO asset

The overall experience should feel comparable to the portfolios of engineers working at companies like Vercel, Stripe, Linear, GitHub, or Shopify.

The website must prioritize:

Performance
Accessibility
Premium design
Excellent typography
Mobile-first responsiveness
Strong SEO
AI-friendly content structure
Easy long-term maintenance
2. Goals
Primary Goals
Showcase engineering leadership experience
Present portfolio projects professionally
Publish technical articles
Improve discoverability through SEO
Serve as an online resume
Demonstrate engineering excellence
Secondary Goals
Increase LinkedIn visibility
Build professional credibility
Showcase leadership philosophy
Document projects
Share technical knowledge
3. Success Metrics
Technical
Lighthouse Performance >95
Accessibility >100
SEO >100
Best Practices >100
User Metrics

Average session >3 minutes

Bounce rate <35%

Core Web Vitals all green

CLS <0.1

LCP <2s

Business Metrics

Organic search traffic

Resume downloads

Blog readership

Contact form submissions

LinkedIn profile visits

GitHub profile visits

4. Target Audience
Primary

Engineering Managers

Software Engineers

Recruiters

Hiring Managers

CTOs

Engineering Directors

Product Managers

Secondary

QA Engineers

Automation Engineers

Developers

Students

Tech Enthusiasts

5. Design Principles

The website should feel:

Minimal
Premium
Elegant
Fast
Clean
Modern
Technical without being cluttered

Inspired by:

Vercel
Stripe
Linear
Apple
GitHub
TailwindCSS
6. Technology Stack
Framework

Next.js 15 (App Router)

React 19

TypeScript

Styling

Tailwind CSS v4

shadcn/ui

Framer Motion

Lucide Icons

Content

MDX

Fumadocs

Gray Matter

Deployment

Vercel

Analytics

Vercel Analytics

Speed Insights

Contact

Resend

React Email

SEO

Metadata API

next-sitemap

OpenGraph generation

RSS Feed

robots.txt

JSON-LD

7. Information Architecture
Home

About

Resume

Projects
    Websites
    Applications
    Browser Extensions
    AI Projects
    Automation

Leadership

Blog

Resources

Uses

Now

Contact
8. Homepage
Hero

Includes

Professional portrait

Name

Title

Short mission statement

CTA buttons

Example

Engineering Manager

Building high-quality software,
leading engineering teams,
and creating AI-powered products.

Buttons

View Projects

Download Resume

Read Blog

Featured Projects

Maximum 4 projects

Large cards

Hover animations

Technology badges

Featured image

Experience Metrics

Animated counters

13+ Years Experience

7+ Years Leadership

1000+ Test Cases

20+ Projects

Recent Articles

Latest three blog posts

Leadership Philosophy

Short summary

Read More button

Call To Action

Let's build something together.

9. About Page

Sections

Career Journey

Engineering Philosophy

Leadership Style

Current Focus

Skills

Interests

Professional Values

Timeline

10. Resume Page

Interactive resume

No PDF as primary content

Sections

Summary

Experience

Skills

Leadership

Education

Certifications

Awards

Languages

Projects

Download PDF button

LinkedIn

GitHub

Timeline visualization

11. Projects

This is the centerpiece of the website.

Categories

Websites

Applications

Browser Extensions

Automation

Open Source

AI

Each Project Contains

Hero Image

Gallery

Overview

Problem

Solution

Architecture

Tech Stack

Challenges

Screenshots

Videos

Lessons Learned

Results

Links

GitHub

Live Demo

Project Gallery

Responsive Masonry Layout

Fullscreen Lightbox

Image Zoom

Keyboard Navigation

Videos

GIF Support

Project Filters

All

Next.js

Playwright

Automation

AI

React

Chrome Extension

TypeScript

Leadership

12. Blog

Categories

Engineering

Leadership

QA

Playwright

Testing

Automation

AI

Next.js

Career

Prompt Engineering

Features

MDX

Syntax Highlighting

Copy Code

Table of Contents

Reading Time

Progress Bar

Share Buttons

Author Card

Related Articles

RSS Feed

Tags

Search

13. Leadership Page

Sections

Leadership Philosophy

Team Building

Mentoring

Decision Making

Project Management

Engineering Culture

Lessons Learned

Books

Talks

14. Resources

Books

Courses

Podcasts

Websites

Developer Tools

AI Tools

Testing Tools

Automation Resources

15. Uses Page

Development Setup

Laptop

Monitor

Keyboard

Mouse

IDE

Browser

Extensions

AI Tools

Terminal

Chair

Camera

Microphone

16. Now Page

Current Projects

Current Reading

Learning Goals

Current Focus

Upcoming Conferences

17. Contact

Contact Form

Email

LinkedIn

GitHub

Calendar Link

Resume Download

18. Search

Global Search

Search Blog

Search Projects

Search Resume

Keyboard Shortcut

Ctrl+K

19. Dark Mode

Automatic

Manual Toggle

Persist Preference

20. Animations

Page Transitions

Scroll Reveal

Hero Animation

Hover Effects

Counters

Gallery Animations

Parallax

Respect prefers-reduced-motion

21. Accessibility

WCAG AA

Keyboard Navigation

Screen Readers

ARIA Labels

Focus Indicators

Alt Text

Reduced Motion

Semantic HTML

22. SEO

Dynamic Metadata

Canonical URLs

OpenGraph

Twitter Cards

JSON-LD

Article Schema

Person Schema

Breadcrumb Schema

Organization Schema

Sitemap

robots.txt

RSS

Structured Metadata

AI-friendly content

23. Performance

Image Optimization

Lazy Loading

Dynamic Imports

Server Components

Streaming

Partial Prerendering

Edge Runtime

Caching

Prefetching

24. Security

Headers

Rate Limiting

Form Validation

Spam Protection

reCAPTCHA or Turnstile

Content Security Policy

HTTPS

25. Future Enhancements (v2)
AI Resume Chat

Visitors can ask questions such as:

What management experience do you have?
What testing frameworks have you used?
Which projects demonstrate leadership?
AI Project Assistant

Ask questions about any showcased project.

Newsletter

Subscribe for engineering and leadership articles.

Speaking Page

Conference talks

Podcasts

Guest appearances

Testimonials

Recommendations

Peer reviews

Leadership feedback

GitHub Integration

Latest repositories

Contribution graph

Pinned projects

Timeline Visualization

Interactive career timeline.

Reading List

Currently reading

Book reviews

Recommended books

Public Roadmap

Show what is planned next for the site.

26. Content Model
Project
Title
Slug
Category
Description
Cover Image
Gallery
Technologies
Architecture
Challenges
Lessons Learned
GitHub URL
Live URL
Featured Flag
Published Date
Blog Post
Title
Slug
Description
Tags
Reading Time
Author
Published Date
Updated Date
Hero Image
MDX Content
Resume Entry
Company
Role
Dates
Technologies
Responsibilities
Achievements
27. Acceptance Criteria

The project is considered complete when:

All pages are fully responsive.
Lighthouse scores are ≥95 for Performance and 100 for Accessibility, SEO, and Best Practices where achievable.
Every project has a dedicated detail page with an image gallery.
Blog posts support MDX, syntax highlighting, search, and RSS.
Contact form reliably delivers emails.
Resume is available both as an interactive page and downloadable PDF.
Metadata, structured data, sitemap, and robots.txt are correctly configured.
Dark mode and keyboard accessibility are fully supported.
Images are optimized and lazy-loaded.
The site is deployed on Vercel with analytics and Speed Insights enabled.
Content is easy to maintain without requiring code changes for routine updates.
28. Claude Code Skills

Configure Claude Code with the following skills before implementation:

UI & UX
Anthropic Frontend Design Skill
NextLevelBuilder UI/UX Pro Max Skill
Next.js & Vercel
Vercel Labs Web Design Guidelines Skill

These skills should be used to ensure:

High-quality, accessible UI components
Consistent design language
Modern interaction patterns
Performance-first Next.js implementation
Vercel deployment best practices
Maintainable component architecture
29. Vision Statement

This website should feel less like a traditional résumé and more like a polished product. Every page should reinforce technical expertise, engineering leadership, and attention to detail. A recruiter should be able to understand Madalin's career in under five minutes, while an engineer should find enough depth in the projects and articles to spend much longer exploring the site. It should remain scalable, content-driven, and easy to evolve as new projects, blog posts, and accomplishments are added over the coming years.