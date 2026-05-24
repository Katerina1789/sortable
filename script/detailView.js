import { updateState } from './state.js';

const addField = (list, label, value) => {
  const term = document.createElement('dt');
  term.textContent = label;

  const description = document.createElement('dd');
  description.textContent = value ?? 'Unknown';

  list.appendChild(term);
  list.appendChild(description);
};

export const renderHeroDetail = (container, hero) => {
  container.replaceChildren();
  if (!hero) return;

  const panel = document.createElement('section');
  panel.className = 'hero-detail';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'detail-close';
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    updateState({ selectedHeroId: null });
  });
  panel.appendChild(closeButton);

  const title = document.createElement('h2');
  title.textContent = hero.display.name;
  panel.appendChild(title);

  const imageUrl =
    hero.images?.lg ||
    hero.images?.md ||
    hero.images?.sm ||
    hero.display.icon;

  if (imageUrl) {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = hero.display.name;
    panel.appendChild(image);
  }

  const fields = [
    ['Full Name', hero.display.fullName],
    ['Alignment', hero.display.alignment],
    ['Place of Birth', hero.display.placeOfBirth],
    ['Race', hero.display.race],
    ['Gender', hero.display.gender],
    ['Height', hero.display.height],
    ['Weight', hero.display.weight],
  ];

  const list = document.createElement('dl');
  fields.forEach(([label, value]) => addField(list, label, value));
  panel.appendChild(list);

  const stats = document.createElement('div');
  stats.className = 'powerstats';

  Object.entries(hero.stats).forEach(([key, value]) => {
    const stat = document.createElement('div');
    stat.className = 'powerstat';

    const label = document.createElement('strong');
    label.textContent = key;
    stat.appendChild(label);
    stat.append(`: ${value ?? 'N/A'}`);

    stats.appendChild(stat);
  });

  panel.appendChild(stats);

  const jsonTitle = document.createElement('h3');
  jsonTitle.textContent = 'Full JSON';
  panel.appendChild(jsonTitle);

  const json = document.createElement('pre');
  json.textContent = JSON.stringify(hero.original ?? hero, null, 2);
  panel.appendChild(json);

  container.appendChild(panel);
};
