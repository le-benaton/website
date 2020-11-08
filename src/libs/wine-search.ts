import Flexsearch, { TokenizerFn, Index } from 'flexsearch'
import { writeFileSync } from 'fs';
import { whiteWine } from '../data/white-wine'
import { redWine } from '../data/red-wine'
import { champagneWine } from '../data/champagne-wine'
import { IItem } from '../../scripts/build-data'

export type WineTypeName = '赤ワイン' | '白ワイン' | 'シャンパーニュ'
/**
 * @see https://www.broadleaves.dev/posts/2019-08-03-gridsome-flexsearch/#%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%82%92%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AB%E5%90%AB%E3%82%81%E3%82%8B
 * @param str 
 */
const tokenizer: TokenizerFn = str => {
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
    const flatted = (mappedTexts as any).flat() as string[]
    return [
        ...new Set(flatted)
    ]
}

/**
 * Indexの作成
 */
const createWineIndexs = () => {
    const createIndex = (dataSets: IItem): Index<unknown> => {
        const index = Flexsearch.create({
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
        })
        dataSets.data.forEach((data, i) => {
            index.add({
                ...data,
                id: i,
            })
        })
        return index
    }
    
    const conditions: Array<{
        name: WineTypeName,
        datasets: IItem;
    }> = [{
        name: '白ワイン',
        datasets: whiteWine
    }, {
        name: '赤ワイン',
        datasets: redWine
    }, {
        name: 'シャンパーニュ',
        datasets: champagneWine,
    }]
    const [
        whiteWineIndex,
        redWineIndex,
        champagneWineIndex,
    ] = conditions.map(condition => {
        return createIndex(condition.datasets)
    });
    
    const allWineIndex = Flexsearch.create({
        tokenize: tokenizer,
        depth: 3,
        doc: {
            id: 'id',
            field: [
                'title',
                'ja',
                'price',
                'type',
            ]
        }
    })
    let amountIndex = 0
    conditions.forEach(condition => {
        condition.datasets.data.forEach(data => {
            amountIndex = amountIndex + 1
            allWineIndex.add({
                ...data,
                id: amountIndex,
                type: condition.name,
            })
        })
    })
    return {
        whiteWineIndex,
        redWineIndex,
        champagneWineIndex,
        allWineIndex,
    }
}

/**
 * Wineのデータから検索IndexのJSONを作成する
 */
export const createWineSearchIndex = () => {
    const {
        whiteWineIndex,
        redWineIndex,
        champagneWineIndex,
        allWineIndex,
    } = createWineIndexs();
    
    [{
        name: '白ワイン',
        fileName: 'whiteWine',
        index: whiteWineIndex
    }, {
        name: '赤ワイン',
        fileName: 'redWine',
        index: redWineIndex,
     }, {
         name: 'シャンパーニュ',
         fileName: 'champagneWine',
         index: champagneWineIndex,
     }, {
         name: '全体',
         fileName: 'allWine',
         index: allWineIndex
    }].forEach(({name, index, fileName}) => {
        console.log(`Create Wine search index: ${name}`)
        const data = index.export()
        const target = [
            process.cwd(),
            'www',
            `${fileName}.json`
        ].join('/')
        writeFileSync(target, data)
    });
}