import { parse } from 'csv-parse';
import fs from 'fs';

const filePath = new URL('../tasks.csv', import.meta.url);

export const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream(`${filePath.pathname}`).pipe(
    parse({
      delimiter: ',',
      skip_empty_lines: true,
      from_line: 2,
    })
  );
  for await (const record of parser) {
    // Work with each record
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: record[0],
        description: record[1],
      }),
    });

    records.push(record);
  }
  return records;
};

(async () => {
  const records = await processFile();
  console.info(records);
})();
