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
            <app-home router={Router}></app-home>
          </Route>

          <Route path={/^\/complete/}>
            <app-complete></app-complete>
          </Route>
        </Router.Switch>
      </Host>
    );
  }
}
