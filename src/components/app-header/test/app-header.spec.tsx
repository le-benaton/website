import { newSpecPage } from '@stencil/core/testing';
import { AppHeader } from '../app-header';

describe('app-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      html: `<app-header></app-header>`,
    });
    expect(page.root).toEqualHtml(`
      <app-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-header>
    `);
  });
});
