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
    tmdbId: 215704,
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
    tmdbId: 949987,
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
    tmdbId: 209458,
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
    tmdbId: 138502,
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
