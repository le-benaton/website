import {Component, h, State} from '@stencil/core';
import {WineInterface} from './wine.interface';

const typeList = {
  ALL: ['RED', 'WHITE', 'SPARKLING', 'CHAMPAGNE', 'ROSE', 'OTHER'],
  RED: ['RED'],
  WHITE: ['WHITE'],
  CHAMPAGNE: ['SPARKLING', 'CHAMPAGNE'],
  OTHER: ['ROSE', 'OTHER'],
}

@Component({
  tag: 'page-wines',
  styleUrl: 'page-wines.scss',
  shadow: false,
})
export class PageWines {
  @State() type = "ALL";
  @State() isReady = false;

  wines: WineInterface[] = [];
  types: string[] = ['RED', 'WHITE', 'SPARKLING', 'CHAMPAGNE', 'ROSE', 'OTHER'];

  async componentDidRender() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const wines = await fetch('https://przhp2ejw9.execute-api.ap-northeast-1.amazonaws.com/dev/group/2362-5951/0', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'SE3kQT2v8G7Z',
      },
    }).then(response => response.json());
    this.wines = wines
      .filter(d => !!d.price.sell && d.number.purchase > d.number.used);
    this.isReady = true;
  }

  selectType = (value) => {
    this.type = value.srcElement.value;
    this.types = typeList[value.srcElement.value];
  }

  render() {
    return (
      <div class="page-wines">
        <h2>ワインリスト</h2>
        <p>ワインリストは現時点のデータであり、ご来店時には売り切れている場合がございます。ご希望のワインがある場合は、予約時にお伝えいただきますようお願い申し上げます。</p>

        <div class="center">
          <div class="buttons">
            <button value="ALL" class={this.type === 'ALL' ? 'active' : undefined} onClick={this.selectType}>すべて</button>
            <button value="RED" class={this.type === 'RED' ? 'active' : undefined} onClick={this.selectType}>赤</button>
            <button value="WHITE" class={this.type === 'WHITE' ? 'active' : undefined} onClick={this.selectType}>白</button>
            <button value="CHAMPAGNE" class={this.type === 'CHAMPAGNE' ? 'active' : undefined} onClick={this.selectType}>泡</button>
            <button value="OTHER" class={this.type === 'OTHER' ? 'active' : undefined} onClick={this.selectType}>その他</button>
          </div>
        </div>

        <div class="wines-container">
          {this.wines.filter(d => this.types.includes(d.type))
            .sort((a, b) => a.price.sell - b.price.sell)
            .map(wines => {
              return <app-wine wine={wines}></app-wine>
            })}
        </div>
      </div>
    );
  }

}
