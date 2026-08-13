const fs = require('fs');
let data = fs.readFileSync('js/data.js', 'utf8');

const mapping = {
  'iron-man': {id: 1726, type: 'movie'},
  'incredible-hulk': {id: 1724, type: 'movie'},
  'iron-man-2': {id: 10138, type: 'movie'},
  'thor': {id: 10195, type: 'movie'},
  'captain-america-tfa': {id: 1771, type: 'movie'},
  'avengers': {id: 24428, type: 'movie'},
  'iron-man-3': {id: 68721, type: 'movie'},
  'thor-dark-world': {id: 76338, type: 'movie'},
  'captain-america-ws': {id: 100402, type: 'movie'},
  'guardians-1': {id: 118340, type: 'movie'},
  'avengers-aou': {id: 99861, type: 'movie'},
  'ant-man': {id: 102899, type: 'movie'},
  'captain-america-cw': {id: 271110, type: 'movie'},
  'doctor-strange': {id: 284052, type: 'movie'},
  'guardians-2': {id: 283995, type: 'movie'},
  'spider-man-hc': {id: 315635, type: 'movie'},
  'thor-ragnarok': {id: 284053, type: 'movie'},
  'black-panther': {id: 284054, type: 'movie'},
  'avengers-iw': {id: 299536, type: 'movie'},
  'ant-man-wasp': {id: 363088, type: 'movie'},
  'captain-marvel': {id: 299537, type: 'movie'},
  'avengers-endgame': {id: 299534, type: 'movie'},
  'spider-man-ffh': {id: 429617, type: 'movie'},
  'wandavision': {id: 85271, type: 'tv'},
  'falcon-ws': {id: 88396, type: 'tv'},
  'loki-s1': {id: 84958, type: 'tv'},
  'black-widow': {id: 215704, type: 'movie'},
  'what-if-s1': {id: 91363, type: 'tv'},
  'shang-chi': {id: 566525, type: 'movie'},
  'eternals': {id: 524434, type: 'movie'},
  'hawkeye': {id: 88329, type: 'tv'},
  'spider-man-nwh': {id: 634649, type: 'movie'},
  'moon-knight': {id: 92749, type: 'tv'},
  'doctor-strange-mom': {id: 453395, type: 'movie'},
  'ms-marvel': {id: 92782, type: 'tv'},
  'thor-love-thunder': {id: 616037, type: 'movie'},
  'she-hulk': {id: 92783, type: 'tv'},
  'werewolf-by-night': {id: 949987, type: 'movie'},
  'black-panther-wf': {id: 505642, type: 'movie'},
  'gotg-holiday': {id: 774752, type: 'movie'},
  'ant-man-quantumania': {id: 640146, type: 'movie'},
  'guardians-3': {id: 447365, type: 'movie'},
  'secret-invasion': {id: 114472, type: 'tv'},
  'loki-s2': {id: 84958, type: 'tv'},
  'the-marvels': {id: 609681, type: 'movie'},
  'echo': {id: 209458, type: 'tv'},
  'deadpool-wolverine': {id: 533535, type: 'movie'},
  'agatha-all-along': {id: 138502, type: 'tv'},
  'captain-america-bnw': {id: 828599, type: 'movie'},
  'thunderbolts': {id: 975902, type: 'movie'},
  'ironheart': {id: 114478, type: 'tv'},
  'daredevil-ba': {id: 204082, type: 'tv'},
  'fantastic-four': {id: 1000836, type: 'movie'},
  'avengers-doomsday': {id: 1000837, type: 'movie'},
  'avengers-secret-wars': {id: 1000838, type: 'movie'}
};

for (const [key, val] of Object.entries(mapping)) {
  const regex = new RegExp(`(id:\\s*'${key}',[\\s\\S]*?postCreditCount:\\s*\\d+)`);
  data = data.replace(regex, `$1,\n    tmdbId: ${val.id},\n    tmdbType: '${val.type}'`);
}

fs.writeFileSync('js/data.js', data);
console.log('done');
