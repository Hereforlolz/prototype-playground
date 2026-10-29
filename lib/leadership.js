// lib/leadership.js
//
// About page: the "Leadership & mentoring" cards and the Embark Women
// section, kept as plain data so they can be tested. Facts come from the
// owner's own account; the counts for Embark are approximate and say so.
// Keep the three kinds of work distinct: organizing access to coaching,
// working through problems with engineers, and improving how a team works.
'use strict';

const LEADERSHIP = [
  {
    label: 'Embark Women',
    text: 'I joined the founder as a co-founder and helped build the group from the ground up. For our Women’s Day conferences I coordinated about 10–15 volunteers and organizers. We ran a two-day conference with UT Tyler and other local women’s groups and raised around $5,000 (approximate).',
    href: '#embark-women',
    link: 'More on Embark Women →',
  },
  {
    label: 'Workshops and access to coaching',
    text: 'My co-founders and I made the events and the place for women in business to meet, learn, and find coaching. We ran business-building, brainstorming, and website-building workshops for small business owners and new entrepreneurs, and brought in community members who knew those topics. I organized access to coaching. I wasn’t the coach for all of it.',
  },
  {
    label: 'Zero-Gravity sessions with engineers',
    text: 'One-on-one sessions walking engineers through bugs they’d been stuck on, sometimes for days. I asked the obvious questions and had them treat me like a rubber duck that talks back. Sometimes a bug they’d fought for days got worked through in about twenty minutes. That happened sometimes. It’s not an average.',
    href: '#zero-gravity',
    link: 'More on Zero-Gravity Thinker →',
  },
  {
    label: 'The merge request checklist',
    text: 'Merge requests were taking too long and people kept missing steps, like testing the code, checking the wording, or leaving specific comments. I found a checklist and adapted it into one place to check testing and review steps, for both preparing and reviewing merge requests. I took it to the CTO, who adopted it, and all engineers used it. The company has kept updating it for about five years. I saw merges go from weeks to days through fewer missed checks and less rework. That is what I observed, not a formally measured average.',
  },
];

const EMBARK = [
  'Co-founder and CEO of Embark Women (2017 to 2022), built with my co-founder as a relationship-focused, no-selling community for professional opportunity, mentorship, and connection for women in Tyler, TX. Over five years we ran 20+ programs, including three annual conferences for 500+ participants (counted conservatively), grew to 800+ members on Facebook, and I personally supported 150+ members with career and business guidance.',
  'I led community development, content, and outreach; my co-founder led finances, and we both pitched in wherever needed. Flagship events like the 2018 Evolve Women’s Conference (with UT Tyler, SheTribe, and The 1 in 3 Foundation) ran on volunteer teams of 10 to 15 and raised around $5,000. Every program was built to be easy to join: free or low-cost, flexible, and attentive to transportation, childcare, disability, and cultural needs, and centered women and underrepresented voices. It wound down as a nonprofit in 2022 and continues today as a regular group.',
];

// Photos live in public/. Captions say only what the photo shows.
const EMBARK_PHOTOS = [
  {
    src: '/embark-evolve-2018-slide.jpeg',
    width: 750,
    height: 1333,
    alt: 'A projector screen reading Evolve Women’s Conference, Thursday, March 8, 2018, UT Tyler Ornelas Activity Center, with a speaker standing beside it',
    caption: 'Evolve Women’s Conference, March 8, 2018, at the UT Tyler Ornelas Activity Center.',
  },
  {
    src: '/embark-evolve-2018-room.jpeg',
    width: 1333,
    height: 750,
    alt: 'A large room of women seated at round tables facing a projector screen during the Evolve Women’s Conference',
    caption: 'The room during the conference.',
  },
  {
    src: '/embark-end-of-year-2017.jpeg',
    width: 940,
    height: 788,
    alt: 'A group of women posing together in a restaurant, with the Embark logo in the corner of the photo',
    caption: 'An Embark Women end-of-year get-together, 2017.',
  },
];

const EMBARK_LOGO = { src: '/embark-logo.jpeg', width: 400, height: 400, alt: 'Embark Women logo' };

module.exports = { LEADERSHIP, EMBARK, EMBARK_PHOTOS, EMBARK_LOGO };
