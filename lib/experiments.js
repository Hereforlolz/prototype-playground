// lib/experiments.js
//
// Metadata for the live, playable tools under /experiments/<slug>. Each
// slug maps to a self-contained HTML file in content/experiments/ — the
// original single-file tool, unmodified except where noted per file.
// Kept as plain data so pages/experiments/[slug].js, lib/sitemap.js, and
// lib/projects-data.js can all reference the same source of truth for
// which experiments exist and what they're called.
'use strict';

const EXPERIMENTS = {
  'dream-excuse-generator': {
    title: 'Dream Excuse Generator',
    description:
      'Turns a mundane excuse into an absurd, over-the-top one — template-based by default, or paste in your own OpenAI key for AI-generated excuses.',
  },
  'tiktok-script-generator': {
    title: 'TikTok Script Generator',
    description:
      'Drafts a TikTok script from a topic, optionally pulling real headlines via a News API key — bring your own AI provider key to generate the script itself.',
  },
  'ai-existential-crisis-bot': {
    title: 'AI Existential Crisis Bot',
    description:
      'Paste in code, get an existential crisis back — pattern-matches your code structure and hands it to your choice of AI provider for a philosophical critique.',
  },
  'ai-pitch-deck-generator': {
    title: 'AI Pitch Deck Generator',
    description:
      'Turns a startup topic into a 6-slide VC-style deck — template-based mock mode by default, or bring your own Anthropic and Unsplash keys for AI-generated slides with real images.',
  },
};

module.exports = { EXPERIMENTS };
