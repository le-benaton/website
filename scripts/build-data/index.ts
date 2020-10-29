import { mkdirSync, readFileSync, writeFileSync, rmdirSync } from 'fs';
import { execSync } from 'child_process';

import { news } from '../../src/data/news';
import { redWine } from '../../src/data/red-wine';
import { whiteWine } from '../../src/data/white-wine';
import { champagneWine } from '../../src/data/champagne-wine';

export interface IItem {
  selector: string;
  template: string;
  data: Array<{ title?: string; ja?: string; price?: string; body?: string }>;
}

const targets = ['index.html'];
const items: IItem[] = [news, redWine, whiteWine, champagneWine];

const build = () => {
  execSync(`rm -r -f ${process.cwd() + '/www'}`);
  mkdirSync(process.cwd() + '/www');
  execSync(`cp -r ${process.cwd() + '/src/template'}/* ${process.cwd() + '/www'}`);

  for (const templateFile of targets) {
    let template = readFileSync(process.cwd() + '/www/' + templateFile).toString('utf-8');
    for (const item of items) {
      const insertData: string[] = [];
      for (const line of item.data) {
        let template = item.template;
        for (const [key, value] of Object.entries(line)) {
          // URLリンクの置き換え
          const re_url = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
          const replaceText = (value as string).replace(re_url, '<a href="$1" target="_blank">$1</a>');
          template = template.replace(new RegExp(`{{ ${key} }}`, 'g'), replaceText as string);
        }
        insertData.push(template);
      }
      const changeSelector = item.selector.replace(/></g, `>${insertData.join('')}<`);
      template = template.replace(item.selector, changeSelector);
    }
    writeFileSync(process.cwd() + '/www/' + templateFile, template);
  }
};

build();
