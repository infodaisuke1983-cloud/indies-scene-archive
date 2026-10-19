/* Shared public JSON contract; no credentials or administrator data. */
(function(root){
 const keys=(o,allowed)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).some(k=>!allowed.includes(k)))throw Error('公開JSONの項目が不正です');};
 const text=v=>typeof v==='string';
 const https=v=>{try{const u=new URL(v);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password;}catch{return false;}};
 const proof=e=>{keys(e,['url','publisher','fact','checkedAt']);if(!https(e.url)||![e.publisher,e.fact].every(v=>text(v)&&v.trim())||!/^\d{4}-\d{2}-\d{2}$/.test(e.checkedAt)||!Number.isFinite(Date.parse(e.checkedAt))||new Date(e.checkedAt).toISOString().slice(0,10)!==e.checkedAt||e.checkedAt>new Date(Date.now()+9*3600000).toISOString().slice(0,10))throw Error('根拠情報が不正です');};
 function validate(d){keys(d,['schemaVersion','audience','generatedAt','bands']);if(d.schemaVersion!=='1.9'||d.audience!=='public'||!text(d.generatedAt)||!Number.isFinite(Date.parse(d.generatedAt))||!Array.isArray(d.bands))throw Error('公開用JSONを読み込めません');
 const ids=new Set();for(const b of d.bands){keys(b,['id','name','reading','prefectures','videos']);if(!text(b.id)||!b.id||ids.has(b.id)||!text(b.name)||!b.name.trim()||!text(b.reading)||!Array.isArray(b.prefectures)||!b.prefectures.every(text)||new Set(b.prefectures).size!==b.prefectures.length||!Array.isArray(b.videos)||!b.videos.length)throw Error('バンド情報が不正です');ids.add(b.id);const vids=new Set();for(const v of b.videos){keys(v,['id','title','url','embed']);if(!/^[\w-]{11}$/.test(v.id)||vids.has(v.id)||!text(v.title)||!v.title.trim()||v.url!=='https://www.youtube.com/watch?v='+v.id||typeof v.embed!=='boolean')throw Error('動画情報が不正です');vids.add(v.id);}}return d;}
 const normalize=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
 const kana=['あいうえお','かきくけこがぎぐげご','さしすせそざじずぜぞ','たちつてとだぢづでど','なにぬねの','はひふへほばびぶべぼぱぴぷぺぽ','まみむめも','やゆよ','らりるれろ','わをん'];
 function initial(b){const s=normalize(b.reading||b.englishName||b.name),c=s.charAt(0);if(/[a-z]/.test(c))return c.toUpperCase();return kana.find(k=>k.includes(c))?.[0]||'その他';}
 function filter(bands,f){return bands.filter(b=>(!f.q||normalize([b.name,b.reading,b.englishName].join(' ')).includes(normalize(f.q)))&&(!f.pref||b.prefectures.includes(f.pref))&&(!f.era||(f.era==='unknown'?!(b.eras||[]).length:(b.eras||[]).includes(Number(f.era))))&&(!f.initial||initial(b)===f.initial));}
 const api={validate,normalize,initial,filter};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.ArchiveCatalog=api;
})(typeof globalThis!=='undefined'?globalThis:this);
