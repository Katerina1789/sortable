// renderHeroDetail renders the hero detail panel
export const renderHeroDetail = (container, hero) => {
  // clears container
  container.innerHTML = '';
  if (!hero) return;

  // creates the detail panel
  const panel = document.createElement('section');
  panel.className = 'hero-detail';

  // title
  const title = document.createElement('h2');
  title.textContent = hero.display.name;
  panel.appendChild(title);

  // image
  const image = document.createElement('img');
  image.src =
    hero.images?.lg ||
    hero.images?.md ||
    hero.images?.sm ||
    hero.display.icon ||
    '';
  image.alt = hero.display.name;
  panel.appendChild(image);

  // fields for display
  const fields = [
    ['Full Name', hero.display.fullName],
    ['Alignment', hero.display.alignment],
    ['Place of Birth', hero.display.placeOfBirth],
    ['Race', hero.display.race],
    ['Gender', hero.display.gender],
    ['Height', hero.display.height],
    ['Weight', hero.display.weight],
  ];

  // description list
  const list = document.createElement('dl');
  fields.forEach(([label, value]) => {
    const term = document.createElement('dt');
    term.textContent = label;

    const description = document.createElement('dd');
    description.textContent = value ?? 'Unknown';

    list.appendChild(term);
    list.appendChild(description);
  });
  panel.appendChild(list);

  // powerstats
  const stats = document.createElement('div');
  stats.className = 'powerstats';

  Object.entries(hero.stats).forEach(([key, value]) => {
    const stat = document.createElement('div');
    stat.className = 'powerstat';
    stat.innerHTML = `<strong>${key}</strong>: ${value ?? 'N/A'}`;
    stats.appendChild(stat);
  });

  panel.appendChild(stats);

  // inserts panel
  container.appendChild(panel);
};
