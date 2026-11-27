/* MCU Tracker — Bundled Application Logic */

/* ── js/data.js ── */
/* =============================================================
   MCU Tracker — Data (data.js)
   Complete MCU catalog + quiz content
   ============================================================= */

// Phase/Saga poster gradient palettes (no official art)
const PHASE_COLORS = {
  1: ['#1a1a2e', '#e94560'],
  2: ['#0f3460', '#533483'],
  3: ['#2b1055', '#d63384'],
  4: ['#1b1b2f', '#1f4068'],
  5: ['#162447', '#1f4068'],
  6: ['#0d1b2a', '#1b263b']
};

const SAGAS = {
  infinity: { id: 'infinity', name: 'The Infinity Saga', phases: [1, 2, 3] },
  multiverse: { id: 'multiverse', name: 'The Multiverse Saga', phases: [4, 5, 6] }
};

// ── MCU Titles ─────────────────────────────────────────────
// chronologicalOrder = in-universe timeline position
// releaseOrder = theatrical/streaming release sequence
const MCU_TITLES = [
  // ─── PHASE 1 ───
  {
    id: 'iron-man',
    name: 'Iron Man',
    type: 'movie',
    phase: 1,
    saga: 'infinity',
    releaseDate: '2008-05-02',
    releaseOrder: 1,
    chronologicalOrder: 3,
    runtime: 126,
    synopsis: 'Billionaire industrialist Tony Stark builds a high-tech suit of armor after being captured and builds a new identity as Iron Man.',
    postCreditCount: 1,
    tmdbId: 1726,
    tmdbType: 'movie'
  },
  {
    id: 'incredible-hulk',
    name: 'The Incredible Hulk',
    type: 'movie',
    phase: 1,
    saga: 'infinity',
    releaseDate: '2008-06-13',
    releaseOrder: 2,
    chronologicalOrder: 4,
    runtime: 112,
    synopsis: 'Scientist Bruce Banner desperately seeks a cure for the gamma radiation that turned him into the monstrous Hulk.',
    postCreditCount: 1,
    tmdbId: 1724,
    tmdbType: 'movie'
  },
  {
    id: 'iron-man-2',
    name: 'Iron Man 2',
    type: 'movie',
    phase: 1,
    saga: 'infinity',
    releaseDate: '2010-05-07',
    releaseOrder: 3,
    chronologicalOrder: 5,
    runtime: 124,
    synopsis: 'Tony Stark faces pressure from the government, the press, and the public to share his technology with the military while dealing with new threats.',
    postCreditCount: 1,
    tmdbId: 10138,
    tmdbType: 'movie'
  },
  {
    id: 'thor',
    name: 'Thor',
    type: 'movie',
    phase: 1,
    saga: 'infinity',
    releaseDate: '2011-05-06',
    releaseOrder: 4,
    chronologicalOrder: 6,
    runtime: 115,
    synopsis: 'The powerful but arrogant warrior Thor is cast out of Asgard and sent to live among humans on Earth, where he learns what it takes to be a true hero.',
    postCreditCount: 1,
    tmdbId: 10195,
    tmdbType: 'movie'
  },
  {
    id: 'captain-america-tfa',
    name: 'Captain America: The First Avenger',
    type: 'movie',
    phase: 1,
    saga: 'infinity',
    releaseDate: '2011-07-22',
    releaseOrder: 5,
    chronologicalOrder: 1,
    runtime: 124,
    synopsis: 'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a super-soldier serum during World War II.',
    postCreditCount: 1,
    tmdbId: 1771,
    tmdbType: 'movie'
  },
  {
    id: 'avengers',
    name: 'The Avengers',
    type: 'movie',
    phase: 1,
    saga: 'infinity',
    releaseDate: '2012-05-04',
    releaseOrder: 6,
    chronologicalOrder: 8,
    runtime: 143,
    synopsis: 'Earth\'s mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.',
    postCreditCount: 2,
    tmdbId: 24428,
    tmdbType: 'movie'
  },

  // ─── PHASE 2 ───
  {
    id: 'iron-man-3',
    name: 'Iron Man 3',
    type: 'movie',
    phase: 2,
    saga: 'infinity',
    releaseDate: '2013-05-03',
    releaseOrder: 7,
    chronologicalOrder: 9,
    runtime: 130,
    synopsis: 'Tony Stark faces a powerful enemy called the Mandarin that destroys his personal world, pushing him to rely on his ingenuity.',
    postCreditCount: 1,
    tmdbId: 68721,
    tmdbType: 'movie'
  },
  {
    id: 'thor-dark-world',
    name: 'Thor: The Dark World',
    type: 'movie',
    phase: 2,
    saga: 'infinity',
    releaseDate: '2013-11-08',
    releaseOrder: 8,
    chronologicalOrder: 10,
    runtime: 112,
    synopsis: 'Thor fights to save the Nine Realms from a dark enemy that predates the universe itself — the Dark Elves led by Malekith.',
    postCreditCount: 2,
    tmdbId: 76338,
    tmdbType: 'movie'
  },
  {
    id: 'captain-america-ws',
    name: 'Captain America: The Winter Soldier',
    type: 'movie',
    phase: 2,
    saga: 'infinity',
    releaseDate: '2014-04-04',
    releaseOrder: 9,
    chronologicalOrder: 11,
    runtime: 136,
    synopsis: 'Steve Rogers struggles to embrace his role in the modern world while battling a new threat from within S.H.I.E.L.D.',
    postCreditCount: 2,
    tmdbId: 100402,
    tmdbType: 'movie'
  },
  {
    id: 'guardians-1',
    name: 'Guardians of the Galaxy',
    type: 'movie',
    phase: 2,
    saga: 'infinity',
    releaseDate: '2014-08-01',
    releaseOrder: 10,
    chronologicalOrder: 12,
    runtime: 121,
    synopsis: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
    postCreditCount: 2,
    tmdbId: 118340,
    tmdbType: 'movie'
  },
  {
    id: 'avengers-aou',
    name: 'Avengers: Age of Ultron',
    type: 'movie',
    phase: 2,
    saga: 'infinity',
    releaseDate: '2015-05-01',
    releaseOrder: 11,
    chronologicalOrder: 13,
    runtime: 141,
    synopsis: 'The Avengers reassemble to stop Ultron, an artificial intelligence created by Tony Stark that plans to destroy humanity.',
    postCreditCount: 1,
    tmdbId: 99861,
    tmdbType: 'movie'
  },
  {
    id: 'ant-man',
    name: 'Ant-Man',
    type: 'movie',
    phase: 2,
    saga: 'infinity',
    releaseDate: '2015-07-17',
    releaseOrder: 12,
    chronologicalOrder: 14,
    runtime: 117,
    synopsis: 'Armed with a super-suit that shrinks in scale but increases in strength, Scott Lang must help his mentor protect the secret behind the Ant-Man suit.',
    postCreditCount: 2,
    tmdbId: 102899,
    tmdbType: 'movie'
  },

  // ─── PHASE 3 ───
  {
    id: 'captain-america-cw',
    name: 'Captain America: Civil War',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2016-05-06',
    releaseOrder: 13,
    chronologicalOrder: 15,
    runtime: 147,
    synopsis: 'Political involvement in the Avengers\' affairs causes a rift between Captain America and Iron Man, splitting the team.',
    postCreditCount: 2,
    tmdbId: 271110,
    tmdbType: 'movie'
  },
  {
    id: 'doctor-strange',
    name: 'Doctor Strange',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2016-11-04',
    releaseOrder: 14,
    chronologicalOrder: 16,
    runtime: 115,
    synopsis: 'A brilliant neurosurgeon discovers the hidden world of mysticism and alternate dimensions after a devastating car accident.',
    postCreditCount: 2,
    tmdbId: 284052,
    tmdbType: 'movie'
  },
  {
    id: 'guardians-2',
    name: 'Guardians of the Galaxy Vol. 2',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2017-05-05',
    releaseOrder: 15,
    chronologicalOrder: 17,
    runtime: 136,
    synopsis: 'The Guardians struggle to keep together as a team while dealing with their personal family issues, including Star-Lord\'s mysterious parentage.',
    postCreditCount: 5,
    tmdbId: 283995,
    tmdbType: 'movie'
  },
  {
    id: 'spider-man-hc',
    name: 'Spider-Man: Homecoming',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2017-07-07',
    releaseOrder: 16,
    chronologicalOrder: 18,
    runtime: 133,
    synopsis: 'Peter Parker balances his life as a high school student with being the hero Spider-Man while facing a new menace, the Vulture.',
    postCreditCount: 2,
    tmdbId: 315635,
    tmdbType: 'movie'
  },
  {
    id: 'thor-ragnarok',
    name: 'Thor: Ragnarok',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2017-11-03',
    releaseOrder: 17,
    chronologicalOrder: 19,
    runtime: 130,
    synopsis: 'Thor is imprisoned on the planet Sakaar and must race against time to return to Asgard and stop Ragnarok — the destruction of his world.',
    postCreditCount: 2,
    tmdbId: 284053,
    tmdbType: 'movie'
  },
  {
    id: 'black-panther',
    name: 'Black Panther',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2018-02-16',
    releaseOrder: 18,
    chronologicalOrder: 20,
    runtime: 134,
    synopsis: 'T\'Challa returns home as king of Wakanda but finds his sovereignty challenged by a long-time adversary in a conflict with global consequences.',
    postCreditCount: 2,
    tmdbId: 284054,
    tmdbType: 'movie'
  },
  {
    id: 'avengers-iw',
    name: 'Avengers: Infinity War',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2018-04-27',
    releaseOrder: 19,
    chronologicalOrder: 21,
    runtime: 149,
    synopsis: 'The Avengers and their allies attempt to stop Thanos from collecting the six Infinity Stones, artifacts of unimaginable power.',
    postCreditCount: 1,
    tmdbId: 299536,
    tmdbType: 'movie'
  },
  {
    id: 'ant-man-wasp',
    name: 'Ant-Man and the Wasp',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2018-07-06',
    releaseOrder: 20,
    chronologicalOrder: 22,
    runtime: 118,
    synopsis: 'Scott Lang partners with Hope van Dyne and Dr. Hank Pym on a new mission to rescue Janet van Dyne from the Quantum Realm.',
    postCreditCount: 2,
    tmdbId: 363088,
    tmdbType: 'movie'
  },
  {
    id: 'captain-marvel',
    name: 'Captain Marvel',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2019-03-08',
    releaseOrder: 21,
    chronologicalOrder: 2,
    runtime: 124,
    synopsis: 'Carol Danvers becomes one of the universe\'s most powerful heroes in the midst of a galactic war between two alien races.',
    postCreditCount: 2,
    tmdbId: 299537,
    tmdbType: 'movie'
  },
  {
    id: 'avengers-endgame',
    name: 'Avengers: Endgame',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2019-04-26',
    releaseOrder: 22,
    chronologicalOrder: 23,
    runtime: 181,
    synopsis: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    postCreditCount: 0,
    tmdbId: 299534,
    tmdbType: 'movie'
  },
  {
    id: 'spider-man-ffh',
    name: 'Spider-Man: Far From Home',
    type: 'movie',
    phase: 3,
    saga: 'infinity',
    releaseDate: '2019-07-02',
    releaseOrder: 23,
    chronologicalOrder: 24,
    runtime: 129,
    synopsis: 'Peter Parker goes on a European vacation but is recruited by Nick Fury to battle elemental creatures threatening the continent.',
    postCreditCount: 2,
    tmdbId: 429617,
    tmdbType: 'movie'
  },

  // ─── PHASE 4 ───
  {
    id: 'wandavision',
    name: 'WandaVision',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-01-15',
    releaseOrder: 24,
    chronologicalOrder: 25,
    runtime: 350,
    synopsis: 'Wanda Maximoff and Vision live their ideal suburban lives in Westview, but begin to suspect that everything is not as it seems.',
    postCreditCount: 0,
    tmdbId: 85271,
    tmdbType: 'tv'
  },
  {
    id: 'falcon-ws',
    name: 'The Falcon and the Winter Soldier',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-03-19',
    releaseOrder: 25,
    chronologicalOrder: 26,
    runtime: 360,
    synopsis: 'Sam Wilson and Bucky Barnes team up on a global adventure that tests their abilities and their patience.',
    postCreditCount: 0,
    tmdbId: 88396,
    tmdbType: 'tv'
  },
  {
    id: 'loki-s1',
    name: 'Loki (Season 1)',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-06-09',
    releaseOrder: 26,
    chronologicalOrder: 27,
    runtime: 360,
    synopsis: 'The mercurial villain Loki resumes his role as the God of Mischief after escaping during the events of Endgame, landing before the TVA.',
    postCreditCount: 0,
    tmdbId: 84958,
    tmdbType: 'tv'
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-07-09',
    releaseOrder: 27,
    chronologicalOrder: 7,
    runtime: 134,
    synopsis: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy ties to her past as a spy.',
    postCreditCount: 1,
    tmdbId: 497698,
    tmdbType: 'movie'
  },
  {
    id: 'what-if-s1',
    name: 'What If...? (Season 1)',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-08-11',
    releaseOrder: 28,
    chronologicalOrder: 28,
    runtime: 300,
    synopsis: 'The Watcher narrates tales exploring how pivotal moments in the MCU would have unfolded differently.',
    postCreditCount: 0,
    tmdbId: 91363,
    tmdbType: 'tv'
  },
  {
    id: 'shang-chi',
    name: 'Shang-Chi and the Legend of the Ten Rings',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-09-03',
    releaseOrder: 29,
    chronologicalOrder: 29,
    runtime: 132,
    synopsis: 'Shang-Chi, the master of unarmed weaponry-based kung fu, is forced to confront his past when drawn into the Ten Rings organization.',
    postCreditCount: 2,
    tmdbId: 566525,
    tmdbType: 'movie'
  },
  {
    id: 'eternals',
    name: 'Eternals',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-11-05',
    releaseOrder: 30,
    chronologicalOrder: 30,
    runtime: 157,
    synopsis: 'The Eternals, ancient aliens who have been living on Earth in secret for thousands of years, must reunite to battle the Deviants.',
    postCreditCount: 2,
    tmdbId: 524434,
    tmdbType: 'movie'
  },
  {
    id: 'hawkeye',
    name: 'Hawkeye',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-11-24',
    releaseOrder: 31,
    chronologicalOrder: 31,
    runtime: 360,
    synopsis: 'Clint Barton must work with young archer Kate Bishop to confront enemies from his past as Ronin.',
    postCreditCount: 0,
    tmdbId: 88329,
    tmdbType: 'tv'
  },
  {
    id: 'spider-man-nwh',
    name: 'Spider-Man: No Way Home',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2021-12-17',
    releaseOrder: 32,
    chronologicalOrder: 32,
    runtime: 148,
    synopsis: 'Peter Parker seeks help from Doctor Strange when his identity is revealed, accidentally opening the multiverse.',
    postCreditCount: 2,
    tmdbId: 634649,
    tmdbType: 'movie'
  },
  {
    id: 'moon-knight',
    name: 'Moon Knight',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-03-30',
    releaseOrder: 33,
    chronologicalOrder: 33,
    runtime: 360,
    synopsis: 'Steven Grant discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector, the avatar of Khonshu.',
    postCreditCount: 0,
    tmdbId: 92749,
    tmdbType: 'tv'
  },
  {
    id: 'doctor-strange-mom',
    name: 'Doctor Strange in the Multiverse of Madness',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-05-06',
    releaseOrder: 34,
    chronologicalOrder: 34,
    runtime: 126,
    synopsis: 'Doctor Strange traverses the multiverse to protect a teenager with the power to travel between dimensions from the Scarlet Witch.',
    postCreditCount: 2,
    tmdbId: 453395,
    tmdbType: 'movie'
  },
  {
    id: 'ms-marvel',
    name: 'Ms. Marvel',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-06-08',
    releaseOrder: 35,
    chronologicalOrder: 35,
    runtime: 360,
    synopsis: 'Kamala Khan, a teenager and avid fan, discovers she has superpowers and takes on the mantle of Ms. Marvel.',
    postCreditCount: 0,
    tmdbId: 92782,
    tmdbType: 'tv'
  },
  {
    id: 'thor-love-thunder',
    name: 'Thor: Love and Thunder',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-07-08',
    releaseOrder: 36,
    chronologicalOrder: 36,
    runtime: 118,
    synopsis: 'Thor enlists the help of Valkyrie, Korg, and Jane Foster to fight Gorr the God Butcher, who seeks to make the gods extinct.',
    postCreditCount: 2,
    tmdbId: 616037,
    tmdbType: 'movie'
  },
  {
    id: 'she-hulk',
    name: 'She-Hulk: Attorney at Law',
    type: 'series',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-08-18',
    releaseOrder: 37,
    chronologicalOrder: 37,
    runtime: 300,
    synopsis: 'Jennifer Walters, an attorney and cousin of Bruce Banner, navigates life as a Hulk and practices law specializing in superhero cases.',
    postCreditCount: 0,
    tmdbId: 92783,
    tmdbType: 'tv'
  },
  {
    id: 'werewolf-by-night',
    name: 'Werewolf by Night',
    type: 'special',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-10-07',
    releaseOrder: 38,
    chronologicalOrder: 38,
    runtime: 53,
    synopsis: 'Monster hunters gather at Bloodstone Manor to compete for a powerful relic, but the night takes a dangerous turn.',
    postCreditCount: 0,
    tmdbId: 894205,
    tmdbType: 'movie'
  },
  {
    id: 'black-panther-wf',
    name: 'Black Panther: Wakanda Forever',
    type: 'movie',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-11-11',
    releaseOrder: 39,
    chronologicalOrder: 39,
    runtime: 161,
    synopsis: 'The people of Wakanda fight to protect their nation from intervening world powers while mourning the death of King T\'Challa.',
    postCreditCount: 2,
    tmdbId: 505642,
    tmdbType: 'movie'
  },
  {
    id: 'gotg-holiday',
    name: 'The Guardians of the Galaxy Holiday Special',
    type: 'special',
    phase: 4,
    saga: 'multiverse',
    releaseDate: '2022-11-25',
    releaseOrder: 40,
    chronologicalOrder: 40,
    runtime: 44,
    synopsis: 'The Guardians of the Galaxy travel to Earth to find the perfect holiday gift for Star-Lord.',
    postCreditCount: 0,
    tmdbId: 774752,
    tmdbType: 'movie'
  },

  // ─── PHASE 5 ───
  {
    id: 'ant-man-quantumania',
    name: 'Ant-Man and the Wasp: Quantumania',
    type: 'movie',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2023-02-17',
    releaseOrder: 41,
    chronologicalOrder: 41,
    runtime: 124,
    synopsis: 'Scott Lang and Hope van Dyne are pulled into the Quantum Realm along with their family, where they face Kang the Conqueror.',
    postCreditCount: 2,
    tmdbId: 640146,
    tmdbType: 'movie'
  },
  {
    id: 'guardians-3',
    name: 'Guardians of the Galaxy Vol. 3',
    type: 'movie',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2023-05-05',
    releaseOrder: 42,
    chronologicalOrder: 42,
    runtime: 150,
    synopsis: 'The Guardians embark on a mission to protect Rocket from his dangerous past while facing the High Evolutionary.',
    postCreditCount: 2,
    tmdbId: 447365,
    tmdbType: 'movie'
  },
  {
    id: 'secret-invasion',
    name: 'Secret Invasion',
    type: 'series',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2023-06-21',
    releaseOrder: 43,
    chronologicalOrder: 43,
    runtime: 300,
    synopsis: 'Nick Fury discovers that shape-shifting Skrulls have been infiltrating Earth for years as he races to foil an imminent invasion.',
    postCreditCount: 0,
    tmdbId: 114472,
    tmdbType: 'tv'
  },
  {
    id: 'loki-s2',
    name: 'Loki (Season 2)',
    type: 'series',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2023-10-05',
    releaseOrder: 44,
    chronologicalOrder: 44,
    runtime: 360,
    synopsis: 'Loki navigates an ever-expanding multiverse in search of answers alongside Mobius, Sylvie, and a team of new and returning characters.',
    postCreditCount: 0,
    tmdbId: 84958,
    tmdbType: 'tv'
  },
  {
    id: 'the-marvels',
    name: 'The Marvels',
    type: 'movie',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2023-11-10',
    releaseOrder: 45,
    chronologicalOrder: 45,
    runtime: 105,
    synopsis: 'Carol Danvers, Kamala Khan, and Monica Rambeau begin swapping places with each other every time they use their powers.',
    postCreditCount: 2,
    tmdbId: 609681,
    tmdbType: 'movie'
  },
  {
    id: 'echo',
    name: 'Echo',
    type: 'series',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2024-01-09',
    releaseOrder: 46,
    chronologicalOrder: 46,
    runtime: 300,
    synopsis: 'Maya Lopez must face her past, reconnect with her roots, and embrace the meaning of family as she fights the Kingpin.',
    postCreditCount: 0,
    tmdbId: 122226,
    tmdbType: 'tv'
  },
  {
    id: 'deadpool-wolverine',
    name: 'Deadpool & Wolverine',
    type: 'movie',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2024-07-26',
    releaseOrder: 47,
    chronologicalOrder: 47,
    runtime: 128,
    synopsis: 'Deadpool joins the MCU in the most unexpected way, teaming up with Wolverine for a multiverse adventure.',
    postCreditCount: 1,
    tmdbId: 533535,
    tmdbType: 'movie'
  },
  {
    id: 'agatha-all-along',
    name: 'Agatha All Along',
    type: 'series',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2024-09-18',
    releaseOrder: 48,
    chronologicalOrder: 48,
    runtime: 360,
    synopsis: 'Agatha Harkness gathers a coven of witches and sets off down the Witches\' Road, a series of magical trials.',
    postCreditCount: 0,
    tmdbId: 138501,
    tmdbType: 'tv'
  },
  {
    id: 'captain-america-bnw',
    name: 'Captain America: Brave New World',
    type: 'movie',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2025-02-14',
    releaseOrder: 49,
    chronologicalOrder: 49,
    runtime: 119,
    synopsis: 'Sam Wilson as Captain America finds himself in the middle of an international incident involving the newly elected U.S. President.',
    postCreditCount: 2,
    tmdbId: 822119,
    tmdbType: 'movie'
  },
  {
    id: 'thunderbolts',
    name: 'Thunderbolts*',
    type: 'movie',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2025-05-02',
    releaseOrder: 50,
    chronologicalOrder: 50,
    runtime: 127,
    synopsis: 'A group of antiheroes and reformed villains are recruited for dangerous government missions they may not survive.',
    postCreditCount: 2,
    tmdbId: 986056,
    tmdbType: 'movie'
  },
  {
    id: 'ironheart',
    name: 'Ironheart',
    type: 'series',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2025-06-24',
    releaseOrder: 51,
    chronologicalOrder: 51,
    runtime: 360,
    synopsis: 'MIT inventor Riri Williams creates the most advanced suit of armor since Iron Man and must face the consequences.',
    postCreditCount: 0,
    tmdbId: 114471,
    tmdbType: 'tv'
  },
  {
    id: 'daredevil-ba',
    name: 'Daredevil: Born Again',
    type: 'series',
    phase: 5,
    saga: 'multiverse',
    releaseDate: '2025-03-04',
    releaseOrder: 52,
    chronologicalOrder: 52,
    runtime: 540,
    synopsis: 'Matt Murdock continues his fight for justice as Daredevil while Wilson Fisk pursues his own political ambitions in New York.',
    postCreditCount: 0,
    tmdbId: 202555,
    tmdbType: 'tv'
  },

  // ─── PHASE 6 ───
  {
    id: 'fantastic-four',
    name: 'The Fantastic Four: First Steps',
    type: 'movie',
    phase: 6,
    saga: 'multiverse',
    releaseDate: '2025-07-25',
    releaseOrder: 53,
    chronologicalOrder: 53,
    runtime: 140,
    synopsis: 'Marvel\'s first family of superheroes takes their first steps into the wider MCU multiverse.',
    postCreditCount: 2,
    tmdbId: 617126,
    tmdbType: 'movie'
  },
  {
    id: 'avengers-doomsday',
    name: 'Avengers: Doomsday',
    type: 'movie',
    phase: 6,
    saga: 'multiverse',
    releaseDate: '2026-05-01',
    releaseOrder: 54,
    chronologicalOrder: 54,
    runtime: 150,
    synopsis: 'The Avengers face the most dangerous threat yet as Doctor Doom emerges from the multiverse.',
    postCreditCount: 2,
    tmdbId: 1003596,
    tmdbType: 'movie'
  },
  {
    id: 'avengers-secret-wars',
    name: 'Avengers: Secret Wars',
    type: 'movie',
    phase: 6,
    saga: 'multiverse',
    releaseDate: '2027-05-07',
    releaseOrder: 55,
    chronologicalOrder: 55,
    runtime: 180,
    synopsis: 'The ultimate battle across the multiverse that will reshape the MCU forever.',
    postCreditCount: 0,
    tmdbId: 1003598,
    tmdbType: 'movie'
  }
];

// ── Recommended Order ──────────────────────────────────────
// A curated "best" order for newcomers (mostly release, with some swaps)
const RECOMMENDED_ORDER = [
  'iron-man', 'captain-america-tfa', 'iron-man-2', 'incredible-hulk',
  'thor', 'avengers', 'iron-man-3', 'thor-dark-world',
  'captain-america-ws', 'guardians-1', 'avengers-aou', 'ant-man',
  'captain-america-cw', 'black-widow', 'black-panther', 'spider-man-hc',
  'doctor-strange', 'thor-ragnarok', 'guardians-2', 'ant-man-wasp',
  'captain-marvel', 'avengers-iw', 'avengers-endgame', 'spider-man-ffh',
  'wandavision', 'falcon-ws', 'loki-s1', 'what-if-s1',
  'shang-chi', 'eternals', 'hawkeye', 'spider-man-nwh',
  'moon-knight', 'doctor-strange-mom', 'ms-marvel', 'thor-love-thunder',
  'she-hulk', 'werewolf-by-night', 'black-panther-wf', 'gotg-holiday',
  'ant-man-quantumania', 'guardians-3', 'secret-invasion', 'loki-s2',
  'the-marvels', 'echo', 'deadpool-wolverine', 'agatha-all-along',
  'captain-america-bnw', 'thunderbolts', 'ironheart', 'daredevil-ba',
  'fantastic-four', 'avengers-doomsday', 'avengers-secret-wars'
];


// ── Quiz Data ──────────────────────────────────────────────

const QUIZ_CATEGORIES = [
  {
    id: 'general',
    title: 'General MCU Knowledge',
    icon: 'clapperboard',
    difficulty: 'casual',
    questions: [
      {
        q: 'Which film kicked off the Marvel Cinematic Universe?',
        options: ['Iron Man', 'The Incredible Hulk', 'Captain America: The First Avenger', 'Thor'],
        correct: 0,
        explanation: 'Iron Man (2008) was the first film released in the MCU, launching the entire franchise.'
      },
      {
        q: 'What is the name of Thor\'s enchanted hammer?',
        options: ['Stormbreaker', 'Gungnir', 'Mjolnir', 'Hofund'],
        correct: 2,
        explanation: 'Mjolnir is Thor\'s iconic hammer, forged from Uru metal in the heart of a dying star.'
      },
      {
        q: 'How many Infinity Stones are there?',
        options: ['4', '5', '6', '8'],
        correct: 2,
        explanation: 'There are six Infinity Stones: Space, Mind, Reality, Power, Time, and Soul.'
      },
      {
        q: 'What is the name of Black Panther\'s homeland?',
        options: ['Sokovia', 'Wakanda', 'Kamar-Taj', 'Asgard'],
        correct: 1,
        explanation: 'Wakanda is a technologically advanced African nation, home of the Black Panther.'
      },
      {
        q: 'Which Avenger is known as the "God of Mischief"?',
        options: ['Thor', 'Loki', 'Hela', 'Odin'],
        correct: 1,
        explanation: 'Loki, Thor\'s adopted brother, is the Asgardian God of Mischief.'
      },
      {
        q: 'What year was the first Avengers movie released?',
        options: ['2010', '2011', '2012', '2013'],
        correct: 2,
        explanation: 'The Avengers was released on May 4, 2012, bringing the Phase 1 heroes together.'
      },
      {
        q: 'What metal is Captain America\'s shield made from?',
        options: ['Adamantium', 'Uru', 'Vibranium', 'Titanium'],
        correct: 2,
        explanation: 'Captain America\'s shield is made of vibranium, the strongest metal on Earth in the MCU.'
      },
      {
        q: 'Who directed the first two Avengers films?',
        options: ['The Russo Brothers', 'Joss Whedon', 'Jon Favreau', 'Taika Waititi'],
        correct: 1,
        explanation: 'Joss Whedon directed both The Avengers (2012) and Avengers: Age of Ultron (2015).'
      },
      {
        q: 'What is the name of Tony Stark\'s AI assistant in the Iron Man films?',
        options: ['Friday', 'Jarvis', 'Karen', 'Edith'],
        correct: 1,
        explanation: 'J.A.R.V.I.S. (Just A Rather Very Intelligent System) was Tony Stark\'s original AI assistant.'
      },
      {
        q: 'Which MCU film has the longest runtime?',
        options: ['Avengers: Infinity War', 'Avengers: Endgame', 'Eternals', 'Black Panther: Wakanda Forever'],
        correct: 1,
        explanation: 'Avengers: Endgame runs 181 minutes (3 hours 1 minute), the longest MCU film.'
      }
    ]
  },
  {
    id: 'villains',
    title: 'Guess the Villain',
    icon: 'skull',
    difficulty: 'die-hard',
    questions: [
      {
        q: 'Who is the main villain of the Infinity Saga?',
        options: ['Ultron', 'Loki', 'Thanos', 'Kang'],
        correct: 2,
        explanation: 'Thanos, the Mad Titan, is the overarching villain who collected all six Infinity Stones.'
      },
      {
        q: 'What is the real name of the villain Killmonger?',
        options: ['N\'Jadaka', 'M\'Baku', 'W\'Kabi', 'Zuri'],
        correct: 0,
        explanation: 'Erik "Killmonger" Stevens was born N\'Jadaka, son of Prince N\'Jobu of Wakanda.'
      },
      {
        q: 'Who created Ultron in the MCU?',
        options: ['Hank Pym', 'Bruce Banner', 'Tony Stark and Bruce Banner', 'Nick Fury'],
        correct: 2,
        explanation: 'In the MCU, Tony Stark and Bruce Banner created Ultron as a global peacekeeping program.'
      },
      {
        q: 'Which villain is known as the "Sorcerer Supreme of the Dark Dimension"?',
        options: ['Mordo', 'Kaecilius', 'Dormammu', 'The Ancient One'],
        correct: 2,
        explanation: 'Dormammu is the ruler of the Dark Dimension, whom Doctor Strange defeated with a time loop.'
      },
      {
        q: 'Who is the Vulture\'s civilian identity?',
        options: ['Adrian Toomes', 'Norman Osborn', 'Mac Gargan', 'Herman Schultz'],
        correct: 0,
        explanation: 'Adrian Toomes is the Vulture, played by Michael Keaton in Spider-Man: Homecoming.'
      },
      {
        q: 'What organization does the villain Alexander Pierce lead?',
        options: ['A.I.M.', 'Hydra', 'S.W.O.R.D.', 'The Ten Rings'],
        correct: 1,
        explanation: 'Alexander Pierce was a senior leader of Hydra who had infiltrated S.H.I.E.L.D.'
      },
      {
        q: 'Who is the main antagonist of Thor: Ragnarok?',
        options: ['Surtur', 'The Grandmaster', 'Hela', 'Skurge'],
        correct: 2,
        explanation: 'Hela, the Goddess of Death and Thor\'s sister, was the primary villain of Ragnarok.'
      },
      {
        q: 'What is Mysterio\'s real name?',
        options: ['Quentin Beck', 'William Ginter Riva', 'Dmitri Smerdyakov', 'Max Dillon'],
        correct: 0,
        explanation: 'Quentin Beck, a former Stark Industries employee, became the illusion-casting Mysterio.'
      },
      {
        q: 'Which villain wields the Power Stone first in Guardians of the Galaxy?',
        options: ['Thanos', 'Ronan the Accuser', 'The Collector', 'Nebula'],
        correct: 1,
        explanation: 'Ronan the Accuser obtained the Power Stone and used it in his quest to destroy Xandar.'
      },
      {
        q: 'Who is the antagonist of Ant-Man?',
        options: ['Justin Hammer', 'Darren Cross', 'Sonny Burch', 'Mitchell Carson'],
        correct: 1,
        explanation: 'Darren Cross, also known as Yellowjacket, was Hank Pym\'s protégé turned villain.'
      }
    ]
  },
  {
    id: 'quotes',
    title: 'Guess the Quote',
    icon: 'message-circle',
    difficulty: 'die-hard',
    questions: [
      {
        q: '"I am Iron Man." Who said it first?',
        options: ['Pepper Potts', 'Tony Stark', 'James Rhodes', 'Nick Fury'],
        correct: 1,
        explanation: 'Tony Stark famously revealed his identity at the end of the first Iron Man film.'
      },
      {
        q: '"I can do this all day." Which character\'s catchphrase is this?',
        options: ['Thor', 'Iron Man', 'Captain America', 'Spider-Man'],
        correct: 2,
        explanation: 'Steve Rogers says this line multiple times throughout his appearances in the MCU.'
      },
      {
        q: '"We have a Hulk." Who says this to Loki?',
        options: ['Nick Fury', 'Tony Stark', 'Thor', 'Black Widow'],
        correct: 1,
        explanation: 'Tony Stark tells Loki "We have a Hulk" during their confrontation in Stark Tower.'
      },
      {
        q: '"I am Groot." How many characters speak this line?',
        options: ['Just 1', '2', '3', '4'],
        correct: 1,
        explanation: 'Both the original Groot and Baby/Teen Groot speak the iconic "I am Groot" line.'
      },
      {
        q: '"That\'s my secret, Captain. I\'m always angry." Who said this?',
        options: ['Tony Stark', 'Natasha Romanoff', 'Bruce Banner', 'Nick Fury'],
        correct: 2,
        explanation: 'Bruce Banner reveals his secret to controlling the Hulk during the Battle of New York.'
      },
      {
        q: '"Wakanda forever!" In which film was this phrase first spoken?',
        options: ['Captain America: Civil War', 'Black Panther', 'Avengers: Infinity War', 'Avengers: Endgame'],
        correct: 1,
        explanation: 'The phrase "Wakanda forever!" with the crossed arms salute debuted in Black Panther (2018).'
      },
      {
        q: '"With great power comes great responsibility." Is this line spoken in the MCU?',
        options: ['Yes, by Uncle Ben', 'Yes, by Aunt May', 'Yes, by Tony Stark', 'It\'s never spoken verbatim in the MCU'],
        correct: 1,
        explanation: 'Aunt May says a version of this iconic line in Spider-Man: No Way Home.'
      },
      {
        q: '"Puny god." Who says this after smashing Loki?',
        options: ['Thor', 'Hulk', 'Iron Man', 'Captain America'],
        correct: 1,
        explanation: 'The Hulk famously smashes Loki and mutters "Puny god" in The Avengers.'
      },
      {
        q: '"Avengers… assemble." In which film does Captain America finally say the full phrase?',
        options: ['The Avengers', 'Avengers: Age of Ultron', 'Avengers: Infinity War', 'Avengers: Endgame'],
        correct: 3,
        explanation: 'Steve Rogers finally says the complete "Avengers, assemble!" during the final battle in Endgame.'
      },
      {
        q: '"I love you 3000." Who says this to Tony Stark?',
        options: ['Pepper Potts', 'Morgan Stark', 'Peter Parker', 'Happy Hogan'],
        correct: 1,
        explanation: 'Morgan Stark, Tony\'s daughter, says "I love you 3000" — a phrase Tony later echoes.'
      }
    ]
  },
  {
    id: 'phases',
    title: 'MCU Phases & Sagas',
    icon: 'layers',
    difficulty: 'casual',
    questions: [
      {
        q: 'How many phases make up the Infinity Saga?',
        options: ['2', '3', '4', '5'],
        correct: 1,
        explanation: 'The Infinity Saga spans Phase 1, Phase 2, and Phase 3 of the MCU.'
      },
      {
        q: 'Which film ends Phase 3 of the MCU?',
        options: ['Avengers: Endgame', 'Spider-Man: Far From Home', 'Black Widow', 'WandaVision'],
        correct: 1,
        explanation: 'Spider-Man: Far From Home is officially the final film of Phase 3 and the Infinity Saga.'
      },
      {
        q: 'What is the name of the second MCU saga?',
        options: ['The Kang Dynasty', 'The Multiverse Saga', 'The New Avengers Saga', 'The Dark Saga'],
        correct: 1,
        explanation: 'The Multiverse Saga encompasses Phases 4, 5, and 6 of the MCU.'
      },
      {
        q: 'Which was the first Disney+ MCU series?',
        options: ['Loki', 'The Falcon and the Winter Soldier', 'WandaVision', 'Hawkeye'],
        correct: 2,
        explanation: 'WandaVision premiered on January 15, 2021, becoming the first MCU Disney+ series.'
      },
      {
        q: 'Which Phase 1 film was released first?',
        options: ['Thor', 'Captain America: The First Avenger', 'Iron Man', 'The Incredible Hulk'],
        correct: 2,
        explanation: 'Iron Man (May 2008) was the first MCU film ever released.'
      },
      {
        q: 'How many films are in Phase 1?',
        options: ['4', '5', '6', '7'],
        correct: 2,
        explanation: 'Phase 1 has 6 films: Iron Man through The Avengers.'
      },
      {
        q: 'Which Phase 4 film features the multiverse prominently?',
        options: ['Eternals', 'Shang-Chi', 'Spider-Man: No Way Home', 'Black Widow'],
        correct: 2,
        explanation: 'Spider-Man: No Way Home features villains and heroes from across the multiverse.'
      },
      {
        q: 'What is the last confirmed film of the Multiverse Saga?',
        options: ['Avengers: Doomsday', 'Avengers: Secret Wars', 'Fantastic Four', 'Thunderbolts'],
        correct: 1,
        explanation: 'Avengers: Secret Wars is set to be the culminating event of the Multiverse Saga.'
      },
      {
        q: 'Which Phase 2 film introduced the Guardians of the Galaxy?',
        options: ['Thor: The Dark World', 'Guardians of the Galaxy', 'Ant-Man', 'Iron Man 3'],
        correct: 1,
        explanation: 'Guardians of the Galaxy (2014) debuted in Phase 2, introducing the cosmic MCU.'
      },
      {
        q: 'Which MCU "special presentation" was released during Phase 4?',
        options: ['I Am Groot', 'Werewolf by Night', 'The Guardians Holiday Special', 'Both B and C'],
        correct: 3,
        explanation: 'Both Werewolf by Night and the Guardians Holiday Special were Phase 4 specials.'
      }
    ]
  },
  {
    id: 'characters',
    title: 'Character Deep Dive',
    icon: 'user',
    difficulty: 'die-hard',
    questions: [
      {
        q: 'What is Hawkeye\'s real name?',
        options: ['Bucky Barnes', 'Clint Barton', 'Sam Wilson', 'Scott Lang'],
        correct: 1,
        explanation: 'Clinton "Clint" Barton is the expert archer known as Hawkeye.'
      },
      {
        q: 'Which character becomes the new Captain America after Steve Rogers?',
        options: ['Bucky Barnes', 'Sam Wilson', 'John Walker', 'Eli Bradley'],
        correct: 1,
        explanation: 'Sam Wilson (The Falcon) takes up the shield and becomes the new Captain America.'
      },
      {
        q: 'What is Scarlet Witch\'s real name?',
        options: ['Wanda Maximoff', 'Natasha Romanoff', 'Carol Danvers', 'Agatha Harkness'],
        correct: 0,
        explanation: 'Wanda Maximoff is the Scarlet Witch, one of the most powerful beings in the MCU.'
      },
      {
        q: 'How many MCU films has Nick Fury appeared in (through 2024)?',
        options: ['5-7', '8-10', '11-13', '14+'],
        correct: 2,
        explanation: 'Nick Fury has appeared in over 11 MCU films, often in post-credit scenes.'
      },
      {
        q: 'What is Black Widow\'s birth name?',
        options: ['Natasha Romanoff', 'Natalia Alianovna Romanova', 'Yelena Belova', 'Melina Vostokoff'],
        correct: 1,
        explanation: 'Natasha was born Natalia Alianovna Romanova before taking the anglicized name Natasha Romanoff.'
      },
      {
        q: 'Which Infinity Stone was hidden on Vormir?',
        options: ['Time Stone', 'Mind Stone', 'Soul Stone', 'Reality Stone'],
        correct: 2,
        explanation: 'The Soul Stone was on Vormir, guarded by Red Skull, requiring a sacrifice to obtain.'
      },
      {
        q: 'What is the name of Doctor Strange\'s magical cloak?',
        options: ['The Cloak of Destiny', 'The Cloak of Levitation', 'The Cape of Vishanti', 'The Mantle of Magic'],
        correct: 1,
        explanation: 'The Cloak of Levitation chose Doctor Strange and has a mind of its own.'
      },
      {
        q: 'Who is Peter Quill\'s father in the MCU?',
        options: ['J\'son of Spartax', 'Ego the Living Planet', 'Thanos', 'Yondu Udonta'],
        correct: 1,
        explanation: 'In the MCU, Ego the Living Planet is Peter Quill\'s biological father (differs from comics).'
      },
      {
        q: 'Which character has a vibranium arm?',
        options: ['War Machine', 'Bucky Barnes', 'Nebula', 'Ultron'],
        correct: 1,
        explanation: 'Bucky Barnes received a vibranium arm from Wakanda to replace his old metal arm.'
      },
      {
        q: 'What is Shuri\'s role in Wakanda?',
        options: ['General of the Dora Milaje', 'Princess & Head of Science', 'Queen Mother', 'Border Tribe Leader'],
        correct: 1,
        explanation: 'Shuri is T\'Challa\'s sister, the Princess of Wakanda, and head of their science & technology division.'
      }
    ]
  }
];

// Daily quiz: use a deterministic selection based on date
function getDailyQuizQuestions() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const allQuestions = [];
  QUIZ_CATEGORIES.forEach(cat => {
    cat.questions.forEach(q => {
      allQuestions.push({ ...q, category: cat.title });
    });
  });
  
  // Pick 5 questions based on day of year
  const selected = [];
  const seed = dayOfYear * 7 + today.getFullYear();
  for (let i = 0; i < 5; i++) {
    const idx = (seed + i * 13) % allQuestions.length;
    if (!selected.find(s => s.q === allQuestions[idx].q)) {
      selected.push(allQuestions[idx]);
    } else {
      selected.push(allQuestions[(idx + 1) % allQuestions.length]);
    }
  }
  return selected;
}

// Helper to get titles by order
function getTitlesByOrder(order) {
  switch (order) {
    case 'release':
      return [...MCU_TITLES].sort((a, b) => a.releaseOrder - b.releaseOrder);
    case 'chronological':
      return [...MCU_TITLES].sort((a, b) => a.chronologicalOrder - b.chronologicalOrder);
    case 'recommended':
      return RECOMMENDED_ORDER.map(id => MCU_TITLES.find(t => t.id === id)).filter(Boolean);
    default:
      return [...MCU_TITLES].sort((a, b) => a.releaseOrder - b.releaseOrder);
  }
}

function getTitlesByPhase(phase) {
  return MCU_TITLES.filter(t => t.phase === phase).sort((a, b) => a.releaseOrder - b.releaseOrder);
}

function getTitlesBySaga(sagaId) {
  const saga = SAGAS[sagaId];
  if (!saga) return [];
  return MCU_TITLES.filter(t => saga.phases.includes(t.phase)).sort((a, b) => a.releaseOrder - b.releaseOrder);
}

function getTitleById(id) {
  return MCU_TITLES.find(t => t.id === id);
}

function getPhaseGradient(phase) {
  const colors = PHASE_COLORS[phase] || PHASE_COLORS[1];
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}


/* ── js/tmdb.js ── */
/* =============================================================
   MCU Tracker — TMDB API & Metadata (tmdb.js)
   Fetching, caching posters & title metadata via /api/tmdb proxy
   ============================================================= */

const POSTER_CACHE_KEY = 'mcu_poster_cache_v8';

// Known high-res TMDB poster paths for all 55 titles (instant zero-delay first paint)
const KNOWN_POSTERS = {
  'iron-man': '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'incredible-hulk': '/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg',
  'iron-man-2': '/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
  'thor': '/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg',
  'captain-america-tfa': '/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',
  'avengers': '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  'iron-man-3': '/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
  'thor-dark-world': '/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg',
  'captain-america-ws': '/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg',
  'guardians-1': '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
  'avengers-aou': '/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg',
  'ant-man': '/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg',
  'captain-america-cw': '/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg',
  'doctor-strange': '/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
  'guardians-2': '/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg',
  'spider-man-hc': '/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'thor-ragnarok': '/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  'black-panther': '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
  'avengers-iw': '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'ant-man-wasp': '/cFQEO687n1K6umXbInzocxcnAQz.jpg',
  'captain-marvel': '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  'avengers-endgame': '/jtDv3lCnST0fZRvdYFwR5CVwK2x.jpg',
  'spider-man-ffh': '/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
  'wandavision': '/glKDfE6btIRcVB5zrjspRIs4r52.jpg',
  'falcon-ws': '/6kbAMLteGO8yyewYau6bJ683sw7.jpg',
  'loki-s1': '/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'black-widow': '/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
  'what-if-s1': '/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg',
  'shang-chi': '/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg',
  'eternals': '/lFByFSLV5WDJEv3KabbdAF959F2.jpg',
  'hawkeye': '/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg',
  'spider-man-nwh': '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'moon-knight': '/9K3lbMf8TKvL9xGEbzi7TggWCNQ.jpg',
  'doctor-strange-mom': '/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg',
  'ms-marvel': '/3HWWh92kZbD7odwJX7nKmXNZsYo.jpg',
  'thor-love-thunder': '/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
  'she-hulk': '/5xz2orV8f0usyrfGNshcoXHmiaV.jpg',
  'werewolf-by-night': '/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg',
  'black-panther-wf': '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  'gotg-holiday': '/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg',
  'ant-man-quantumania': '/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
  'guardians-3': '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
  'secret-invasion': '/3rINdUPSy9AklJg74jWHOyUXuZd.jpg',
  'loki-s2': '/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'the-marvels': '/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg',
  'echo': '/vFyJH630cF68LohVYjQW49074Sy.jpg',
  'deadpool-wolverine': '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'agatha-all-along': '/2HKBc5UiFw8JrruHq8S1Y7TnlW0.jpg',
  'captain-america-bnw': '/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
  'thunderbolts': '/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
  'ironheart': '/dOh6MJpdlQhYpLBhzhNQeYGKTZ5.jpg',
  'daredevil-ba': '/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg',
  'fantastic-four': '/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg',
  'avengers-doomsday': '/1zqWkLwC1zLBBBtIWzmkmWeMWnT.jpg',
  'avengers-secret-wars': '/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg'
};

// ── Global TMDB Proxy URL Resolver ─────────────────────────
function getTmdbProxyUrl(path, query = '') {
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:'
  );
  const base = isLocal ? 'https://mcu-tracker-pi.vercel.app/api/tmdb' : '/api/tmdb';
  return query ? `${base}?path=${path}&${query}` : `${base}?path=${path}`;
}

async function fetchPostersFromTMDB() {
  // Read existing cache, pre-seeding from KNOWN_POSTERS if empty
  let cache = {};
  try {
    const raw = localStorage.getItem(POSTER_CACHE_KEY);
    if (raw) cache = JSON.parse(raw);
  } catch(e) {}
  
  // Seed missing cache keys from KNOWN_POSTERS
  let seeded = false;
  for (const [id, path] of Object.entries(KNOWN_POSTERS)) {
    if (!cache[id]) {
      cache[id] = path;
      seeded = true;
    }
  }
  if (seeded) {
    try {
      localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
    } catch(e) {}
  }



  let updated = false;
  
  // Fetch missing posters via /api/tmdb proxy (for any new titles)
  for (const title of MCU_TITLES) {
    if (!title.tmdbId) continue;
    if (cache[title.id]) continue;
    
    try {
      const type = title.tmdbType === 'tv' ? 'tv' : 'movie';
      const response = await fetch(getTmdbProxyUrl(`${type}/${title.tmdbId}`));
      if (response.ok) {
        const data = await response.json();
        if (data.poster_path) {
          cache[title.id] = data.poster_path;
          updated = true;
          try {
            localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
          } catch(e) {}
          // Dispatch event for progressive DOM update
          document.dispatchEvent(new CustomEvent('posterFetched', {
            detail: { titleId: title.id, url: `https://image.tmdb.org/t/p/w500${data.poster_path}` }
          }));
        }
      }
    } catch(err) {
      // In offline or local static mode without proxy, KNOWN_POSTERS already covers all titles
    }
  }
  
  if (updated) {
    try {
      localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
    } catch(e) {}
  }
}

function getPosterUrl(titleId) {
  try {
    const raw = localStorage.getItem(POSTER_CACHE_KEY);
    if (raw) {
      const cache = JSON.parse(raw);
      if (cache[titleId]) {
        return `https://image.tmdb.org/t/p/w500${cache[titleId]}`;
      }
    }
  } catch(e) {}
  if (KNOWN_POSTERS[titleId]) {
    return `https://image.tmdb.org/t/p/w500${KNOWN_POSTERS[titleId]}`;
  }
  return null;
}

// Fetch deep details (cast, crew, backdrop, overview) via /api/tmdb proxy
async function fetchTitleDetails(tmdbId, type = 'movie') {
  const cacheKey = `mcu_details_${tmdbId}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch(e) {}
  
  try {
    const url = getTmdbProxyUrl(`${type}/${tmdbId}`, 'append_to_response=credits');
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch(e) {}
      return data;
    }
  } catch(err) {
    console.warn('Failed to fetch TMDB details via proxy:', err);
  }
  return null;
}

function getBackdropUrl(backdropPath, size = 'w1280') {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
}

// ── Pre-bundled Top Cast, Director & Backdrop Map for Instant 0ms Render ──
const KNOWN_CAST = {"iron-man":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Terrence Howard","character":"Rhodey","profile_path":"/eZ6uRZOYWZAyjNmWpDKGdLL6WUC.jpg"},{"name":"Jeff Bridges","character":"Obadiah Stane","profile_path":"/xms1RAY6q7Lzp7wNeRCB0kzhucn.jpg"},{"name":"Gwyneth Paltrow","character":"Pepper Potts","profile_path":"/ylN4A7fnnNXvHURENl5sQI8Jbib.jpg"},{"name":"Leslie Bibb","character":"Christine Everhart","profile_path":"/g3a1O9lOTZvrwQupUtg4Fc3CdTd.jpg"},{"name":"Shaun Toub","character":"Yinsen","profile_path":"/6fuJ9D50bYuMAhrlEgVqzgqF0LU.jpg"},{"name":"Faran Tahir","character":"Raza","profile_path":"/eVYiHKj9OGRn3MeRqJuwROFqIkg.jpg"},{"name":"Clark Gregg","character":"Agent Coulson","profile_path":"/7t2uHG5m4CN2lyYnGfZO54Hn3O0.jpg"}],"director":"Jon Favreau","backdrop_path":"/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg"},"incredible-hulk":{"cast":[{"name":"Edward Norton","character":"Bruce Banner","profile_path":"/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg"},{"name":"Liv Tyler","character":"Betty Ross","profile_path":"/rC6f9NoDN9l2tMgiEocIvnJi2tW.jpg"},{"name":"Tim Roth","character":"Emil Blonsky","profile_path":"/qSizF2i9gz6c6DbAC5RoIq8sVqX.jpg"},{"name":"William Hurt","character":"General 'Thunderbolt' Ross","profile_path":"/j3mjmuHLBW4XQSw53C8Sh0Lh3ZQ.jpg"},{"name":"Tim Blake Nelson","character":"Samuel Sterns","profile_path":"/rWuTGiAMaaHIJ30eRkQS23LbRSW.jpg"},{"name":"Ty Burrell","character":"Leonard","profile_path":"/4dwlnG1dcEPAf2cjNsYbYJn5E8Y.jpg"},{"name":"Christina Cabot","character":"Major Kathleen Sparr","profile_path":"/h1vwbOfITSvDvDq8E9MVvWqMYSr.jpg"},{"name":"Peter Mensah","character":"General Joe Greller","profile_path":"/72L6LbeF5ZqRdLmhibNqysQNQRg.jpg"}],"director":"Louis Leterrier","backdrop_path":"/xfBnQ4mgf1jYZsscJGJjr6ce0Ar.jpg"},"iron-man-2":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Gwyneth Paltrow","character":"Pepper Potts","profile_path":"/ylN4A7fnnNXvHURENl5sQI8Jbib.jpg"},{"name":"Don Cheadle","character":"Lt. Col. James 'Rhodey' Rhodes","profile_path":"/umhTmcVF26qZKEpSfG1ZNpcbs9D.jpg"},{"name":"Scarlett Johansson","character":"Natalie Rushman / Natasha Romanoff","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Sam Rockwell","character":"Justin Hammer","profile_path":"/afYhNpLwpa65Yy0Q0g00FNFhzx5.jpg"},{"name":"Mickey Rourke","character":"Ivan Vanko","profile_path":"/i6vXukUwRsJa7S9yhZgoKt9xLDv.jpg"},{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"},{"name":"Clark Gregg","character":"Agent Coulson","profile_path":"/7t2uHG5m4CN2lyYnGfZO54Hn3O0.jpg"}],"director":"Jon Favreau","backdrop_path":"/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg"},"thor":{"cast":[{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Natalie Portman","character":"Jane Foster","profile_path":"/edPU5HxncLWa1YkgRPNkSd68ONG.jpg"},{"name":"Tom Hiddleston","character":"Loki","profile_path":"/mclHxMm8aPlCPKptP67257F5GPo.jpg"},{"name":"Anthony Hopkins","character":"Odin","profile_path":"/iaf7SHSkGDpnyrDh1Jolilwk2TD.jpg"},{"name":"Stellan Skarsgård","character":"Erik Selvig","profile_path":"/mW7xmtGV4y79kQGn0zkKVGDMAmw.jpg"},{"name":"Kat Dennings","character":"Darcy Lewis","profile_path":"/nJHGtedRCIeAdysg18oJngUZmL3.jpg"},{"name":"Clark Gregg","character":"Agent Coulson","profile_path":"/7t2uHG5m4CN2lyYnGfZO54Hn3O0.jpg"},{"name":"Colm Feore","character":"King Laufey","profile_path":"/oOxcf1qB1IvVZrBEE1PdrfMiyBK.jpg"}],"director":"Kenneth Branagh","backdrop_path":"/1wOu8rdvPxU1ObHi20VcRhfNpbo.jpg"},"captain-america-tfa":{"cast":[{"name":"Chris Evans","character":"Captain America / Steve Rogers","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Hayley Atwell","character":"Peggy Carter","profile_path":"/x57wXHexIjD2ywly9cRA4rov7cu.jpg"},{"name":"Sebastian Stan","character":"James Buchanan 'Bucky' Barnes","profile_path":"/v20RLWst39klatsqUgSrwHxhwee.jpg"},{"name":"Tommy Lee Jones","character":"Colonel Chester Phillips","profile_path":"/mCiZNRAzbnPojJEZwVZWLw9kzxR.jpg"},{"name":"Hugo Weaving","character":"Johann Schmidt / Red Skull","profile_path":"/lSC8Et0PYi5zeQb3IpPkFje7hgR.jpg"},{"name":"Dominic Cooper","character":"Howard Stark","profile_path":"/wFPdARerxpaAaHucYGTSNqViWpn.jpg"},{"name":"Richard Armitage","character":"Heinz Kruger","profile_path":"/oNoKjTOUNUiJ01UNQSCQDkt5EHi.jpg"},{"name":"Stanley Tucci","character":"Dr. Abraham Erskine","profile_path":"/q4TanMDI5Rgsvw4SfyNbPBh4URr.jpg"}],"director":"Joe Johnston","backdrop_path":"/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg"},"avengers":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark / Iron Man","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Chris Evans","character":"Steve Rogers / Captain America","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Mark Ruffalo","character":"Bruce Banner / The Hulk","profile_path":"/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"},{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Jeremy Renner","character":"Clint Barton / Hawkeye","profile_path":"/yB84D1neTYXfWBaV0QOE9RF2VCu.jpg"},{"name":"Tom Hiddleston","character":"Loki","profile_path":"/mclHxMm8aPlCPKptP67257F5GPo.jpg"},{"name":"Clark Gregg","character":"Agent Phil Coulson","profile_path":"/7t2uHG5m4CN2lyYnGfZO54Hn3O0.jpg"}],"director":"Joss Whedon","backdrop_path":"/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg"},"iron-man-3":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Gwyneth Paltrow","character":"Pepper Potts","profile_path":"/ylN4A7fnnNXvHURENl5sQI8Jbib.jpg"},{"name":"Don Cheadle","character":"Colonel James Rhodes","profile_path":"/umhTmcVF26qZKEpSfG1ZNpcbs9D.jpg"},{"name":"Guy Pearce","character":"Aldrich Killian","profile_path":"/vTqk6Nh3WgqPubkS23eOlMAwmwa.jpg"},{"name":"Rebecca Hall","character":"Maya Hansen","profile_path":"/coC58ANiDbqRIyle5zEl9QDektf.jpg"},{"name":"Jon Favreau","character":"Happy Hogan","profile_path":"/8MtRRnEHaBSw8Ztdl8saXiw1egP.jpg"},{"name":"Ben Kingsley","character":"Trevor Slattery","profile_path":"/k3Dmu49B2akwDvgqy52MOxznI59.jpg"},{"name":"James Badge Dale","character":"Savin","profile_path":"/lnm8Jm11btONDU7dzPk9liuMibk.jpg"}],"director":"Shane Black","backdrop_path":"/iVped1djsF0tvGkvnHbzsE3ZPTF.jpg"},"thor-dark-world":{"cast":[{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Natalie Portman","character":"Jane Foster","profile_path":"/edPU5HxncLWa1YkgRPNkSd68ONG.jpg"},{"name":"Tom Hiddleston","character":"Loki","profile_path":"/mclHxMm8aPlCPKptP67257F5GPo.jpg"},{"name":"Christopher Eccleston","character":"Malekith","profile_path":"/v6ezjezzDo6xP2wlONO5ZzBciwl.jpg"},{"name":"Anthony Hopkins","character":"Odin","profile_path":"/iaf7SHSkGDpnyrDh1Jolilwk2TD.jpg"},{"name":"Jaimie Alexander","character":"Sif","profile_path":"/21IQHPAXNUHiqPrpIYr4X8h2wmf.jpg"},{"name":"Zachary Levi","character":"Fandral","profile_path":"/1W8L3kEMMPF9umT3ZGaNIiCYKfZ.jpg"},{"name":"Ray Stevenson","character":"Volstagg","profile_path":"/msafbswGI6uisRuNvQ8a1wMF5Ca.jpg"}],"director":"Alan Taylor","backdrop_path":"/5o88bbqcV5STn56jqOeovaaWbAE.jpg"},"captain-america-ws":{"cast":[{"name":"Chris Evans","character":"Steve Rogers / Captain America","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"},{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Robert Redford","character":"Alexander Pierce","profile_path":"/m5ayL8ASLdaaFYzqJZNYvrKRuhD.jpg"},{"name":"Sebastian Stan","character":"Bucky Barnes / Winter Soldier","profile_path":"/v20RLWst39klatsqUgSrwHxhwee.jpg"},{"name":"Anthony Mackie","character":"Sam Wilson / Falcon","profile_path":"/vecvTm7SimizluJkyIwBxeLbvRm.jpg"},{"name":"Cobie Smulders","character":"Maria Hill","profile_path":"/1b0mYokcGsfFRge4bjXlS5ihtek.jpg"},{"name":"Frank Grillo","character":"Brock Rumlow","profile_path":"/kuEco4vo1xrsM8DyrNSZUEi593P.jpg"}],"director":"Joe Russo","backdrop_path":"/5YAssBZnyFJ8uAUf6iWNH1o0MjO.jpg"},"guardians-1":{"cast":[{"name":"Chris Pratt","character":"Peter Quill","profile_path":"/cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg"},{"name":"Zoe Saldaña","character":"Gamora","profile_path":"/vQBwmsSOAd0JDaEcZ5p43J9xzsY.jpg"},{"name":"Dave Bautista","character":"Drax","profile_path":"/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg"},{"name":"Vin Diesel","character":"Groot (voice)","profile_path":"/nZdVry7lnUkE24PnXakok9okvL4.jpg"},{"name":"Bradley Cooper","character":"Rocket (voice)","profile_path":"/5Dhy50qOMOHfR1NZifKIfffjV9X.jpg"},{"name":"Lee Pace","character":"Ronan","profile_path":"/eeTc0d2AX1vFYVxZ6Qw7qZpg4Tz.jpg"},{"name":"Michael Rooker","character":"Yondu Udonta","profile_path":"/ngOuHNIAGrKyY1O7F0f9C5Q9ONg.jpg"},{"name":"Karen Gillan","character":"Nebula","profile_path":"/rWx8u4F4aYIqmjJDeMK78ysPsu0.jpg"}],"director":"James Gunn","backdrop_path":"/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg"},"avengers-aou":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark / Iron Man","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Mark Ruffalo","character":"Bruce Banner / Hulk","profile_path":"/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"},{"name":"Chris Evans","character":"Steve Rogers / Captain America","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Jeremy Renner","character":"Clint Barton / Hawkeye","profile_path":"/yB84D1neTYXfWBaV0QOE9RF2VCu.jpg"},{"name":"James Spader","character":"Ultron (voice)","profile_path":"/3gurW3OgDOD4hcqDfgcqUnoNg34.jpg"},{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"}],"director":"Joss Whedon","backdrop_path":"/kIBK5SKwgqIIuRKhhWrJn3XkbPq.jpg"},"ant-man":{"cast":[{"name":"Paul Rudd","character":"Scott Lang / Ant-Man","profile_path":"/6jtwNOLKy0LdsRAKwZqgYMAfd5n.jpg"},{"name":"Michael Douglas","character":"Dr. Hank Pym","profile_path":"/kVYGPIZowzXLEQfAGUNOqKjAbBb.jpg"},{"name":"Evangeline Lilly","character":"Hope van Dyne","profile_path":"/pJHX2jd7ytre3NQbF9nlyWUqxH3.jpg"},{"name":"Corey Stoll","character":"Darren Cross / Yellowjacket","profile_path":"/2eMxKecTZBiS60gPUVWcimYgGDp.jpg"},{"name":"Bobby Cannavale","character":"Paxton","profile_path":"/wlp20ggyNI7x0xGUtTjC2Xl2XmD.jpg"},{"name":"Anthony Mackie","character":"Sam Wilson / Falcon","profile_path":"/vecvTm7SimizluJkyIwBxeLbvRm.jpg"},{"name":"Judy Greer","character":"Maggie Lang","profile_path":"/pTLjIjh83R424RGxIfq4U0yx947.jpg"},{"name":"Abby Ryder Fortson","character":"Cassie Lang","profile_path":"/mNRZFVtAvj5P3HxM2PFM1YqXMAw.jpg"}],"director":"Peyton Reed","backdrop_path":"/1K3JmSNUN8OpjYsCjc0Hy0SYxAb.jpg"},"captain-america-cw":{"cast":[{"name":"Chris Evans","character":"Steve Rogers / Captain America","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Robert Downey Jr.","character":"Tony Stark / Iron Man","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Sebastian Stan","character":"Bucky Barnes / Winter Soldier","profile_path":"/v20RLWst39klatsqUgSrwHxhwee.jpg"},{"name":"Anthony Mackie","character":"Sam Wilson / Falcon","profile_path":"/vecvTm7SimizluJkyIwBxeLbvRm.jpg"},{"name":"Don Cheadle","character":"Lieutenant James Rhodes / War Machine","profile_path":"/umhTmcVF26qZKEpSfG1ZNpcbs9D.jpg"},{"name":"Jeremy Renner","character":"Clint Barton / Hawkeye","profile_path":"/yB84D1neTYXfWBaV0QOE9RF2VCu.jpg"},{"name":"Chadwick Boseman","character":"T'Challa / Black Panther","profile_path":"/nL16SKfyP1b7Hk6LsuWiqMfbdb8.jpg"}],"director":"Joe Russo","backdrop_path":"/7FWlcZq3r6525LWOcvO9kNWurN1.jpg"},"doctor-strange":{"cast":[{"name":"Benedict Cumberbatch","character":"Dr. Stephen Strange","profile_path":"/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"},{"name":"Chiwetel Ejiofor","character":"Mordo","profile_path":"/kq5DDnqqofoRI0t6ddtRlsJnNPT.jpg"},{"name":"Rachel McAdams","character":"Dr. Christine Palmer","profile_path":"/2DPh6KoNg0p57vvGc6N468zr3ct.jpg"},{"name":"Benedict Wong","character":"Wong","profile_path":"/yYfLyrC2CE6vBWSJfkpuVKL2POM.jpg"},{"name":"Mads Mikkelsen","character":"Kaecilius","profile_path":"/AsX4bdvZ8UCayWTmAf9lAqOA8V7.jpg"},{"name":"Tilda Swinton","character":"The Ancient One","profile_path":"/dzjT4LKgs7eOma84GsPy78DsGNH.jpg"},{"name":"Michael Stuhlbarg","character":"Dr. Nicodemus West","profile_path":"/aYB3SQm3h6ZyAdlbGyiNfakjx56.jpg"},{"name":"Benjamin Bratt","character":"Jonathan Pangborn","profile_path":"/hBenHPT4iJEG2kt5z2TOGnkRZwh.jpg"}],"director":"Scott Derrickson","backdrop_path":"/kkoiH8ZWxJ9WSAjOadGtuHUQxbm.jpg"},"guardians-2":{"cast":[{"name":"Chris Pratt","character":"Peter Quill / Star-Lord","profile_path":"/cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg"},{"name":"Zoe Saldaña","character":"Gamora","profile_path":"/vQBwmsSOAd0JDaEcZ5p43J9xzsY.jpg"},{"name":"Dave Bautista","character":"Drax","profile_path":"/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg"},{"name":"Vin Diesel","character":"Baby Groot (voice)","profile_path":"/nZdVry7lnUkE24PnXakok9okvL4.jpg"},{"name":"Bradley Cooper","character":"Rocket (voice)","profile_path":"/5Dhy50qOMOHfR1NZifKIfffjV9X.jpg"},{"name":"Kurt Russell","character":"Ego","profile_path":"/6g1d98oH4miG4k0ZiZWmF3Dt0bO.jpg"},{"name":"Michael Rooker","character":"Yondu","profile_path":"/ngOuHNIAGrKyY1O7F0f9C5Q9ONg.jpg"},{"name":"Karen Gillan","character":"Nebula","profile_path":"/rWx8u4F4aYIqmjJDeMK78ysPsu0.jpg"}],"director":"James Gunn","backdrop_path":"/aJn9XeesqsrSLKcHfHP4u5985hn.jpg"},"spider-man-hc":{"cast":[{"name":"Tom Holland","character":"Peter Parker / Spider-Man","profile_path":"/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg"},{"name":"Michael Keaton","character":"Adrian Toomes / Vulture","profile_path":"/tYSja1KByFnZ4Hkp3stPqkKHnNL.jpg"},{"name":"Robert Downey Jr.","character":"Tony Stark / Iron Man","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Marisa Tomei","character":"May Parker","profile_path":"/5NCCKQooVCQD36R6JL3a1hOeBVn.jpg"},{"name":"Jon Favreau","character":"Happy Hogan","profile_path":"/8MtRRnEHaBSw8Ztdl8saXiw1egP.jpg"},{"name":"Gwyneth Paltrow","character":"Pepper Potts","profile_path":"/ylN4A7fnnNXvHURENl5sQI8Jbib.jpg"},{"name":"Zendaya","character":"Michelle","profile_path":"/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg"},{"name":"Donald Glover","character":"Aaron Davis","profile_path":"/jqVkQfeeEmdga1G0jpBwwXXwwSK.jpg"}],"director":"Jon Watts","backdrop_path":"/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg"},"thor-ragnarok":{"cast":[{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Mark Ruffalo","character":"Bruce Banner / Hulk","profile_path":"/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"},{"name":"Tom Hiddleston","character":"Loki","profile_path":"/mclHxMm8aPlCPKptP67257F5GPo.jpg"},{"name":"Cate Blanchett","character":"Hela","profile_path":"/1Rd567YFdGfkJjSlhNPR8joYkaX.jpg"},{"name":"Idris Elba","character":"Heimdall","profile_path":"/be1bVF7qGX91a6c5WeRPs5pKXln.jpg"},{"name":"Jeff Goldblum","character":"Grandmaster","profile_path":"/kcyEPgYtBP5Pm6LLeLGfXKjYovL.jpg"},{"name":"Tessa Thompson","character":"Valkyrie","profile_path":"/19ze60jXlb2j7dXc2UpA3MujXA8.jpg"},{"name":"Karl Urban","character":"Skurge","profile_path":"/7Y96dAfg0HcFrcLjlD5eD9N0uj4.jpg"}],"director":"Taika Waititi","backdrop_path":"/vLmHH8jAy8Jq8uBsLucd3592WGh.jpg"},"black-panther":{"cast":[{"name":"Chadwick Boseman","character":"T'Challa / Black Panther","profile_path":"/nL16SKfyP1b7Hk6LsuWiqMfbdb8.jpg"},{"name":"Michael B. Jordan","character":"Erik Killmonger","profile_path":"/515xNvaMC6xOEOlo0sFqW69ZqUH.jpg"},{"name":"Lupita Nyong'o","character":"Nakia","profile_path":"/y40Wu1T742kynOqtwXASc5Qgm49.jpg"},{"name":"Danai Gurira","character":"Okoye","profile_path":"/z7H7QeQvr24vskGlANQhG43vozQ.jpg"},{"name":"Martin Freeman","character":"Everett K. Ross","profile_path":"/nrO54AzrxiNgCjBUOSz6ebyxDZY.jpg"},{"name":"Daniel Kaluuya","character":"W'Kabi","profile_path":"/jj2kZqJobjom36wlhlYhc38nTwN.jpg"},{"name":"Letitia Wright","character":"Shuri","profile_path":"/f7PevpEeBqwzACPhoZ8K3ktrKvE.jpg"},{"name":"Winston Duke","character":"M'Baku","profile_path":"/MhBiZbryibwuoEtPL9Ns8pYHC1.jpg"}],"director":"Ryan Coogler","backdrop_path":"/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg"},"avengers-iw":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark / Iron Man","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Chris Evans","character":"Steve Rogers / Captain America","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Josh Brolin","character":"Thanos","profile_path":"/7QpneI3HoZCCDVPyWx3p3t7yeo7.jpg"},{"name":"Mark Ruffalo","character":"Bruce Banner / Hulk","profile_path":"/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"},{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Don Cheadle","character":"James Rhodes / War Machine","profile_path":"/umhTmcVF26qZKEpSfG1ZNpcbs9D.jpg"},{"name":"Benedict Cumberbatch","character":"Doctor Strange","profile_path":"/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"}],"director":"Joe Russo","backdrop_path":"/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg"},"ant-man-wasp":{"cast":[{"name":"Paul Rudd","character":"Scott Lang / Ant-Man","profile_path":"/6jtwNOLKy0LdsRAKwZqgYMAfd5n.jpg"},{"name":"Evangeline Lilly","character":"Hope Van Dyne / Wasp","profile_path":"/pJHX2jd7ytre3NQbF9nlyWUqxH3.jpg"},{"name":"Michael Douglas","character":"Dr. Hank Pym","profile_path":"/kVYGPIZowzXLEQfAGUNOqKjAbBb.jpg"},{"name":"Hannah John-Kamen","character":"Ava / Ghost","profile_path":"/2fqNQQW3B7upH4rBubhxXkIIoGk.jpg"},{"name":"Randall Park","character":"Jimmy Woo","profile_path":"/u1QpbjVIKegk79DJG9HFmg9Ljv4.jpg"},{"name":"Michelle Pfeiffer","character":"Janet Van Dyne / Wasp","profile_path":"/8qwNMFzmM3BxGKIj1iIqiHHBpx3.jpg"},{"name":"Laurence Fishburne","character":"Dr. Bill Foster","profile_path":"/2GbXERENPpl5MmlqOLlPVaVtifD.jpg"},{"name":"Michael Peña","character":"Luis","profile_path":"/afs4PCiwn8LR93a10drULLVeVLo.jpg"}],"director":"Peyton Reed","backdrop_path":"/iYdgEUE2W2aJkgqfSjf1x3gFfuV.jpg"},"captain-marvel":{"cast":[{"name":"Brie Larson","character":"Carol Danvers / Vers / Captain Marvel","profile_path":"/xSGvMwNNJcEQvVcjiIUTyxyMfkZ.jpg"},{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"},{"name":"Ben Mendelsohn","character":"Talos / Keller","profile_path":"/uRB2ufOpCNun8G1LPsZJPnfhavb.jpg"},{"name":"Jude Law","character":"Yon-Rogg","profile_path":"/6UadpSbfC39WMChAcdnNunzwDxv.jpg"},{"name":"Annette Bening","character":"Supreme Intelligence / Dr. Wendy Lawson","profile_path":"/kGslMAWcpv8MKzODhDRDkFE0uX7.jpg"},{"name":"Djimon Hounsou","character":"Korath","profile_path":"/tpvtxxvCx2Mb5DV632hmuYlHoiY.jpg"},{"name":"Lee Pace","character":"Ronan","profile_path":"/eeTc0d2AX1vFYVxZ6Qw7qZpg4Tz.jpg"},{"name":"Lashana Lynch","character":"Maria Rambeau","profile_path":"/ypNxRag9uJ5nzPAN2um3amQK340.jpg"}],"director":"Ryan Fleck","backdrop_path":"/qAzYK4YPSWDc7aa4R43LcwRIAyb.jpg"},"avengers-endgame":{"cast":[{"name":"Robert Downey Jr.","character":"Tony Stark / Iron Man","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Chris Evans","character":"Steve Rogers / Captain America","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Mark Ruffalo","character":"Bruce Banner / Hulk","profile_path":"/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"},{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Jeremy Renner","character":"Clint Barton / Hawkeye","profile_path":"/yB84D1neTYXfWBaV0QOE9RF2VCu.jpg"},{"name":"Josh Brolin","character":"Thanos","profile_path":"/7QpneI3HoZCCDVPyWx3p3t7yeo7.jpg"},{"name":"Don Cheadle","character":"James Rhodes / War Machine","profile_path":"/umhTmcVF26qZKEpSfG1ZNpcbs9D.jpg"}],"director":"Anthony Russo","backdrop_path":"/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"},"spider-man-ffh":{"cast":[{"name":"Tom Holland","character":"Peter Parker / Spider-Man","profile_path":"/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg"},{"name":"Jake Gyllenhaal","character":"Quentin Beck / Mysterio","profile_path":"/ct2Gh2sJSxd4yaMrSsqSt1HpIC3.jpg"},{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"},{"name":"Marisa Tomei","character":"May Parker","profile_path":"/5NCCKQooVCQD36R6JL3a1hOeBVn.jpg"},{"name":"Jon Favreau","character":"Happy Hogan","profile_path":"/8MtRRnEHaBSw8Ztdl8saXiw1egP.jpg"},{"name":"Zendaya","character":"MJ","profile_path":"/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg"},{"name":"Jacob Batalon","character":"Ned Leeds","profile_path":"/53YhaL4xw4Sb1ssoHkeSSBaO29c.jpg"},{"name":"Tony Revolori","character":"Flash Thompson","profile_path":"/tSF6XmXDikrKZbFUeoDnafXxKjT.jpg"}],"director":"Jon Watts","backdrop_path":"/vamhMTvh9m9zFHDoR0v1nRtf6T4.jpg"},"wandavision":{"cast":[{"name":"Elizabeth Olsen","character":"Wanda Maximoff / Scarlet Witch","profile_path":"/kV1PPpUtxRE7lXYvur7DW41LEDn.jpg"},{"name":"Paul Bettany","character":"Vision / The Vision","profile_path":"/awlH20l93cgHOIDPNP6FCnGuIJy.jpg"},{"name":"Kathryn Hahn","character":"Agnes / Agatha Harkness","profile_path":"/9sVllAKfEls3SJD3GoPm2JEZoa5.jpg"},{"name":"Teyonah Parris","character":"Monica Rambeau / Geraldine","profile_path":"/mArqi5mGbKvfrNsrEEkdy0gDvGu.jpg"},{"name":"Randall Park","character":"Jimmy Woo","profile_path":"/u1QpbjVIKegk79DJG9HFmg9Ljv4.jpg"},{"name":"Kat Dennings","character":"Darcy Lewis / The Escape Artist","profile_path":"/nJHGtedRCIeAdysg18oJngUZmL3.jpg"}],"director":"Jac Schaeffer","backdrop_path":"/cq62fLH3vwOmiaLKMqkDI86tPtH.jpg"},"falcon-ws":{"cast":[{"name":"Anthony Mackie","character":"Sam Wilson / Falcon","profile_path":"/vecvTm7SimizluJkyIwBxeLbvRm.jpg"},{"name":"Sebastian Stan","character":"Bucky Barnes / Winter Soldier","profile_path":"/v20RLWst39klatsqUgSrwHxhwee.jpg"},{"name":"Wyatt Russell","character":"John Walker","profile_path":"/zIldBzXdBWskPZB7x35G2hYEVDo.jpg"},{"name":"Erin Kellyman","character":"Karli Morgenthau","profile_path":"/ngTdJIcwZ9YsyvXIR5PUzv9plwV.jpg"},{"name":"Daniel Brühl","character":"Baron Zemo","profile_path":"/3YlmTfiy5qZXkrdKGjaM1uMjGKP.jpg"},{"name":"Emily VanCamp","character":"Sharon Carter","profile_path":"/zTl2KVglr7D7jnBLjbqe1BbbJiV.jpg"},{"name":"Danny Ramirez","character":"Joaquin Torres","profile_path":"/7ZvcfWA5O5ULiupbHZtGGEPwnpI.jpg"},{"name":"Adepero Oduye","character":"Sarah Wilson","profile_path":"/w9axk9dSTVpZPnoDH08iClklmF4.jpg"}],"director":"Malcolm Spellman","backdrop_path":"/aTjbqMONy77fHJrIYu14g1F0d5h.jpg"},"loki-s1":{"cast":[{"name":"Tom Hiddleston","character":"Loki","profile_path":"/mclHxMm8aPlCPKptP67257F5GPo.jpg"},{"name":"Sophia Di Martino","character":"The Variant","profile_path":"/qZdFp18btpQJfDoknxr7DgfRpcB.jpg"},{"name":"Wunmi Mosaku","character":"Hunter B-15","profile_path":"/vp7qDA7cYZj0MDYk1k4wysmznnN.jpg"},{"name":"Eugene Cordero","character":"Casey","profile_path":"/waruLSR8lXBjhAFL0J6ihuVY62d.jpg"},{"name":"Ke Huy Quan","character":"OB","profile_path":"/iestHyn7PLuVowj5Jaa1SGPboQ4.jpg"},{"name":"Owen Wilson","character":"Mobius","profile_path":"/5A46lNOwmpX77jAdhyKxU7e2Hub.jpg"}],"director":"Michael Waldron","backdrop_path":"/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg"},"black-widow":{"cast":[{"name":"Scarlett Johansson","character":"Natasha Romanoff / Black Widow","profile_path":"/2I2xAQmL87k5YswCnc4vHjpXxE0.jpg"},{"name":"Florence Pugh","character":"Yelena Belova","profile_path":"/qqDsryavx9rwSMhDAxW6OC7oNQg.jpg"},{"name":"Rachel Weisz","character":"Melina","profile_path":"/9tfHL5tholha1YF6bSKt422ETPM.jpg"},{"name":"David Harbour","character":"Alexei","profile_path":"/qMFtMWlYVtFVyBoBhX5IoA5sN5a.jpg"},{"name":"Ray Winstone","character":"Dreykov","profile_path":"/kDShEv6zPfArgcwXliGWKR65Mmo.jpg"},{"name":"Ever Anderson","character":"Young Natasha","profile_path":"/uyf2YlKOyrbfxyw0K5EJbzorF72.jpg"},{"name":"Violet McGraw","character":"Young Yelena","profile_path":"/dvErrHU0FVNP5GFkxJxZbNayC1x.jpg"},{"name":"O-T Fagbenle","character":"Mason","profile_path":"/baIiZBDYpYXfG4SlonbcqyYg6l.jpg"}],"director":"Cate Shortland","backdrop_path":"/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg"},"what-if-s1":{"cast":[{"name":"Jeffrey Wright","character":"The Watcher (voice)","profile_path":"/yGcuHGW4glqRpOPxgiCvjcren7F.jpg"},{"name":"Terri Douglas","character":"Additional Voices (voice)","profile_path":"/6yRCc5oKalchZuRvVJJbEDNmLEd.jpg"},{"name":"Matthew Wood","character":"Additional Voices (voice)","profile_path":"/u1UjHLTeS5Dregg85A3GICf7Nkf.jpg"},{"name":"Fred Tatasciore","character":"Drax / Corvus Glaive (voice)","profile_path":"/8YCIAGSWcxeTmPfOWMtVjLSwGOH.jpg"},{"name":"Robin Atkin Downes","character":"Additional Voices (voice)","profile_path":"/qb4xPIJGiKyiQ2MhSDQzFWxN0jS.jpg"},{"name":"Shelby Young","character":"Additional Voices (voice)","profile_path":"/oh4VeJpkORXoGJdIohNpXJyO3kt.jpg"},{"name":"Debra Wilson","character":"Additional Voices (voice)","profile_path":"/3anRgUtqohXRNM6HtwGl1ZFgCS8.jpg"},{"name":"Dave B. Mitchell","character":"Additional Voices (voice)","profile_path":"/r2EI55tU7v2UZw61cSQzrFrbvdn.jpg"}],"director":"Marvel Studios","backdrop_path":"/jnzoh5qoxRLFRIQAxnl6D3RStPC.jpg"},"shang-chi":{"cast":[{"name":"Simu Liu","character":"Shaun / Shang-Chi","profile_path":"/cCx2OghLj9KN73oyRZe92i2p3Ih.jpg"},{"name":"Tony Leung Chiu-wai","character":"Xu Wenwu","profile_path":"/idGzkwbm0BiLdrrKfcXecFNXbDu.jpg"},{"name":"Awkwafina","character":"Katy","profile_path":"/l5AKkg3H1QhMuXmTTmq1EyjyiRb.jpg"},{"name":"Ben Kingsley","character":"Trevor Slattery","profile_path":"/k3Dmu49B2akwDvgqy52MOxznI59.jpg"},{"name":"Zhang Meng'er","character":"Xialing","profile_path":"/lOJ0EIjNybCDT6J3ZLMDnqpoDXD.jpg"},{"name":"Fala Chen","character":"Li","profile_path":"/nsucfzPlPHeYVXhIS2b8ZtKr4wJ.jpg"},{"name":"Michelle Yeoh","character":"Ying Nan","profile_path":"/klATAW2KEfV2Glm5uhWAhJWt2ip.jpg"},{"name":"Yuen Wah","character":"Master Guang Bo","profile_path":"/yMkMgs0tWlJXdTjYkiMcjvhYnRw.jpg"}],"director":"Destin Daniel Cretton","backdrop_path":"/r7K6Xt0RX4Mw0cAbZVw5cyb1Tux.jpg"},"eternals":{"cast":[{"name":"Gemma Chan","character":"Sersi","profile_path":"/stTKj4iNauhqlVmZ6XAsFsvcMCY.jpg"},{"name":"Richard Madden","character":"Ikaris","profile_path":"/9QQFfVZ6PLe3WVmOL56wGNOnbGL.jpg"},{"name":"Angelina Jolie","character":"Thena","profile_path":"/bXNxIKcJ5cNNW8QFrBPWcfTSu9x.jpg"},{"name":"Salma Hayek Pinault","character":"Ajak","profile_path":"/3j8MpAjyopkAc8mbNiDeXyqBmcS.jpg"},{"name":"Kumail Nanjiani","character":"Kingo","profile_path":"/9EyrK1Cv7ey1h1GgmsVAOn45w6G.jpg"},{"name":"Lia McHugh","character":"Sprite","profile_path":"/vPnN8xBLsm5vMZvMpRBNJ5WuAdl.jpg"},{"name":"Brian Tyree Henry","character":"Phastos","profile_path":"/2MsJh0bpyzwvOUnXOltHp3j85Pb.jpg"},{"name":"Lauren Ridloff","character":"Makkari","profile_path":"/eyMriacYFsWtdgzedVPfXmT0TFa.jpg"}],"director":"Chloé Zhao","backdrop_path":"/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg"},"hawkeye":{"cast":[{"name":"Jeremy Renner","character":"Clint Barton / Hawkeye","profile_path":"/yB84D1neTYXfWBaV0QOE9RF2VCu.jpg"},{"name":"Hailee Steinfeld","character":"Kate Bishop","profile_path":"/dxSDWkiVaC6JYjrV3XRAZI7HOSS.jpg"},{"name":"Tony Dalton","character":"Jack Duquesne","profile_path":"/2iQXgOKkZobc93mMM4yDuYkuLA8.jpg"},{"name":"Alaqua Cox","character":"Maya Lopez","profile_path":"/gvIuoDFjWTQe8WwhU5CZ6qAQCuT.jpg"},{"name":"Fra Fee","character":"Kazimierz 'Kazi' Kazimierczak","profile_path":"/1UnZxfqaRTpoqpafM9PEAvlHAc7.jpg"},{"name":"Aleks Paunovic","character":"Ivan","profile_path":"/k8j9Nr0xS2vEUMV8Wl0y5cC2NeB.jpg"},{"name":"Piotr Adamczyk","character":"Tomas","profile_path":"/sOhY6yYAP0IgnCweTpjhxQ659Qt.jpg"},{"name":"Vera Farmiga","character":"Eleanor Bishop","profile_path":"/5Vs7huBmTKftwlsc2BPAntyaQYj.jpg"}],"director":"Jonathan Igla","backdrop_path":"/uHESULlKh7VSc0MRcqfyIf9Alk4.jpg"},"spider-man-nwh":{"cast":[{"name":"Tom Holland","character":"Peter Parker / Spider-Man","profile_path":"/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg"},{"name":"Zendaya","character":"MJ","profile_path":"/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg"},{"name":"Benedict Cumberbatch","character":"Doctor Strange","profile_path":"/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"},{"name":"Jacob Batalon","character":"Ned Leeds","profile_path":"/53YhaL4xw4Sb1ssoHkeSSBaO29c.jpg"},{"name":"Jon Favreau","character":"Happy Hogan","profile_path":"/8MtRRnEHaBSw8Ztdl8saXiw1egP.jpg"},{"name":"Jamie Foxx","character":"Max Dillon / Electro","profile_path":"/zD8Nsy4Xrghp7WunwpCj5JKBPeU.jpg"},{"name":"Willem Dafoe","character":"Norman Osborn / Green Goblin","profile_path":"/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg"},{"name":"Alfred Molina","character":"Dr. Otto Octavius / Doc Ock","profile_path":"/nJo91Czesn6z0d0pkfbDoVZY3sg.jpg"}],"director":"Jon Watts","backdrop_path":"/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg"},"moon-knight":{"cast":[{"name":"Oscar Isaac","character":"Marc Spector / Steven Grant / Moon Knight / Mr. Knight","profile_path":"/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg"},{"name":"Ethan Hawke","character":"Arthur Harrow","profile_path":"/2LoTr6x0TEM7L5em4kSx1VmGDgG.jpg"},{"name":"May Calamawy","character":"Layla El-Faouly","profile_path":"/i1yy5xxPE0bsvdJ3BgyLHGfk1c1.jpg"},{"name":"Ann Akinjirin","character":"Bobbi","profile_path":"/o4Tbudvow3rzgxmlilnRral5fpr.jpg"},{"name":"David Ganly","character":"Billy","profile_path":"/e9NUAspQ306cmyhkl3gG5LU1LHi.jpg"},{"name":"Karim El Hakim","character":"Khonshu Performer","profile_path":"/2K3iP4pm6RFZ29kQxjXZQl40hCF.jpg"},{"name":"F. Murray Abraham","character":"Khonshu (voice)","profile_path":"/p2RYVGdrcP0m70BkkiKcwyrDeim.jpg"}],"director":"Jeremy Slater","backdrop_path":"/1uegR4uAxRxiMyX4nQnpzbXhrTw.jpg"},"doctor-strange-mom":{"cast":[{"name":"Benedict Cumberbatch","character":"Doctor Stephen Strange","profile_path":"/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"},{"name":"Xochitl Gomez","character":"America Chavez","profile_path":"/q39DOx44YHrGF1h88R9HxRNZS3.jpg"},{"name":"Elizabeth Olsen","character":"Wanda Maximoff / The Scarlet Witch","profile_path":"/kV1PPpUtxRE7lXYvur7DW41LEDn.jpg"},{"name":"Chiwetel Ejiofor","character":"Baron Mordo","profile_path":"/kq5DDnqqofoRI0t6ddtRlsJnNPT.jpg"},{"name":"Benedict Wong","character":"Wong","profile_path":"/yYfLyrC2CE6vBWSJfkpuVKL2POM.jpg"},{"name":"Rachel McAdams","character":"Dr. Christine Palmer","profile_path":"/2DPh6KoNg0p57vvGc6N468zr3ct.jpg"},{"name":"Jett Klyne","character":"Tommy Maximoff","profile_path":"/6F7fGR6iQFzKNFfHCCYZbg82Alk.jpg"},{"name":"Julian Hilliard","character":"Billy Maximoff","profile_path":"/lp1IJliBZb9OFP5KK09HjSGOsau.jpg"}],"director":"Sam Raimi","backdrop_path":"/AdyJH8kDm8xT8IKTlgpEC15ny4u.jpg"},"ms-marvel":{"cast":[{"name":"Iman Vellani","character":"Kamala Khan","profile_path":"/oBpOjLAH8heYNNJZN1Z5jVQhAKC.jpg"},{"name":"Matt Lintz","character":"Bruno","profile_path":"/oeOU0Hdwt6UCIiRILU1plMAq7VA.jpg"},{"name":"Yasmeen Fletcher","character":"Nakia","profile_path":"/dlFwMUnYiO4TqdlnDjA7cHEfWoh.jpg"},{"name":"Zenobia Shroff","character":"Muneeba","profile_path":"/fwU2vIUq9W9eXRKxx9r3papdOkS.jpg"},{"name":"Mohan Kapur","character":"Yusuf","profile_path":"/lL0J5DBOwN1pwLCvuo7uQ0ApjF.jpg"},{"name":"Saagar Shaikh","character":"Aamir","profile_path":"/hQsNsaJ8ekAHjJfkxfQPpH0qX5Q.jpg"},{"name":"Rish Shah","character":"Kamran","profile_path":"/mxk7ArOC6QjtGitmLDqLvJn6Ra6.jpg"}],"director":"Bisha K. Ali","backdrop_path":"/mfcLUWASJghU8MTNK38eYktfE83.jpg"},"thor-love-thunder":{"cast":[{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Natalie Portman","character":"Jane Foster / The Mighty Thor","profile_path":"/edPU5HxncLWa1YkgRPNkSd68ONG.jpg"},{"name":"Christian Bale","character":"Gorr","profile_path":"/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg"},{"name":"Tessa Thompson","character":"King Valkyrie","profile_path":"/19ze60jXlb2j7dXc2UpA3MujXA8.jpg"},{"name":"Taika Waititi","character":"Korg / Old Kronan God (voice)","profile_path":"/ww6L2ksfJNMbuiIdDuvVKndUHsv.jpg"},{"name":"Russell Crowe","character":"Zeus","profile_path":"/3IBZF0qCZMZ7zJYlgrH0sQzNZV.jpg"},{"name":"Jaimie Alexander","character":"Sif","profile_path":"/21IQHPAXNUHiqPrpIYr4X8h2wmf.jpg"},{"name":"Idris Elba","character":"Heimdall","profile_path":"/be1bVF7qGX91a6c5WeRPs5pKXln.jpg"}],"director":"Taika Waititi","backdrop_path":"/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg"},"she-hulk":{"cast":[{"name":"Tatiana Maslany","character":"Jennifer Walters / She-Hulk","profile_path":"/x8lBkm9CBJbIlLpqjEwkQydZ2or.jpg"},{"name":"Ginger Gonzaga","character":"Nikki Ramos","profile_path":"/4YMXflYscHwrDBrrPfWEndwyNsB.jpg"},{"name":"Jameela Jamil","character":"Mary MacPherran / Titania","profile_path":"/e9RviCItpPoSwD79y4YYlDbIwM6.jpg"},{"name":"Renée Elise Goldsberry","character":"Mallory Book","profile_path":"/xlcw1r2ieUlaDLK6CIs5MQ9HIgK.jpg"},{"name":"Josh Segarra","character":"Augustus 'Pug' Pugliese","profile_path":"/vXhukEBgpI8jmCUCSGcpJCNzXHV.jpg"}],"director":"Jessica Gao","backdrop_path":"/eljErfkQUcFUgQkI4I1soZcH8MW.jpg"},"werewolf-by-night":{"cast":[{"name":"Gael García Bernal","character":"Jack Russell","profile_path":"/7uEO29wtdyY9bjt2JN43gVpE6vt.jpg"},{"name":"Laura Donnelly","character":"Elsa Bloodstone","profile_path":"/xunYtWPWYwzLhaScz0bFz4WjFbW.jpg"},{"name":"Harriet Sansom Harris","character":"Verussa Bloodstone","profile_path":"/1ShvYCWkZycAGb27ZivGrLx1PhS.jpg"},{"name":"Kirk R. Thatcher","character":"Jovan","profile_path":"/7rkO6MLFgcPzbLV4mpwLu2r6M3S.jpg"},{"name":"Eugenie Bondurant","character":"Azarel","profile_path":"/9ULAELEKNha7VCJhRWoer58NcJe.jpg"},{"name":"Leonardo Nam","character":"Liorn","profile_path":"/yKL70EoAdjJV2JI2CN1Dr5qzAlJ.jpg"},{"name":"Daniel J. Watts","character":"Barasso","profile_path":"/yzsburXAHWg7XOvWeBtYNnm5giD.jpg"},{"name":"Al Hamacher","character":"Billy Swan","profile_path":"/u5QxguVAJDIkF8npPvpxjRjJ7Ft.jpg"}],"director":"Michael Giacchino","backdrop_path":"/l1ORpdYr8uFZ9MNYKoq1p6fIc4M.jpg"},"black-panther-wf":{"cast":[{"name":"Letitia Wright","character":"Shuri","profile_path":"/f7PevpEeBqwzACPhoZ8K3ktrKvE.jpg"},{"name":"Tenoch Huerta Mejía","character":"Namor","profile_path":"/5qoAmQpcPCjf4Pd6aTZOeINGYzk.jpg"},{"name":"Lupita Nyong'o","character":"Nakia","profile_path":"/y40Wu1T742kynOqtwXASc5Qgm49.jpg"},{"name":"Danai Gurira","character":"Okoye","profile_path":"/z7H7QeQvr24vskGlANQhG43vozQ.jpg"},{"name":"Winston Duke","character":"M'Baku","profile_path":"/MhBiZbryibwuoEtPL9Ns8pYHC1.jpg"},{"name":"Angela Bassett","character":"Ramonda","profile_path":"/tKnuviliyeKNGlo26IU5gIrJAtd.jpg"},{"name":"Martin Freeman","character":"Everett Ross","profile_path":"/nrO54AzrxiNgCjBUOSz6ebyxDZY.jpg"},{"name":"Julia Louis-Dreyfus","character":"Valentina Allegra de Fontaine","profile_path":"/iEfHQNrVbVFesDPjdySom9nqsFg.jpg"}],"director":"Ryan Coogler","backdrop_path":"/83H0C66AcvkwpG2738VCTHMY9uv.jpg"},"gotg-holiday":{"cast":[{"name":"Chris Pratt","character":"Peter Quill / Star-Lord","profile_path":"/cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg"},{"name":"Dave Bautista","character":"Drax","profile_path":"/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg"},{"name":"Karen Gillan","character":"Nebula","profile_path":"/rWx8u4F4aYIqmjJDeMK78ysPsu0.jpg"},{"name":"Pom Klementieff","character":"Mantis","profile_path":"/hfUKAI2kXTMMWjno0i4sLPJud5N.jpg"},{"name":"Vin Diesel","character":"Groot (voice)","profile_path":"/nZdVry7lnUkE24PnXakok9okvL4.jpg"},{"name":"Bradley Cooper","character":"Rocket (voice)","profile_path":"/5Dhy50qOMOHfR1NZifKIfffjV9X.jpg"},{"name":"Sean Gunn","character":"Kraglin","profile_path":"/tiolBlPytndQVGHO9vLnBKWWenq.jpg"},{"name":"Rhett Miller","character":"Bzermikitokolok","profile_path":"/pu1pcZBbkq43qxECHi3YzbZfLnn.jpg"}],"director":"James Gunn","backdrop_path":"/rfnmMYuZ6EKOBvQLp2wqP21v7sI.jpg"},"ant-man-quantumania":{"cast":[{"name":"Paul Rudd","character":"Scott Lang / Ant-Man","profile_path":"/6jtwNOLKy0LdsRAKwZqgYMAfd5n.jpg"},{"name":"Evangeline Lilly","character":"Hope Van Dyne / The Wasp","profile_path":"/pJHX2jd7ytre3NQbF9nlyWUqxH3.jpg"},{"name":"Michael Douglas","character":"Dr. Hank Pym","profile_path":"/kVYGPIZowzXLEQfAGUNOqKjAbBb.jpg"},{"name":"Michelle Pfeiffer","character":"Janet Van Dyne","profile_path":"/8qwNMFzmM3BxGKIj1iIqiHHBpx3.jpg"},{"name":"Jonathan Majors","character":"Kang the Conqueror","profile_path":"/nsxnMbkl9Lpc12AmYwKi9SmsJ7e.jpg"},{"name":"Kathryn Newton","character":"Cassie Lang","profile_path":"/3mos4oK6bps0uhQzW1L7nj5O0Gd.jpg"},{"name":"Corey Stoll","character":"M.O.D.O.K.","profile_path":"/2eMxKecTZBiS60gPUVWcimYgGDp.jpg"},{"name":"Bill Murray","character":"Lord Krylar","profile_path":"/nnCsJc9x3ZiG3AFyiyc3FPehppy.jpg"}],"director":"Peyton Reed","backdrop_path":"/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg"},"guardians-3":{"cast":[{"name":"Chris Pratt","character":"Peter Quill / Star-Lord","profile_path":"/cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg"},{"name":"Zoe Saldaña","character":"Gamora","profile_path":"/vQBwmsSOAd0JDaEcZ5p43J9xzsY.jpg"},{"name":"Dave Bautista","character":"Drax","profile_path":"/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg"},{"name":"Karen Gillan","character":"Nebula","profile_path":"/rWx8u4F4aYIqmjJDeMK78ysPsu0.jpg"},{"name":"Pom Klementieff","character":"Mantis","profile_path":"/hfUKAI2kXTMMWjno0i4sLPJud5N.jpg"},{"name":"Vin Diesel","character":"Groot (voice)","profile_path":"/nZdVry7lnUkE24PnXakok9okvL4.jpg"},{"name":"Bradley Cooper","character":"Rocket (voice)","profile_path":"/5Dhy50qOMOHfR1NZifKIfffjV9X.jpg"},{"name":"Sean Gunn","character":"Kraglin / Young Rocket (voice)","profile_path":"/tiolBlPytndQVGHO9vLnBKWWenq.jpg"}],"director":"James Gunn","backdrop_path":"/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg"},"secret-invasion":{"cast":[{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"},{"name":"Ben Mendelsohn","character":"Talos","profile_path":"/uRB2ufOpCNun8G1LPsZJPnfhavb.jpg"},{"name":"Kingsley Ben-Adir","character":"Gravik","profile_path":"/yCJNGOQKavWqOZSIEPKvQVlyAwA.jpg"},{"name":"Killian Scott","character":"Pagon","profile_path":"/8ri6qJgCitrezFaiCPzgQbdDBYp.jpg"},{"name":"Samuel Adewunmi","character":"Beto","profile_path":"/j3Q9JlpO6HKUlEiDtWOTSnr5Prj.jpg"},{"name":"Dermot Mulroney","character":"President Ritson","profile_path":"/kkrMKD6b4vEdphVgKsenRY4NgiC.jpg"},{"name":"Emilia Clarke","character":"G'iah","profile_path":"/iFY6t7Ux9r70WB7Sp0TTVz6eGtm.jpg"},{"name":"Olivia Colman","character":"Sonya Falsworth","profile_path":"/lawJUdbLb1YW0niaYjiVGR9IBG8.jpg"}],"director":"Kyle Bradstreet","backdrop_path":"/6mOK9j99OFlxGc3ird2jWUeUha9.jpg"},"loki-s2":{"cast":[{"name":"Tom Hiddleston","character":"Loki","profile_path":"/mclHxMm8aPlCPKptP67257F5GPo.jpg"},{"name":"Sophia Di Martino","character":"The Variant","profile_path":"/qZdFp18btpQJfDoknxr7DgfRpcB.jpg"},{"name":"Wunmi Mosaku","character":"Hunter B-15","profile_path":"/vp7qDA7cYZj0MDYk1k4wysmznnN.jpg"},{"name":"Eugene Cordero","character":"Casey","profile_path":"/waruLSR8lXBjhAFL0J6ihuVY62d.jpg"},{"name":"Ke Huy Quan","character":"OB","profile_path":"/iestHyn7PLuVowj5Jaa1SGPboQ4.jpg"},{"name":"Owen Wilson","character":"Mobius","profile_path":"/5A46lNOwmpX77jAdhyKxU7e2Hub.jpg"}],"director":"Michael Waldron","backdrop_path":"/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg"},"the-marvels":{"cast":[{"name":"Brie Larson","character":"Carol Danvers / Captain Marvel","profile_path":"/xSGvMwNNJcEQvVcjiIUTyxyMfkZ.jpg"},{"name":"Teyonah Parris","character":"Monica Rambeau","profile_path":"/mArqi5mGbKvfrNsrEEkdy0gDvGu.jpg"},{"name":"Iman Vellani","character":"Kamala Khan / Ms. Marvel","profile_path":"/oBpOjLAH8heYNNJZN1Z5jVQhAKC.jpg"},{"name":"Samuel L. Jackson","character":"Nick Fury","profile_path":"/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"},{"name":"Zawe Ashton","character":"Dar-Benn","profile_path":"/zbxVfvhPhCfgpgmWTdtHWurNqYu.jpg"},{"name":"Gary Lewis","character":"Emperor Dro'ge","profile_path":"/cOaibfAluUeWPtcSOjedfGXn9ym.jpg"},{"name":"Park Seo-jun","character":"Prince Yan","profile_path":"/k1ALgZkOApYt7PIUBkUitmknXQC.jpg"},{"name":"Zenobia Shroff","character":"Muneeba Khan","profile_path":"/fwU2vIUq9W9eXRKxx9r3papdOkS.jpg"}],"director":"Nia DaCosta","backdrop_path":"/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg"},"echo":{"cast":[{"name":"Alaqua Cox","character":"Maya Lopez / Echo","profile_path":"/gvIuoDFjWTQe8WwhU5CZ6qAQCuT.jpg"},{"name":"Chaske Spencer","character":"Henry 'Black Crow' Lopez","profile_path":"/yYXfNYra3BKPTXfLtAdUJ0RinjE.jpg"},{"name":"Tantoo Cardinal","character":"Chula Battiest","profile_path":"/rxhjfygJlPwztf36iRI7UDn5dr7.jpg"},{"name":"Devery Jacobs","character":"Bonnie","profile_path":"/74QH7KCW6ZI2ekIYYCV4NyGet4X.jpg"},{"name":"Cody Lightning","character":"Biscuits","profile_path":"/gDaoXjEHlif8r6EpuKdbB5fgN6b.jpg"},{"name":"Graham Greene","character":"Skully","profile_path":"/ui1x4vGTiI9eANYM9BZ6R4oushJ.jpg"},{"name":"Vincent D'Onofrio","character":"Wilson Fisk / Kingpin","profile_path":"/qkyiLolEqYMGH25xD4sFIXAjZQB.jpg"}],"director":"Marvel Studios","backdrop_path":"/u3ySnWqSjM3jedYgJZTR7RWRDDm.jpg"},"deadpool-wolverine":{"cast":[{"name":"Ryan Reynolds","character":"Wade Wilson / Deadpool / Nicepool","profile_path":"/trzgptffGvAlAT6MEu01fz47cLW.jpg"},{"name":"Hugh Jackman","character":"Logan / Wolverine","profile_path":"/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg"},{"name":"Emma Corrin","character":"Cassandra Nova","profile_path":"/miSbXJBlq6S3dVvOr7OoNL4axW6.jpg"},{"name":"Matthew Macfadyen","character":"Mr. Paradox","profile_path":"/sFaIfkykJdftwrc3BdEfpdg2mYW.jpg"},{"name":"Dafne Keen","character":"Laura / X-23","profile_path":"/34BhddK5z2YHjfppOleezVrQ7Jt.jpg"},{"name":"Jon Favreau","character":"Happy Hogan","profile_path":"/8MtRRnEHaBSw8Ztdl8saXiw1egP.jpg"},{"name":"Morena Baccarin","character":"Vanessa","profile_path":"/4gyHyg6FJ1oFczOm5pmMkdEEo2J.jpg"},{"name":"Rob Delaney","character":"Peter","profile_path":"/xirfT1znRkkughLiPemKu3NhkKQ.jpg"}],"director":"Shawn Levy","backdrop_path":"/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg"},"agatha-all-along":{"cast":[{"name":"Kathryn Hahn","character":"Agnes O'Connor / Agatha Harkness","profile_path":"/9sVllAKfEls3SJD3GoPm2JEZoa5.jpg"},{"name":"Joe Locke","character":"Teen","profile_path":"/snlCoxXK1gLlyE7oncVEtQe7OcO.jpg"},{"name":"Sasheer Zamata","character":"Jennifer Kale","profile_path":"/cI5jWRJNGuECiATsSBGGb5B9VRg.jpg"},{"name":"Ali Ahn","character":"Alice Wu-Gulliver","profile_path":"/tK2JL02YuCInio9czdxT77R6i52.jpg"},{"name":"Debra Jo Rupp","character":"Mrs. Hart","profile_path":"/jVGXbJvfIoRI6PtKbwUYGNyiI67.jpg"},{"name":"Patti LuPone","character":"Lilia Calderu","profile_path":"/mbNAKaSYSTGeigxeFwUQfvoUXW0.jpg"},{"name":"Aubrey Plaza","character":"Rio Vidal","profile_path":"/ejtGfjOAvUHBdVc3xTIV1HtJBi9.jpg"},{"name":"David A Payton","character":"Herb","profile_path":"/x9CIWGa0VBRPFiidHQwveGa6AOS.jpg"}],"director":"Jac Schaeffer","backdrop_path":"/tYLXJW1sZQU09VWY1BhSVPKGIwc.jpg"},"captain-america-bnw":{"cast":[{"name":"Anthony Mackie","character":"Sam Wilson / Captain America","profile_path":"/vecvTm7SimizluJkyIwBxeLbvRm.jpg"},{"name":"Harrison Ford","character":"President Thaddeus Ross","profile_path":"/pjBMJVPpcZK23Vt1nzr1zEBTWrP.jpg"},{"name":"Danny Ramirez","character":"Joaquin Torres","profile_path":"/7ZvcfWA5O5ULiupbHZtGGEPwnpI.jpg"},{"name":"Shira Haas","character":"Ruth Bat-Seraph","profile_path":"/b8HllH5dudBz3y3zGWFHJdsbPJf.jpg"},{"name":"Tim Blake Nelson","character":"Samuel Sterns","profile_path":"/rWuTGiAMaaHIJ30eRkQS23LbRSW.jpg"},{"name":"Carl Lumbly","character":"Isaiah Bradley","profile_path":"/ew1URcenWNl1Uclsz9ADiRb0uBD.jpg"},{"name":"Giancarlo Esposito","character":"Sidewinder","profile_path":"/MJOo4QZgMAb3y8QzOUDVFQusQZ.jpg"},{"name":"Liv Tyler","character":"Betty Ross","profile_path":"/rC6f9NoDN9l2tMgiEocIvnJi2tW.jpg"}],"director":"Julius Onah","backdrop_path":"/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg"},"thunderbolts":{"cast":[{"name":"Florence Pugh","character":"Yelena Belova","profile_path":"/qqDsryavx9rwSMhDAxW6OC7oNQg.jpg"},{"name":"Sebastian Stan","character":"Bucky Barnes","profile_path":"/v20RLWst39klatsqUgSrwHxhwee.jpg"},{"name":"Julia Louis-Dreyfus","character":"Valentina Allegra de Fontaine","profile_path":"/iEfHQNrVbVFesDPjdySom9nqsFg.jpg"},{"name":"Lewis Pullman","character":"Robert Reynolds","profile_path":"/i2wJQ2eaVuTPaA84jzxNtxs54mO.jpg"},{"name":"David Harbour","character":"Alexei Shostakov","profile_path":"/qMFtMWlYVtFVyBoBhX5IoA5sN5a.jpg"},{"name":"Wyatt Russell","character":"John Walker","profile_path":"/zIldBzXdBWskPZB7x35G2hYEVDo.jpg"},{"name":"Hannah John-Kamen","character":"Ava Starr","profile_path":"/2fqNQQW3B7upH4rBubhxXkIIoGk.jpg"},{"name":"Olga Kurylenko","character":"Antonia Dreykov","profile_path":"/ei6eYUhQFw2AaV6U5fyPptBaPF0.jpg"}],"director":"Jake Schreier","backdrop_path":"/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg"},"ironheart":{"cast":[{"name":"Dominique Thorne","character":"Riri Williams","profile_path":"/tuLlp79SfYc4mLzzjdC2ekLI7qd.jpg"},{"name":"Lyric Ross","character":"N.A.T.A.L.I.E.","profile_path":"/sRh8aD95pBYpt2LDR1OWs2DwDbf.jpg"},{"name":"Manny Montana","character":"Cousin John","profile_path":"/EUoD5EalyUDHZtRZCnosRqhMi.jpg"},{"name":"Matthew Elam","character":"Xavier","profile_path":"/vYV8zfLEFOiOXTXoHfF1oEmwbYG.jpg"},{"name":"Anji White","character":"Ronnie Williams","profile_path":"/6JcZUdPQ3sz35g4N6JDarfRnPOo.jpg"},{"name":"Eric André","character":"Rampage","profile_path":"/e9XlcFnZQiBSQ1vISQVyTOrkIaq.jpg"},{"name":"Sonia Denis","character":"Clown","profile_path":"/rWxTssmmEX3tkMArKVSpdETlLTV.jpg"},{"name":"Shea Couleé","character":"Slug","profile_path":"/bB1TYBavSXYv04WW66PrQmlG4Uk.jpg"}],"director":"Chinaka Hodge","backdrop_path":"/vno2LrEQr3lTOk3U1G1ihZsy64b.jpg"},"daredevil-ba":{"cast":[{"name":"Charlie Cox","character":"Matt Murdock / Daredevil","profile_path":"/91fFBazOvuNjwjcES2b199Ukspn.jpg"},{"name":"Vincent D'Onofrio","character":"Wilson Fisk","profile_path":"/qkyiLolEqYMGH25xD4sFIXAjZQB.jpg"},{"name":"Wilson Bethel","character":"Benjamin Poindexter / Bullseye","profile_path":"/xHLjGi9onJXwHoZALZ9pLBVnH5x.jpg"},{"name":"Deborah Ann Woll","character":"Karen Page","profile_path":"/btTnyvRLXOH0pz2SLBwyKbmnFhX.jpg"},{"name":"Margarita Levieva","character":"Heather Glenn","profile_path":"/7rSf7C5oKuvjgEBfe2GVv064Le.jpg"},{"name":"Matthew Lillard","character":"Mr. Charles","profile_path":"/mIEKAfe0iC41RDXibbTy48LtNOi.jpg"},{"name":"Lili Taylor","character":"Gov Marge McCaffrey","profile_path":"/vWcMUi3QyvCr3QuFbjtwyPx7WtU.jpg"},{"name":"Michael Gandolfini","character":"Daniel Blake","profile_path":"/949lN8eoD3oXx1TmpjzmPQvt2TI.jpg"}],"director":"Dario Scardapane, Chris Ord, Matt Corman","backdrop_path":"/qrTAc0ZtQ859Qu5O8cixJzNJpQs.jpg"},"fantastic-four":{"cast":[{"name":"Pedro Pascal","character":"Reed Richards / Mister Fantastic","profile_path":"/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"},{"name":"Vanessa Kirby","character":"Sue Storm / Invisible Woman","profile_path":"/5fbvIkZ02RdcXfZHUUk4cQ9kILK.jpg"},{"name":"Ebon Moss-Bachrach","character":"Ben Grimm / The Thing","profile_path":"/xD8GVNayMpiTZxLfahy2DseYcQq.jpg"},{"name":"Joseph Quinn","character":"Johnny Storm / Human Torch","profile_path":"/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg"},{"name":"Ralph Ineson","character":"Galactus","profile_path":"/sn3ONJw2pJxMHiCqPwvkaiWr5mc.jpg"},{"name":"Julia Garner","character":"Shalla-Bal / Silver Surfer","profile_path":"/ud1RXbvW70J89iqeic7no8olxvb.jpg"},{"name":"Paul Walter Hauser","character":"Harvey Elder / Mole Man","profile_path":"/hXjjbYg1Ah8mFf5ZcaakyXzDKMx.jpg"},{"name":"Natasha Lyonne","character":"Rachel Rozman","profile_path":"/2QJoTBEIeYyjGSDot9qxv2ayPH3.jpg"}],"director":"Matt Shakman","backdrop_path":"/s94NjfKkcSczZ1FembwmQZwsuwY.jpg"},"avengers-doomsday":{"cast":[{"name":"Robert Downey Jr.","character":"Victor von Doom  / Doctor Doom","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Chris Evans","character":"Steve Rogers","profile_path":"/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"},{"name":"Chris Hemsworth","character":"Thor","profile_path":"/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"},{"name":"Pedro Pascal","character":"Reed Richards / Mister Fantastic","profile_path":"/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"},{"name":"Paul Rudd","character":"Scott Lang / Ant-Man","profile_path":"/6jtwNOLKy0LdsRAKwZqgYMAfd5n.jpg"},{"name":"Anthony Mackie","character":"Sam Wilson / Captain America","profile_path":"/vecvTm7SimizluJkyIwBxeLbvRm.jpg"},{"name":"Florence Pugh","character":"Yelena Belova","profile_path":"/qqDsryavx9rwSMhDAxW6OC7oNQg.jpg"},{"name":"Vanessa Kirby","character":"Sue Storm / Invisible Woman","profile_path":"/5fbvIkZ02RdcXfZHUUk4cQ9kILK.jpg"}],"director":"Joe Russo","backdrop_path":"/rObL4of4eFA8yWaN9pRFo9aOVNi.jpg"},"avengers-secret-wars":{"cast":[{"name":"Robert Downey Jr.","character":"Victor von Doom  / Doctor Doom","profile_path":"/f9toX5MahujsDZTJoKIa5kzdhAE.jpg"},{"name":"Pedro Pascal","character":"Reed Richards / Mister Fantastic","profile_path":"/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"},{"name":"Vanessa Kirby","character":"Sue Storm / Invisible Woman","profile_path":"/5fbvIkZ02RdcXfZHUUk4cQ9kILK.jpg"},{"name":"Ebon Moss-Bachrach","character":"Ben Grimm / The Thing","profile_path":"/xD8GVNayMpiTZxLfahy2DseYcQq.jpg"},{"name":"Joseph Quinn","character":"Johnny Storm / Human Torch","profile_path":"/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg"},{"name":"Sebastian Stan","character":"Bucky Barnes / Winter Soldier","profile_path":"/v20RLWst39klatsqUgSrwHxhwee.jpg"},{"name":"Florence Pugh","character":"Yelena Belova","profile_path":"/qqDsryavx9rwSMhDAxW6OC7oNQg.jpg"},{"name":"David Harbour","character":"Alexei Shostakov","profile_path":"/qMFtMWlYVtFVyBoBhX5IoA5sN5a.jpg"}],"director":"Joe Russo","backdrop_path":"/rytc6Lf4447C0CDncwFa4gxe0vY.jpg"}};

function getKnownMedia(titleId) {
  return KNOWN_CAST[titleId] || null;
}


/* ── js/storage.js ── */
/* =============================================================
   MCU Tracker — Storage (storage.js)
   localStorage abstraction for persistence
   ============================================================= */

const STORAGE_KEYS = {
  WATCH_STATUS: 'mcu_watch_status',
  RATINGS: 'mcu_ratings',
  REWATCH: 'mcu_rewatch',
  QUIZ_SCORES: 'mcu_quiz_scores',
  STREAK: 'mcu_streak',
  DAILY_QUIZ: 'mcu_daily_quiz',
  USERNAME: 'mcu_username',
  WATCH_ORDER: 'mcu_watch_order',
  UNLOCKED_BADGES: 'mcu_unlocked_badges',
  ONBOARDED: 'mcu_onboarded'
};

// ── HTML Escaper ─────────────────────────────────────────────

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Generic helpers ─────────────────────────────────────────

function storageGet(key, fallback = {}) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

// ── Watch Status ────────────────────────────────────────────
// Status: 'unwatched' | 'watched' | 'rewatched'

function getWatchStatus(titleId) {
  const data = storageGet(STORAGE_KEYS.WATCH_STATUS);
  return data[titleId] || 'unwatched';
}

function setWatchStatus(titleId, status) {
  const data = storageGet(STORAGE_KEYS.WATCH_STATUS);
  data[titleId] = status;
  storageSet(STORAGE_KEYS.WATCH_STATUS, data);
}

function getAllWatchStatuses() {
  return storageGet(STORAGE_KEYS.WATCH_STATUS);
}

function cycleWatchStatus(titleId) {
  const current = getWatchStatus(titleId);
  const next = current === 'unwatched' ? 'watched'
             : current === 'watched' ? 'rewatched'
             : 'unwatched';
  setWatchStatus(titleId, next);
  if (next === 'rewatched') {
    incrementRewatch(titleId);
  }
  return next;
}

// ── Ratings ─────────────────────────────────────────────────

function getRating(titleId) {
  const data = storageGet(STORAGE_KEYS.RATINGS);
  return data[titleId] || 0;
}

function setRating(titleId, stars) {
  const data = storageGet(STORAGE_KEYS.RATINGS);
  data[titleId] = stars;
  storageSet(STORAGE_KEYS.RATINGS, data);
}

function getAllRatings() {
  return storageGet(STORAGE_KEYS.RATINGS);
}

// ── Rewatch Count ───────────────────────────────────────────

function getRewatchCount(titleId) {
  const data = storageGet(STORAGE_KEYS.REWATCH);
  return data[titleId] || 0;
}

function incrementRewatch(titleId) {
  const data = storageGet(STORAGE_KEYS.REWATCH);
  data[titleId] = (data[titleId] || 0) + 1;
  storageSet(STORAGE_KEYS.REWATCH, data);
}

// ── Quiz Scores ─────────────────────────────────────────────

function getQuizScores() {
  return storageGet(STORAGE_KEYS.QUIZ_SCORES, []);
}

function saveQuizAttempt(categoryId, score, total) {
  const scores = getQuizScores();
  scores.push({
    categoryId,
    score,
    total,
    date: new Date().toISOString()
  });
  storageSet(STORAGE_KEYS.QUIZ_SCORES, scores);
}

function getBestScore(categoryId) {
  const scores = getQuizScores();
  const catScores = scores.filter(s => s.categoryId === categoryId);
  if (catScores.length === 0) return null;
  return catScores.reduce((best, s) => s.score > best.score ? s : best);
}

// ── Streak ──────────────────────────────────────────────────

function getStreak() {
  const data = storageGet(STORAGE_KEYS.STREAK, { current: 0, best: 0, lastDate: null });
  return data;
}

function updateStreak() {
  const data = getStreak();
  const today = new Date().toISOString().split('T')[0];
  
  if (data.lastDate === today) return data; // Already updated today
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (data.lastDate === yesterday) {
    // Continue streak
    data.current += 1;
  } else {
    // Streak broken, start fresh
    data.current = 1;
  }
  
  if (data.current > data.best) {
    data.best = data.current;
  }
  
  data.lastDate = today;
  storageSet(STORAGE_KEYS.STREAK, data);
  return data;
}

// ── Daily Quiz ──────────────────────────────────────────────

function getDailyQuizStatus() {
  const data = storageGet(STORAGE_KEYS.DAILY_QUIZ, {});
  const today = new Date().toISOString().split('T')[0];
  return data[today] || null;
}

function markDailyQuizDone(score, total) {
  const data = storageGet(STORAGE_KEYS.DAILY_QUIZ, {});
  const today = new Date().toISOString().split('T')[0];
  data[today] = { score, total, completedAt: new Date().toISOString() };
  storageSet(STORAGE_KEYS.DAILY_QUIZ, data);
  updateStreak();
}

// ── Username & Onboarding ───────────────────────────────────

function getUsername() {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.USERNAME);
    if (val && val.trim() && val !== 'MCU Fan') return val.trim();
  } catch {}
  return 'Hero';
}

function setUsername(name) {
  try {
    const clean = (name || '').trim();
    if (clean) {
      localStorage.setItem(STORAGE_KEYS.USERNAME, clean);
    }
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

function hasOnboarded() {
  try {
    const onboarded = localStorage.getItem(STORAGE_KEYS.ONBOARDED);
    const user = localStorage.getItem(STORAGE_KEYS.USERNAME);
    return onboarded === 'true' && !!user && user.trim() !== '' && user !== 'MCU Fan';
  } catch {
    return false;
  }
}

function setOnboarded(name) {
  try {
    if (name && name.trim()) {
      setUsername(name.trim());
    }
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

// ── Watch Order ─────────────────────────────────────────────

function getWatchOrder() {
  try {
    const order = localStorage.getItem(STORAGE_KEYS.WATCH_ORDER);
    return (order === 'chronological' || order === 'release') ? order : 'release';
  } catch {
    return 'release';
  }
}

function setWatchOrder(order) {
  try {
    localStorage.setItem(STORAGE_KEYS.WATCH_ORDER, order);
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

// ── Badges Storage ──────────────────────────────────────────

function getUnlockedBadges() {
  const primary = storageGet(STORAGE_KEYS.UNLOCKED_BADGES, null);
  if (primary && Array.isArray(primary)) return primary;
  const legacy = storageGet('mcu_earned_badges', []);
  return Array.isArray(legacy) ? legacy : [];
}

function setUnlockedBadges(badgeIds) {
  storageSet(STORAGE_KEYS.UNLOCKED_BADGES, badgeIds);
  storageSet('mcu_earned_badges', badgeIds);
}

// ── Stats Helpers ───────────────────────────────────────────

function getWatchStats() {
  const statuses = getAllWatchStatuses();
  const totalTitles = MCU_TITLES.length;
  let watched = 0;
  let rewatched = 0;
  let totalRuntime = 0;
  let totalCatalogRuntime = 0;
  
  MCU_TITLES.forEach(title => {
    const rt = Number(title.runtime) || 0;
    totalCatalogRuntime += rt;
    const status = statuses[title.id];
    if (status === 'watched' || status === 'rewatched') {
      watched++;
      totalRuntime += rt;
    }
    if (status === 'rewatched') {
      rewatched++;
    }
  });
  
  const runtimeRemaining = Math.max(0, totalCatalogRuntime - totalRuntime);

  return {
    totalTitles,
    watched,
    rewatched,
    unwatched: Math.max(0, totalTitles - watched),
    percentComplete: totalTitles > 0 ? Math.round((watched / totalTitles) * 100) : 0,
    totalRuntime,
    hoursWatched: Math.round(totalRuntime / 60),
    totalCatalogRuntime,
    totalCatalogHours: Math.round(totalCatalogRuntime / 60),
    runtimeRemaining,
    hoursRemaining: Math.round(runtimeRemaining / 60)
  };
}

function getSagaStats(sagaId) {
  const titles = getTitlesBySaga(sagaId);
  const statuses = getAllWatchStatuses();
  const total = titles.length;
  let watched = 0;
  let runtimeWatched = 0;
  let totalRuntime = 0;
  
  titles.forEach(t => {
    const rt = Number(t.runtime) || 0;
    totalRuntime += rt;
    if (statuses[t.id] === 'watched' || statuses[t.id] === 'rewatched') {
      watched++;
      runtimeWatched += rt;
    }
  });
  
  return {
    total,
    watched,
    percent: total > 0 ? Math.round((watched / total) * 100) : 0,
    totalRuntime,
    runtimeWatched,
    runtimeRemaining: Math.max(0, totalRuntime - runtimeWatched)
  };
}

function getPhaseStats(phase) {
  const titles = getTitlesByPhase(phase);
  const statuses = getAllWatchStatuses();
  const total = titles.length;
  let watched = 0;
  let rewatched = 0;
  let runtimeWatched = 0;
  let totalRuntime = 0;
  
  titles.forEach(t => {
    const rt = Number(t.runtime) || 0;
    totalRuntime += rt;
    if (statuses[t.id] === 'watched' || statuses[t.id] === 'rewatched') {
      watched++;
      runtimeWatched += rt;
    }
    if (statuses[t.id] === 'rewatched') {
      rewatched++;
    }
  });
  
  return {
    phase,
    total,
    watched,
    rewatched,
    unwatched: Math.max(0, total - watched),
    percent: total > 0 ? Math.round((watched / total) * 100) : 0,
    totalRuntime,
    runtimeWatched,
    runtimeRemaining: Math.max(0, totalRuntime - runtimeWatched)
  };
}

function getQuizStats() {
  const scores = getQuizScores();
  const streak = getStreak();
  const totalQuizzes = scores.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(scores.reduce((sum, s) => sum + (s.score / s.total) * 100, 0) / totalQuizzes)
    : 0;
  const perfectScores = scores.filter(s => s.score === s.total).length;
  
  return {
    totalQuizzes,
    avgScore,
    perfectScores,
    currentStreak: streak.current,
    bestStreak: streak.best
  };
}


/* ── js/tracker.js ── */
/* =============================================================
   MCU Tracker — Tracker Page (tracker.js)
   Watch tracker logic, filtering, ordering, UI rendering
   ============================================================= */

let currentOrder = typeof getWatchOrder === 'function' ? getWatchOrder() : 'release';
let searchQuery = '';
let currentStatus = 'all';  // 'all', 'watched', 'unwatched'
let lastToggledTitleId = null;
let searchDebounceTimer = null;

function initTracker() {
  currentOrder = typeof getWatchOrder === 'function' ? getWatchOrder() : 'release';
  renderTrackerControls();
  renderTrackerList();
}

function renderTrackerControls() {
  const controls = document.getElementById('tracker-controls');
  if (!controls) return;
  
  controls.innerHTML = `
    <!-- Top Bar: Order Toggle + Search -->
    <div class="tracker-top-row">
      <div class="order-toggle" role="group" aria-label="Sort order">
        <button class="order-toggle__btn ${currentOrder === 'release' ? 'order-toggle__btn--active' : ''}" 
                onclick="setOrder('release')" 
                id="order-release" 
                aria-pressed="${currentOrder === 'release'}">Release Order</button>
        <button class="order-toggle__btn ${currentOrder === 'chronological' ? 'order-toggle__btn--active' : ''}" 
                onclick="setOrder('chronological')" 
                id="order-chrono" 
                aria-pressed="${currentOrder === 'chronological'}">Chronological Order</button>
      </div>

      <div class="tracker-search-wrap">
        <span class="tracker-search-icon"><i data-lucide="search"></i></span>
        <input type="search" 
               class="tracker-search-input" 
               id="tracker-search-input" 
               placeholder="Search titles (e.g. Iron Man, Loki)..." 
               value="${escapeTrackerText(searchQuery)}"
               aria-label="Search titles"
               oninput="onTrackerSearch(this.value)">
        <button class="tracker-search-clear" 
                id="tracker-search-clear" 
                onclick="clearTrackerSearch()" 
                aria-label="Clear search" 
                style="display: ${searchQuery ? 'flex' : 'none'}">✕</button>
      </div>
    </div>

    <!-- Filter Chips (Status) -->
    <div class="tracker-filters-container">
      <div class="tracker-filter-group">
        <span class="tracker-filter-label">Status</span>
        <div class="tracker-filter-chips" role="group" aria-label="Filter by Status">
          <button class="filter-btn ${currentStatus === 'all' ? 'filter-btn--active' : ''}" 
                  onclick="setStatusFilter('all')" 
                  aria-pressed="${currentStatus === 'all'}">All</button>
          <button class="filter-btn ${currentStatus === 'watched' ? 'filter-btn--active' : ''}" 
                  onclick="setStatusFilter('watched')" 
                  aria-pressed="${currentStatus === 'watched'}">Watched</button>
          <button class="filter-btn ${currentStatus === 'unwatched' ? 'filter-btn--active' : ''}" 
                  onclick="setStatusFilter('unwatched')" 
                  aria-pressed="${currentStatus === 'unwatched'}">Unwatched</button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeTrackerText(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setOrder(order) {
  currentOrder = order;
  if (typeof setWatchOrder === 'function') {
    setWatchOrder(order);
  }
  renderTrackerControls();
  renderTrackerList();
}

function onTrackerSearch(val) {
  searchQuery = val;
  const clearBtn = document.getElementById('tracker-search-clear');
  if (clearBtn) {
    clearBtn.style.display = val.trim() ? 'flex' : 'none';
  }
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    renderTrackerList();
  }, 200);
}

function clearTrackerSearch() {
  searchQuery = '';
  const input = document.getElementById('tracker-search-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('tracker-search-clear');
  if (clearBtn) clearBtn.style.display = 'none';
  renderTrackerList();
}

function setStatusFilter(status) {
  currentStatus = status;
  renderTrackerControls();
  renderTrackerList();
}

function resetTrackerFilters() {
  searchQuery = '';
  currentStatus = 'all';
  renderTrackerControls();
  renderTrackerList();
}

function getFilteredTitles() {
  let titles = getTitlesByOrder(currentOrder);

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    titles = titles.filter(t => t.name.toLowerCase().includes(q));
  }

  if (currentStatus === 'watched') {
    titles = titles.filter(t => getWatchStatus(t.id) !== 'unwatched');
  } else if (currentStatus === 'unwatched') {
    titles = titles.filter(t => getWatchStatus(t.id) === 'unwatched');
  }

  return titles;
}

function renderTrackerList() {
  const container = document.getElementById('tracker-list');
  if (!container) return;
  
  const titles = getFilteredTitles();

  if (titles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon"><i data-lucide="search" style="width:36px;height:36px;"></i></div>
        <div class="empty-state__text">No titles found</div>
        <p class="micro" style="color: var(--color-text-muted)">No MCU releases match your current search and filter criteria.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetTrackerFilters()" style="margin-top: var(--space-4)">Reset Filters</button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const isFiltered = searchQuery.trim() !== '' || currentStatus !== 'all';
  const metaHtml = isFiltered ? `
    <div class="tracker-meta-bar" style="margin-bottom: var(--space-4)">
      <span>Showing ${titles.length} of ${MCU_TITLES.length} titles</span>
      <button class="btn-ghost micro" onclick="resetTrackerFilters()" style="color: var(--color-hero-red); cursor: pointer;">Reset all</button>
    </div>
  ` : '';

  if (currentOrder === 'chronological') {
    // True chronological sequence
    const watchStats = getWatchStats();
    container.innerHTML = `
      ${metaHtml}
      <div class="saga-section">
        ${!isFiltered ? `
          <div class="saga-section__header">
            <h2 class="saga-section__title">MCU In-Universe Chronology</h2>
            <span class="saga-section__progress">${watchStats.watched}/${watchStats.totalTitles} · ${watchStats.percentComplete}%</span>
          </div>
          <div class="progress-bar progress-bar--lg" style="margin-bottom: var(--space-5)">
            <div class="progress-bar__fill" style="width: ${watchStats.percentComplete}%"></div>
          </div>
        ` : ''}
        <div class="stack">
          ${titles.map(t => renderTitleCard(t, t.chronologicalOrder)).join('')}
        </div>
      </div>
    `;
  } else {
    // Release order: grouped by saga → phase
    const grouped = groupBySaga(titles);
    container.innerHTML = `
      ${metaHtml}
      ${Object.entries(grouped).map(([sagaId, phases]) => {
        const saga = SAGAS[sagaId];
        const sagaStats = getSagaStats(sagaId);
        return `
          <div class="saga-section">
            <div class="saga-section__header">
              <h2 class="saga-section__title">${saga.name}</h2>
              <span class="saga-section__progress">${sagaStats.watched}/${sagaStats.total} · ${sagaStats.percent}%</span>
            </div>
            <div class="progress-bar progress-bar--lg" style="margin-bottom: var(--space-5)">
              <div class="progress-bar__fill" style="width: ${sagaStats.percent}%"></div>
            </div>
            ${Object.entries(phases).map(([phase, phaseTitles]) => `
              <div style="margin-bottom: var(--space-5)">
                <div class="micro" style="margin-bottom: var(--space-4); color: var(--color-text-muted)">
                  Phase ${phase} · ${getPhaseStats(parseInt(phase)).watched}/${getPhaseStats(parseInt(phase)).total}
                </div>
                <div class="stack">
                  ${phaseTitles.map(t => renderTitleCard(t, t.releaseOrder)).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
    `;
  }
  
  // Animate progress bars
  requestAnimationFrame(() => {
    container.querySelectorAll('.progress-bar__fill').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        bar.style.width = width;
      });
    });
  });
}

function groupBySaga(titles) {
  const grouped = {};
  titles.forEach(t => {
    if (!grouped[t.saga]) grouped[t.saga] = {};
    if (!grouped[t.saga][t.phase]) grouped[t.saga][t.phase] = [];
    grouped[t.saga][t.phase].push(t);
  });
  return grouped;
}

function renderTitleCard(title, orderNum) {
  const status = getWatchStatus(title.id);
  const rewatchCount = getRewatchCount(title.id);
  const gradient = getPhaseGradient(title.phase);
  
  const statusClass = status === 'watched' ? 'watch-chip--watched'
                    : status === 'rewatched' ? 'watch-chip--rewatched'
                    : 'watch-chip--unwatched';
  
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Not Watched'
                    : status === 'watched' ? 'Watched'
                    : `Rewatched${rewatchCount > 0 ? ' ×' + rewatchCount : ''}`;
  
  let chipClassExtras = '';
  let rippleHtml = '';
  if (title.id === lastToggledTitleId && status !== 'unwatched') {
    chipClassExtras = ' chip-pop';
    rippleHtml = '<span class="chip-ripple"></span>';
  }
  
  const typeLabel = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
  const year = new Date(title.releaseDate).getFullYear();
  const posterUrl = getPosterUrl(title.id);
  
  return `
    <div class="card title-card" id="title-${title.id}" 
         onclick="navigateTo('details/${title.id}')" 
         tabindex="0" 
         role="button"
         aria-label="${title.name}, ${typeLabel}, released ${year}, Phase ${title.phase}"
         onkeydown="if(event.key==='Enter'||event.key===' '){if(event.target===this){event.preventDefault();navigateTo('details/${title.id}');}}" 
         style="cursor: pointer;">
      <div class="title-card__poster" style="background: ${gradient}; position: relative; overflow: hidden;">
        ${orderNum ? `<span style="opacity:0.85; font-size: 10px; font-weight: 700; position: absolute; top: 4px; left: 8px; z-index: 3; text-shadow: 0 1px 2px rgba(0,0,0,0.9);">#${orderNum}</span>` : ''}
        ${posterUrl ? `
          <div class="skeleton-shimmer"></div>
          <img src="${posterUrl}" 
               alt="${title.name} poster" 
               width="80" 
               height="120" 
               loading="lazy" 
               class="poster-img" 
               onload="this.classList.add('loaded'); this.parentElement.querySelector('.skeleton-shimmer')?.remove();" 
               onerror="this.style.display='none'; this.parentElement.querySelector('.skeleton-shimmer')?.remove();">
        ` : ''}
        <div class="poster-fallback-text">${title.name.split(':')[0]}</div>
      </div>
      <div class="title-card__info">
        <div class="title-card__name">${title.name}</div>
        <div class="title-card__meta">
          <span>${typeLabel}</span>
          <span>${year}</span>
          <span>Phase ${title.phase}</span>
          <span>${title.runtime} min</span>
          ${title.postCreditCount > 0 ? `<span>${title.postCreditCount} post-credit${title.postCreditCount > 1 ? 's' : ''}</span>` : ''}
        </div>
        <div class="title-card__actions">
          <button class="watch-chip ${statusClass}${chipClassExtras}" 
                  onclick="event.stopPropagation(); toggleWatch('${title.id}')"
                  onkeydown="if(event.key==='Enter'||event.key===' '){event.stopPropagation(); event.preventDefault(); toggleWatch('${title.id}');}"
                  aria-label="Mark ${title.name} as ${status === 'unwatched' ? 'watched' : status === 'watched' ? 'rewatched' : 'unwatched'}">
            <span class="watch-chip__icon">${statusIcon}</span>
            ${statusLabel}
            ${rippleHtml}
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleWatch(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  lastToggledTitleId = titleId;
  renderTrackerList();
  lastToggledTitleId = null;
  if (typeof checkBadges === 'function') checkBadges(true);
  // Also refresh dashboard and profile if they exist
  if (typeof initDashboard === 'function') initDashboard();
}

function rateTitleStar(titleId, stars) {
  const current = getRating(titleId);
  if (current === stars) {
    setRating(titleId, 0);
  } else {
    setRating(titleId, stars);
  }
  renderTrackerList();
}


/* ── js/timeline.js ── */
/* =============================================================
   MCU Tracker — Timeline Page (timeline.js)
   Editorial sticky-scroll layout with IntersectionObserver
   ============================================================= */

let timelineView = 'chronological'; // 'chronological' | 'release'

// ── Observer state ──
let _activeObserver = null;
let _revealObserver = null;
let _currentPosterUrl = '';
let _activePosterIdx = 1; // toggles between 1 and 2 for crossfade
let _scrollRafId = null;

const _prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Init & cleanup ─────────────────────────────────────────

function initTimeline() {
  _cleanupTimeline();
  renderTimelineControls();
  renderTimeline();
  _setupScrollBehavior();
}

function _cleanupTimeline() {
  if (_activeObserver) { _activeObserver.disconnect(); _activeObserver = null; }
  if (_revealObserver) { _revealObserver.disconnect(); _revealObserver = null; }
  if (_scrollRafId) { cancelAnimationFrame(_scrollRafId); _scrollRafId = null; }
  _currentPosterUrl = '';
}

// ── Controls ────────────────────────────────────────────────

function renderTimelineControls() {
  const controls = document.getElementById('timeline-controls');
  if (!controls) return;
  
  // Notice we made this sticky in CSS
  controls.innerHTML = `
    <div class="timeline-controls-inner">
      <div class="order-toggle" role="group" aria-label="Timeline order">
        <button class="order-toggle__btn ${timelineView === 'chronological' ? 'order-toggle__btn--active' : ''}" 
                onclick="setTimelineView('chronological')" id="tl-chrono">In-Universe Order</button>
        <button class="order-toggle__btn ${timelineView === 'release' ? 'order-toggle__btn--active' : ''}" 
                onclick="setTimelineView('release')" id="tl-release">Release Order</button>
      </div>
      <div class="timeline-legend" role="group" aria-label="Legend">
        <span class="timeline-legend__item micro" style="color: var(--color-text-muted)">
          <span class="timeline-legend__dot" style="border: 2px solid var(--color-hero-red);"></span> Unwatched
        </span>
        <span class="timeline-legend__item micro" style="color: var(--color-text-muted)">
          <span class="timeline-legend__dot" style="background:var(--color-hero-red);"></span> Watched
        </span>
        <span class="timeline-legend__item micro" style="color: var(--color-text-muted)">
          <span class="timeline-legend__dot" style="background:var(--color-infinity-gold);"></span> Rewatched
        </span>
      </div>
    </div>
  `;
}

function setTimelineView(view) {
  timelineView = view;
  _cleanupTimeline();
  renderTimelineControls();
  renderTimeline();
  _setupScrollBehavior();
  window.scrollTo(0, 0);
}

// ── Render ──────────────────────────────────────────────────

function renderTimeline() {
  const container = document.getElementById('timeline-content');
  if (!container) return;
  
  const titles = getTitlesByOrder(timelineView);
  
  // Group by saga and phase
  const phaseGroups = {};
  titles.forEach(t => {
    if (!phaseGroups[t.saga]) phaseGroups[t.saga] = {};
    if (!phaseGroups[t.saga][t.phase]) phaseGroups[t.saga][t.phase] = [];
    phaseGroups[t.saga][t.phase].push(t);
  });
  
  const sagaOrder = ['infinity', 'multiverse'];
  
  // Build wrapper
  let html = `
    <div class="timeline-editorial">
  `;
  
  sagaOrder.forEach(sagaId => {
    const saga = SAGAS[sagaId];
    if (!phaseGroups[sagaId]) return;
    
    const phases = Object.keys(phaseGroups[sagaId]).sort((a, b) => a - b);
    phases.forEach(phase => {
      const phaseTitles = phaseGroups[sagaId][phase];
      const ordered = timelineView === 'chronological'
        ? phaseTitles.sort((a, b) => a.chronologicalOrder - b.chronologicalOrder)
        : phaseTitles.sort((a, b) => a.releaseOrder - b.releaseOrder);
      
      const phaseStats = getPhaseStats(parseInt(phase));
      const eyebrowText = `${saga.name} &mdash; Phase ${String(phase).padStart(2, '0')} (${phaseStats.watched}/${phaseStats.total})`;
      
      ordered.forEach(title => {
        const status = getWatchStatus(title.id);
        const statusClass = status === 'watched' ? 'indicator--watched'
                          : status === 'rewatched' ? 'indicator--rewatched'
                          : 'indicator--unwatched';
        
        const year = new Date(title.releaseDate).getFullYear();
        const typeIcon = title.type === 'movie' ? '🎬' : title.type === 'series' ? '📺' : '✨';
        const typeStr = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
        const posterUrl = getPosterUrl(title.id);
        const gradient = getPhaseGradient(title.phase);
        html += `
          <div class="timeline-section" id="tl-${title.id}" data-title-id="${title.id}" onclick="navigateTo('details/${title.id}')" style="cursor: pointer;">
            <div class="timeline-section__indicator ${statusClass}" id="ind-${title.id}"></div>
            <div class="timeline-section__poster" style="background: ${gradient}">
              ${posterUrl ? `<img src="${posterUrl}" loading="lazy" alt="${title.name} poster" class="poster-img loaded" onerror="this.style.display='none';">` : ''}
            </div>
            
            <div class="timeline-section__content">
              <div class="timeline-section__eyebrow">${eyebrowText}</div>
              
              <div class="timeline-section__title-row">
                <h2 class="timeline-section__title">${title.name}</h2>
              </div>
              
              <div class="timeline-section__meta">
                <span>${year}</span>
                <span class="meta-sep">&bull;</span>
                <span>${title.runtime} min</span>
                <span class="meta-sep">&bull;</span>
                <span>${typeIcon} ${typeStr}</span>
                ${title.postCreditCount > 0 ? `
                  <span class="meta-sep">&bull;</span>
                  <span>${title.postCreditCount} post-credit${title.postCreditCount > 1 ? 's' : ''}</span>
                ` : ''}
              </div>
              
              <p class="timeline-section__synopsis">${title.synopsis}</p>
              
              <div class="timeline-section__actions">
                ${renderWatchButton(title.id, status)}
              </div>
            </div>
          </div>
        `;
      });
    });
  });
  
  html += `
    </div>
  `;
  container.innerHTML = html;
}

// ── Watch toggle (Surgical DOM update to avoid scroll jank) ──

function renderWatchButton(titleId, status) {
  const icon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const label = status === 'unwatched' ? 'Mark Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  const btnClass = status === 'watched' ? 'watch-chip watch-chip--watched' 
                 : status === 'rewatched' ? 'watch-chip watch-chip--rewatched'
                 : 'watch-chip watch-chip--unwatched';
  
  return `
    <button class="${btnClass}" id="watch-btn-${titleId}"
            onclick="event.stopPropagation(); toggleTimelineWatch('${titleId}')"
            aria-label="Mark as ${status === 'unwatched' ? 'watched' : status === 'watched' ? 'rewatched' : 'unwatched'}">
      <span class="watch-chip__icon">${icon}</span>
      ${label}
    </button>
  `;
}

function toggleTimelineWatch(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  
  // Update button HTML
  const btnContainer = document.getElementById(`watch-btn-${titleId}`).parentNode;
  if (btnContainer) {
    btnContainer.innerHTML = renderWatchButton(titleId, newStatus);
    // Add pop effect to newly rendered button if it was marked watched/rewatched
    if (newStatus !== 'unwatched') {
      const btn = document.getElementById(`watch-btn-${titleId}`);
      if (btn) {
        btn.classList.add('chip-pop');
        btn.innerHTML += '<span class="chip-ripple"></span>';
      }
    }
  }
  
  // Update indicator dot
  const ind = document.getElementById(`ind-${titleId}`);
  if (ind) {
    ind.className = 'timeline-section__indicator'; // clear previous
    if (newStatus === 'watched') ind.classList.add('indicator--watched');
    else if (newStatus === 'rewatched') ind.classList.add('indicator--rewatched');
    else ind.classList.add('indicator--unwatched');
    
    if (newStatus !== 'unwatched' && !_prefersReducedMotion()) {
      ind.classList.add('indicator-ignite');
      setTimeout(() => ind.classList.remove('indicator-ignite'), 1000);
    }
  }
  
  // Optionally update the eyebrow stats if we want to be perfectly accurate,
  // but it requires a lot of DOM querying. For now, the stats will naturally
  // update on the next full render (e.g. view toggle or page reload).
}

// ── Scroll-driven behavior setup ────────────────────────────

function _setupScrollBehavior() {
  const reduced = _prefersReducedMotion();
  const sections = document.querySelectorAll('.timeline-section');
  if (sections.length === 0) return;
  
  if (reduced) {
    sections.forEach(sec => sec.classList.add('is-visible', 'is-active'));
  } else {
    // 1. Text Reveal Observer
    _revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0
    });
    
    // Active Section Observer to highlight active text
    _activeObserver = new IntersectionObserver((entries) => {
      let bestEntry = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        } else {
          entry.target.classList.remove('is-active');
        }
      });
      
      if (bestEntry) {
        document.querySelectorAll('.timeline-section.is-active').forEach(el => el.classList.remove('is-active'));
        bestEntry.target.classList.add('is-active');
      }
    }, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.5, 1.0]
    });
    
    sections.forEach(sec => {
      _revealObserver.observe(sec);
      _activeObserver.observe(sec);
    });
  }
}


/* ── js/quiz.js ── */
/* =============================================================
   MCU Tracker — Quiz Page (quiz.js)
   Quiz engine: categories, player, scoring, daily quiz
   ============================================================= */

let quizState = {
  mode: 'categories', // 'categories' | 'playing' | 'result' | 'daily'
  currentCategory: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  answered: false,
  isDaily: false
};

function initQuizzes() {
  quizState.mode = 'categories';
  renderQuizPage();
}

function renderQuizPage() {
  const container = document.getElementById('quiz-content');
  if (!container) return;
  
  switch (quizState.mode) {
    case 'categories':
      renderQuizCategories(container);
      break;
    case 'playing':
    case 'daily':
      renderQuizPlayer(container);
      break;
    case 'result':
      renderQuizResult(container);
      break;
  }
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderQuizCategories(container) {
  const dailyStatus = getDailyQuizStatus();
  const streak = getStreak();
  
  container.innerHTML = `
    <div class="section">
      <div class="daily-banner" onclick="startDailyQuiz()" id="daily-quiz-banner" 
           ${dailyStatus ? 'style="opacity: 0.6; pointer-events: none;"' : ''}>
        <div class="daily-banner__icon"><i data-lucide="zap"></i></div>
        <div class="daily-banner__content">
          <div class="daily-banner__title">Daily Challenge</div>
          <div class="daily-banner__subtitle">
            ${dailyStatus 
              ? `Completed! You scored ${dailyStatus.score}/${dailyStatus.total}` 
              : '5 questions from across the MCU. One attempt per day.'}
          </div>
        </div>
        ${!dailyStatus ? `
          <div class="daily-banner__action">
            <span class="btn btn-primary btn-sm">Play Now</span>
          </div>
        ` : ''}
      </div>
      ${streak.current > 0 ? `
        <div style="margin-top: var(--space-4); text-align: center;">
          <span class="streak">
            <span class="streak__icon"><i data-lucide="flame"></i></span>
            ${streak.current} day streak${streak.best > streak.current ? ` · Best: ${streak.best}` : ''}
          </span>
        </div>
      ` : ''}
    </div>
    
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Quiz Categories</h2>
      </div>
      <div class="grid grid--categories">
        ${QUIZ_CATEGORIES.map(cat => {
          const best = getBestScore(cat.id);
          return `
            <div class="category-card" onclick="startCategoryQuiz('${cat.id}')" id="quiz-cat-${cat.id}">
              <div class="category-card__icon"><i data-lucide="${cat.icon}"></i></div>
              <div class="category-card__title">${cat.title}</div>
              <div class="category-card__count">${cat.questions.length} questions · ${cat.difficulty}</div>
              ${best ? `
                <div style="margin-top: var(--space-3)">
                  <span class="micro" style="color: var(--color-infinity-gold)">Best: ${best.score}/${best.total}</span>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function startCategoryQuiz(categoryId) {
  const category = QUIZ_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return;
  
  quizState = {
    mode: 'playing',
    currentCategory: category,
    questions: shuffleArray([...category.questions]).slice(0, 10),
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    answered: false,
    isDaily: false
  };
  
  renderQuizPage();
}

function startDailyQuiz() {
  if (getDailyQuizStatus()) return;
  
  quizState = {
    mode: 'daily',
    currentCategory: { id: 'daily', title: 'Daily Challenge', icon: '⚡' },
    questions: getDailyQuizQuestions(),
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    answered: false,
    isDaily: true
  };
  
  renderQuizPage();
}

function renderQuizPlayer(container) {
  const q = quizState.questions[quizState.currentIndex];
  if (!q) return;
  
  const progress = `${quizState.currentIndex + 1}/${quizState.questions.length}`;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  container.innerHTML = `
    <div class="quiz-container">
      ${quizState.isDaily ? `
        <div class="daily-quiz-header">
          <div class="daily-quiz-header__date">${today}</div>
          <div class="daily-quiz-header__title">Daily Challenge</div>
        </div>
      ` : ''}
      
      <div class="quiz-header">
        <div>
          <button class="btn btn-secondary btn-sm" onclick="backToCategories()" id="quiz-back">
            ← Back
          </button>
        </div>
        <div class="quiz-progress">${progress}</div>
        <div class="quiz-score-display">Score: ${quizState.score}</div>
      </div>
      
      <div class="progress-bar" style="margin-bottom: var(--space-6)">
        <div class="progress-bar__fill" style="width: ${((quizState.currentIndex) / quizState.questions.length) * 100}%"></div>
      </div>
      
      ${q.category ? `<div class="micro" style="margin-bottom: var(--space-3); color: var(--color-text-muted)">${q.category}</div>` : ''}
      
      <div class="quiz-question">${q.q}</div>
      
      <div class="quiz-options">
        ${q.options.map((opt, i) => {
          let extraClass = '';
          if (quizState.answered) {
            if (i === q.correct) {
              extraClass = 'quiz-option--correct';
            } else if (i === quizState.selectedAnswer) {
              extraClass = 'quiz-option--incorrect';
            }
            extraClass += ' quiz-option--disabled';
          } else if (i === quizState.selectedAnswer) {
            extraClass = 'quiz-option--selected';
          }
          return `
            <button class="quiz-option ${extraClass}" 
                    onclick="selectAnswer(${i})"
                    id="quiz-opt-${i}">
              <span class="mono" style="color: var(--color-text-muted); margin-right: var(--space-3)">${String.fromCharCode(65 + i)}</span>
              ${opt}
            </button>
          `;
        }).join('')}
      </div>
      
      ${quizState.answered ? `
        <div class="quiz-explanation">
          <strong>${quizState.selectedAnswer === q.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong>
          ${q.explanation}
        </div>
      ` : ''}
      
      <div class="quiz-actions">
        ${!quizState.answered && quizState.selectedAnswer !== null ? `
          <button class="btn btn-primary" onclick="submitAnswer()" id="quiz-submit">Submit Answer</button>
        ` : ''}
        ${quizState.answered ? `
          <button class="btn btn-primary" onclick="nextQuestion()" id="quiz-next">
            ${quizState.currentIndex < quizState.questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function selectAnswer(index) {
  if (quizState.answered) return;
  quizState.selectedAnswer = index;
  renderQuizPage();
}

function submitAnswer() {
  if (quizState.selectedAnswer === null || quizState.answered) return;
  
  const q = quizState.questions[quizState.currentIndex];
  quizState.answered = true;
  
  if (quizState.selectedAnswer === q.correct) {
    quizState.score++;
  }
  
  renderQuizPage();
}

function nextQuestion() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    quizState.selectedAnswer = null;
    quizState.answered = false;
    renderQuizPage();
  } else {
    // Quiz complete
    if (quizState.isDaily) {
      markDailyQuizDone(quizState.score, quizState.questions.length);
    } else {
      saveQuizAttempt(quizState.currentCategory.id, quizState.score, quizState.questions.length);
    }
    if (typeof checkBadges === 'function') {
      checkBadges(true);
    }
    quizState.mode = 'result';
    renderQuizPage();
  }
}

function renderQuizResult(container) {
  const percent = Math.round((quizState.score / quizState.questions.length) * 100);
  const streak = getStreak();
  
  let message = '';
  let color = '';
  let particlesHtml = '';
  if (percent === 100) {
    message = '<span style="font-size:1.2em; font-weight:bold;">Perfect Score!</span> <i data-lucide="trophy" style="display:inline; width:20px; height:20px;"></i>';
    color = 'var(--color-infinity-gold)';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      for (let i = 0; i < 16; i++) {
        const deg = (i / 16) * 360;
        const colorVar = i % 2 === 0 ? 'var(--color-infinity-gold)' : 'var(--color-hero-red)';
        particlesHtml += `<div class="quiz-particle" style="--angle: ${deg}deg; --delay: ${Math.random() * 0.2}s; --bg: ${colorVar}"></div>`;
      }
    }
  } else if (percent >= 80) {
    message = 'Excellent! You really know your MCU!';
    color = 'var(--color-success)';
  } else if (percent >= 60) {
    message = 'Good job! Keep watching and learning!';
    color = 'var(--color-text-primary)';
  } else if (percent >= 40) {
    message = 'Not bad! Time for a rewatch?';
    color = 'var(--color-text-secondary)';
  } else {
    message = 'Looks like you need to assemble more knowledge!';
    color = 'var(--color-hero-red)';
  }
  
  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-result">
        <div class="quiz-result__score" style="color: ${color}; position: relative; display: inline-block;">
          ${quizState.score}/${quizState.questions.length}
          ${particlesHtml}
        </div>
        <div class="quiz-result__label">${message}</div>
        
        <div class="grid grid--stats" style="max-width: 400px; margin: 0 auto var(--space-6);">
          <div class="stat-card">
            <div class="stat-card__value mono"><span id="anim-quiz-percent">0</span>%</div>
            <div class="stat-card__label">Accuracy</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value stat-card__value--gold mono">${streak.current}<i data-lucide="flame" style="width:24px; height:24px;"></i></div>
            <div class="stat-card__label">Day Streak</div>
          </div>
        </div>
        
        <div class="quiz-actions">
          <button class="btn btn-secondary" onclick="backToCategories()" id="quiz-back-result">All Quizzes</button>
          ${!quizState.isDaily ? `
            <button class="btn btn-primary" onclick="startCategoryQuiz('${quizState.currentCategory.id}')" id="quiz-retry">
              Try Again
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Trigger animations
  setTimeout(() => {
    if (typeof animateCounter === 'function') {
      animateCounter('anim-quiz-percent', percent, 1000);
    }
  }, 50);
}

function backToCategories() {
  quizState.mode = 'categories';
  renderQuizPage();
}

// ── Utility ─────────────────────────────────────────────────

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


/* ── js/profile.js ── */
/* =============================================================
   MCU Tracker — Profile Page (profile.js)
   Stats, badges, per-saga progress, per-phase breakdown, quiz history
   ============================================================= */

// Badge definitions
const BADGES = [
  { id: 'first-watch', name: 'First Watch', icon: '👁️', description: 'Marked your first title as watched', check: () => getWatchStats().watched >= 1 },
  { id: 'phase1', name: 'Phase 1 Complete', icon: '🛡️', description: 'Watched all Phase 1 titles', check: () => getPhaseStats(1).percent === 100 },
  { id: 'phase2', name: 'Phase 2 Complete', icon: '⚡', description: 'Watched all Phase 2 titles', check: () => getPhaseStats(2).percent === 100 },
  { id: 'phase3', name: 'Phase 3 Complete', icon: '💎', description: 'Watched all Phase 3 titles', check: () => getPhaseStats(3).percent === 100 },
  { id: 'phase4', name: 'Phase 4 Complete', icon: '🌌', description: 'Watched all Phase 4 titles', check: () => getPhaseStats(4).percent === 100 },
  { id: 'phase5', name: 'Phase 5 Complete', icon: '🪐', description: 'Watched all Phase 5 titles', check: () => getPhaseStats(5).percent === 100 },
  { id: 'phase6', name: 'Phase 6 Complete', icon: '⏳', description: 'Watched all Phase 6 titles', check: () => getPhaseStats(6).percent === 100 },
  { id: 'half-way', name: '50% Club', icon: '🎯', description: 'Watched 50% or more of all MCU titles', check: () => getWatchStats().percentComplete >= 50 },
  { id: 'completionist', name: 'Completionist', icon: '✨', description: 'Watched 100% of all MCU titles', check: () => getWatchStats().percentComplete === 100 },
  { id: 'infinity', name: 'Infinity Saga', icon: '🏆', description: 'Watched the entire Infinity Saga', check: () => getSagaStats('infinity').percent === 100 },
  { id: 'multiverse', name: 'Multiverse Saga', icon: '🌀', description: 'Watched the entire Multiverse Saga', check: () => getSagaStats('multiverse').percent === 100 },
  { id: 'streak-7', name: '7-Day Quiz Streak', icon: '🔥', description: 'Maintained a 7-day quiz streak', check: () => getStreak().best >= 7 },
  { id: 'streak-3', name: '3-Day Streak', icon: '⚡', description: 'Maintained a 3-day quiz streak', check: () => getStreak().best >= 3 },
  { id: 'quiz-perfect', name: 'Perfect Score', icon: '💯', description: 'Scored 100% on any quiz', check: () => getQuizStats().perfectScores > 0 },
  { id: 'quiz-master', name: 'Quiz Master', icon: '🧠', description: 'Completed 10+ quizzes', check: () => getQuizStats().totalQuizzes >= 10 }
];

function initProfile() {
  renderProfile();
}

function checkBadges(triggerToast = true) {
  const previouslyEarned = typeof getUnlockedBadges === 'function' ? getUnlockedBadges() : [];
  const newlyEarned = [];
  const currentEarned = [];

  BADGES.forEach(badge => {
    let earned = false;
    try {
      earned = badge.check();
    } catch(e) {}
    
    if (earned) {
      currentEarned.push(badge.id);
      if (!previouslyEarned.includes(badge.id)) {
        newlyEarned.push(badge);
      }
    }
  });

  if (typeof setUnlockedBadges === 'function') {
    setUnlockedBadges(currentEarned);
  }

  if (triggerToast && newlyEarned.length > 0) {
    newlyEarned.forEach((badge, idx) => {
      setTimeout(() => showBadgeToast([badge]), 300 + idx * 3200);
    });
  }

  return { currentEarned, newlyEarned };
}

function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container) return;
  
  const watchStats = getWatchStats();
  const quizStats = getQuizStats();
  const streak = getStreak();
  const username = getUsername();

  // Completion ring calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (watchStats.percentComplete / 100) * circumference;

  // Phase milestone dots on ring
  const phaseDots = [1, 2, 3, 4, 5, 6].map((p, i) => {
    const pStats = getPhaseStats(p);
    const angle = (i / 6) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const cx = 80 + radius * Math.cos(rad);
    const cy = 80 + radius * Math.sin(rad);
    const isDone = pStats.percent === 100;
    const fill = isDone ? 'var(--color-infinity-gold)' : 'var(--color-surface)';
    const stroke = isDone ? 'var(--color-infinity-gold)' : 'var(--color-border)';
    return `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
  }).join('');

  // Hours and minutes calculation
  const watchedHours = Math.floor(watchStats.totalRuntime / 60);
  const watchedMins = watchStats.totalRuntime % 60;
  const remHours = Math.floor(watchStats.runtimeRemaining / 60);
  const remMins = watchStats.runtimeRemaining % 60;

  // Check badges state
  const { currentEarned, newlyEarned } = checkBadges(false);

  container.innerHTML = `
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-avatar" style="border: 2px solid var(--color-infinity-gold); background: var(--color-surface-raised); color: var(--color-text-primary); font-family: var(--font-display); display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="editUsername()" title="Click to change name">
        ${escapeProfileText(username.charAt(0).toUpperCase())}
      </div>
      <div class="profile-name" id="profile-name-display" onclick="editUsername()" style="cursor: pointer;" title="Click to edit name">
        ${escapeProfileText(username)}
      </div>
      <div class="profile-subtitle">${escapeProfileText(username)} · Click name to edit</div>
      
      <!-- Share button container (populated in Task 7) -->
      <div id="profile-share-container" style="margin-top: var(--space-4);"></div>
    </div>
    
    <!-- Overall Completion Ring Section -->
    <div class="section" style="text-align: center;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: var(--space-4);">
        <div class="circular-progress" style="margin: 0 auto var(--space-3)">
          <svg viewBox="0 0 160 160">
            <circle class="circular-progress__track" cx="80" cy="80" r="${radius}" />
            <circle class="circular-progress__fill" cx="80" cy="80" r="${radius}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${strokeDashoffset}" />
            ${phaseDots}
          </svg>
          <div class="circular-progress__text">
            <div class="circular-progress__percent"><span id="anim-prof-percent">0</span>%</div>
            <div class="circular-progress__label">Completed</div>
          </div>
        </div>
        <div class="micro" style="color: var(--color-text-secondary); max-width: 280px; margin: 0 auto;">
          ${watchStats.watched} of ${watchStats.totalTitles} titles watched
          ${watchStats.rewatched > 0 ? `· ${watchStats.rewatched} rewatched` : ''}
        </div>
      </div>
    </div>

    <!-- Watch & Runtime Stats Grid -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Watch & Runtime Stats</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--red mono">
            <span id="anim-prof-watched">0</span><span style="font-size: var(--text-small); color: var(--color-text-muted)">/${watchStats.totalTitles}</span>
          </div>
          <div class="stat-card__label">Titles Watched</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">${watchStats.unwatched} to go</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono">
            <span id="anim-prof-rewatched">0</span>
          </div>
          <div class="stat-card__label">Rewatched</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">Encore viewings</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono">
            <span id="anim-prof-hours">0</span>h <span id="anim-prof-mins" style="font-size: var(--text-body)">0m</span>
          </div>
          <div class="stat-card__label">Runtime Watched</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">${watchStats.totalRuntime.toLocaleString()} minutes</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--gold mono">
            <span id="anim-prof-rem-hours">0</span>h <span id="anim-prof-rem-mins" style="font-size: var(--text-body)">0m</span>
          </div>
          <div class="stat-card__label">Runtime Remaining</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">${watchStats.runtimeRemaining.toLocaleString()} minutes left</div>
        </div>
      </div>
    </div>
    
    <!-- Per-Phase Breakdown with Animated Progress Bars -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Phase Breakdown</h2>
        <span class="micro" style="color: var(--color-text-muted)">Phases 1–6</span>
      </div>
      <div class="saga-progress-list">
        ${[1, 2, 3, 4, 5, 6].map(p => {
          const stats = getPhaseStats(p);
          const pWatchedHours = Math.floor(stats.runtimeWatched / 60);
          const pWatchedMins = stats.runtimeWatched % 60;
          const pRemHours = Math.floor(stats.runtimeRemaining / 60);
          return `
            <div class="progress-group">
              <div class="progress-group__header">
                <span class="progress-group__label">Phase ${p}</span>
                <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
              </div>
              <div class="progress-bar progress-bar--lg">
                <div class="progress-bar__fill" data-width="${stats.percent}" style="width: 0%"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: var(--text-micro); color: var(--color-text-muted); margin-top: 4px;">
                <span>${pWatchedHours}h ${pWatchedMins}m watched</span>
                <span>${pRemHours}h remaining</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Saga Progress -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Saga Progress</h2>
      </div>
      <div class="saga-progress-list">
        ${renderSagaProgress('infinity')}
        ${renderSagaProgress('multiverse')}
      </div>
    </div>
    
    <!-- Quiz Stats -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Quiz Stats</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-quizzes">0</span></div>
          <div class="stat-card__label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--gold mono"><span id="anim-prof-score">0</span>%</div>
          <div class="stat-card__label">Avg Score</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-perfect">0</span></div>
          <div class="stat-card__label">Perfect Scores</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-streak">0</span><i data-lucide="flame" style="width:20px; height:20px; margin-left: 4px; display:inline-block; vertical-align:middle;"></i></div>
          <div class="stat-card__label">Current Streak</div>
        </div>
      </div>
    </div>
    
    <!-- Achievements / Badges -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Achievements & Badges</h2>
        <span class="micro" style="color: var(--color-infinity-gold); font-weight: 600;">
          ${currentEarned.length}/${BADGES.length} earned
        </span>
      </div>
      <div class="grid grid--badges" id="badges-container">
        ${BADGES.map(badge => {
          const earned = currentEarned.includes(badge.id);
          return `
            <div class="badge ${earned ? '' : 'badge--locked'}" 
                 onclick="showBadgeDetails('${badge.id}')"
                 style="cursor: pointer;"
                 tabindex="0"
                 role="button"
                 aria-label="${badge.name}: ${badge.description}. Status: ${earned ? 'Unlocked' : 'Locked'}"
                 title="${badge.name} — ${badge.description} (${earned ? 'Unlocked' : 'Locked'})">
              <div class="badge__icon">${badge.icon}</div>
              <div class="badge__label">${badge.name}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Star on GitHub Section -->
    <div class="section profile-github-section" style="text-align: center; margin-top: var(--space-8); margin-bottom: var(--space-4);">
      <div class="profile-github-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6) var(--space-5); max-width: 460px; margin: 0 auto; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; align-items: center; gap: var(--space-3);">
        <div style="display: flex; align-items: center; gap: var(--space-2); color: var(--color-infinity-gold);">
          <i data-lucide="star" style="width: 20px; height: 20px; fill: var(--color-infinity-gold);"></i>
          <span style="font-family: var(--font-display); font-size: var(--text-h3); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-primary);">Support MCU Tracker</span>
        </div>
        <p style="color: var(--color-text-secondary); font-size: var(--text-small); line-height: 1.5; margin: 0; max-width: 360px;">
          Enjoying the tracker? Star this project on GitHub to support continued updates and new features!
        </p>
        <a href="https://github.com/Hemacharankodhanda/mcu-tracker" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="btn btn-secondary btn-github-star" 
           id="btn-github-star"
           style="display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-3) var(--space-5); text-decoration: none; font-weight: 600; border-color: rgba(255, 255, 255, 0.16); background: var(--color-surface-raised); color: var(--color-text-primary);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display: inline-block; vertical-align: middle;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
          </svg>
          <span>Star on GitHub</span>
          <i data-lucide="star" style="width: 15px; height: 15px; color: var(--color-infinity-gold); fill: var(--color-infinity-gold);"></i>
        </a>
      </div>
    </div>
  `;

  // Init Share button (Task 7 integration hook)
  if (typeof initShareButton === 'function') {
    initShareButton();
  }
  
  // Trigger badge unlock toasts if any
  if (newlyEarned.length > 0) {
    setTimeout(() => showBadgeToast(newlyEarned), 500);
  }
  
  // Animate progress bars
  requestAnimationFrame(() => {
    container.querySelectorAll('.progress-bar__fill[data-width]').forEach(bar => {
      requestAnimationFrame(() => {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  });
  
  // Animate counters
  setTimeout(() => {
    if (typeof animateCounter === 'function') {
      animateCounter('anim-prof-percent', watchStats.percentComplete, 1200);
      animateCounter('anim-prof-watched', watchStats.watched, 1000);
      animateCounter('anim-prof-rewatched', watchStats.rewatched, 1000);
      animateCounter('anim-prof-hours', watchedHours, 1000);
      animateCounter('anim-prof-mins', watchedMins, 800);
      animateCounter('anim-prof-rem-hours', remHours, 1000);
      animateCounter('anim-prof-rem-mins', remMins, 800);
      
      animateCounter('anim-prof-quizzes', quizStats.totalQuizzes, 800);
      animateCounter('anim-prof-score', quizStats.avgScore, 1000);
      animateCounter('anim-prof-perfect', quizStats.perfectScores, 800);
      animateCounter('anim-prof-streak', streak.current, 800);
    }
  }, 50);
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeProfileText(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderSagaProgress(sagaId) {
  const saga = SAGAS[sagaId];
  const stats = getSagaStats(sagaId);
  
  const phaseNodes = saga.phases.map((p, i) => {
    const phaseStats = getPhaseStats(p);
    const left = ((i + 1) / saga.phases.length) * 100;
    
    let fill = 'var(--color-surface)';
    let stroke = 'var(--color-border)';
    if (phaseStats.percent === 100) {
      if (phaseStats.rewatched === phaseStats.total) {
        fill = 'var(--color-infinity-gold)';
        stroke = 'var(--color-infinity-gold)';
      } else {
        fill = 'var(--color-hero-red)';
        stroke = 'var(--color-hero-red)';
      }
    }
    return `<div style="position: absolute; left: ${left}%; top: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background: ${fill}; border: 2px solid ${stroke}; z-index: 2;" title="Phase ${p}: ${phaseStats.percent}%"></div>`;
  }).join('');
  
  return `
    <div class="progress-group">
      <div class="progress-group__header">
        <span class="progress-group__label">${saga.name}</span>
        <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
      </div>
      <div class="progress-bar progress-bar--lg" style="position: relative;">
        <div class="progress-bar__fill" data-width="${stats.percent}" style="width: 0%"></div>
        ${phaseNodes}
      </div>
    </div>
  `;
}

function editUsername() {
  const current = getUsername();
  const name = prompt('Enter your name or hero alias:', current);
  if (name && name.trim()) {
    setUsername(name.trim());
    renderProfile();
    // Update dashboard header if present
    const dashHeroName = document.getElementById('dash-user-name');
    if (dashHeroName) dashHeroName.textContent = name.trim();
  }
}

function showBadgeDetails(badgeId) {
  const badge = BADGES.find(b => b.id === badgeId);
  if (!badge) return;
  const earned = typeof getUnlockedBadges === 'function' ? getUnlockedBadges().includes(badgeId) : badge.check();
  
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__content">
      <div class="badge-toast__icon">${badge.icon}</div>
      <div class="badge-toast__text">
        <div class="micro" style="color: ${earned ? 'var(--color-infinity-gold)' : 'var(--color-text-muted)'}; margin-bottom: 4px;">
          ${earned ? 'Badge Unlocked' : 'Badge Locked'}
        </div>
        <div style="font-size: var(--text-h2); font-weight: bold; margin-bottom: 2px;">${badge.name}</div>
        <div class="micro" style="color: var(--color-text-secondary);">${badge.description}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('badge-toast--visible'));
  const dismiss = () => {
    toast.classList.remove('badge-toast--visible');
    setTimeout(() => toast.remove(), 300);
  };
  toast.addEventListener('click', dismiss);
  setTimeout(dismiss, 3500);
}

function showBadgeToast(badges) {
  if (!badges || badges.length === 0) return;
  const badge = badges[0];
  
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__content">
      <div class="badge-toast__icon">${badge.icon}</div>
      <div class="badge-toast__text">
        <div class="micro" style="color: var(--color-infinity-gold); margin-bottom: 4px;">Badge Unlocked!</div>
        <div style="font-size: var(--text-h2); font-weight: bold; margin-bottom: 2px;">${badge.name}</div>
        <div class="micro" style="color: var(--color-text-secondary);">${badge.description}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('badge-toast--visible'));
  const dismiss = () => {
    toast.classList.remove('badge-toast--visible');
    setTimeout(() => toast.remove(), 300);
  };
  toast.addEventListener('click', dismiss);
  setTimeout(dismiss, 3500);
}


/* ── js/share.js ── */
/* =============================================================
   MCU Tracker — Shareable Progress Card (share.js)
   Draws progress card on <canvas>, export PNG, Web Share API
   ============================================================= */

let shareCanvasInstance = null;

function initShareButton() {
  const container = document.getElementById('profile-share-container');
  if (!container) return;
  container.innerHTML = `
    <button class="btn btn-secondary btn-sm" 
            onclick="openShareModal()" 
            id="btn-share-progress"
            style="display: inline-flex; align-items: center; gap: 6px; margin-top: var(--space-2);">
      <i data-lucide="share-2" style="width: 16px; height: 16px;"></i>
      <span>Share My Progress</span>
    </button>
  `;
  if (window.lucide) {
    lucide.createIcons();
  }
}

function generateProgressCardCanvas() {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const watchStats = typeof getWatchStats === 'function' ? getWatchStats() : { watched: 0, totalTitles: 55, percentComplete: 0, totalRuntime: 0, hoursWatched: 0, rewatched: 0 };
  const username = typeof getUsername === 'function' ? getUsername() : 'Hero';
  const earnedBadgeIds = typeof getUnlockedBadges === 'function' ? getUnlockedBadges() : [];
  const totalBadges = typeof BADGES !== 'undefined' ? BADGES.length : 15;
  const streak = typeof getStreak === 'function' ? getStreak() : { current: 0, best: 0 };
  const infinityStats = typeof getSagaStats === 'function' ? getSagaStats('infinity') : { watched: 0, total: 23, percent: 0 };
  const multiverseStats = typeof getSagaStats === 'function' ? getSagaStats('multiverse') : { watched: 0, total: 32, percent: 0 };

  const allBadgesList = typeof BADGES !== 'undefined' ? BADGES : [
    { id: 'first-watch', name: 'First Watch', icon: '👁️' },
    { id: 'phase1', name: 'Phase 1 Complete', icon: '🛡️' },
    { id: 'phase2', name: 'Phase 2 Complete', icon: '⚡' },
    { id: 'phase3', name: 'Phase 3 Complete', icon: '💎' },
    { id: 'phase4', name: 'Phase 4 Complete', icon: '🌌' },
    { id: 'phase5', name: 'Phase 5 Complete', icon: '🪐' },
    { id: 'phase6', name: 'Phase 6 Complete', icon: '⏳' },
    { id: 'half-way', name: '50% Club', icon: '🎯' },
    { id: 'completionist', name: 'Completionist', icon: '✨' },
    { id: 'infinity', name: 'Infinity Saga', icon: '🏆' },
    { id: 'multiverse', name: 'Multiverse Saga', icon: '🌀' },
    { id: 'streak-7', name: '7-Day Streak', icon: '🔥' },
    { id: 'streak-3', name: '3-Day Streak', icon: '⚡' },
    { id: 'quiz-perfect', name: 'Perfect Score', icon: '💯' },
    { id: 'quiz-master', name: 'Quiz Master', icon: '🧠' }
  ];

  // 1. Base Canvas & Cosmic Atmospheric Glows
  ctx.fillStyle = '#08080C';
  ctx.fillRect(0, 0, width, height);

  // Top-left cosmic red glow
  const glowTopLeft = ctx.createRadialGradient(180, 160, 0, 180, 160, 560);
  glowTopLeft.addColorStop(0, 'rgba(237, 29, 36, 0.24)');
  glowTopLeft.addColorStop(0.5, 'rgba(237, 29, 36, 0.07)');
  glowTopLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowTopLeft;
  ctx.fillRect(0, 0, width, height);

  // Bottom-right cosmic gold glow
  const glowBottomRight = ctx.createRadialGradient(900, 1180, 0, 900, 1180, 520);
  glowBottomRight.addColorStop(0, 'rgba(245, 166, 35, 0.18)');
  glowBottomRight.addColorStop(0.5, 'rgba(245, 166, 35, 0.05)');
  glowBottomRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowBottomRight;
  ctx.fillRect(0, 0, width, height);

  // Center subtle space blue aura
  const glowCenter = ctx.createRadialGradient(540, 540, 0, 540, 540, 420);
  glowCenter.addColorStop(0, 'rgba(59, 130, 246, 0.07)');
  glowCenter.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowCenter;
  ctx.fillRect(0, 0, width, height);

  // Outer Glassmorphic Card Frame
  ctx.fillStyle = 'rgba(13, 14, 22, 0.88)';
  drawRoundedRect(ctx, 36, 36, 1008, 1278, 24);
  ctx.fill();

  const outerBorderGrad = ctx.createLinearGradient(36, 36, 1044, 1314);
  outerBorderGrad.addColorStop(0, 'rgba(237, 29, 36, 0.55)');
  outerBorderGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.14)');
  outerBorderGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.06)');
  outerBorderGrad.addColorStop(1, 'rgba(245, 166, 35, 0.45)');
  ctx.strokeStyle = outerBorderGrad;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 36, 36, 1008, 1278, 24);
  ctx.stroke();

  // 2. Header Branding & Identity
  const logoX = 68;
  const logoY = 68;

  // Marvel Logo badge
  const logoGrad = ctx.createLinearGradient(logoX, logoY, logoX + 56, logoY + 56);
  logoGrad.addColorStop(0, '#ED1D24');
  logoGrad.addColorStop(1, '#991B1B');
  ctx.fillStyle = logoGrad;
  drawRoundedRect(ctx, logoX, logoY, 56, 56, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 34px "Barlow Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', logoX + 28, logoY + 30);

  // App Name
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px "Barlow Condensed", sans-serif';
  ctx.fillText('MCU TRACKER', 138, 86);

  ctx.fillStyle = '#8E95A5';
  ctx.font = '500 13px "Inter", sans-serif';
  ctx.fillText('MULTIVERSE PASSPORT · mcu-tracker-pi.vercel.app', 138, 112);

  // Right Side: User Avatar & Rank Badge
  const avatarX = 976;
  const avatarY = 96;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, 26, 0, Math.PI * 2);
  ctx.fillStyle = '#1A1D2B';
  ctx.fill();

  const avatarBorderGrad = ctx.createLinearGradient(avatarX - 26, avatarY - 26, avatarX + 26, avatarY + 26);
  avatarBorderGrad.addColorStop(0, '#F5A623');
  avatarBorderGrad.addColorStop(1, '#ED1D24');
  ctx.strokeStyle = avatarBorderGrad;
  ctx.lineWidth = 2;
  ctx.stroke();

  const initial = (username.trim().charAt(0) || 'H').toUpperCase();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 22px "Inter", sans-serif';
  ctx.fillText(initial, avatarX, avatarY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Inter", sans-serif';
  ctx.fillText(username, 936, 86);

  const pct = watchStats.percentComplete || 0;
  let rankTitle = 'AVENGER RECRUIT';
  let rankColor = '#A1A1AA';
  if (pct >= 85) {
    rankTitle = "EARTH'S MIGHTIEST";
    rankColor = '#F5A623';
  } else if (pct >= 40) {
    rankTitle = 'AVENGER VETERAN';
    rankColor = '#60A5FA';
  }
  ctx.fillStyle = rankColor;
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText(rankTitle, 936, 112);

  // Header Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(68, 146);
  ctx.lineTo(1012, 146);
  ctx.stroke();

  // 3. Hero Section: Glowing Circular Progress + 4 Glassmorphic Stat Cards
  const ringX = 205;
  const ringY = 295;
  const ringRadius = 92;
  const ringLineWidth = 18;

  // Background ring track
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
  ctx.strokeStyle = '#171926';
  ctx.lineWidth = ringLineWidth;
  ctx.stroke();

  // Glowing Active Progress Arc
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (Math.PI * 2 * (pct / 100));
  if (pct > 0) {
    const ringGrad = ctx.createLinearGradient(ringX - ringRadius, ringY - ringRadius, ringX + ringRadius, ringY + ringRadius);
    ringGrad.addColorStop(0, '#ED1D24');
    ringGrad.addColorStop(0.5, '#F97316');
    ringGrad.addColorStop(1, '#F5A623');

    ctx.beginPath();
    ctx.arc(ringX, ringY, ringRadius, startAngle, endAngle);
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = ringLineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Inside Ring Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px "JetBrains Mono", monospace';
  ctx.fillText(`${pct}%`, ringX, ringY - 14);

  ctx.fillStyle = '#8E95A5';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('COMPLETED', ringX, ringY + 22);

  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText(`${watchStats.watched} / ${watchStats.totalTitles} TITLES`, ringX, ringY + 44);

  // 4 Metric Cards Grid
  const statGridX = 350;
  const statCardW = 320;
  const statCardH = 96;
  const statGapX = 22;
  const statGapY = 16;
  const statTopY = 195;

  const statItems = [
    { label: 'WATCHED RUNTIME', val: `${watchStats.hoursWatched} hrs`, sub: 'Marvel binge time', color: '#ED1D24' },
    { label: 'ENCORE REWATCHES', val: `${watchStats.rewatched || 0} Viewings`, sub: 'Marathon reruns', color: '#A855F7' },
    { label: 'QUIZ STREAK', val: `${streak.current || streak.best || 0} Days 🔥`, sub: `Best record: ${streak.best || 0}d`, color: '#F59E0B' },
    { label: 'BADGES EARNED', val: `${earnedBadgeIds.length} / ${totalBadges} 🏆`, sub: `${Math.round((earnedBadgeIds.length / totalBadges) * 100)}% unlocked`, color: '#10B981' }
  ];

  statItems.forEach((st, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = statGridX + col * (statCardW + statGapX);
    const by = statTopY + row * (statCardH + statGapY);

    ctx.fillStyle = 'rgba(20, 22, 34, 0.75)';
    drawRoundedRect(ctx, bx, by, statCardW, statCardH, 12);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, bx, by, statCardW, statCardH, 12);
    ctx.stroke();

    // Left accent bar
    ctx.fillStyle = st.color;
    drawRoundedRect(ctx, bx, by + 12, 4, statCardH - 24, 2);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#71788E';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.fillText(st.label, bx + 18, by + 16);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText(st.val, bx + 18, by + 36);

    ctx.fillStyle = '#64687D';
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText(st.sub, bx + 18, by + 66);
  });

  // 4. Saga Progression Cards
  const sagaSectionY = 435;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('SAGA MILESTONES', 68, sagaSectionY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64687D';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('THE SAGA CHRONOLOGY', 1012, sagaSectionY);

  const sagaCardW = 462;
  const sagaCardH = 88;
  const sagaY = 465;

  const sagas = [
    { name: 'THE INFINITY SAGA', icon: '💎', sub: 'Phases 1 — 3 · 23 Titles', stats: infinityStats, color: '#F5A623', x: 68 },
    { name: 'THE MULTIVERSE SAGA', icon: '🌀', sub: 'Phases 4 — 6 · 32 Titles', stats: multiverseStats, color: '#06B6D4', x: 550 }
  ];

  sagas.forEach(sg => {
    ctx.fillStyle = 'rgba(20, 22, 34, 0.75)';
    drawRoundedRect(ctx, sg.x, sagaY, sagaCardW, sagaCardH, 12);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, sg.x, sagaY, sagaCardW, sagaCardH, 12);
    ctx.stroke();

    // Accent line
    ctx.fillStyle = sg.color;
    drawRoundedRect(ctx, sg.x, sagaY + 12, 4, sagaCardH - 24, 2);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(`${sg.icon}  ${sg.name}`, sg.x + 18, sagaY + 14);

    ctx.fillStyle = '#8E95A5';
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText(sg.sub, sg.x + 18, sagaY + 36);

    ctx.textAlign = 'right';
    ctx.fillStyle = sg.stats.percent === 100 ? '#F5A623' : '#FFFFFF';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(`${sg.stats.watched}/${sg.stats.total} (${sg.stats.percent}%)`, sg.x + sagaCardW - 18, sagaY + 14);

    // Mini bar
    const barW = sagaCardW - 36;
    const barH = 8;
    const barX = sg.x + 18;
    const barY = sagaY + 62;

    ctx.fillStyle = '#171926';
    drawRoundedRect(ctx, barX, barY, barW, barH, 4);
    ctx.fill();

    const fillW = Math.max(0, barW * (sg.stats.percent / 100));
    if (fillW > 0) {
      ctx.fillStyle = sg.color;
      drawRoundedRect(ctx, barX, barY, fillW, barH, 4);
      ctx.fill();
    }
  });

  // 5. Trophy Case Showcase
  const trophySectionY = 580;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('TROPHY CASE', 68, trophySectionY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText(`${earnedBadgeIds.length} OF ${totalBadges} BADGES EARNED`, 1012, trophySectionY);

  const chipW = 226;
  const chipH = 92;
  const chipGap = 14;
  const chipY = 608;

  const unlockedBadges = earnedBadgeIds.map(id => allBadgesList.find(b => b.id === id)).filter(Boolean);
  const slots = [];
  for (let i = 0; i < 4; i++) {
    if (unlockedBadges[i]) {
      slots.push({ earned: true, ...unlockedBadges[i] });
    } else {
      const remaining = allBadgesList.find(b => !earnedBadgeIds.includes(b.id) && !slots.some(s => s.id === b.id));
      slots.push({ earned: false, name: remaining ? remaining.name : 'Secret Badge', icon: '🔒' });
    }
  }

  slots.forEach((chip, i) => {
    const cx = 68 + i * (chipW + chipGap);
    if (chip.earned) {
      ctx.fillStyle = 'rgba(26, 29, 44, 0.85)';
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.fill();

      ctx.strokeStyle = 'rgba(245, 166, 35, 0.4)';
      ctx.lineWidth = 1.5;
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '32px sans-serif';
      ctx.fillText(chip.icon, cx + 36, chipY + 46);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px "Inter", sans-serif';
      ctx.fillText(chip.name, cx + 64, chipY + 34);

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('✓ UNLOCKED', cx + 64, chipY + 58);
    } else {
      ctx.fillStyle = 'rgba(16, 17, 26, 0.6)';
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '26px sans-serif';
      ctx.fillText('🔒', cx + 36, chipY + 46);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#64687D';
      ctx.font = 'bold 13px "Inter", sans-serif';
      ctx.fillText(chip.name, cx + 64, chipY + 34);

      ctx.fillStyle = '#4B5563';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('LOCKED', cx + 64, chipY + 58);
    }
  });

  // 6. Phase by Phase Breakdown
  const phaseSectionY = 730;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('PHASE BY PHASE BREAKDOWN', 68, phaseSectionY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#8E95A5';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('PHASES 1 — 6', 1012, phaseSectionY);

  const phaseNames = {
    1: 'Avengers Assembled',
    2: 'Age of Heroes',
    3: 'Infinity War',
    4: 'Multiverse Unfolds',
    5: 'Secret Conflicts',
    6: 'Battleworld'
  };

  const pStartY = 760;
  const pRowHeight = 68;
  const pBarW = 944;
  const pBarH = 14;

  for (let p = 1; p <= 6; p++) {
    const pStats = typeof getPhaseStats === 'function' ? getPhaseStats(p) : { watched: 0, total: 1, percent: 0 };
    const curY = pStartY + (p - 1) * pRowHeight;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(`Phase ${p}: ${phaseNames[p]}`, 68, curY);

    ctx.textAlign = 'right';
    ctx.fillStyle = pStats.percent === 100 ? '#F5A623' : '#9FA4B8';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    const tag = pStats.percent === 100 ? '✓ 100% COMPLETE' : `${pStats.watched}/${pStats.total} · ${pStats.percent}%`;
    ctx.fillText(tag, 1012, curY);

    // Track
    const trackY = curY + 26;
    ctx.fillStyle = '#171926';
    drawRoundedRect(ctx, 68, trackY, pBarW, pBarH, 7);
    ctx.fill();

    // Fill with gradient
    const fillW = Math.max(0, pBarW * (pStats.percent / 100));
    if (fillW > 0) {
      if (pStats.percent === 100) {
        const goldFill = ctx.createLinearGradient(68, 0, 1012, 0);
        goldFill.addColorStop(0, '#F5A623');
        goldFill.addColorStop(1, '#FCD34D');
        ctx.fillStyle = goldFill;
      } else {
        const redFill = ctx.createLinearGradient(68, 0, 1012, 0);
        redFill.addColorStop(0, '#ED1D24');
        redFill.addColorStop(1, '#EA580C');
        ctx.fillStyle = redFill;
      }
      drawRoundedRect(ctx, 68, trackY, fillW, pBarH, 7);
      ctx.fill();
    }
  }

  // 7. Footer
  const footerY = 1215;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(68, footerY);
  ctx.lineTo(1012, footerY);
  ctx.stroke();

  // Diamond Accent
  ctx.fillStyle = '#ED1D24';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '14px sans-serif';
  ctx.fillText('◆', 540, footerY);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#8E95A5';
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.fillText('MCU TRACKER · THE ULTIMATE MARVEL WATCH COMPANION', 68, footerY + 36);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#ED1D24';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('mcu-tracker-pi.vercel.app', 1012, footerY + 36);

  shareCanvasInstance = canvas;
  return canvas;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  // Fallback for older engines
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function openShareModal() {
  const canvas = generateProgressCardCanvas();
  const dataUrl = canvas.toDataURL('image/png');

  let modalOverlay = document.getElementById('share-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'share-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  modalOverlay.innerHTML = `
    <div class="modal" style="max-width: 520px; text-align: center; padding: var(--space-4);">
      <div class="modal__header" style="margin-bottom: var(--space-3);">
        <h2 style="font-family: var(--font-display); font-size: var(--text-h2);">Share Your Progress</h2>
        <button class="modal__close" onclick="closeShareModal()" aria-label="Close modal">✕</button>
      </div>

      <div style="margin-bottom: var(--space-4); max-height: 58vh; overflow-y: auto; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.1); background: #08080C; padding: 8px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.6);">
        <img src="${dataUrl}" alt="MCU Progress Card Preview" style="width: 100%; height: auto; max-height: 54vh; object-fit: contain; display: block; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.7);">
      </div>

      <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="downloadShareCard()" style="display: inline-flex; align-items: center; gap: 8px;">
          <i data-lucide="download" style="width: 16px; height: 16px;"></i>
          <span>Download HQ Image</span>
        </button>
        ${supportsNativeShare ? `
          <button class="btn btn-secondary" onclick="shareCardNative()" style="display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="share-2" style="width: 16px; height: 16px;"></i>
            <span>Share Card</span>
          </button>
        ` : ''}
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    modalOverlay.classList.add('modal-overlay--visible');
    if (window.lucide) lucide.createIcons();
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeShareModal();
  });
}

function closeShareModal() {
  const modalOverlay = document.getElementById('share-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible');
  }
}

function downloadShareCard() {
  if (!shareCanvasInstance) generateProgressCardCanvas();
  const username = typeof getUsername === 'function' ? getUsername() : 'hero';
  const cleanName = username.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `mcu-tracker-${cleanName}-progress.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = shareCanvasInstance.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function shareCardNative() {
  if (!shareCanvasInstance) generateProgressCardCanvas();
  const username = typeof getUsername === 'function' ? getUsername() : 'Hero';
  const stats = typeof getWatchStats === 'function' ? getWatchStats() : { percentComplete: 0 };

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      if (shareCanvasInstance.toBlob && navigator.canShare) {
        shareCanvasInstance.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'mcu-progress.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `${username}'s MCU Watch Progress`,
              text: `I've watched ${stats.percentComplete}% of the Marvel Cinematic Universe on MCU Tracker!`
            });
            return;
          }
          // Fallback share without files
          await navigator.share({
            title: `${username}'s MCU Watch Progress`,
            text: `I've watched ${stats.percentComplete}% of the Marvel Cinematic Universe on MCU Tracker!`,
            url: window.location.origin
          });
        }, 'image/png');
      } else {
        await navigator.share({
          title: `${username}'s MCU Watch Progress`,
          text: `I've watched ${stats.percentComplete}% of the Marvel Cinematic Universe on MCU Tracker!`,
          url: window.location.origin
        });
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Native share error, falling back to download:', err);
        downloadShareCard();
      }
    }
  } else {
    downloadShareCard();
  }
}


/* ── js/upcoming.js ── */
/* =============================================================
   MCU Tracker — Upcoming Releases (upcoming.js)
   Live countdown, TMDB discovery, 24h caching, fallback slate
   ============================================================= */

const UPCOMING_CACHE_KEY = 'mcu_upcoming_cache_v2';
const UPCOMING_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const FALLBACK_UPCOMING_SLATE = [
  {
    id: 1003596,
    title: 'Avengers: Doomsday',
    release_date: '2026-12-16',
    poster_path: '/9jlZ59UALLLOE279HMT19rP9XQs.jpg',
    overview: 'The Avengers face Doctor Doom as the multiverse collides.'
  },
  {
    id: 1003598,
    title: 'Avengers: Secret Wars',
    release_date: '2027-12-15',
    poster_path: '/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg',
    overview: 'The culmination of the Multiverse Saga.'
  },
  {
    id: 1293690,
    title: 'Untitled X-Men Film',
    release_date: '2028-05-04',
    poster_path: '/jSn3jOzI91dOx4aVdfMrirWXH6R.jpg',
    overview: 'The mutants make their Marvel Cinematic Universe debut.'
  }
];

let upcomingCountdownTimer = null;

async function getUpcomingReleases() {
  // 1. Check localStorage 24h cache
  try {
    const raw = localStorage.getItem(UPCOMING_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < UPCOMING_TTL_MS) && Array.isArray(parsed.data) && parsed.data.length > 0) {
        return parsed.data;
      }
    }
  } catch (e) {
    console.warn('Error reading upcoming cache:', e);
  }

  // 2. Fetch from TMDB via /api/tmdb serverless proxy
  try {
    const today = new Date().toISOString().split('T')[0];
    const url = typeof getTmdbProxyUrl === 'function'
      ? getTmdbProxyUrl('discover/movie', `with_companies=420&primary_release_date.gte=${today}&sort_by=primary_release_date.asc`)
      : `/api/tmdb?path=discover/movie&with_companies=420&primary_release_date.gte=${today}&sort_by=primary_release_date.asc`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const formatted = data.results.slice(0, 5).map(m => ({
          id: m.id,
          title: m.title,
          release_date: m.release_date,
          poster_path: m.poster_path,
          overview: m.overview
        }));
        localStorage.setItem(UPCOMING_CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: formatted
        }));
        return formatted;
      }
    }
  } catch (err) {
    // Offline or proxy unavailable in static local dev — will seamlessly use fallback slate
  }

  // 3. Fallback (offline or local static dev without serverless proxy)
  return FALLBACK_UPCOMING_SLATE;
}

function calculateCountdown(releaseDateStr) {
  if (!releaseDateStr) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  const target = new Date(releaseDateStr + 'T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, passed: false };
}

function renderUpcomingReleases() {
  const container = document.getElementById('upcoming-releases-content');
  if (!container) return;

  if (upcomingCountdownTimer) {
    clearInterval(upcomingCountdownTimer);
    upcomingCountdownTimer = null;
  }

  // Load and render
  getUpcomingReleases().then(releases => {
    if (!releases || releases.length === 0) return;
    const next = releases[0];
    const later = releases.slice(1);

    const posterUrl = next.poster_path ? `https://image.tmdb.org/t/p/w300${next.poster_path}` : '';
    const dateFormatted = new Date(next.release_date + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    container.innerHTML = `
      <div class="upcoming-card">
        <div class="upcoming-card__hero">
          ${posterUrl ? `
            <img src="${posterUrl}" 
                 alt="${next.title} poster" 
                 class="upcoming-card__poster" 
                 loading="lazy"
                 onerror="this.style.display='none';">
          ` : `
            <div class="upcoming-card__poster" style="display:flex;align-items:center;justify-content:center;text-align:center;padding:4px;font-size:10px;color:var(--color-text-muted);">
              ${next.title}
            </div>
          `}
          <div class="upcoming-card__info">
            <div class="micro" style="color: var(--color-infinity-gold); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 2px;">Next Release</div>
            <h3 class="upcoming-card__title">${next.title}</h3>
            <div class="upcoming-card__date">${dateFormatted}</div>
            <p class="micro" style="color: var(--color-text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${next.overview || 'Upcoming MCU adventure coming to theatres.'}
            </p>
          </div>
        </div>

        <!-- Live Countdown -->
        <div>
          <div class="micro" style="color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">Countdown To Premiere</div>
          <div class="countdown-grid" id="upcoming-countdown-grid" aria-live="polite">
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-days">00</div>
              <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-hours">00</div>
              <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-mins">00</div>
              <div class="countdown-label">Mins</div>
            </div>
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-secs">00</div>
              <div class="countdown-label">Secs</div>
            </div>
          </div>
        </div>

        ${later.length > 0 ? `
          <div class="upcoming-slate-list">
            <div class="micro" style="color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px;">Also On The Slate</div>
            ${later.map(m => {
              const dStr = new Date(m.release_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              return `
                <div class="upcoming-slate-item">
                  <span>${m.title}</span>
                  <span class="mono micro" style="color: var(--color-infinity-gold);">${dStr}</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Function to tick countdown
    const tick = () => {
      const cd = calculateCountdown(next.release_date);
      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minsEl = document.getElementById('cd-mins');
      const secsEl = document.getElementById('cd-secs');

      if (!daysEl) {
        clearInterval(upcomingCountdownTimer);
        upcomingCountdownTimer = null;
        return;
      }

      daysEl.textContent = String(cd.days).padStart(2, '0');
      hoursEl.textContent = String(cd.hours).padStart(2, '0');
      minsEl.textContent = String(cd.minutes).padStart(2, '0');
      secsEl.textContent = String(cd.seconds).padStart(2, '0');
    };

    tick();
    upcomingCountdownTimer = setInterval(tick, 1000);
  });
}



/* ── js/details.js ── */
/* =============================================================
   MCU Tracker — Title Details (details.js)
   Renders rich TMDB info, instant pre-bundled cast & backdrops
   ============================================================= */

function escapeDetailsText(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function initDetails(titleId) {
  const container = document.getElementById('details-content');
  if (!container) return;
  
  window.scrollTo(0, 0); // scroll to top when navigating to details
  
  const title = MCU_TITLES.find(t => t.id === titleId);
  if (!title) {
    container.innerHTML = `
      <div style="padding: var(--space-8); text-align: center;">
        <h2>Title not found</h2>
        <button class="btn btn-primary" onclick="navigateTo('tracker')" style="margin-top: var(--space-4)">Back to Tracker</button>
      </div>
    `;
    return;
  }
  
  const status = getWatchStatus(title.id);
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Mark Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  const statusClass = status === 'watched' ? 'watch-chip--watched' : status === 'rewatched' ? 'watch-chip--rewatched' : 'watch-chip--unwatched';

  // Format dates and metadata
  const posterUrl = getPosterUrl(title.id);
  const typeStr = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
  const releaseDateObj = new Date(title.releaseDate);
  const releaseDateFormatted = releaseDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const year = releaseDateObj.getFullYear();
  const sagaName = title.saga === 'infinity' ? 'The Infinity Saga' : 'The Multiverse Saga';

  // Retrieve pre-bundled cast, director and backdrop for instant frame-0 rendering
  const knownMedia = typeof getKnownMedia === 'function' ? getKnownMedia(title.id) : (typeof KNOWN_CAST !== 'undefined' ? KNOWN_CAST[title.id] : null);
  const initialCast = knownMedia?.cast || [];
  const initialDirector = knownMedia?.director || (title.type === 'series' ? 'Marvel Studios' : null);
  const initialBackdrop = knownMedia?.backdrop_path ? getBackdropUrl(knownMedia.backdrop_path) : null;
  const heroBgStyle = initialBackdrop ? `background-image: url('${initialBackdrop}');` : '';
  
  // Render cast cards immediately from pre-bundled verified cast
  let castHtml = '';
  if (initialCast.length > 0) {
    castHtml = initialCast.map(actor => {
      const profileUrl = actor.profile_path 
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` 
        : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
      return `
        <div class="cast-card">
          <div class="cast-card__img" style="${!actor.profile_path ? 'background: var(--color-surface); padding: 12px; color: var(--color-text-muted)' : ''}">
            <img src="${profileUrl}" alt="${escapeDetailsText(actor.name)}" width="64" height="64" loading="lazy" style="${!actor.profile_path ? 'object-fit: contain' : ''}">
          </div>
          <div class="cast-card__name">${escapeDetailsText(actor.name)}</div>
          <div class="cast-card__character">${escapeDetailsText(actor.character || 'Cast')}</div>
        </div>
      `;
    }).join('');
  } else {
    castHtml = `
      <div class="cast-loading-state" style="color: var(--color-text-muted); font-size: var(--text-small); padding: var(--space-3) 0;">
        Loading cast & crew...
      </div>
    `;
  }

  let html = `
    <div class="details-page">
      <button class="details-back btn btn-secondary" onclick="navigateTo('tracker')" aria-label="Go back">
        <i data-lucide="arrow-left"></i> Back
      </button>
      
      <div class="details-hero" id="details-hero-${title.id}" style="${heroBgStyle}">
        <div class="details-hero__gradient"></div>
        <div class="details-hero__content">
          <div class="details-hero__poster" style="background: ${getPhaseGradient(title.phase)}; position: relative; overflow: hidden;">
            ${posterUrl ? `
              <div class="skeleton-shimmer"></div>
              <img src="${posterUrl}" 
                   alt="${escapeDetailsText(title.name)} poster" 
                   loading="lazy" 
                   class="poster-img"
                   onload="this.classList.add('loaded'); this.parentElement.querySelector('.skeleton-shimmer')?.remove();"
                   onerror="this.style.display='none'; this.parentElement.querySelector('.skeleton-shimmer')?.remove();">
            ` : ''}
            <div class="poster-fallback-text">${escapeDetailsText(title.name.split(':')[0])}</div>
          </div>
          <div class="details-hero__info">
            <h1 class="details-hero__title">${escapeDetailsText(title.name)}</h1>
            <div class="details-hero__meta">
              <span>${year}</span>
              <span class="meta-sep">&bull;</span>
              <span>Phase ${title.phase}</span>
              <span class="meta-sep">&bull;</span>
              <span>${title.runtime} min</span>
              <span class="meta-sep">&bull;</span>
              <span>${typeStr}</span>
            </div>
            <div class="details-hero__actions">
              <button class="watch-chip ${statusClass}" onclick="toggleWatchFromDetails('${title.id}')" id="details-watch-btn">
                <span class="watch-chip__icon">${statusIcon}</span>
                ${statusLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="details-body">
        <!-- Quick Specs Grid -->
        <section class="details-section">
          <div class="grid grid--stats" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-6);">
            <div class="stat-card">
              <div class="stat-card__label">Release Date</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${releaseDateFormatted}</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Timeline Placement</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-infinity-gold); margin-top: 4px;">#${title.chronologicalOrder} in Chronology</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Saga</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${sagaName}</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Post-Credits</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${title.postCreditCount > 0 ? `${title.postCreditCount} Scene${title.postCreditCount > 1 ? 's' : ''}` : 'None'}</div>
            </div>
            <div class="stat-card" id="details-director-card" style="${initialDirector ? '' : 'display: none;'}">
              <div class="stat-card__label" id="details-director-label">${title.type === 'series' ? 'Creator / Showrunner' : 'Director'}</div>
              <div id="details-director-name" style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${escapeDetailsText(initialDirector || '—')}</div>
            </div>
          </div>
        </section>

        <!-- Synopsis -->
        <section class="details-section">
          <h2 class="details-section__title">Synopsis</h2>
          <p class="details-section__text" id="details-overview">${escapeDetailsText(title.synopsis)}</p>
        </section>
        
        <!-- Top Cast Rail -->
        <section class="details-section" id="details-cast-section">
          <h2 class="details-section__title">Top Cast</h2>
          <div class="cast-rail" id="details-cast-rail">
            ${castHtml}
          </div>
        </section>
      </div>
    </div>
  `;
  container.innerHTML = html;
  if (window.lucide) lucide.createIcons();
  
  // Background enrichment from live TMDB if connected
  if (title.tmdbId) {
    const type = title.tmdbType === 'tv' ? 'tv' : 'movie';
    fetchTitleDetails(title.tmdbId, type).then(tmdbData => {
      if (!tmdbData) return;
      
      // Update backdrop if higher resolution returned
      if (tmdbData.backdrop_path) {
        const heroEl = document.getElementById(`details-hero-${title.id}`);
        if (heroEl) {
          heroEl.style.backgroundImage = `url('${getBackdropUrl(tmdbData.backdrop_path)}')`;
        }
      }
      
      // Update synopsis if TMDB overview is richer
      if (tmdbData.overview && tmdbData.overview.length > title.synopsis.length) {
        const overviewEl = document.getElementById('details-overview');
        if (overviewEl) overviewEl.textContent = tmdbData.overview;
      }

      // Update director or series creator if not already present
      if (tmdbData.credits && tmdbData.credits.crew) {
        const director = tmdbData.credits.crew.find(c => c.job === 'Director');
        const directorCard = document.getElementById('details-director-card');
        const directorName = document.getElementById('details-director-name');
        const directorLabel = document.getElementById('details-director-label');
        if (director && directorCard && directorName) {
          directorName.textContent = director.name;
          directorLabel.textContent = 'Director';
          directorCard.style.display = 'block';
        } else if (tmdbData.created_by && tmdbData.created_by.length > 0) {
          directorName.textContent = tmdbData.created_by.map(c => c.name).join(', ');
          directorLabel.textContent = 'Creator';
          directorCard.style.display = 'block';
        }
      }
      
      // Update cast rail if fresh cast returned
      const freshCast = tmdbData.credits?.cast || tmdbData.aggregate_credits?.cast;
      if (freshCast && freshCast.length > 0) {
        const castRail = document.getElementById('details-cast-rail');
        if (castRail) {
          const topCast = freshCast.slice(0, 10);
          castRail.innerHTML = topCast.map(actor => {
            const charName = (actor.roles && actor.roles[0]?.character) || actor.character || 'Cast';
            const profileUrl = actor.profile_path 
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` 
              : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
            return `
              <div class="cast-card">
                <div class="cast-card__img" style="${!actor.profile_path ? 'background: var(--color-surface); padding: 12px; color: var(--color-text-muted)' : ''}">
                  <img src="${profileUrl}" alt="${escapeDetailsText(actor.name)}" width="64" height="64" loading="lazy" style="${!actor.profile_path ? 'object-fit: contain' : ''}">
                </div>
                <div class="cast-card__name">${escapeDetailsText(actor.name)}</div>
                <div class="cast-card__character">${escapeDetailsText(charName)}</div>
              </div>
            `;
          }).join('');
        }
      }
    }).catch(err => {
      console.warn('Live TMDB enrichment unavailable, fallback cast active:', err);
    });
  }
}

function toggleWatchFromDetails(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  if (typeof checkBadges === 'function') {
    checkBadges(true);
  }
  const btn = document.getElementById('details-watch-btn');
  if (btn) {
    const icon = newStatus === 'unwatched' ? '○' : newStatus === 'watched' ? '✓' : '↻';
    const label = newStatus === 'unwatched' ? 'Mark Watched' : newStatus === 'watched' ? 'Watched' : 'Rewatched';
    const btnClass = newStatus === 'watched' ? 'watch-chip watch-chip--watched' : newStatus === 'rewatched' ? 'watch-chip watch-chip--rewatched' : 'watch-chip watch-chip--unwatched';
    
    btn.className = btnClass;
    btn.innerHTML = `<span class="watch-chip__icon">${icon}</span> ${label}`;
  }
}


/* ── js/animations.js ── */
/* =============================================================
   MCU Tracker — Animations (animations.js)
   Helpers for counting numbers and micro-interactions
   ============================================================= */

/**
 * Animates a number counting up from 0 to targetValue inside elementId.
 * Respects prefers-reduced-motion by skipping the animation.
 */
function animateCounter(elementId, targetValue, duration = 1000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    element.textContent = targetValue;
    return;
  }
  
  const startValue = 0;
  const startTime = performance.now();
  
  // easeOutCubic
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentVal = Math.round(startValue + (targetValue - startValue) * easeOut(progress));
    element.textContent = currentVal;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetValue;
    }
  }
  
  requestAnimationFrame(update);
}


/* ── js/pwa.js ── */
/* =============================================================
   MCU Tracker — PWA Support (pwa.js)
   Service worker registration, install prompt handling
   ============================================================= */

let deferredInstallPrompt = null;

function initPwa() {
  registerServiceWorker();
  setupInstallPrompt();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          // Listen for updates
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
    });
  }
}

function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar or install banner
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallPromptUI();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    hideInstallPromptUI();
    console.log('MCU Tracker successfully installed as PWA');
  });
}

function showInstallPromptUI() {
  // If button already rendered, show it
  let installContainer = document.getElementById('pwa-install-container');
  if (!installContainer) {
    installContainer = document.createElement('div');
    installContainer.id = 'pwa-install-container';
    installContainer.style.cssText = 'position: fixed; top: 16px; right: 16px; z-index: 999; display: flex; align-items: center;';
    document.body.appendChild(installContainer);
  }

  installContainer.innerHTML = `
    <button class="install-app-btn" onclick="triggerPwaInstall()" aria-label="Install MCU Tracker as an app">
      <i data-lucide="download" style="width: 14px; height: 14px;"></i>
      <span>Install App</span>
    </button>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

function hideInstallPromptUI() {
  const installContainer = document.getElementById('pwa-install-container');
  if (installContainer) {
    installContainer.remove();
  }
}

async function triggerPwaInstall() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === 'accepted') {
    hideInstallPromptUI();
  }
  deferredInstallPrompt = null;
}

// Auto init on script load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPwa);
} else {
  initPwa();
}



/* ── js/app.js ── */
/* =============================================================
   MCU Tracker — App Shell (app.js)
   Hash-based SPA router, page init, navigation
   ============================================================= */

const PAGES = ['dashboard', 'tracker', 'timeline', 'quizzes', 'profile', 'details'];
let currentPage = 'dashboard';

// ── Router ──────────────────────────────────────────────────

function navigateTo(page) {
  const basePage = page.split('/')[0];
  if (!PAGES.includes(basePage)) page = 'dashboard';
  if (window.location.hash === '#' + page) {
    handleRoute();
  } else {
    window.location.hash = page;
  }
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  
  // Handle dynamic routes like details/iron-man
  const parts = hash.split('/');
  let page = parts[0];
  const param = parts[1];
  
  if (!PAGES.includes(page)) page = 'dashboard';
  
  currentPage = page;
  
  // Hide all pages, show current
  PAGES.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) {
      el.classList.toggle('page--active', p === page);
    }
  });
  
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('nav-item--active', item.dataset.page === page);
  });
  
  // Hide/Show bottom nav on details page on mobile (keep sidebar visible on desktop)
  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    if (page === 'details' && window.innerWidth < 1024) {
      nav.style.display = 'none';
    } else {
      nav.style.display = '';
    }
  }
  
  // Initialize page
  switch (page) {
    case 'dashboard': initDashboard(); break;
    case 'tracker':   initTracker();   break;
    case 'timeline':  initTimeline();  break;
    case 'quizzes':   initQuizzes();   break;
    case 'profile':   initProfile();   break;
    case 'details':   if(typeof initDetails === 'function') initDetails(param); break;
  }
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ── Dashboard ───────────────────────────────────────────────

function initDashboard() {
  renderDashboard();
}

function renderDashboard() {
  const container = document.getElementById('dashboard-content');
  if (!container) return;
  
  const stats = getWatchStats();
  const quizStats = getQuizStats();
  const streak = getStreak();
  
  // Circular progress calculations
  const circumference = 2 * Math.PI * 68; // r=68
  const offset = circumference - (stats.percentComplete / 100) * circumference;
  const userDisplayName = typeof getUsername === 'function' ? getUsername() : 'Hero';
  
  // Phase nodes on the circle
  const phaseNodes = [1, 2, 3, 4, 5, 6].map((p, i) => {
    const phaseStats = getPhaseStats(p);
    const angle = (i / 6) * 360 - 90; // Start at top
    const rad = (angle * Math.PI) / 180;
    const x = 80 + 68 * Math.cos(rad);
    const y = 80 + 68 * Math.sin(rad);
    
    let fill = 'var(--color-surface)';
    let stroke = 'var(--color-border)';
    if (phaseStats.percent === 100) {
      if (phaseStats.rewatched === phaseStats.total) {
        fill = 'var(--color-infinity-gold)';
        stroke = 'var(--color-infinity-gold)';
      } else {
        fill = 'var(--color-hero-red)';
        stroke = 'var(--color-hero-red)';
      }
    }
    return `<circle cx="${x}" cy="${y}" r="3" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
  }).join('');
  
  container.innerHTML = `
    <!-- Hero -->
    <div class="hero">
      <div class="hero__eyebrow rise-in rise-in-1">Welcome, <span id="dash-user-name">${escapeHtml(userDisplayName)}</span></div>
      <h1 class="hero__title rise-in rise-in-2">${escapeHtml(userDisplayName)}'s Marvel<br>Journey</h1>
      <p class="hero__subtitle rise-in rise-in-3">Track, discover, and test your knowledge across the Marvel Cinematic Universe.</p>
      
      <div class="hero-progress rise-in rise-in-4">
        <div class="circular-progress">
          <svg viewBox="0 0 160 160">
            <circle class="circular-progress__track" cx="80" cy="80" r="68"/>
            <circle class="circular-progress__fill" cx="80" cy="80" r="68"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}"/>
            ${phaseNodes}
          </svg>
          <div class="circular-progress__text">
            <div class="circular-progress__percent"><span id="anim-percent">0</span>%</div>
            <div class="circular-progress__label">Complete</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="quick-actions">
      <div class="quick-action" onclick="navigateTo('tracker')" id="qa-tracker">
        <div class="quick-action__icon"><i data-lucide="list-checks"></i></div>
        <div class="quick-action__label">Tracker</div>
      </div>
      <div class="quick-action" onclick="navigateTo('timeline')" id="qa-timeline">
        <div class="quick-action__icon"><i data-lucide="route"></i></div>
        <div class="quick-action__label">Timeline</div>
      </div>
      <div class="quick-action" onclick="navigateTo('quizzes')" id="qa-quizzes">
        <div class="quick-action__icon"><i data-lucide="brain"></i></div>
        <div class="quick-action__label">Quizzes</div>
      </div>
      <div class="quick-action" onclick="navigateTo('profile')" id="qa-profile">
        <div class="quick-action__icon"><i data-lucide="user"></i></div>
        <div class="quick-action__label">Profile</div>
      </div>
    </div>
    
    <!-- Stats Row -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Your Stats</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-watched">0</span><span style="font-size: var(--text-small); color: var(--color-text-muted)">/${stats.totalTitles}</span></div>
          <div class="stat-card__label">Titles Watched</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-hours">0</span>h</div>
          <div class="stat-card__label">Watch Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--gold mono"><span id="anim-quizzes">0</span></div>
          <div class="stat-card__label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-streak">0</span><i data-lucide="flame" style="width:20px;height:20px;margin-left:4px;vertical-align:middle;color:var(--color-infinity-gold);"></i></div>
          <div class="stat-card__label">Day Streak</div>
        </div>
      </div>
    </div>
    
    <!-- Upcoming Premiere -->
    <div class="section" id="upcoming-releases-section">
      <div class="section__header">
        <h2 class="section__title">Next In The MCU</h2>
        <span class="micro" style="color: var(--color-infinity-gold); font-weight: 600;">Upcoming Release</span>
      </div>
      <div id="upcoming-releases-content"></div>
    </div>

    <!-- Saga Progress -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Saga Progress</h2>
        <span class="section__action" onclick="navigateTo('tracker')">View All →</span>
      </div>
      <div class="saga-progress-list">
        ${renderDashSagaProgress('infinity')}
        ${renderDashSagaProgress('multiverse')}
      </div>
    </div>
    
    <!-- Recently Added -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Latest Releases</h2>
      </div>
      <div class="stack">
        ${getLatestTitles(5).map(t => renderMiniTitleCard(t)).join('')}
      </div>
    </div>
  `;
  
  // Trigger animations
  setTimeout(() => {
    if (typeof animateCounter === 'function') {
      animateCounter('anim-percent', stats.percentComplete, 1200);
      animateCounter('anim-watched', stats.watched, 1000);
      animateCounter('anim-hours', stats.hoursWatched, 1000);
      animateCounter('anim-quizzes', quizStats.totalQuizzes, 800);
      animateCounter('anim-streak', streak.current, 800);
    }
  }, 50);

  // Render upcoming releases
  if (typeof renderUpcomingReleases === 'function') {
    renderUpcomingReleases();
  }
}

function renderDashSagaProgress(sagaId) {
  const saga = SAGAS[sagaId];
  const stats = getSagaStats(sagaId);
  
  return `
    <div class="progress-group">
      <div class="progress-group__header">
        <span class="progress-group__label">${saga.name}</span>
        <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
      </div>
      <div class="progress-bar progress-bar--lg">
        <div class="progress-bar__fill" style="width: ${stats.percent}%"></div>
      </div>
    </div>
  `;
}

function renderMiniTitleCard(title) {
  const status = getWatchStatus(title.id);
  const gradient = getPhaseGradient(title.phase);
  const year = new Date(title.releaseDate).getFullYear();
  const statusClass = status === 'watched' ? 'watch-chip--watched'
                    : status === 'rewatched' ? 'watch-chip--rewatched'
                    : 'watch-chip--unwatched';
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Not Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  
  const posterUrl = getPosterUrl(title.id);
  
  return `
    <div class="card title-card card-compact" 
         onclick="navigateTo('details/${title.id}')"
         tabindex="0"
         role="button"
         aria-label="${title.name}, released ${year}, Phase ${title.phase}"
         onkeydown="if(event.key==='Enter'||event.key===' '){if(event.target===this){event.preventDefault();navigateTo('details/${title.id}');}}"
         style="cursor: pointer;">
      <div class="title-card__poster" style="background: ${gradient}; width: 56px; height: 80px; font-size: 9px; position: relative; overflow: hidden; flex-shrink: 0;">
        ${posterUrl ? `
          <div class="skeleton-shimmer"></div>
          <img src="${posterUrl}" 
               alt="${title.name} poster" 
               width="56" 
               height="80" 
               loading="lazy" 
               class="poster-img"
               onload="this.classList.add('loaded'); this.parentElement.querySelector('.skeleton-shimmer')?.remove();"
               onerror="this.style.display='none'; this.parentElement.querySelector('.skeleton-shimmer')?.remove();">
        ` : ''}
        <div class="poster-fallback-text" style="font-size: 9px; padding: 2px;">${title.name.split(':')[0]}</div>
      </div>
      <div class="title-card__info">
        <div class="title-card__name" style="font-size: var(--text-body)">${title.name}</div>
        <div class="title-card__meta">
          <span>${year}</span>
          <span>Phase ${title.phase}</span>
        </div>
      </div>
      <button class="watch-chip ${statusClass}" 
              onclick="event.stopPropagation(); dashToggleWatch('${title.id}')" 
              onkeydown="if(event.key==='Enter'||event.key===' '){event.stopPropagation(); event.preventDefault(); dashToggleWatch('${title.id}');}"
              aria-label="Mark ${title.name} as ${statusLabel}"
              style="flex-shrink:0">
        <span class="watch-chip__icon">${statusIcon}</span>
        ${statusLabel}
      </button>
    </div>
  `;
}

function dashToggleWatch(titleId) {
  cycleWatchStatus(titleId);
  if (typeof checkBadges === 'function') checkBadges(true);
  renderDashboard();
}

function getLatestTitles(count) {
  return [...MCU_TITLES]
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, count);
}

// ── Collapsible Navigation ──────────────────────────────────
const NAV_COLLAPSED_KEY = 'mcu_nav_collapsed';

function isNavCollapsed() {
  try {
    return localStorage.getItem(NAV_COLLAPSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function setNavCollapsed(collapsed) {
  try {
    localStorage.setItem(NAV_COLLAPSED_KEY, collapsed ? 'true' : 'false');
  } catch(e) {}
}

function initNavCollapse() {
  const collapsed = isNavCollapsed();
  applyNavCollapse(collapsed);

  // Keyboard shortcut: Ctrl+B or Cmd+B to toggle nav collapse
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleNavCollapse();
    }
  });
}

function toggleNavCollapse() {
  const app = document.querySelector('.app');
  if (!app) return;
  const isCurrentlyCollapsed = app.classList.contains('nav--collapsed');
  const next = !isCurrentlyCollapsed;
  applyNavCollapse(next);
  setNavCollapsed(next);
}

function applyNavCollapse(collapsed) {
  const app = document.querySelector('.app');
  if (!app) return;
  app.classList.toggle('nav--collapsed', collapsed);

  const btn = document.getElementById('nav-collapse-btn');
  if (btn) {
    btn.setAttribute('aria-expanded', !collapsed ? 'true' : 'false');
    btn.setAttribute('title', collapsed ? 'Expand navigation (Ctrl+B)' : 'Collapse navigation (Ctrl+B)');
  }

  const icon = document.getElementById('nav-collapse-icon');
  if (icon) {
    icon.style.transform = collapsed ? 'rotate(180deg)' : 'rotate(0deg)';
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ── Onboarding ──────────────────────────────────────────────

function checkOnboarding() {
  if (typeof hasOnboarded === 'function' && !hasOnboarded()) {
    showOnboardingModal();
  }
}

function showOnboardingModal() {
  const modal = document.getElementById('onboarding-modal');
  const input = document.getElementById('onboarding-name-input');
  if (modal) {
    modal.classList.add('modal-overlay--visible');
    if (input) {
      setTimeout(() => input.focus(), 150);
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }
}

function selectHeroAlias(alias) {
  const input = document.getElementById('onboarding-name-input');
  if (input) {
    input.value = alias;
    input.focus();
  }
}

function submitOnboarding(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById('onboarding-name-input');
  const name = input ? input.value.trim() : '';
  if (!name) return;
  
  if (typeof setOnboarded === 'function') {
    setOnboarded(name);
  } else if (typeof setUsername === 'function') {
    setUsername(name);
    localStorage.setItem('mcu_onboarded', 'true');
  }
  
  const modal = document.getElementById('onboarding-modal');
  if (modal) {
    modal.classList.remove('modal-overlay--visible');
  }
  
  if (currentPage === 'dashboard') {
    renderDashboard();
  } else if (currentPage === 'profile') {
    renderProfile();
  }
}

function skipOnboarding() {
  if (typeof setOnboarded === 'function') {
    setOnboarded('Avenger');
  }
  const modal = document.getElementById('onboarding-modal');
  if (modal) {
    modal.classList.remove('modal-overlay--visible');
  }
  if (currentPage === 'dashboard') {
    renderDashboard();
  }
}

// ── Init ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Set up navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });
  
  // Initialize collapsible nav
  initNavCollapse();

  // Handle hash changes
  window.addEventListener('hashchange', handleRoute);
  
  // Initial route
  handleRoute();
  
  // Check onboarding for first-time or un-named users
  checkOnboarding();
  
  // Fetch posters in the background
  fetchPostersFromTMDB();
});

// Progressive poster loading
document.addEventListener('posterFetched', (e) => {
  const { titleId, url } = e.detail;
  const imgHtml = `<img src="${url}" loading="lazy" alt="poster" class="poster-img loaded" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; z-index: 2;" onerror="this.style.display='none';">`;
  
  // Dashboard / Profile Cards
  const dashCards = document.querySelectorAll(`.card[onclick*="'${titleId}'"] .card__poster, .title-card[id="title-${titleId}"] .title-card__poster`);
  dashCards.forEach(container => {
    if (!container.querySelector('img')) {
      container.querySelector('.skeleton-shimmer')?.remove();
      container.insertAdjacentHTML('beforeend', imgHtml);
    }
  });
  
  // Timeline Sections
  const timelineSections = document.querySelectorAll(`.timeline-section[data-title-id="${titleId}"] .timeline-section__poster`);
  timelineSections.forEach(container => {
    if (!container.querySelector('img')) {
      container.querySelector('.skeleton-shimmer')?.remove();
      container.insertAdjacentHTML('beforeend', imgHtml);
    }
  });
});

