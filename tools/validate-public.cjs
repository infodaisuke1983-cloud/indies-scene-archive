const fs=require('node:fs'),path=require('node:path'),C=require('../site/assets/catalog.js');
const root=path.resolve(__dirname,'../site'),data=C.validate(JSON.parse(fs.readFileSync(path.join(root,'data/archive.json'),'utf8')));
if(JSON.stringify(data).includes('demo-band-'))throw Error('開発用データが公開サイトに含まれています');
for(const f of ['index.html','.nojekyll','assets/catalog.js','assets/app.js','assets/style.css','assets/japan-map.json','assets/icon.svg','THIRD_PARTY.md'])if(!fs.existsSync(path.join(root,f)))throw Error('Missing '+f);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');for(const m of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:\?[^"#]*)?"/g))if(!fs.existsSync(path.resolve(root,m[1])))throw Error('Broken relative asset '+m[1]);
if(/(?:src|href)="\/(?!\/)/.test(html))throw Error('Project Pagesには相対URLを使用してください');
if(fs.readdirSync(path.join(root,'data')).some(f=>f!=='archive.json'))throw Error('公開データ以外のファイルがあります');
console.log('Public release validated:',data.bands.length,'bands;',data.relations.length,'relations; no demo data.');
