// Input must be a public GAS JSON export, never a raw spreadsheet dump.
const fs=require('fs'),C=require('../site/assets/catalog.js');
const [input,output]=process.argv.slice(2);if(!input||!output)throw Error('Usage: node tools/convert-public.cjs public-export.json site/data/archive.json');
const data=C.validate(JSON.parse(fs.readFileSync(input,'utf8')));fs.writeFileSync(output,JSON.stringify(data,null,2)+'\n');console.log(data.bands.length+' bands / '+data.bands.reduce((n,b)=>n+b.videos.length,0)+' videos');
