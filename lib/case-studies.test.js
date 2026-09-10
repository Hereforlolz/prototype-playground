// lib/case-studies.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { CASE_STUDIES } = require('./case-studies');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const EXPECTED_SLUGS = ['teamtrail', 'qwenMemoryAgent', 'deadCodeFinder', 'compassionateConnect', 'greenGrid', 'therapistDashboard', 'pilotCraft', 'promptEngineeringAdoption'];

test('exactly the flagship projects have case studies', () => {
  assert.deepEqual(Object.keys(CASE_STUDIES).sort(), [...EXPECTED_SLUGS].sort());
});

test('every case study has all required, non-empty sections', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    assert.ok(study.title, `${key} missing title`);
    // repoUrl is optional — a workplace retrospective like
    // promptEngineeringAdoption has no public repo — but when present it
    // must be a real link, never a placeholder.
    assert.ok(study.repoUrl === undefined || study.repoUrl.startsWith('https://'), `${key} has an invalid repoUrl`);
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
  // product) in its own true words. promptEngineeringAdoption is neither
  // — it's a workplace retrospective, so its scope needs to admit it's an
  // informal, unvalidated account instead.
  const NOT_HACKATHON_SLUGS = ['pilotCraft'];
  const RETROSPECTIVE_SLUGS = ['promptEngineeringAdoption'];

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const scopeText = study.scope.toLowerCase();
    if (RETROSPECTIVE_SLUGS.includes(key)) {
      assert.match(scopeText, /retrospective/, `${key} scope should identify itself as a retrospective`);
      assert.match(scopeText, /not.*(controlled study|independently validated)/, `${key} scope should admit it isn't a controlled or independently validated study`);
    } else if (NOT_HACKATHON_SLUGS.includes(key)) {
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
    const explanationText = study.explanations?.simple?.sections?.map(section => section.text) ?? [];
    const allText = [
      study.title, study.subtitle, study.tagline, study.scope,
      ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
      ...explanationText,
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
  // "pilot" could just as easily reappear in subtitle/problem/approach or
  // the simple explanation, all of which render on the case-study page.
  const explanationText = study.explanations?.simple?.sections?.map(section => section.text) ?? [];
  const allText = [
    study.title, study.subtitle, study.tagline, study.scope,
    ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
    ...explanationText,
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
  // promptEngineeringAdoption is deliberately excluded from HIGHLIGHTS
  // (see lib/projects-data.js) — it's discoverable only via internal
  // links from /about and /projects, not a HIGHLIGHTS card, so it has no
  // analyticsEvent to match.
  const NOT_IN_HIGHLIGHTS_SLUGS = ['promptEngineeringAdoption'];
  const { HIGHLIGHTS } = require('./projects-data');
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (NOT_IN_HIGHLIGHTS_SLUGS.includes(key)) continue;
    const highlight = HIGHLIGHTS.find(h => h.analyticsEvent === study.analyticsEvent);
    assert.ok(highlight, `no HIGHLIGHTS entry found with analyticsEvent "${study.analyticsEvent}"`);
  }
});

test('promptEngineeringAdoption has no repoUrl/devpostUrl/analyticsEvent, and is not present in HIGHLIGHTS', () => {
  const { HIGHLIGHTS } = require('./projects-data');
  const study = CASE_STUDIES.promptEngineeringAdoption;

  assert.equal(study.repoUrl, undefined, 'no public repo exists for this retrospective');
  assert.equal(study.devpostUrl, undefined, 'this was not a hackathon submission');
  assert.equal(study.analyticsEvent, undefined, 'no HIGHLIGHTS card exists to track a click from');
  assert.equal(
    HIGHLIGHTS.some(h => h.caseStudyHref === `/projects/${study.slug}`),
    false,
    'must not appear as a normal HIGHLIGHTS project card'
  );
});

const EXPECTED_EXPLANATION_SLUGS = ['pilotCraft', 'qwenMemoryAgent', 'deadCodeFinder', 'compassionateConnect', 'therapistDashboard'];

test('every case study with a simple explanation has the expected four-part structure', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (!study.explanations) continue;
    const { sections } = study.explanations.simple;
    assert.equal(sections.length, 4, `${key} simple explanation should have exactly 4 sections`);
    for (const section of sections) {
      assert.ok(section.title && section.title.length > 0, `${key}: simple explanation section missing a title`);
      assert.ok(section.text && section.text.length > 0, `${key}: "${section.title}" section missing body text`);
    }
  }
});

test('every simple explanation stays free of implementation/test/eval detail that belongs in the Overview', () => {
  // Regression guard: "Explain simply" is a plain-language translation, not
  // a shortened version of the technical evidence already covered by the
  // Overview section and the linked repo — this catches that detail
  // creeping back in, for every project that has a simple explanation.
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

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (!study.explanations) continue;
    const explanationText = study.explanations.simple.sections.map(section => section.text).join(' ');

    for (const pattern of implementationDetailPatterns) {
      assert.equal(pattern.test(explanationText), false, `${key}: simple explanation matched implementation-detail pattern ${pattern}`);
    }
  }
});

test('exactly the agreed five case studies define a simple explanation', () => {
  // Scope guard for the rollout: PilotCraft (proved out the pattern), plus
  // Qwen MemoryAgent / Dead Code Finder / CompassionateConnect / Therapist
  // Dashboard (this consistency pass). TeamTrail and GreenGrid are
  // deliberately excluded — TeamTrail because it's already clear without
  // translation, GreenGrid because it was explicitly deferred.
  const withExplanations = Object.entries(CASE_STUDIES)
    .filter(([, study]) => study.explanations !== undefined)
    .map(([key]) => key);
  assert.deepEqual(withExplanations.sort(), [...EXPECTED_EXPLANATION_SLUGS].sort());
});

const ALLOWED_MEDIA_SLOTS = ['hero', 'afterApproach', 'afterOutcome'];
const EXPECTED_MEDIA_SLUGS = ['pilotCraft', 'qwenMemoryAgent'];

test('every case study\'s media entries each have a real local image, dimensions, alt text, and a caption', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (!study.media) continue;
    const slots = Object.keys(study.media);
    assert.ok(slots.length > 0, `${key} defines media but has no slots`);

    for (const slot of slots) {
      assert.ok(ALLOWED_MEDIA_SLOTS.includes(slot), `${key}: "${slot}" is not a recognized media slot`);
      const item = study.media[slot];
      assert.ok(item.src && item.src.startsWith(`/case-studies/${study.slug}/`), `${key}/${slot} media should live under /case-studies/${study.slug}/`);
      assert.ok(Number.isInteger(item.width) && item.width > 0, `${key}/${slot} media missing a valid width`);
      assert.ok(Number.isInteger(item.height) && item.height > 0, `${key}/${slot} media missing a valid height`);
      assert.ok(item.alt && item.alt.length > 10, `${key}/${slot} media missing meaningful alt text`);
      assert.ok(item.label && item.label.length > 0, `${key}/${slot} media missing a label`);
      assert.ok(item.caption && item.caption.length > 0, `${key}/${slot} media missing a caption`);
    }
  }
});

test('every media image referenced in case-studies.js actually exists in public/', () => {
  const fs = require('node:fs');
  const path = require('node:path');

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (!study.media) continue;
    for (const [slot, item] of Object.entries(study.media)) {
      const filePath = path.join(__dirname, '..', 'public', item.src);
      assert.ok(fs.existsSync(filePath), `${key}/${slot} references ${item.src}, which doesn't exist in public/`);
    }
  }
});

test('exactly the agreed case studies define media, scoping screenshots to the projects that earned them', () => {
  const withMedia = Object.entries(CASE_STUDIES)
    .filter(([, study]) => study.media !== undefined)
    .map(([key]) => key);
  assert.deepEqual(withMedia.sort(), [...EXPECTED_MEDIA_SLUGS].sort());
});

test('only CompassionateConnect currently defines a linkedinUrl', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (key === 'compassionateConnect') continue;
    assert.equal(study.linkedinUrl, undefined, `${key} should not define linkedinUrl yet`);
  }
});

test('CompassionateConnect\'s linkedinUrl is a well-formed, real LinkedIn link', () => {
  const { linkedinUrl } = CASE_STUDIES.compassionateConnect;
  assert.ok(linkedinUrl.startsWith('https://www.linkedin.com/'), 'linkedinUrl should be a real linkedin.com link');
});

test('every case study has a corresponding pages/projects/<slug>.js route that renders it', () => {
  const fs = require('node:fs');
  const path = require('node:path');

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const filePath = path.join(__dirname, '..', 'pages', 'projects', `${study.slug}.js`);
    assert.ok(fs.existsSync(filePath), `${key} has no pages/projects/${study.slug}.js route`);

    const source = fs.readFileSync(filePath, 'utf8');
    assert.ok(source.includes(`CASE_STUDIES.${key}`), `pages/projects/${study.slug}.js should render CASE_STUDIES.${key}`);
  }
});

test('the prompt-engineering-adoption retrospective uses the agreed safer framing', () => {
  const study = CASE_STUDIES.promptEngineeringAdoption;
  const allText = [
    study.title, study.subtitle, study.tagline, study.scope,
    ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
  ].join(' ').toLowerCase();

  // Must not say Ivani "rolled out tools with no guidance" — the agreed
  // framing is that engineers were experimenting without a shared guide.
  assert.equal(allText.includes('rolled out tools with no guidance'), false);
  assert.ok(allText.includes('experimenting without a shared usage guide'), 'should use the agreed framing about engineers experimenting without a shared usage guide');

  // "zero-cost" replaced with "no external API cost."
  assert.equal(allText.includes('zero-cost'), false);
  assert.ok(allText.includes('no external api cost'));

  // Task Manager showed local resource usage, never model reasoning,
  // context usage, or output quality — and that distinction has to be
  // stated explicitly, not just implied by omission.
  assert.ok(allText.includes('not model reasoning, context usage, or output quality'));

  // No token-count savings are claimed, since none were recorded.
  assert.equal(/\btoken/.test(allText), false);

  // Results are framed as directional, self-observed estimates, not
  // measured or validated facts.
  assert.ok(allText.includes('directional estimate of approximately 50% less engineer rework'));
  assert.ok(allText.includes('directional estimate of approximately 8 minutes saved per engineering query'));
  assert.ok(allText.includes('not independently validated research'));

  // Adoption-scale honesty: ~10-person team, ~two weeks, starting with
  // two engineers — not a vaguer or more impressive-sounding rollout.
  assert.ok(allText.includes('two engineers'));
  assert.ok(allText.includes('10-person team'));
  assert.ok(allText.includes('two weeks'));

  // Explicit measurement-limitation admissions.
  assert.ok(allText.includes('no formal survey'));
  assert.ok(allText.includes('no usage dashboard'));
  assert.ok(allText.includes('no time-to-proficiency measurement'));
  assert.ok(allText.includes('no controlled adoption study'));

  // Sourced as a personal retrospective, not an internal company document,
  // and never links to or reproduces the private source material.
  assert.ok(allText.includes('retrospective'));
  assert.ok(allText.includes('personal working notes'));
  assert.ok(allText.includes('not an internal ivani document'), 'should explicitly disclaim being an internal Ivani document');
  assert.equal(allText.includes('docs.google.com'), false);
  assert.equal(study.repoUrl, undefined);
});

test('the prompt-adoption case study is discoverable via internal links from About and Projects, not global nav or the résumé CTA', () => {
  const fs = require('node:fs');
  const path = require('node:path');

  const aboutSource = fs.readFileSync(path.join(__dirname, '..', 'pages', 'about.js'), 'utf8');
  const projectsSource = fs.readFileSync(path.join(__dirname, '..', 'pages', 'projects.js'), 'utf8');
  const layoutSource = fs.readFileSync(path.join(__dirname, '..', 'components', 'Layout.js'), 'utf8');
  const ctaSource = fs.readFileSync(path.join(__dirname, '..', 'lib', 'cta.js'), 'utf8');

  const href = '/projects/prompt-engineering-adoption';
  const linkText = 'Read the prompt-adoption case study';

  assert.ok(aboutSource.includes(href), 'pages/about.js should link to the case study');
  assert.ok(aboutSource.includes(linkText), 'pages/about.js should use the agreed link text');
  assert.ok(projectsSource.includes(href), 'pages/projects.js should link to the case study');
  assert.ok(projectsSource.includes(linkText), 'pages/projects.js should use the agreed link text');

  // Explicitly not in global navigation or the résumé CTA.
  assert.equal(layoutSource.includes(href), false, 'must not appear in global navigation');
  assert.equal(ctaSource.includes(href), false, 'must not appear in the résumé/CTA links');
});
