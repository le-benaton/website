import { Component, h, Host } from '@stencil/core';
import { Route } from 'stencil-router-v2';
import { Router } from '../router';

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

          <Route path={/^\/complete/}>
            <page-complete></page-complete>
          </Route>

          <Route path="/">
            <page-home router={Router}></page-home>
          </Route>


          <Route path={/^\/wine/} to="/wines" />
        </Router.Switch>
      </Host>
    );
  }
}
