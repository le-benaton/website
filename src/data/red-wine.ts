import { IItem } from '../../scripts/build-data';

export const redWine: IItem = {
  selector: '<ul class="modal-show wine-list-red"></ul>',
  template: '<li><h4>{{ title }}</h4><div>{{ ja }}</div><div>¥{{ price }}</div></li>',
  data: [
    {
      title: `2011 Bourgogne Passetoutgrain DOMAINE ODOUL-COQUARD`,
      ja: `ブルゴーニュ パストゥーグラン オドゥール コカール`,
      price: `3,200`,
    },
    {
      title: `2010 Bourgogne Pinot Noir Philippe Augustin`,
      ja: `ブルゴーニュ ルージュ フィリップ オーグスティン`,
      price: `4,200`,
    },
    {
      title: `2004 Bourgogne Rouge Domaine MODOT Pere & Filles`,
      ja: `ブルゴーニュ ルージュ ドメーヌ モド`,
      price: `4,400`,
    },
    {
      title: `2007 Bourgogne PINOT NOIR Patrick Clerget`,
      ja: `ブルゴーニュ ピノノワール パトリック クレルジェ`,
      price: `5,200`,
    },
    {
      title: `2002 SANTENAY 1er cru Le Passetemps Philippe Brenot`,
      ja: `サントネ 1er クリュ フィリップ ブルノ`,
      price: `5,700`,
    },
    {
      title: `2013 SantenayVieilles Vignes DOMAINE Philippe Jeannot`,
      ja: `サントネ VV ドメーヌ フィリップ ジャノ`,
      price: `5,800`,
    },
    { title: `2008 BOURGOGNE DOMAINE RENE LECLERC`, ja: `ブルゴーニュ ドメーヌ ルネ ルクレール`, price: `6,100` },
    {
      title: `2014 SANTENAY VIEILLES VIGNES LUCIEN MUZARD&FILS`,
      ja: `サントネイ VV リュシオン ミュザー`,
      price: `6,500`,
    },
    {
      title: `2008 MARSANNAY SANT-JACQUES FOUGERAY DE BEAUCLAIR`,
      ja: `マルサネ サン ジャック フジュレイ ド ボークレール`,
      price: `6,600`,
    },
    {
      title: `2007 Bourgogne Hautes Cotes de Beaune JAYER-GILLES`,
      ja: `オー コート ボーヌ ルージュ ジャイエ ジル`,
      price: `7,600`,
    },
    { title: `2013 MARSANNAY CHATEAU DE MARSANNAY`, ja: `マルサネ シャトー ド マルサネ`, price: `8,400` },
    {
      title: `1993 VOLNAY 1er CRU CAILLERETS BITOUZET-PRIEUR`,
      ja: `ヴォルネイ 1er カイユレ ビトゥーゼ プリウール`,
      price: `9,100`,
    },
    {
      title: `1985 VOLNAY-SANTENOTS PREMIER CRU DOMAINE ROUGEOT`,
      ja: `ヴォルネイ サントノ プルミエ クリュ ドメーヌ ルジョー`,
      price: `9,700`,
    },
    {
      title: `2012 SAINT-AUBIN 1ER CRE-LES PITANGERETS Francos Carillon`,
      ja: `サントーバン ピタンジュレ フランソワ カリオン`,
      price: `9,800`,
    },
    {
      title: `2000 NUITS-SAINT-GEORGE Patrick Clerget`,
      ja: `ニュイ サン ジョルジュ パトリック クレルジェ`,
      price: `10,000`,
    },
    {
      title: `2008 Beaune Les Teurons PREMIER CRU DOMAINE CHATEAU DE CHOREY`,
      ja: `ボーヌ レ トゥーロン シャトー ド ショレイ`,
      price: `10,100`,
    },
    { title: `1995 Bourgogne Rouge Joseph Roty`, ja: `ブルゴーニュ パストゥーグラン ジョセフ ロティ`, price: `10,500` },
    { title: `2013 Vosne-Romanee DOMAINE ODOUL-COQUARD`, ja: `ヴォーヌ - ロマネ オドゥール コカール`, price: `11,300` },
    { title: `1976 Santenay LA ROUTE DES VIGNES`, ja: `サントネ ラ ルート デ ヴィーニュ`, price: `12,000` },
    {
      title: `2010 MARSANNAY Philippe Charlopin`,
      ja: `マルサネ モンシュヌヴォイ シャルロパン パリゾ`,
      price: `12,100`,
    },
    { title: `2005 VOSNE-ROMANEE DOMAINE DANIELRION&FILS`, ja: `ヴォーヌロマネ ダニエルリヨン`, price: `12,200` },
    {
      title: `2005 SAVIGNY-LES-BEAUNE 1ER CRU "LES GRAVAINS" DOMAINE MICHEL & JOANNA ECARD`,
      ja: `サヴィニー レ ボーヌ ミッシェル エ ジョアンヌ エカール`,
      price: `12,600`,
    },
    {
      title: `2010 BEAUNE 1er Cru CLOS DES URSULES LOUIS JADOT`,
      ja: `ボーヌ プルミエ クリュ クロ デ ズルシュール ルイ ジャド`,
      price: `12,800`,
    },
    {
      title: `2008 Hospices de Beaune VOLNAY Premier Cru Cuvee Blondeau`,
      ja: `オスピス ド ボーヌ ヴォルネイ 1er クリュ キュベ ブロンド`,
      price: `13,000`,
    },
    {
      title: `1997 Marsannay Champs saint etienne PHILIPPE Roty`,
      ja: `マルサネ シャン サン エティエンヌ フィリップ ロティ`,
      price: `13,200`,
    },
    {
      title: `2002 Nuits-St-Georges DOMAINE JEAN CHAUVENET`,
      ja: `ニュイ サン ジョルジュ ジャン ショーヴネ`,
      price: `13,900`,
    },
    {
      title: `2010 GEVREY-CHAMBERTIN CHAMP DOMAINE DUROCHE`,
      ja: `ジュヴレ シャンベルタン シャン デュロシェ`,
      price: `14,200`,
    },
    {
      title: `2008 MOREY-SAINT-DENIS PREMIE CRE CLOS BAULET FREDERIC MAGNIEN`,
      ja: `モレ サン ドニ プルミエ クリュ クロ ボーレ フレデリック マニャン`,
      price: `14,200`,
    },
    {
      title: `2008 GEVREY-CHAMBERTIN CHAMP DOMAINE DUROCHE`,
      ja: `ジュブレ シャンベルタン シャン デュロシェ`,
      price: `15,000`,
    },
    { title: `1989 POMMARD VV FABIEN COCHE-BOUILLOT`, ja: `ポマール VV ファビオン コシュ ‐ ブイヨ`, price: `15,000` },
    {
      title: `2007 NUITS-ST-GEORGES LES LAVIERES DOMAINE DANiEl RiON & Fils`,
      ja: `ニュイ サン ジョルジュ ダニエル リオン`,
      price: `15,300`,
    },
    {
      title: `2001 CHAMBOLLE-MUSIGNY DOMAINE Paul Misset`,
      ja: `シャンボール ミュジニ ドメーヌ ポール ミセ`,
      price: `15,300`,
    },
    {
      title: `2007 MOREY-SAINT-DENIS PREMIER CRE RUCHOTS FREDERIC MAGNIEN`,
      ja: `モレ サン ドニ プルミエ クリュ ルショ フレデリック マニャン`,
      price: `15,500`,
    },
    {
      title: `2010 Charmes-Chambertin GRAND CRU DOMAINE DUROCHE`,
      ja: `シャルム シャンベルタン ドゥロシェ`,
      price: `15,600`,
    },
    {
      title: `2012 CHAMBOLLE-MUSIGNY VIEILLES VIGNES LIGNIER-MICHELOT`,
      ja: `シャンボール ミュジニー リニエ ミシュロ`,
      price: `16,300`,
    },
    { title: `1978 Beaune Bressandes Antnin Rodet`, ja: `ボーヌ ブレッサンド アントナン ロデ`, price: `17,500` },
    {
      title: `2011 GEVREY-CHAMBERTIN PREMIER CRE LAVAUT-SAINT-JACQUES FREDERIC MAGNIEN`,
      ja: `ジュヴレ シャンベルタン ラヴォー サン ジャック フレデリック マニャン`,
      price: `18,100`,
    },
    {
      title: `2004 Corton Renardes Grand Cru E.A.R.L francois GAY ET Fils`,
      ja: `コルトン ルナルド グラン クリュ フランソワ ゲ`,
      price: `18,400`,
    },
    {
      title: `2006 CORTON RENARDES GRAND CRU DOMAINE D\`ARDHUY`,
      ja: `コルトン ルナード グラン クリュ ドメーヌ ダルデュイ`,
      price: `18,900`,
    },
    {
      title: `2001 Clos-Saint-Denis Grand Cru GEORGES LIGNIER ET FILS`,
      ja: `クロ サン ドニ グラン クリュ ジョルジュ リニエ`,
      price: `19,600`,
    },
    {
      title: `2003 CORTON LES BRESSANDES GRAND CRU DOMAINE CHANDON DE BRIAILLES`,
      ja: `コルトン レ ブレッサンド グラン クリュ ドメーヌ シャンドン ド ブリアイユ`,
      price: `19,600`,
    },
    {
      title: `2009 MOREY SAINT-DENIS PREMIER CRU LES FACONNIERES Domaine LIGNIER-MICHELOT`,
      ja: `モレ サン ドニ 1er クリュ リニエ ミシュロ`,
      price: `19,700`,
    },
    {
      title: `1976 COTE DE NUITS-VILLAGES DOMAINE DANIEL RION`,
      ja: `コート ドゥ ニュイ ヴィラージュ ドメーヌ ダニエル リヨン`,
      price: `19,900`,
    },
    {
      title: `1979 Aloxe Corton Antonin Guyon`,
      ja: `アロース コルトン フルニエール アントナン ギュイヨン`,
      price: `20,000`,
    },
    {
      title: `2010 GEVREY-CHAMBERTIN 1ER CRE CHERBAUDES LOUIS BOILLOT & FILS`,
      ja: `ジュブレ シャンベルタン 1ER クリュ ルイ ボワイヨ`,
      price: `20,200`,
    },
    {
      title: `2011 GEVREY-CHAMBERTIN 1ER CRE CHERBAUDES LOUIS BOILLOT & FILS`,
      ja: `ジュブレ シャンベルタン 1ER クリュ ルイ ボワイヨ`,
      price: `22,100`,
    },
    {
      title: `1986 Corton-Perrieres Domaine P.DUBREUIL-FONTAINE`,
      ja: `コルトン ペリエール デュブルイ フォンテーヌ`,
      price: `22,500`,
    },
    { title: `1978 Aloxe-Corton Edmond Cornu`, ja: `アロース コルトン エドモンド コルヌ`, price: `22,500` },
    {
      title: `2005 GEVREY-CHAMBERTIN DOMAINE CHARLOPIN-PARIZOT`,
      ja: `ジュブレ シャンベルタン VV シャルロパン パリゾ`,
      price: `25,900`,
    },
    {
      title: `1990 VOLNAY-SANTENOTS Premier Cru MAISON ROCHE DE BELLENE`,
      ja: `ヴォルネイ サントノ プルミエ クリュ メゾン ロシュ ド ベレーヌ`,
      price: `27,000`,
    },
    {
      title: `2002 CORTON CLOS DES CORTONS GRAND CRU MONOPOLE DOMAINE FAIVELEY`,
      ja: `コルトン クロ ド コルトン グラン クリュ フェヴレ`,
      price: `27,000`,
    },
    {
      title: `1973 Pommard Les Platieres DOMAINE Prieur-Brunet`,
      ja: `ポマー レ プラティエール ドメーヌ ピエール ブルネ`,
      price: `28,300`,
    },
    {
      title: `1979 NUITS-SAINT-GEORGES 1er CRU “Clos des Corvees” LOUIS JADOT`,
      ja: `ニュイ - サン - ジョルジュ 1er クリュ クロ デ コルヴェ ルイ ジャド`,
      price: `28,600`,
    },
    {
      title: `1979 Beaune Cols de Mouches Jseph Drouhin`,
      ja: `ボーヌ クロ デ ムーシュ ジョセフ ドルーアン`,
      price: `31,000`,
    },
  ],
};
