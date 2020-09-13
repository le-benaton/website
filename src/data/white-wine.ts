import { IItem } from '../../scripts/build-data';

export const whiteWine: IItem = {
  selector: '<ul class="modal-show wine-list-white"></ul>',
  template: '<li><h4>{{ title }}</h4><div>{{ ja }}</div><div>¥{{ price }}</div></li>',
  data: [
    {
      title: '2007 Bourgogne Aligote Chteau de la Maltroye',
      ja: 'ブルゴーニュ アリゴテ シャトー ド マルトロワ',
      price: '3,700',
    },
    {
      title: '2014 BOURGOGNE CHARDONNAY MATTHIEU DE BRULLY',
      ja: 'ブルゴーニュ シャルドネ マチュー ド ブルーリィ',
      price: '4,000',
    },
    { title: '2012 Saint-Bris GOISOT', ja: 'サンブリ ゴワゾ', price: '4,500' },
    {
      title: '2013 VIRE-CLESSE DOMAINE DE LA Verpauille',
      ja: 'ヴィレ クレッセ ドメーヌ ドゥ ラ ヴェルパイユ',
      price: '4,600',
    },
    {
      title: '2012 Saint Verin Chateau Vitallis',
      ja: 'サンヴェラン シャトー ヴィタイユ',
      price: '5,400',
    },
    {
      title: '2012 BOURGOGNE ALIGOTE DUPONT-FAHN',
      ja: 'ブルゴーニュ アリゴテ デュポン ファン',
      price: '5,400',
    },
    {
      title: '2014 CHABLIS MARCEL SERVIN',
      ja: 'シャブリ マルセル セルヴァン',
      price: '5,500',
    },
    {
      title: '1999 Bourgogne Chardonnay Guy BOCARD',
      ja: 'ブルゴーニュ シャルドネ ギー ボーカール',
      price: '6,000',
    },
    {
      title: '2010 BOURGOGNE CHARDONAY Francois Carillon',
      ja: 'ブルゴーニュ シャルドネ フランソワ カリヨン',
      price: '6,200',
    },
    {
      title: '2010 MARSANNAY Domaine fougeray de beauclair',
      ja: 'マルサネ ドメーヌ フジュレイ ド ボークレール',
      price: '6,600',
    },
    {
      title: '2010 Bourgogne Blanc TOLLOT BEAUT',
      ja: 'ブルゴーニュ ブラン トロ ボー',
      price: '6,600',
    },
    {
      title: '2013 BOURGOGNE CHARDONAY Francois Carillon',
      ja: 'ブルゴーニュ シャルドネ フランソワ カリヨン',
      price: '6,700',
    },
    {
      title: '2013 BOURGOGNE BLANC BUTTERFIELD',
      ja: 'ブルゴーニュ ブラン バターフィールド',
      price: '7,000',
    },
    {
      title: '2009 BOURGOGNE CHAUMES DES PERRIERES DUPONT-FAHN',
      ja: 'ブルゴーニュ ショーム デ ペリエール デュポンファン',
      price: '7,000',
    },
    {
      title: "2008 SAVIGNY LES BEAUNE CLOS DES GODEAUX DOMAINE D'ARDHUY",
      ja: 'サヴィニー レ ボーヌ クロ デ ゴドー ダルデュイ',
      price: '7,100',
    },
    {
      title: '2007 Hautes cotes de Beaune Blanc JAYER-GILLES',
      ja: 'オー コート ボーヌ ブラン ジャイエ ジル',
      price: '8,000',
    },
    {
      title: '2011 SAIGNY-LES-BEAUNE LES VERMOTS-DESSUS VINCENT GIRARDIN',
      ja: 'サヴィニー レ ボーヌ レ ヴェルモット デッスゥ ヴァンサン ジラルダン',
      price: '8,100',
    },
    {
      title: '2013 BOURGOGNE CHAUMES DES PERRIERES DUPONT-FAHN',
      ja: 'ブルゴーニュ ショーム デ ペリエール デュポンファン',
      price: '8,300',
    },
    {
      title: '2012 AUXEY DURESSES LES VIREUX DUPONT-FAHN',
      ja: 'オーセイ デュレス レ ・ヴィルー デュポン ファン',
      price: '8,400',
    },
    {
      title: '2002 Chablis JEAN-MARC-BROCARD',
      ja: 'シャブリ サン クレール ジャン マルク ブロカー',
      price: '9,200',
    },
    {
      title: '2008 Bourgogne Aligote LEROY',
      ja: 'ブルゴーニュ アリゴテ ルロワ',
      price: '9,500',
    },
    {
      title: '2011 Meursault "Tete de Cuvee" FRANCOIS D\'ALLAINES',
      ja: 'ムルソー テット ド キュベ フランソワ ダレン',
      price: '9,600',
    },
    {
      title: '2000 Puligny-Montrachet SOUS LE PUITS Louis Latour',
      ja: 'ピュリニー モンラッシェ スール ピュイ ルイ ラトゥール',
      price: '9,800',
    },
    {
      title: '2007 Puligny-Montrachet LES ENSEIGNIERES Philippe BRENOT',
      ja: 'ピュリニ モンラッシェ レ ゾンセニエール フィリップ ブルノ',
      price: '10,200',
    },
    {
      title: '2005 VIRE CLRSSE DOMAINE DE LA BONGRAN',
      ja: 'ヴィレ クレッセ キュヴェ テヴェネ ボングラン',
      price: '11,000',
    },
    {
      title:
        '2007 Cote de Nuits Villages CLOS DES LANGRES MONOPOLE DOMAINE D’ ARDHUY',
      ja: 'コート ド ニュイ ヴィラージュ ブラン ダルデュイ',
      price: '11,000',
    },
    {
      title: '2009 MEURSAEHT BUTTERFIELD',
      ja: 'ムルソー バター フィールド',
      price: '11,000',
    },
    {
      title:
        '2005 CHASSAGNE MONTRACHET Les CHAUMEES 1er Cru Domaine Vincent et Francois JOUARD',
      ja:
        'シャサーニュモンラッシェ レショーメ ドメーヌ ヴァンサン エ フランソワ ジョアール',
      price: '11,500',
    },
    {
      title: '2012 MEURSAUT LES TILLETS DUPONT-FAHN',
      ja: 'ムルソー レ ティレ レイモン デュポン ファン',
      price: '11,500',
    },
    {
      title: '2008 Chassagne Montrachet 1er CRU LES REMILLY Philippe BRENOT',
      ja: 'シャサーニュ モンラッシェ 1er',
      price: '11,500',
    },
    {
      title: '2010 PULIGNY MONTRASHET LES MEIX Y.GACON-MOINGEON',
      ja: 'ピュリニー モンラッシェ ガコン モワンジョ',
      price: '11,800',
    },
    {
      title: '2013 MEURSAUT LES TILLETS DUPONT-FAHN',
      ja: 'ムルソー レ ティレ レイモン デュポン ファン',
      price: '11,800',
    },
    {
      title:
        '2003 CHASSAGNE MONTRACHET Les CHAUMEES 1er cru Domaine Vincent et Francois JOUARD',
      ja:
        'シャサーニュモンラッシェ レショーメ ドメーヌ ヴァンサン エ フランソワ ジョアール',
      price: '12,000',
    },
    {
      title:
        '2008 POUILLY FUISSE Vieilles Vignes DOMAINE CORDIER PERE&amp;FILS',
      ja: 'プイィ フュイッセ ドメーヌ コルディエ',
      price: '12,200',
    },
    {
      title: '2005 BEAUNE CLOS SAINT-LANDRY BOUCHARD PERE&amp;FILS',
      ja: 'ボーヌ ブラン クロ サンーロンドリ ブシャール',
      price: '12,690',
    },
    {
      title: '2012 MEURSAEHT BUTTERFIELD',
      ja: 'ムルソー バター フィールド',
      price: '12,800',
    },
    {
      title: '2011 MEURSAULT Vieilles Vignes Domaine Vincent Girardin',
      ja: 'ムルソー V V ヴァンサン ジラルダン',
      price: '14,700',
    },
    {
      title: '2012 Beaune Aigrots 1er Cru Albert Morot',
      ja: 'ボーヌ 1er エグロ アルベール モロ',
      price: '15,100',
    },
    {
      title: "1968 MEURSAULT-GOUTTE D'OR PREMIER CRU DOMAINE COCHE-BIZOUARD",
      ja: 'ムルソー グート ドール コシュ ビズアール',
      price: '25,000',
    },
    {
      title: '2012 PULIGNY-MONTRACHET 1ER CRE LES PERRIERES Francois Carillon',
      ja: 'ピュリニー モンラッシェ ペリエール フランソワ カリオン',
      price: '27,800',
    },
    {
      title: '1996 Beaune blanc Col des Mouches JOSEPH DROUHIN',
      ja: 'ボーヌ ブラン クロ デ ムーシュ ジョセフ ドルーアン',
      price: '31,200',
    },
    {
      title: '1990 Corton-Charlemagne JEAN-CLAUDE BELLAND',
      ja: 'コルトン シャルルマーニュ ジャン クロード ベラン',
      price: '40,000',
    },
    {
      title: '2002 MEURSAULT CLOS DE LA BARRE DOMAINE DES COMTES LAFON',
      ja: 'ムルソー クロ ド ラ バール ドメーヌ デ コント ラフォン',
      price: '45,000',
    },
  ],
};
