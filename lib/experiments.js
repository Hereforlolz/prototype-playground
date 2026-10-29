// lib/experiments.js
//
// Metadata for the live, playable tools under /experiments/<slug>. Each
// slug maps to a self-contained HTML file in content/experiments/, the
// original single-file tool, unmodified except where noted per file.
// Kept as plain data so pages/experiments/[slug].js, lib/sitemap.js, and
// lib/projects-data.js can all reference the same source of truth for
// which experiments exist and what they're called.
'use strict';

const EXPERIMENTS = {
  'dream-excuse-generator': {
    intro: 'Type a boring excuse and get an absurd one back. A fun one to play with.',
    howToTry: 'Works right away with built-in templates and no key. Paste your own OpenAI key if you want AI-written excuses.',
    title: 'Dream Excuse Generator',
    description:
      'Turns a mundane excuse into an absurd, over-the-top one: template-based by default, or paste in your own OpenAI key for AI-generated excuses.',
  },
  'tiktok-script-generator': {
    intro: 'Give it a topic and it drafts a short TikTok script.',
    howToTry: 'Needs your own AI provider key to write the script. A News API key is optional and adds real headlines.',
    title: 'TikTok Script Generator',
    description:
      'Drafts a TikTok script from a topic, optionally pulling real headlines via a News API key: bring your own AI provider key to generate the script itself.',
  },
  'ai-existential-crisis-bot': {
    intro: 'Paste in some code and get a dramatic philosophical critique of how it is built.',
    howToTry: 'Uses the AI provider you choose. If every service fails, it falls back to canned answers so it still responds.',
    title: 'AI Existential Crisis Bot',
    description:
      'Paste in code, get an existential crisis back: pattern-matches your code structure and hands it to your choice of AI provider for a philosophical critique.',
  },
  'ai-content-generator': {
    intro: 'Drafts blog posts, social copy, email campaigns, and product descriptions.',
    howToTry: 'Mock mode needs no key. For real AI output, add your own OpenAI, Claude, Gemini, or Hugging Face key.',
    title: 'AI Content Generator',
    description:
      'Blog posts, social copy, email campaigns, and product descriptions from templates: keyless Mock mode by default, or bring your own OpenAI, Claude, Gemini, or Hugging Face key.',
  },
  'ai-pitch-deck-generator': {
    intro: 'Type a startup topic and get a 6-slide, VC-style deck.',
    howToTry: 'Demo mode works with no accounts or keys. For AI-written slides with real images, add your own Anthropic and Unsplash keys.',
    title: 'AI Pitch Deck Generator',
    description:
      'Turns a startup topic into a 6-slide VC-style deck: template-based mock mode by default, or bring your own Anthropic and Unsplash keys for AI-generated slides with real images.',
  },
};

// The experiment the Playground page leads with.
const FEATURED_EXPERIMENT = 'ai-pitch-deck-generator';

module.exports = { EXPERIMENTS, FEATURED_EXPERIMENT };
