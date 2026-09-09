// lib/case-studies.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { CASE_STUDIES } = require('./case-studies');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const EXPECTED_SLUGS = ['teamtrail', 'qwenMemoryAgent', 'deadCodeFinder', 'compassionateConnect', 'greenGrid', 'therapistDashboard', 'pilotCraft'];

test('exactly the flagship projects have case studies', () => {
  assert.deepEqual(Object.keys(CASE_STUDIES).sort(), [...EXPECTED_SLUGS].sort());
});

test('every case study has all required, non-empty sections', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    assert.ok(study.title, `${key} missing title`);
    assert.ok(study.repoUrl && study.repoUrl.startsWith('https://'), `${key} missing a real repoUrl`);
    assert.ok(Array.isArray(study.problem) && study.problem.length > 0, `${key} missing problem`);
    assert.ok(Array.isArray(study.approach) && study.approach.length > 0, `${key} missing approach`);
    assert.ok(Array.isArray(study.whatBroke) && study.whatBroke.length > 0, `${key} missing whatBroke`);
    assert.ok(Array.isArray(study.outcome) && study.outcome.length > 0, `${key} missing outcome`);
    assert.ok(study.scope && study.scope.length > 0, `${key} missing an honest scope note`);
    assert.ok(Array.isArray(study.stack) && study.stack.length > 0, `${key} missing a stack table`);
  }
});

test('case study content avoids banned buzzwords', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const explanationText = study.explanations?.simple?.sections?.map(section => section.text) ?? [];
    const allText = [
      study.title, study.subtitle, study.tagline, study.scope,
      ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
      ...explanationText,
    ].join(' ').toLowerCase();

    for (const word of BANNED_BUZZWORDS) {
      assert.equal(allText.includes(word), false, `${key} contains banned buzzword "${word}"`);
    }
  }
});

test('case studies never claim invented user counts, adoption, or benchmark numbers', () => {
  // These are hackathon prototypes with no evidenced user base or formal
  // benchmark — this is a regression guard against a future edit sneaking
  // in a "10,000 users" / "40% faster than X" style unverified claim.
  const overclaimPatterns = [
    /\d[\d,]*\+?\s*(users|customers|companies|teams)\b/i,
    /\bproduction[- ](deployment|grade|ready)\b/i,
    /\benterprise[- ]grade\b/i,
    /\btrusted by\b/i,
    /\b\d+% (faster|better|more accurate) than\b/i,
  ];

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const explanationText = study.explanations?.simple?.sections?.map(section => section.text) ?? [];
    const allText = [
      study.title, study.subtitle, study.tagline, study.scope,
      ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
      ...explanationText,
    ].join(' ');

    for (const pattern of overclaimPatterns) {
      assert.equal(pattern.test(allText), false, `${key} matched overclaim pattern ${pattern}`);
    }
  }
});

test('every case study honestly scopes itself as something less than a finished, production product', () => {
  // Six of these are hackathon submissions and say so directly. PilotCraft
  // is a personal project, not a hackathon build, so it can't honestly
  // carry "hackathon" language — but its scope still needs to make the
  // same underlying admission (not production-hardened, not a finished
  // product) in its own true words.
  const NOT_HACKATHON_SLUGS = ['pilotCraft'];

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const scopeText = study.scope.toLowerCase();
    if (NOT_HACKATHON_SLUGS.includes(key)) {
      assert.match(scopeText, /personal tool|not production-hardened/, `${key} scope should honestly scope itself as not production-ready`);
    } else {
      assert.match(scopeText, /hackathon/, `${key} scope should acknowledge it's a hackathon submission`);
    }
  }
});

test('CompassionateConnect is explicit that it is not a validated clinical tool', () => {
  // Sensitive domain (mental health / crisis detection) — this is a
  // regression guard against a future edit softening or dropping the
  // project's own honesty about not being ready for real clinical use.
  const study = CASE_STUDIES.compassionateConnect;
  const scopeText = study.scope.toLowerCase();
  const outcomeText = study.outcome.join(' ').toLowerCase();

  assert.match(scopeText, /archived.*demo only|demo only.*archived/);
  assert.match(scopeText, /no real phi|simulated patient data/);
  // Asserted separately (not as either/or) so removing either fact on its
  // own still fails this test — an OR here would let "no eval harness"
  // alone satisfy the check even if the "not a validated tool" disclaimer
  // were dropped from scope.
  assert.match(scopeText, /not.*(validated|clinical)/);
  assert.match(outcomeText, /no eval harness/);
});

test('GreenGrid excludes its own README\'s injected marketing claims', () => {
  // The GreenGrid repo README has a "Technology Licensing & Partnership
  // Framework" section claiming "production-ready" status and a "$50B+
  // smart grid market" — language that contradicts the project's own
  // Devpost description of itself as an initial, backend-focused demo.
  // Regression guard against that language leaking into this file.
  const study = CASE_STUDIES.greenGrid;
  const allText = [
    study.title, study.subtitle, study.tagline, study.scope,
    ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
  ].join(' ').toLowerCase();

  assert.equal(allText.includes('$50b'), false);
  assert.equal(allText.includes('smart grid market'), false);
  assert.equal(allText.includes('utility-grade'), false);
  assert.equal(allText.includes('enterprise smart grid'), false);
  assert.equal(allText.includes('licensing'), false);
});

test('no case study ever describes a project as HIPAA-aligned or HIPAA-compliant', () => {
  // "HIPAA-aligned" was removed from Therapist Dashboard because the
  // architecture (no auth, open CORS, account-wide IAM) doesn't justify
  // it — regression guard against that phrase, or a compliance claim,
  // reappearing anywhere in this file.
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const allText = [
      study.title, study.subtitle, study.tagline, study.scope,
      ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
    ].join(' ').toLowerCase();

    assert.equal(allText.includes('hipaa-aligned'), false, `${key} must not claim HIPAA alignment`);
    assert.equal(allText.includes('hipaa compliant'), false, `${key} must not claim HIPAA compliance`);
    assert.equal(allText.includes('hipaa-compliant'), false, `${key} must not claim HIPAA compliance`);
  }
});

test('Therapist Dashboard is explicit about the missing authentication and synthetic-data scope', () => {
  // Another sensitive domain (patient/session data) with a real, verified
  // gap (no auth on any endpoint) — regression guard against a future
  // edit softening this into something vaguer, and against the "~40%"
  // line drifting into a measured-result, clinical-validation, or
  // adoption claim. Also guards against "one therapist tested it"
  // drifting back into "pilot," which implies a structured, ongoing
  // program that never happened.
  const study = CASE_STUDIES.therapistDashboard;
  const scopeText = study.scope.toLowerCase();
  const whatBrokeText = study.whatBroke.join(' ').toLowerCase();
  const outcomeText = study.outcome.join(' ').toLowerCase();
  // Every user-visible field, not just scope/whatBroke/outcome/tagline —
  // "pilot" could just as easily reappear in subtitle/problem/approach,
  // all of which render on the case-study page.
  const allText = [
    study.title, study.subtitle, study.tagline, study.scope,
    ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
  ].join(' ').toLowerCase();

  assert.match(scopeText, /synthetic data/);
  assert.match(whatBrokeText, /no authentication/);
  assert.equal(allText.includes('pilot'), false, 'must not describe one therapist testing it as a "pilot"');

  // The "~40%" line must stay attributed to one therapist's own
  // characterization, never asserted as a measured outcome of the tool.
  assert.equal(/\d+% (less|faster|reduction|improvement)/i.test(outcomeText), false);
  assert.equal(outcomeText.includes('clinical validation'), false);
  assert.equal(/\badopt(ed|ion)\b/.test(outcomeText), false);
  assert.equal(outcomeText.includes('production use'), false);
});

test('each case study links to an analyticsEvent matching its flagship HIGHLIGHTS entry', () => {
  const { HIGHLIGHTS } = require('./projects-data');
  for (const study of Object.values(CASE_STUDIES)) {
    const highlight = HIGHLIGHTS.find(h => h.analyticsEvent === study.analyticsEvent);
    assert.ok(highlight, `no HIGHLIGHTS entry found with analyticsEvent "${study.analyticsEvent}"`);
  }
});

test('PilotCraft\'s simple explanation has the expected four-part structure', () => {
  const { sections } = CASE_STUDIES.pilotCraft.explanations.simple;
  assert.equal(sections.length, 4);
  for (const section of sections) {
    assert.ok(section.title && section.title.length > 0, 'simple explanation section missing a title');
    assert.ok(section.text && section.text.length > 0, `"${section.title}" section missing body text`);
  }
});

test('the simple explanation stays free of implementation/test/eval detail that belongs in the Overview', () => {
  // Regression guard: "Explain simply" is a plain-language translation, not
  // a shortened version of the technical evidence already covered by the
  // Overview section and the linked repo — this catches that detail
  // creeping back in.
  const implementationDetailPatterns = [
    /\b\d+\s*(tests?|checks?|scenarios?)\b/i,
    /\bretry|retries|retrying\b/i,
    /\bmalformed\b/i,
    /\brate[- ]limit/i,
    /\bfallback\b/i,
    /\bschema\b/i,
    /\bzod\b/i,
    /\bapi\b/i,
  ];

  const explanationText = CASE_STUDIES.pilotCraft.explanations.simple.sections
    .map(section => section.text)
    .join(' ');

  for (const pattern of implementationDetailPatterns) {
    assert.equal(pattern.test(explanationText), false, `simple explanation matched implementation-detail pattern ${pattern}`);
  }
});

test('only PilotCraft currently defines a simple explanation, scoping this to one vertical slice', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (key === 'pilotCraft') continue;
    assert.equal(study.explanations, undefined, `${key} should not define explanations yet — this is a single-project slice`);
  }
});

test('PilotCraft\'s media entries each have a real local image, dimensions, alt text, and a caption', () => {
  const { media } = CASE_STUDIES.pilotCraft;
  const slots = ['hero', 'afterApproach', 'afterOutcome'];
  assert.deepEqual(Object.keys(media).sort(), [...slots].sort());

  for (const slot of slots) {
    const item = media[slot];
    assert.ok(item.src && item.src.startsWith('/case-studies/pilotcraft/'), `${slot} media should live under /case-studies/pilotcraft/`);
    assert.ok(Number.isInteger(item.width) && item.width > 0, `${slot} media missing a valid width`);
    assert.ok(Number.isInteger(item.height) && item.height > 0, `${slot} media missing a valid height`);
    assert.ok(item.alt && item.alt.length > 10, `${slot} media missing meaningful alt text`);
    assert.ok(item.label && item.label.length > 0, `${slot} media missing a label`);
    assert.ok(item.caption && item.caption.length > 0, `${slot} media missing a caption`);
  }
});

test('every PilotCraft media image referenced in case-studies.js actually exists in public/', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { media } = CASE_STUDIES.pilotCraft;

  for (const [slot, item] of Object.entries(media)) {
    const filePath = path.join(__dirname, '..', 'public', item.src);
    assert.ok(fs.existsSync(filePath), `${slot} references ${item.src}, which doesn't exist in public/`);
  }
});

test('only PilotCraft currently defines media, scoping screenshots to one vertical slice', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (key === 'pilotCraft') continue;
    assert.equal(study.media, undefined, `${key} should not define media yet — this is a single-project slice`);
  }
});
