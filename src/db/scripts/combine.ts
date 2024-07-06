import fs from 'fs';
const data = fs.readFileSync('src/db/scripts/raw-stones.json', 'utf8');
const rawStones = JSON.parse(data);
fs.writeFileSync(
  'src/db/scripts/raw-stones-2.json',
  JSON.stringify(
    rawStones.map((stone) => {
      return {
        ...stone,
        size: stone.size.toString() + ' ' + stone.unit.toString(),
      };
    }),
    null,
    2,
  ),
);
