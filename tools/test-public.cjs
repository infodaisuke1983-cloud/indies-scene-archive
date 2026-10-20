const assert=require('node:assert/strict'),C=require('../site/assets/catalog.js');
const band={id:'test-band',name:'TEST ONLY',reading:'',prefectures:[],videos:[]};
for(const version of ['1.9','2.1']){const d=C.validate({schemaVersion:version,audience:'public',generatedAt:'2026-10-20T00:00:00Z',bands:[{...band,...(version==='2.1'?{labels:[]}: {})}]});assert.equal(d.bands.length,1);assert.equal(d.bands[0].videos.length,0)}
const old={schemaVersion:'1.6',audience:'public',generatedAt:'2026-10-20',bands:[{...band,englishName:'',eraText:'',eras:[],evidence:[{url:'https://test.invalid/private'}]}],relations:[]};assert.ok(!JSON.stringify(C.validate(old)).includes('test.invalid'));
assert.throws(()=>C.validate({...old,adminNotes:'private'}));assert.throws(()=>C.validate({schemaVersion:'2.1',audience:'public',generatedAt:'2026-10-20',bands:[{...band,prefectures:['不明県'],labels:[]}]}));
console.log('Public schema conversion and no-video tests passed (test data stays outside site/).');
const searched={id:'TESTVIDEO01',title:'Search result',url:'https://www.youtube.com/watch?v=TESTVIDEO01',embed:false,thumbnail:'https://i.ytimg.com/vi/TESTVIDEO01/mqdefault.jpg',searchResult:true,channel:'Uploader',fetchedAt:'2026-10-20T00:00:00Z'};
const contract={schemaVersion:'2.1',audience:'public',generatedAt:'2026-10-20',bands:[{...band,aliases:['別表記'],labels:[],videos:[searched]}]};
assert.equal(C.filter(C.validate(contract).bands,{q:'別表記'}).length,1);
assert.throws(()=>C.validate({...contract,bands:[{...contract.bands[0],videos:[searched,searched]}]}));
assert.throws(()=>C.validate({...contract,bands:[{...contract.bands[0],videos:[{...searched,thumbnail:'https://i.ytimg.com.evil.invalid/a'}]}]}));
assert.throws(()=>C.validate({...contract,bands:[{...contract.bands[0],adminNotes:'private'}]}));
console.log('Thumbnail, search-result warning contract, aliases, duplicate and private-field tests passed.');
