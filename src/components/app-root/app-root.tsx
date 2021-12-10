import { Component, h, Host } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';

const Router = createRouter();

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <Router.Switch>
          <Route path="/">
            <page-home router={Router}></page-home>
          </Route>

          <Route path={/^\/complete/}>
            <page-complete></page-complete>
          </Route>
        </Router.Switch>
      </Host>
    );
  }
}
