

/**
 * @see https://www.broadleaves.dev/posts/2019-08-03-gridsome-flexsearch/#%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%82%92%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AB%E5%90%AB%E3%82%81%E3%82%8B
 * @param str 
 */
const tokenizer = str => {
  if (!str) return []
  const splitedTexts = str
      // 処理前にアルファベットを小文字に変換
      .toLowerCase()
      // 漢字、カナ、半角英数の連続する塊を切り出し
      // かなと全角英数は対象外
      .match(/[一-龠]+|[ァ-ヴー]+|[a-z0-9]+/g)
  if (!splitedTexts) return []
  const mappedTexts = splitedTexts
          .filter(word => word.length > 1)
          // 半角英数の場合、前方一致検索ができるように処理
          .map(word => {
              if (word.match(/[a-z0-9]+/g)) {
                  let token = ''
                  return Array.from(word)
                  .map(char => (token += char))
                  .filter(token => token.length > 1)
              } else {
                  return word
              }
          })
  const flatted = mappedTexts.flat()
  return [
      ...new Set(flatted)
  ]
}

/**
 * 取得するファイルのパス
 * @param {*} indexType 
 */
function getIndexFilePath(indexType) {
    switch(indexType.toLowerCase()) {
        case 'white':
        case 'whitewine':
            return '/whiteWine.json';
        case 'red':
        case 'redwine':
            return '/redWine.json';
        case 'champagne':
        case 'champagneWine':
            return '/champagneWine.json'
        default:
            return '/allWine.json'
    }
}

/**
 * 検索実行
 * @param {string} searchWord 
 * @param {string} indexType 
 */
function searchWine(searchWord, indexType = 'all') {
    const SearchIndexOption = {
      tokenize: tokenizer,
      depth: 3,
      doc: {
          id: 'id',
          field: [
              'title',
              'ja',
              'price',
          ]
      }
    }
    const resultHTML = document.getElementById('wineSearchResult')
    const index = window.FlexSearch.create(SearchIndexOption)
    fetch(getIndexFilePath(indexType))
      .then(data => data.json())
      .then(data => {
        const targetWineIndex = JSON.stringify(data)
        index.import(targetWineIndex)
        const items = index.search(searchWord)
        return items
      }).then(data => {
          /**
           * @TODO ここに検索結果描画処理
           */
        resultHTML.innerHTML = '<pre><code>' + JSON.stringify(data, null, 2) + '</code></pre>'
      }).catch(e => {
        /**
         * @TODO ここにエラー描画処理
         */
        resultHTML.innerHTML = "Error:" + e.name + '\n' + e.message;
      })
}


document.getElementById("wineSearchForm")
    .addEventListener('submit', (event) => {
        event.preventDefault()
        const searchWord = document.getElementById('wineSearchField').value
        const searchType = document.getElementById('wineSearchType')
        if (!searchWord) return;
        searchWine(searchWord, searchType.value)
    })