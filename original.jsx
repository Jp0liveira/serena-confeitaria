import { useState, useCallback } from "react";

const OVO = 54;
const P = {
  ovo:        { qtdEmbalagem:30,   precoEmbalagem:20 },
  oleo:       { qtdEmbalagem:900,  precoEmbalagem:8 },
  leite:      { qtdEmbalagem:1000, precoEmbalagem:5.5 },
  iogurte:    { qtdEmbalagem:170,  precoEmbalagem:3.7 },
  acucar:     { qtdEmbalagem:1000, precoEmbalagem:3.8 },
  trigo:      { qtdEmbalagem:1000, precoEmbalagem:6.3 },
  fermento:   { qtdEmbalagem:200,  precoEmbalagem:10 },
  chocolate:  { qtdEmbalagem:1000, precoEmbalagem:41 },
  corAm:      { qtdEmbalagem:1,    precoEmbalagem:6 },
  corVm:      { qtdEmbalagem:1,    precoEmbalagem:6 },
  morango:    { qtdEmbalagem:1000, precoEmbalagem:25 },
};

const M0 = [
  {id:201,nome:"🍰 Ninho",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:150},
    {id:4,n:"Iogurte Natural",u:"g",...P.iogurte,q:170},
    {id:5,n:"Leite em Pó Camponesa",u:"g",qtdEmbalagem:400,precoEmbalagem:6.8,q:30},
    {id:6,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:7,n:"Farinha de Trigo",u:"g",...P.trigo,q:280},
    {id:8,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
  ]},
  {id:202,nome:"🍫 Chocolate",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:150},
    {id:4,n:"Creme de Leite",u:"g",qtdEmbalagem:200,precoEmbalagem:3.5,q:200},
    {id:5,n:"Chocolate em Pó 50%",u:"g",...P.chocolate,q:100},
    {id:6,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:7,n:"Farinha de Trigo",u:"g",...P.trigo,q:250},
    {id:8,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
  ]},
  {id:203,nome:"🌼 Maracujá",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:150},
    {id:4,n:"Iogurte Natural",u:"g",...P.iogurte,q:170},
    {id:5,n:"Maracujá (polpa)",u:"g",qtdEmbalagem:320,precoEmbalagem:8.8,q:100},
    {id:6,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:7,n:"Farinha de Trigo",u:"g",...P.trigo,q:280},
    {id:8,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
    {id:9,n:"Corante Gel Amarelo Gema",u:"unidade",...P.corAm,q:1,obs:"4 gotas"},
  ]},
  {id:204,nome:"🌹 Red Velvet",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:150},
    {id:4,n:"Iogurte Natural",u:"g",...P.iogurte,q:170},
    {id:5,n:"Chocolate em Pó 50%",u:"g",...P.chocolate,q:30},
    {id:6,n:"Pasta Frutas Silvestres Dabella",u:"g",qtdEmbalagem:100,precoEmbalagem:18,q:15},
    {id:7,n:"Corante Gel Vermelho Morango",u:"g",...P.corVm,q:5},
    {id:8,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:9,n:"Farinha de Trigo",u:"g",...P.trigo,q:280},
    {id:10,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
    {id:11,n:"Leite morno (buttermilk)",u:"ml",...P.leite,q:30},
    {id:12,n:"Limão/Vinagre (buttermilk)",u:"ml",qtdEmbalagem:50,precoEmbalagem:1,q:10},
  ]},
  {id:205,nome:"🍓 Morango",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:150},
    {id:4,n:"Iogurte de Morango",u:"g",...P.iogurte,q:170},
    {id:5,n:"Sabor de Morango",u:"g",...P.morango,q:15},
    {id:6,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:7,n:"Farinha de Trigo",u:"g",...P.trigo,q:280},
    {id:8,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
  ]},
  {id:206,nome:"🥕 Cenoura",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Iogurte Natural",u:"g",...P.iogurte,q:170},
    {id:4,n:"Leite em Pó Camponesa",u:"g",qtdEmbalagem:400,precoEmbalagem:6.8,q:30},
    {id:5,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:6,n:"Farinha de Trigo",u:"g",...P.trigo,q:300},
    {id:7,n:"Cenoura",u:"g",qtdEmbalagem:500,precoEmbalagem:3.5,q:290},
    {id:8,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
  ]},
  {id:207,nome:"🍊 Laranja",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:100},
    {id:4,n:"Suco de Laranja",u:"ml",qtdEmbalagem:200,precoEmbalagem:2,q:50},
    {id:5,n:"Iogurte Natural",u:"g",...P.iogurte,q:170},
    {id:6,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:7,n:"Farinha de Trigo",u:"g",...P.trigo,q:280},
    {id:8,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
    {id:9,n:"Raspas de Laranja",u:"unidade",qtdEmbalagem:1,precoEmbalagem:0.5,q:1,obs:"a gosto"},
  ]},
  {id:208,nome:"🌽 Fubá",ing:[
    {id:1,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:2,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:90},
    {id:4,n:"Leite de Coco",u:"ml",qtdEmbalagem:1000,precoEmbalagem:12,q:60},
    {id:5,n:"Iogurte Natural",u:"g",...P.iogurte,q:170},
    {id:6,n:"Fubá Mimoso",u:"g",qtdEmbalagem:500,precoEmbalagem:4.5,q:100},
    {id:7,n:"Coco Ralado",u:"g",qtdEmbalagem:100,precoEmbalagem:6.5,q:33},
    {id:8,n:"Milho em Conserva",u:"g",qtdEmbalagem:170,precoEmbalagem:3.5,q:56},
    {id:9,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:250},
    {id:10,n:"Farinha de Trigo",u:"g",...P.trigo,q:150},
    {id:11,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
  ]},
  {id:209,nome:"🥥 Coco",ing:[
    {id:1,n:"Açúcar Refinado/Cristal",u:"g",...P.acucar,q:200},
    {id:2,n:"Açúcar Mascavo",u:"g",qtdEmbalagem:500,precoEmbalagem:5.5,q:80},
    {id:3,n:"Doce de Leite",u:"g",qtdEmbalagem:400,precoEmbalagem:9,q:50},
    {id:4,n:"Leite de Coco",u:"ml",qtdEmbalagem:200,precoEmbalagem:4,q:200},
    {id:5,n:"Leite Integral",u:"ml",...P.leite,q:150},
    {id:6,n:"Óleo",u:"ml",...P.oleo,q:150},
    {id:7,n:"Coco em Flocos",u:"g",qtdEmbalagem:100,precoEmbalagem:4.5,q:100},
    {id:8,n:"Ovos",u:"unidade",...P.ovo,q:4},
    {id:9,n:"Fermento em Pó",u:"g",...P.fermento,q:16},
    {id:10,n:"Farinha de Trigo",u:"g",...P.trigo,q:200},
  ]},
];

const R0 = [
  {id:301,nome:"🍬 Calda de Açúcar",ing:[
    {id:1,n:"Glaçúcar União",u:"g",qtdEmbalagem:500,precoEmbalagem:6.5,q:500},
    {id:2,n:"Água fervente",u:"ml",qtdEmbalagem:1000,precoEmbalagem:0,q:500},
  ]},
  {id:302,nome:"🤍 Recheio Branco",ing:[
    {id:1,n:"Leite Integral",u:"ml",...P.leite,q:100},
    {id:2,n:"Cobertura Fracionada Branca",u:"g",qtdEmbalagem:1000,precoEmbalagem:22,q:100},
    {id:3,n:"Leite Condensado Piracanjuba",u:"g",qtdEmbalagem:395,precoEmbalagem:5.5,q:395},
    {id:4,n:"Creme de Leite Piracanjuba",u:"g",qtdEmbalagem:200,precoEmbalagem:3.5,q:600},
  ]},
  {id:303,nome:"🍫 Recheio Chocolate",ing:[
    {id:1,n:"Chocolate em Pó 50%",u:"g",...P.chocolate,q:30},
    {id:2,n:"Cobertura Fracionada Meio Amargo",u:"g",qtdEmbalagem:1000,precoEmbalagem:25,q:100},
    {id:3,n:"Leite Integral",u:"ml",...P.leite,q:100},
    {id:4,n:"Leite Condensado Piracanjuba",u:"g",qtdEmbalagem:395,precoEmbalagem:5.5,q:395},
    {id:5,n:"Creme de Leite Piracanjuba",u:"g",qtdEmbalagem:200,precoEmbalagem:3.5,q:600},
  ]},
];

const COMBOS = [
  {id:1,nome:"🍰 Ninho Misto",massaId:201,recheios:[{id:302,f:0.5},{id:303,f:0.5}]},
  {id:2,nome:"🍫 Chocolate",massaId:202,recheios:[{id:303,f:1}]},
  {id:3,nome:"🥕 Cenoura c/ Chocolate",massaId:206,recheios:[{id:303,f:1}]},
];

const G0 = [
  {id:1,n:"Energia Elétrica",v:0},
  {id:2,n:"Gás",v:0},
  {id:3,n:"Internet",v:0},
  {id:4,n:"Materiais de Limpeza",v:0},
];

const fmt = v => `R$ ${Number(v).toFixed(2).replace(".",",")}`;
const ppu = i => (Number(i.precoEmbalagem)||0)/(Number(i.qtdEmbalagem)||1);
const custo = i => ppu(i)*(Number(i.q)||0);
const totalIng = ing => ing.reduce((s,i)=>s+custo(i),0);
const peso = i => i.u==="unidade"?(Number(i.q)||0)*OVO:(Number(i.q)||0);
const pesoTotal = ing => ing.reduce((s,i)=>s+peso(i),0);

const iSt = {border:"1px solid #fbcfe8",borderRadius:6,padding:"4px 6px",fontSize:12,outline:"none",background:"#fff",boxSizing:"border-box"};
const lSt = {display:"block",fontSize:10,color:"#9d174d",marginBottom:2,fontWeight:600};
const card = (bg,extra={}) => ({borderRadius:12,padding:14,color:"#fff",background:bg,...extra});

function Tabela({ing,upd,rem}){
  return(
    <div style={{overflowX:"auto",marginBottom:14}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:"#fdf2f8"}}>
          {["Ingrediente","Un.","Qtd.Emb.","Preço Emb.","R$/un","Qtd.Receita","💰 Custo",""].map(h=>(
            <th key={h} style={{padding:"7px 8px",textAlign:h==="Ingrediente"?"left":"center",color:"#831843",fontWeight:600,whiteSpace:"nowrap",borderBottom:"2px solid #fbcfe8",fontSize:11}}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {ing.map((i,idx)=>(
            <tr key={i.id} style={{background:idx%2===0?"#fff":"#fdf2f8"}}>
              <td style={{padding:"5px 8px"}}>
                <div style={{display:"flex",gap:4,alignItems:"center"}}>
                  <input value={i.n} onChange={e=>upd(i.id,"n",e.target.value)} style={{...iSt,width:175}}/>
                  {i.obs&&<span style={{fontSize:9,background:"#e0f2fe",color:"#0369a1",borderRadius:4,padding:"1px 4px"}}>{i.obs}</span>}
                </div>
              </td>
              <td style={{padding:"5px 8px",textAlign:"center"}}>
                <select value={i.u} onChange={e=>upd(i.id,"u",e.target.value)} style={{...iSt,width:70}}>
                  <option value="g">g</option><option value="ml">ml</option><option value="unidade">un</option>
                </select>
              </td>
              <td style={{padding:"5px 8px",textAlign:"center"}}>
                <div style={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
                  <input type="number" value={i.qtdEmbalagem} onChange={e=>upd(i.id,"qtdEmbalagem",e.target.value)} style={{...iSt,width:58,textAlign:"center"}}/>
                  <span style={{color:"#9d174d",fontSize:10}}>{i.u==="unidade"?"un":i.u}</span>
                </div>
              </td>
              <td style={{padding:"5px 8px",textAlign:"center"}}>
                <div style={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:"#9d174d",fontSize:10}}>R$</span>
                  <input type="number" value={i.precoEmbalagem} onChange={e=>upd(i.id,"precoEmbalagem",e.target.value)} style={{...iSt,width:62,textAlign:"center"}}/>
                </div>
              </td>
              <td style={{padding:"5px 8px",textAlign:"center",color:"#7c3aed",fontWeight:600,fontSize:11}}>
                {fmt(ppu(i))}/{i.u==="unidade"?"un":i.u}
              </td>
              <td style={{padding:"5px 8px",textAlign:"center"}}>
                <div style={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
                  <input type="number" value={i.q} onChange={e=>upd(i.id,"q",e.target.value)} style={{...iSt,width:52,textAlign:"center"}}/>
                  <span style={{color:"#9d174d",fontSize:10}}>{i.u==="unidade"?"un":i.u}</span>
                </div>
              </td>
              <td style={{padding:"5px 8px",textAlign:"center",fontWeight:700,color:"#166534"}}>{fmt(custo(i))}</td>
              <td style={{padding:"5px 8px",textAlign:"center"}}>
                <button onClick={()=>rem(i.id)} style={{background:"#fecdd3",border:"none",borderRadius:5,padding:"3px 7px",cursor:"pointer",color:"#dc2626",fontSize:12}}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot><tr style={{background:"#fce7f3"}}>
          <td colSpan={6} style={{padding:"7px 8px",fontWeight:700,color:"#831843",textAlign:"right"}}>Total:</td>
          <td style={{padding:"7px 8px",textAlign:"center",fontWeight:700,color:"#831843"}}>{fmt(totalIng(ing))}</td>
          <td/>
        </tr></tfoot>
      </table>
    </div>
  );
}

function MassaTab({ing,upd,rem,add,rid,cfg,setCfg}){
  const [addOpen,setAddOpen]=useState(false);
  const [novo,setNovo]=useState({n:"",u:"g",qtdEmbalagem:"",precoEmbalagem:"",q:""});
  const doAdd=()=>{if(!novo.n)return;add({...novo,id:Date.now()});setNovo({n:"",u:"g",qtdEmbalagem:"",precoEmbalagem:"",q:""});setAddOpen(false);};
  const gpf=Number(cfg.gpf)||200;
  const pt=pesoTotal(ing);
  const formas=Math.floor(pt/gpf)||1;
  const sobra=pt%gpf;
  const ti=totalIng(ing);
  const ct=ti+Number(cfg.emb||0);
  const m=Number(cfg.margem||0);
  const pf=m>=100?0:ct/(1-m/100);
  const luc=pf-ct;
  return(
    <div>
      <Tabela ing={ing} upd={upd} rem={rem}/>
      {!addOpen
        ?<button onClick={()=>setAddOpen(true)} style={{background:"#fbcfe8",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",color:"#831843",fontWeight:600,fontSize:12,marginBottom:16}}>+ Ingrediente</button>
        :<div style={{background:"#fdf2f8",borderRadius:10,padding:12,marginBottom:16}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"}}>
            {[["n","Nome","text",140],["qtdEmbalagem","Qtd.Emb","number",80],["precoEmbalagem","Preço R$","number",85],["q","Qtd.Receita","number",80]].map(([f,l,t,w])=>(
              <div key={f}><label style={lSt}>{l}</label><input type={t} value={novo[f]||""} onChange={e=>setNovo(v=>({...v,[f]:e.target.value}))} style={{...iSt,width:w}}/></div>
            ))}
            <div><label style={lSt}>Unidade</label>
              <select value={novo.u} onChange={e=>setNovo(v=>({...v,u:e.target.value}))} style={{...iSt,width:78}}>
                <option value="g">g</option><option value="ml">ml</option><option value="unidade">unidade</option>
              </select></div>
            <button onClick={doAdd} style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12}}>Adicionar</button>
            <button onClick={()=>setAddOpen(false)} style={{background:"#e5e7eb",color:"#374151",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12}}>Cancelar</button>
          </div>
        </div>
      }
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:210,background:"#fdf2f8",borderRadius:12,padding:14}}>
          <h3 style={{margin:"0 0 10px",color:"#831843",fontSize:13}}>Custos & Rendimento</h3>
          <div style={{marginBottom:8}}><label style={lSt}>Embalagem/Caixa (R$)</label>
            <div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{color:"#9d174d",fontSize:12}}>R$</span>
              <input type="number" value={cfg.emb||0} onChange={e=>setCfg({...cfg,emb:e.target.value})} style={{...iSt,width:80}}/></div></div>
          <div style={{marginBottom:8}}><label style={lSt}>Margem (%)</label>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <input type="number" value={cfg.margem||0} onChange={e=>setCfg({...cfg,margem:e.target.value})} style={{...iSt,width:65}}/>
              <span style={{color:"#9d174d",fontSize:12}}>%</span></div></div>
          <div style={{borderTop:"1px solid #fbcfe8",paddingTop:10,marginTop:10}}>
            <label style={{...lSt,fontSize:11}}>🎂 g por forma</label>
            <div style={{display:"flex",gap:6,alignItems:"center",marginTop:4,marginBottom:8}}>
              <input type="number" value={cfg.gpf||200} onChange={e=>setCfg({...cfg,gpf:e.target.value})} style={{...iSt,width:65,textAlign:"center"}}/>
              <span style={{color:"#9d174d",fontSize:12}}>g</span></div>
            <div style={{background:"#e0f2fe",borderRadius:7,padding:"7px 10px",fontSize:11,color:"#0369a1",lineHeight:1.9}}>
              ⚖️ Peso total: <strong>{pt.toFixed(0)}g</strong><br/>
              🎂 Formas: <strong>{formas} bolos</strong><br/>
              📦 Sobra: <strong>{sobra.toFixed(0)}g</strong>{sobra>=50?" 🧁":""}</div>
          </div>
          <div style={{borderTop:"1px solid #fbcfe8",paddingTop:10,marginTop:10}}>
            <label style={{...lSt,fontSize:11}}>🧾 Custo/bolo</label>
            <table style={{width:"100%",marginTop:6,borderCollapse:"collapse",fontSize:11}}>
              <thead><tr style={{background:"#fce7f3"}}>
                <th style={{padding:"3px 6px",textAlign:"left",color:"#831843"}}>Ingrediente</th>
                <th style={{padding:"3px 6px",textAlign:"center",color:"#831843"}}>Custo</th>
              </tr></thead>
              <tbody>{ing.map((i,idx)=>(
                <tr key={i.id} style={{background:idx%2===0?"#fff":"#fdf2f8"}}>
                  <td style={{padding:"3px 6px",color:"#374151"}}>{i.n}</td>
                  <td style={{padding:"3px 6px",textAlign:"center",fontWeight:600,color:"#be185d"}}>{fmt(custo(i)/formas)}</td>
                </tr>
              ))}</tbody>
              <tfoot><tr style={{background:"#fce7f3"}}>
                <td style={{padding:"3px 6px",fontWeight:700,color:"#831843"}}>Total</td>
                <td style={{padding:"3px 6px",textAlign:"center",fontWeight:700,color:"#831843"}}>{fmt(ti/formas)}</td>
              </tr></tfoot>
            </table>
          </div>
        </div>
        <div style={{flex:1,minWidth:185,...card("linear-gradient(135deg,#831843,#be185d)")}}>
          <h3 style={{margin:"0 0 10px",fontSize:13}}>💰 Receita Completa</h3>
          {[["Ingredientes",fmt(ti)],["Embalagem",fmt(cfg.emb||0)],["Custo Total",fmt(ct)]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:11,borderBottom:"1px solid rgba(255,255,255,0.2)",paddingBottom:4}}>
              <span style={{opacity:.85}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
            <span style={{fontSize:12}}>Preço Final ({m}%)</span>
            <span style={{fontWeight:700,fontSize:18}}>{fmt(pf)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:11,opacity:.85}}>
            <span>Lucro total</span><span style={{fontWeight:600}}>{fmt(luc)}</span></div>
        </div>
        <div style={{flex:1,minWidth:185,...card("linear-gradient(135deg,#1e3a5f,#2563eb)")}}>
          <h3 style={{margin:"0 0 4px",fontSize:13}}>🎂 Por Unidade</h3>
          <p style={{margin:"0 0 10px",fontSize:10,opacity:.8}}>{formas} bolos de {gpf}g</p>
          {[["Custo/bolo",fmt(ct/formas)],["Lucro/bolo",fmt(luc/formas)]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:11,borderBottom:"1px solid rgba(255,255,255,0.2)",paddingBottom:4}}>
              <span style={{opacity:.85}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
            <span style={{fontSize:12}}>💰 Preço de venda</span>
            <span style={{fontWeight:700,fontSize:20}}>{fmt(pf/formas)}</span></div>
          <div style={{marginTop:10,background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"6px 10px",fontSize:10,textAlign:"center"}}>
            {formas} × {fmt(pf/formas)} = {fmt(pf)}</div>
        </div>
      </div>
    </div>
  );
}

function RecheioTab({ing,upd,rem,cfg,setCfg}){
  const gpb=Number(cfg.gpb)||140;
  const pt=pesoTotal(ing);
  const bolos=Math.floor(pt/gpb)||1;
  const sobra=pt%gpb;
  const ti=totalIng(ing);
  const m=Number(cfg.margem||0);
  const pf=m>=100?0:ti/(1-m/100);
  return(
    <div>
      <Tabela ing={ing} upd={upd} rem={rem}/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:200,background:"#fdf2f8",borderRadius:12,padding:14}}>
          <h3 style={{margin:"0 0 10px",color:"#831843",fontSize:13}}>Margem & Rendimento</h3>
          <div style={{marginBottom:8}}><label style={lSt}>Margem (%)</label>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <input type="number" value={cfg.margem||0} onChange={e=>setCfg({...cfg,margem:e.target.value})} style={{...iSt,width:65}}/>
              <span style={{color:"#9d174d",fontSize:12}}>%</span></div></div>
          <div style={{borderTop:"1px solid #fbcfe8",paddingTop:10}}>
            <label style={{...lSt,fontSize:11}}>🍰 g por bolo</label>
            <div style={{display:"flex",gap:6,alignItems:"center",marginTop:4,marginBottom:8}}>
              <input type="number" value={cfg.gpb||140} onChange={e=>setCfg({...cfg,gpb:e.target.value})} style={{...iSt,width:65,textAlign:"center"}}/>
              <span style={{color:"#9d174d",fontSize:12}}>g</span></div>
            <div style={{background:"#e0f2fe",borderRadius:7,padding:"7px 10px",fontSize:11,color:"#0369a1",lineHeight:1.9}}>
              ⚖️ Peso total: <strong>{pt.toFixed(0)}g</strong><br/>
              🎂 Bolos: <strong>{bolos}</strong><br/>
              📦 Sobra: <strong>{sobra.toFixed(0)}g</strong></div>
          </div>
        </div>
        <div style={{flex:1,minWidth:185,...card("linear-gradient(135deg,#831843,#be185d)")}}>
          <h3 style={{margin:"0 0 10px",fontSize:13}}>💰 Receita Completa</h3>
          {[["Custo Total",fmt(ti)],["Lucro",fmt(pf-ti)]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:11,borderBottom:"1px solid rgba(255,255,255,0.2)",paddingBottom:4}}>
              <span style={{opacity:.85}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
            <span style={{fontSize:12}}>Preço Total ({m}%)</span>
            <span style={{fontWeight:700,fontSize:18}}>{fmt(pf)}</span></div>
        </div>
        <div style={{flex:1,minWidth:185,...card("linear-gradient(135deg,#1e3a5f,#2563eb)")}}>
          <h3 style={{margin:"0 0 4px",fontSize:13}}>🍰 Por Bolo ({gpb}g)</h3>
          <p style={{margin:"0 0 10px",fontSize:10,opacity:.8}}>Rende <strong>{bolos}</strong> bolos</p>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:11,borderBottom:"1px solid rgba(255,255,255,0.2)",paddingBottom:4}}>
            <span style={{opacity:.85}}>Custo/bolo</span><span style={{fontWeight:600}}>{fmt(ti/bolos)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
            <span style={{fontSize:12}}>💰 Preço/bolo</span>
            <span style={{fontWeight:700,fontSize:20}}>{fmt(pf/bolos)}</span></div>
          <div style={{marginTop:10,background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"6px 10px",fontSize:10,textAlign:"center"}}>
            {bolos} × {fmt(pf/bolos)} = {fmt(pf)}</div>
        </div>
      </div>
    </div>
  );
}

function calcCombos(massas,recheios,gpf,gpr,emb,margem){
  return COMBOS.map(c=>{
    const m=massas.find(x=>x.id===c.massaId);
    const formas=m?Math.floor(pesoTotal(m.ing)/gpf)||1:1;
    const custoMassa=m?(totalIng(m.ing)+Number(emb||0))/formas:0;
    const custoRecheio=c.recheios.reduce((s,r)=>{
      const rec=recheios.find(x=>x.id===r.id);
      if(!rec||!gpr)return s;
      const ptRec=pesoTotal(rec.ing)||1;
      const cPorG=totalIng(rec.ing)/ptRec;
      return s+cPorG*Number(gpr)*r.f;
    },0);
    const ct=custoMassa+custoRecheio;
    const mg=Number(margem||0);
    const pv=mg>=100?0:ct/(1-mg/100);
    return {...c,custoMassa,custoRecheio,ct,pv,luc:pv-ct};
  });
}

function ComboTab({massas,recheios,cfg,setCfg}){
  const {margem,emb,gpf,gpr}=cfg;
  const sf=(f,v)=>setCfg(c=>({...c,[f]:v}));
  const combos=calcCombos(massas,recheios,Number(gpf)||200,Number(gpr)||140,emb,margem);
  return(
    <div>
      <div style={{background:"#fef3c7",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#92400e"}}>
        💡 Custo/un = custo da massa ÷ formas + custo do recheio por grama × g usadas/bolo
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18,alignItems:"flex-end"}}>
        {[["g por forma","gpf",gpf],["g recheio/bolo","gpr",gpr],["Embalagem R$","emb",emb],["Margem %","margem",margem]].map(([l,f,v])=>(
          <div key={f}><label style={lSt}>{l}</label>
            <input type="number" value={v||0} onChange={e=>sf(f,e.target.value)} style={{...iSt,width:75}}/></div>
        ))}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#fdf2f8"}}>
            {["Combinação","Recheio(s)","Custo Massa/un","Custo Recheio/un","Emb./un","Custo Total/un","💰 Preço","Lucro/un"].map(h=>(
              <th key={h} style={{padding:"8px",textAlign:h==="Combinação"||h==="Recheio(s)"?"left":"center",color:"#831843",fontWeight:600,whiteSpace:"nowrap",borderBottom:"2px solid #fbcfe8",fontSize:11}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {combos.map((c,i)=>{
              const desc=c.recheios.map(r=>{
                const rec=recheios.find(x=>x.id===r.id);
                return rec?(r.f<1?`${rec.nome}(${r.f*100}%)`:rec.nome):"";
              }).join("+");
              return(
                <tr key={c.id} style={{background:i%2===0?"#fff":"#fdf2f8"}}>
                  <td style={{padding:"8px",fontWeight:600}}>{c.nome}</td>
                  <td style={{padding:"8px",fontSize:11,color:"#555"}}>{desc}</td>
                  <td style={{padding:"8px",textAlign:"center"}}>{fmt(c.custoMassa)}</td>
                  <td style={{padding:"8px",textAlign:"center"}}>{fmt(c.custoRecheio)}</td>
                  <td style={{padding:"8px",textAlign:"center"}}>{fmt(Number(emb||0))}</td>
                  <td style={{padding:"8px",textAlign:"center",fontWeight:600,color:"#be185d"}}>{fmt(c.ct)}</td>
                  <td style={{padding:"8px",textAlign:"center",fontWeight:700,fontSize:13,color:"#166534",background:"#dcfce7",borderRadius:6}}>{fmt(c.pv)}</td>
                  <td style={{padding:"8px",textAlign:"center",color:"#15803d"}}>{fmt(c.luc)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot><tr style={{background:"#fdf2f8",borderTop:"2px solid #fbcfe8"}}>
            <td colSpan={6} style={{padding:"8px",fontWeight:700,color:"#831843",textAlign:"right"}}>Totais:</td>
            <td style={{padding:"8px",textAlign:"center",fontWeight:700,color:"#166534",background:"#dcfce7"}}>{fmt(combos.reduce((s,c)=>s+c.pv,0))}</td>
            <td style={{padding:"8px",textAlign:"center",fontWeight:700,color:"#15803d"}}>{fmt(combos.reduce((s,c)=>s+c.luc,0))}</td>
          </tr></tfoot>
        </table>
      </div>
    </div>
  );
}

function MetasTab({massas,recheios,cfg,setCfg,gastos,setGastos}){
  const {margem,emb,gpf,gpr,meta}=cfg;
  const sf=(f,v)=>setCfg(c=>({...c,[f]:v}));
  const combos=calcCombos(massas,recheios,Number(gpf)||200,Number(gpr)||140,emb,margem);
  const lucMed=combos.length>0?combos.reduce((s,c)=>s+c.luc,0)/combos.length:0;
  const totGastos=gastos.reduce((s,g)=>s+Number(g.v||0),0);
  const metaTotal=Number(meta||0)+totGastos;
  const bolosNec=lucMed>0?Math.ceil(metaTotal/lucMed):0;
  const updG=(id,f,v)=>setGastos(gs=>gs.map(g=>g.id===id?{...g,[f]:v}:g));
  return(
    <div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <div style={{flex:1,minWidth:200,background:"#fdf2f8",borderRadius:12,padding:14}}>
          <h3 style={{margin:"0 0 12px",color:"#831843",fontSize:13}}>⚙️ Parâmetros</h3>
          {[["g por forma","gpf",gpf],["g recheio/bolo","gpr",gpr],["Embalagem R$","emb",emb],["Margem %","margem",margem]].map(([l,f,v])=>(
            <div key={f} style={{marginBottom:8}}><label style={lSt}>{l}</label>
              <input type="number" value={v||0} onChange={e=>sf(f,e.target.value)} style={{...iSt,width:80}}/></div>
          ))}
        </div>
        <div style={{flex:1,minWidth:200,background:"#fdf2f8",borderRadius:12,padding:14}}>
          <h3 style={{margin:"0 0 12px",color:"#831843",fontSize:13}}>🧾 Gastos Fixos</h3>
          {gastos.map(g=>(
            <div key={g.id} style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
              <input value={g.n} onChange={e=>updG(g.id,"n",e.target.value)} style={{...iSt,flex:1}}/>
              <span style={{color:"#9d174d",fontSize:12}}>R$</span>
              <input type="number" value={g.v} onChange={e=>updG(g.id,"v",e.target.value)} style={{...iSt,width:72,textAlign:"center"}}/>
              <button onClick={()=>setGastos(gs=>gs.filter(x=>x.id!==g.id))} style={{background:"#fecdd3",border:"none",borderRadius:5,padding:"3px 6px",cursor:"pointer",color:"#dc2626",fontSize:11}}>🗑</button>
            </div>
          ))}
          <button onClick={()=>setGastos(gs=>[...gs,{id:Date.now(),n:"Novo gasto",v:0}])} style={{background:"#fbcfe8",border:"none",borderRadius:7,padding:"5px 12px",cursor:"pointer",color:"#831843",fontWeight:600,fontSize:12,marginTop:4}}>+ Adicionar</button>
          <div style={{marginTop:10,borderTop:"1px solid #fbcfe8",paddingTop:8,fontWeight:700,color:"#831843",fontSize:13}}>Total: {fmt(totGastos)}</div>
        </div>
        <div style={{flex:1,minWidth:200,background:"#fdf2f8",borderRadius:12,padding:14}}>
          <h3 style={{margin:"0 0 12px",color:"#831843",fontSize:13}}>🎯 Meta de Lucro</h3>
          <div style={{marginBottom:10}}><label style={lSt}>Lucro líquido desejado</label>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <span style={{color:"#9d174d",fontSize:12}}>R$</span>
              <input type="number" value={meta||0} onChange={e=>sf("meta",e.target.value)} style={{...iSt,width:100}}/></div></div>
          <div style={{background:"#e0f2fe",borderRadius:8,padding:"8px 10px",fontSize:11,color:"#0369a1",lineHeight:2}}>
            💰 Lucro médio/bolo: <strong>{fmt(lucMed)}</strong><br/>
            🧾 Gastos fixos: <strong>{fmt(totGastos)}</strong><br/>
            🎯 Meta total: <strong>{fmt(metaTotal)}</strong>
          </div>
        </div>
      </div>
      <div style={{overflowX:"auto",marginBottom:20}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#fdf2f8"}}>
            {["Combinação","Custo/un","Preço","Lucro/un","Bolos p/ gastos","Bolos p/ meta"].map(h=>(
              <th key={h} style={{padding:"8px",textAlign:h==="Combinação"?"left":"center",color:"#831843",fontWeight:600,whiteSpace:"nowrap",borderBottom:"2px solid #fbcfe8",fontSize:11}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {combos.map((c,i)=>{
              const bG=c.luc>0?Math.ceil(totGastos/c.luc):"—";
              const bM=c.luc>0?Math.ceil(metaTotal/c.luc):"—";
              return(
                <tr key={c.id} style={{background:i%2===0?"#fff":"#fdf2f8"}}>
                  <td style={{padding:"8px",fontWeight:600}}>{c.nome}</td>
                  <td style={{padding:"8px",textAlign:"center"}}>{fmt(c.ct)}</td>
                  <td style={{padding:"8px",textAlign:"center",fontWeight:700,color:"#166534"}}>{fmt(c.pv)}</td>
                  <td style={{padding:"8px",textAlign:"center",color:"#15803d",fontWeight:600}}>{fmt(c.luc)}</td>
                  <td style={{padding:"8px",textAlign:"center",fontWeight:600,color:"#b45309"}}>{typeof bG==="number"?bG+" bolos":bG}</td>
                  <td style={{padding:"8px",textAlign:"center",fontWeight:700,fontSize:13,color:"#831843",background:"#fce7f3",borderRadius:6}}>{typeof bM==="number"?bM+" bolos":bM}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot><tr style={{background:"#fdf2f8",borderTop:"2px solid #fbcfe8"}}>
            <td colSpan={3} style={{padding:"8px",fontWeight:700,color:"#831843",textAlign:"right"}}>Média:</td>
            <td style={{padding:"8px",textAlign:"center",fontWeight:700,color:"#15803d"}}>{fmt(lucMed)}</td>
            <td style={{padding:"8px",textAlign:"center",fontWeight:700,color:"#b45309"}}>{lucMed>0?Math.ceil(totGastos/lucMed)+" bolos":"—"}</td>
            <td style={{padding:"8px",textAlign:"center",fontWeight:700,fontSize:13,color:"#831843",background:"#fce7f3"}}>{bolosNec} bolos</td>
          </tr></tfoot>
        </table>
      </div>
      <div style={{...card("linear-gradient(135deg,#831843,#be185d)"),textAlign:"center",padding:24}}>
        <p style={{margin:"0 0 6px",fontSize:13,opacity:.85}}>Para lucrar {fmt(Number(meta||0))} após {fmt(totGastos)} de gastos:</p>
        <p style={{margin:0,fontSize:34,fontWeight:700}}>🎂 {bolosNec} bolos/mês</p>
        <p style={{margin:"8px 0 0",fontSize:12,opacity:.75}}>lucro médio de {fmt(lucMed)} por bolo</p>
      </div>
    </div>
  );
}

export default function App(){
  const [secao,setSecao]=useState("massas");
  const [abaId,setAbaId]=useState(201);
  const [massas,setMassas]=useState(M0);
  const [recheios,setRecheios]=useState(R0);
  const [mCfg,setMCfg]=useState(()=>Object.fromEntries(M0.map(r=>[r.id,{margem:0,emb:0,gpf:200}])));
  const [rCfg,setRCfg]=useState(()=>Object.fromEntries(R0.map(r=>[r.id,{margem:0,gpb:140}])));
  const [cCfg,setCCfg]=useState({margem:60,emb:8,gpf:200,gpr:140});
  const [mtCfg,setMtCfg]=useState({margem:60,emb:8,gpf:200,gpr:140,meta:2000});
  const [gastos,setGastos]=useState(G0);

  const updIng=useCallback((rid,iid,f,v)=>{
    const set=secao==="massas"?setMassas:setRecheios;
    set(prev=>prev.map(r=>r.id!==rid?r:{...r,ing:r.ing.map(i=>i.id!==iid?i:{...i,[f]:v})}));
  },[secao]);

  const remIng=useCallback((rid,iid)=>{
    const set=secao==="massas"?setMassas:setRecheios;
    set(prev=>prev.map(r=>r.id!==rid?r:{...r,ing:r.ing.filter(i=>i.id!==iid)}));
  },[secao]);

  const addIng=useCallback((rid,ni)=>{
    setMassas(prev=>prev.map(r=>r.id!==rid?r:{...r,ing:[...r.ing,ni]}));
  },[]);

  const lista=secao==="massas"?massas:recheios;
  const atual=lista.find(r=>r.id===abaId)||lista[0];

  const secs=[
    {k:"massas",  l:"🎂 Massas",          c:"#831843",bg:"#fce7f3"},
    {k:"recheios",l:"🍮 Recheios & Caldas",c:"#b45309",bg:"#fef3c7"},
    {k:"combos",  l:"🧩 Combinações",      c:"#1e3a5f",bg:"#dbeafe"},
    {k:"metas",   l:"🎯 Metas de Venda",   c:"#065f46",bg:"#d1fae5"},
  ];
  const sc=secs.find(s=>s.k===secao);

  const goSec=k=>{
    setSecao(k);
    if(k==="massas")setAbaId(massas[0].id);
    else if(k==="recheios")setAbaId(recheios[0].id);
  };

  return(
    <div style={{fontFamily:"sans-serif",padding:16,maxWidth:1050,margin:"0 auto",color:"#2d2d2d"}}>
      <div style={{background:"linear-gradient(135deg,#f9a8d4,#fbcfe8)",borderRadius:16,padding:"16px 22px",marginBottom:18}}>
        <h1 style={{margin:0,fontSize:19,color:"#831843"}}>🎂 Precificação — Confeitaria</h1>
        <p style={{margin:"4px 0 0",color:"#9d174d",fontSize:12}}>Massas, Recheios, Combinações e Metas</p>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {secs.map(s=>(
          <button key={s.k} onClick={()=>goSec(s.k)} style={{background:secao===s.k?s.c:s.bg,color:secao===s.k?"#fff":s.c,border:`2px solid ${s.c}`,borderRadius:10,padding:"8px 16px",cursor:"pointer",fontWeight:700,fontSize:13,transition:"all 0.2s"}}>{s.l}</button>
        ))}
      </div>
      {secao!=="combos"&&secao!=="metas"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(135px,1fr))",gap:7,marginBottom:18}}>
          {lista.map(r=>(
            <button key={r.id} onClick={()=>setAbaId(r.id)} style={{background:abaId===r.id?sc.c:sc.bg,color:abaId===r.id?"#fff":sc.c,border:"none",borderRadius:10,padding:"7px 8px",cursor:"pointer",fontWeight:600,fontSize:12,textAlign:"center",lineHeight:1.3}}>{r.nome}</button>
          ))}
        </div>
      )}
      {secao==="massas"&&atual&&(
        <MassaTab
          ing={atual.ing}
          upd={(iid,f,v)=>updIng(atual.id,iid,f,v)}
          rem={(iid)=>remIng(atual.id,iid)}
          add={(ni)=>addIng(atual.id,ni)}
          rid={atual.id}
          cfg={mCfg[atual.id]||{margem:0,emb:0,gpf:200}}
          setCfg={v=>setMCfg(c=>({...c,[atual.id]:v}))}
        />
      )}
      {secao==="recheios"&&atual&&(
        <RecheioTab
          ing={atual.ing}
          upd={(iid,f,v)=>updIng(atual.id,iid,f,v)}
          rem={(iid)=>remIng(atual.id,iid)}
          cfg={rCfg[atual.id]||{margem:0,gpb:140}}
          setCfg={v=>setRCfg(c=>({...c,[atual.id]:v}))}
        />
      )}
      {secao==="combos"&&<ComboTab massas={massas} recheios={recheios} cfg={cCfg} setCfg={setCCfg}/>}
      {secao==="metas"&&<MetasTab massas={massas} recheios={recheios} cfg={mtCfg} setCfg={setMtCfg} gastos={gastos} setGastos={setGastos}/>}
    </div>
  );
}