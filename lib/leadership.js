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
    text: 'Merge requests were taking too long and people kept missing steps, like testing the code, checking the wording, or leaving specific comments. I found a checklist and adapted it into one place to check testing and review steps, for both preparing and reviewing merge requests. I took it to the CTO, who adopted it, and all engineers used it. The company has kept updating it for about six years. I saw merges go from weeks to days through fewer missed checks and less rework. That is what I observed, not a formally measured average.',
  },
];

const EMBARK = [
  'Co-founder of Embark Women (2017–2022), a community built to expand professional opportunity, mentorship, and connection for women in Tyler, TX, with a no-selling policy to keep it relationship-focused. I joined the founder early and helped build it from the ground up. Over the years we ran 20+ programs for 500+ participants (counted conservatively), grew to 800+ members on Facebook, and I supported 150+ members with career and business guidance.',
  'I did community development, social media marketing, posts, outreach emails, websites, podcast hosting, and the background work that keeps a group going. My other co-founder handled finances and helped wherever I needed support. The split wasn’t strict. We did a lot together.',
  'For the Women’s Day conferences I coordinated about 10–15 volunteers and organizers and helped with planning, press, meeting people and investors, food, and venues. I went to hotels and restaurants to ask about space. We ran a two-day conference with UT Tyler and other local women’s groups and raised around $5,000. Those numbers are approximate. We also held regular Embark Women / Strong Women meetings where people could talk with panel members. Restaurants hosted and provided the food, and around 50–60 people would show up.',
  'My co-founders and I also ran business-building, brainstorming, and website-building workshops for small business owners and entrepreneurs, with community members who knew the topics helping. At first my co-founder and I picked the events and topics. After every event we asked members for feedback and used it to plan what came next. A partnership with Coffee Outside supported the community, including podcast and livestream production at a community lab.',
  'Programs were built to be easy to join: free or low-cost options, flexible schedules, and attention to transportation, childcare, disability, and cultural needs. Speakers and stories prioritized women and underrepresented voices, and members’ photos and stories were shared only with consent. In 2022 it stopped operating as a nonprofit and continued as a regular group.',
];

module.exports = { LEADERSHIP, EMBARK };
