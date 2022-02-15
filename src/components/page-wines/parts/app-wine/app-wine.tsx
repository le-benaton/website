import {Component, Host, h, Prop, State, Watch} from '@stencil/core';
import {WineInterface} from '../../wine.interface';

@Component({
  tag: 'app-wine',
  styleUrl: 'app-wine.scss',
  shadow: true,
})
export class AppWine {
  @Prop() wine: WineInterface;
  @State() _wine: WineInterface;
  @Watch('wine')
  async watchLabelHandler() {
    this._wine = this.wine;
  }

  render() {
    return (
      <Host>
        <div class="wine-container">
          <section>
            <div class={'wine-label ' + this.wine.type.toLowerCase()}>{this.wine.type}</div>
            <h3>{this.wine.name}</h3>
            <h4>{this.wine.label?.replace(/　/g, ' ')}</h4>
          </section>
          <div>
            <div class="year">
              {
                (this.wine.year === 0) ? 'NV': (!this.wine.year) ? '' : this.wine.year + '年'
              }
            </div>
            <div class="price">¥{this.wine.price.sell.toLocaleString()}</div>
          </div>
        </div>
      </Host>
    );
  }

}
