import { mkdirSync, readFileSync, writeFileSync, rmdirSync } from 'fs';
import { execSync } from 'child_process';

import { news } from '../../../src/data/news';
import { redWine } from '../../../src/data/red-wine';
import { whiteWine } from '../../../src/data/white-wine';
import { champagneWine } from '../../../src/data/champagne-wine';
import { announcement } from '../../../src/data/announcement';

export interface IItem {
  selector: string;
  template: string;
  data: Array<{ title?: string; ja?: string; price?: string; body?: string; image?: string }>;
}

const items: IItem[] = [news];

export const build = () => {
  mkdirSync(process.cwd() + '/www/api');
  for (const item of items) {
    writeFileSync(process.cwd() + `/www/api/news.json`, JSON.stringify(item.data));
  }
};
