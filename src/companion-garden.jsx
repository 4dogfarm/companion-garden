import { useState, useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Josefin+Sans:wght@300;400;600&family=Libre+Baskerville:ital@0;1&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bark:#3B2F2F;--soil:#5C4033;--clay:#A0522D;--sage:#7D9B76;
    --dried-herb:#C8B89A;--creek:#8FB8C2;--parchment:#F7F3EC;
    --ink:#2A1F1F;--mist:#EAE6DE;--warn:#C0392B;--good:#4A7A43;
  }
  body{background:var(--parchment);color:var(--ink);font-family:'Libre Baskerville',Georgia,serif;min-height:100vh;}
  .header{background:var(--bark);color:var(--parchment);padding:1.25rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid var(--clay);flex-wrap:wrap;gap:1rem;}
  .header-logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;}
  .header-logo span{color:var(--dried-herb);font-style:italic;}
  .header-sub{font-family:'Josefin Sans',sans-serif;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--dried-herb);opacity:0.75;}
  .header-nav{display:flex;gap:0.4rem;flex-wrap:wrap;}
  .nav-btn{background:transparent;border:1px solid var(--dried-herb);color:var(--dried-herb);font-family:'Josefin Sans',sans-serif;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;padding:0.35rem 0.85rem;cursor:pointer;transition:all 0.2s;border-radius:2px;}
  .nav-btn:hover,.nav-btn.active{background:var(--clay);border-color:var(--clay);color:white;}
  .hero{background:linear-gradient(135deg,var(--soil) 0%,var(--bark) 60%,#2A1F1F 100%);color:var(--parchment);padding:2.5rem 2rem 2rem;text-align:center;position:relative;overflow:hidden;}
  .hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8B89A' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");opacity:0.5;}
  .hero-content{position:relative;z-index:1;max-width:700px;margin:0 auto;}
  .hero h1{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4vw,2.6rem);font-weight:400;line-height:1.2;margin-bottom:0.5rem;}
  .hero h1 em{color:var(--dried-herb);font-style:italic;}
  .hero p{font-family:'Josefin Sans',sans-serif;font-size:0.85rem;letter-spacing:0.05em;color:var(--dried-herb);opacity:0.85;margin-bottom:1.25rem;}
  .search-row{display:flex;gap:0.5rem;max-width:560px;margin:0 auto 0.75rem;}
  .search-input{flex:1;padding:0.7rem 1rem;font-family:'Libre Baskerville',serif;font-size:0.88rem;border:2px solid var(--dried-herb);border-radius:3px;background:rgba(247,243,236,0.1);color:var(--parchment);outline:none;transition:border-color 0.2s;}
  .search-input::placeholder{color:rgba(200,184,154,0.55);}
  .search-input:focus{border-color:var(--sage);}
  .search-btn{padding:0.7rem 1rem;background:var(--sage);color:white;border:none;border-radius:3px;font-family:'Josefin Sans',sans-serif;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:background 0.2s;white-space:nowrap;}
  .search-btn:hover{background:var(--clay);}
  .photo-btn{padding:0.7rem 1rem;background:rgba(255,255,255,0.12);color:var(--parchment);border:1px solid var(--dried-herb);border-radius:3px;font-family:'Josefin Sans',sans-serif;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
  .photo-btn:hover{background:rgba(255,255,255,0.2);}
  .filter-row{display:flex;gap:0.5rem;max-width:560px;margin:0 auto 0.5rem;flex-wrap:wrap;justify-content:center;}
  .filter-select{padding:0.4rem 0.65rem;background:rgba(247,243,236,0.1);border:1px solid var(--dried-herb);color:var(--parchment);font-family:'Josefin Sans',sans-serif;font-size:0.7rem;border-radius:3px;cursor:pointer;outline:none;}
  .filter-select option{background:var(--bark);color:var(--parchment);}
  .cat-row{display:flex;gap:0.35rem;max-width:560px;margin:0 auto;flex-wrap:wrap;justify-content:center;}
  .cat-btn{padding:0.3rem 0.7rem;background:rgba(255,255,255,0.08);border:1px solid rgba(200,184,154,0.4);color:var(--dried-herb);font-family:'Josefin Sans',sans-serif;font-size:0.65rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;border-radius:20px;transition:all 0.2s;}
  .cat-btn:hover,.cat-btn.active{background:var(--sage);border-color:var(--sage);color:white;}
  .free-counter{font-family:'Josefin Sans',sans-serif;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--dried-herb);opacity:0.7;margin-top:0.65rem;}
  .free-counter.urgent{color:#E8A87C;opacity:1;}
  .tabs{display:flex;border-bottom:2px solid var(--mist);background:white;padding:0 1.5rem;overflow-x:auto;}
  .tab{padding:0.9rem 1.1rem;font-family:'Josefin Sans',sans-serif;font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;border:none;background:transparent;color:var(--soil);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all 0.2s;white-space:nowrap;}
  .tab.active{color:var(--clay);border-bottom-color:var(--clay);font-weight:600;}
  .tab:hover:not(.active){color:var(--bark);background:var(--mist);}
  .main{max-width:1100px;margin:0 auto;padding:1.75rem 1.5rem;}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.1rem;}
  .card{background:white;border:1px solid var(--mist);border-radius:4px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
  .card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,47,47,0.12);}
  .card-emoji{font-size:2.75rem;text-align:center;padding:1.1rem 1rem 0.5rem;background:var(--mist);display:block;}
  .card-body{padding:0.85rem 1rem 1rem;}
  .card-name{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:var(--bark);margin-bottom:0.15rem;}
  .card-latin{font-style:italic;font-size:0.7rem;color:var(--clay);margin-bottom:0.45rem;}
  .card-desc{font-size:0.77rem;color:var(--soil);line-height:1.5;margin-bottom:0.6rem;}
  .tag-row{display:flex;flex-wrap:wrap;gap:0.22rem;}
  .tag{font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.05em;text-transform:uppercase;padding:0.15rem 0.4rem;border-radius:2px;}
  .tag-cat{background:#F0EBE0;color:var(--soil);}
  .tag-friend{background:#E8F0E8;color:#4A7A43;}
  .tag-foe{background:#F5E8E8;color:#A05050;}
  .tag-pest{background:#FFF3E0;color:var(--clay);}
  .tag-zone{background:#E8EFF5;color:#3A5A7A;}
  .tag-elev{background:#F0EBF5;color:#6A4A8A;}
  .detail-overlay{position:fixed;inset:0;background:rgba(42,31,31,0.65);z-index:100;display:flex;align-items:flex-start;justify-content:center;padding:1.5rem 1rem;overflow-y:auto;backdrop-filter:blur(2px);}
  .detail-panel{background:var(--parchment);border-radius:6px;max-width:740px;width:100%;overflow:hidden;box-shadow:0 20px 60px rgba(42,31,31,0.3);margin:auto;}
  .detail-header{background:var(--bark);color:var(--parchment);padding:1.4rem 1.75rem;display:flex;align-items:flex-start;gap:1.25rem;}
  .detail-emoji{font-size:3.25rem;flex-shrink:0;}
  .detail-title{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700;line-height:1.1;}
  .detail-latin{font-style:italic;color:var(--dried-herb);font-size:0.8rem;margin-top:0.15rem;}
  .detail-tags{display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.5rem;}
  .detail-close{margin-left:auto;background:transparent;border:1px solid var(--dried-herb);color:var(--dried-herb);width:1.9rem;height:1.9rem;border-radius:50%;cursor:pointer;font-size:0.9rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;}
  .detail-close:hover{background:var(--clay);border-color:var(--clay);color:white;}
  .detail-body{padding:1.4rem 1.75rem;}
  .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;margin-bottom:1.25rem;}
  .detail-box{background:white;border:1px solid var(--mist);border-radius:4px;padding:0.8rem 1rem;}
  .detail-box-label{font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--clay);margin-bottom:0.3rem;}
  .detail-box-val{font-size:0.8rem;color:var(--ink);line-height:1.5;}
  .section-head{font-family:'Josefin Sans',sans-serif;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--clay);margin-bottom:0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--dried-herb);}
  .detail-section{margin-bottom:1.35rem;}
  .companion-list{display:flex;flex-wrap:wrap;gap:0.3rem;}
  .companion-chip{display:flex;align-items:center;gap:0.25rem;padding:0.25rem 0.55rem;border-radius:20px;font-family:'Josefin Sans',sans-serif;font-size:0.68rem;cursor:pointer;transition:opacity 0.2s;}
  .companion-chip:hover{opacity:0.75;}
  .chip-friend{background:#E8F0E8;color:#4A7A43;border:1px solid #C8DEC5;}
  .chip-foe{background:#F5E8E8;color:#8B3A3A;border:1px solid #DEC5C5;}
  .pest-card{background:white;border:1px solid var(--mist);border-radius:4px;padding:0.85rem 1rem;margin-bottom:0.65rem;}
  .pest-name{font-family:'Playfair Display',serif;font-size:0.92rem;font-weight:700;color:var(--bark);margin-bottom:0.18rem;}
  .pest-damage{font-size:0.77rem;color:var(--soil);margin-bottom:0.4rem;font-style:italic;}
  .ul-arrow{list-style:none;}
  .ul-arrow li{font-size:0.77rem;color:var(--ink);padding:0.15rem 0 0.15rem 1rem;position:relative;line-height:1.4;}
  .ul-arrow li::before{content:'→';position:absolute;left:0;color:var(--sage);}
  .care-note{background:white;border-left:3px solid var(--sage);padding:0.7rem 1rem;font-size:0.8rem;color:var(--soil);line-height:1.6;border-radius:0 4px 4px 0;}
  .germ-note{background:#FFFBF0;border-left:3px solid var(--dried-herb);padding:0.7rem 1rem;font-size:0.8rem;color:var(--soil);line-height:1.6;border-radius:0 4px 4px 0;margin-top:0.5rem;}
  .warn-note{background:#FFF5F5;border-left:3px solid var(--warn);padding:0.7rem 1rem;font-size:0.8rem;color:#7A2020;line-height:1.6;border-radius:0 4px 4px 0;margin-top:0.5rem;}
  .diy-note{background:#F0F7F0;border-left:3px solid var(--sage);padding:0.7rem 1rem;font-size:0.8rem;color:#2A5A2A;line-height:1.6;border-radius:0 4px 4px 0;margin-top:0.5rem;}
  .budget-note{background:#FFF8EC;border-left:3px solid var(--clay);padding:0.7rem 1rem;font-size:0.8rem;color:#5C3A10;line-height:1.6;border-radius:0 4px 4px 0;margin-top:0.5rem;}
  .pest-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:1.1rem;}
  .pest-lib-card{background:white;border:1px solid var(--mist);border-radius:4px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
  .pest-lib-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,47,47,0.12);}
  .pest-lib-header{background:var(--mist);padding:0.85rem 1.1rem;display:flex;align-items:center;gap:0.7rem;}
  .pest-emoji{font-size:2.1rem;}
  .pest-lib-name{font-family:'Playfair Display',serif;font-size:0.98rem;font-weight:700;color:var(--bark);}
  .pest-lib-latin{font-style:italic;font-size:0.68rem;color:var(--clay);}
  .pest-lib-body{padding:0.85rem 1.1rem;}
  .damage-label{font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:#A05050;margin-bottom:0.18rem;}
  .damage-desc{font-size:0.77rem;color:var(--soil);margin-bottom:0.55rem;line-height:1.5;}
  .damage-visual{background:#FFF8F0;border:1px solid #F0E0CC;border-radius:3px;padding:0.45rem 0.65rem;font-size:0.71rem;color:var(--clay);margin-bottom:0.6rem;font-style:italic;line-height:1.4;}
  .attract-label{font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--sage);margin-bottom:0.25rem;}
  .attract-chips{display:flex;flex-wrap:wrap;gap:0.22rem;}
  .attract-chip{background:#E8F0E8;color:#4A7A43;font-family:'Josefin Sans',sans-serif;font-size:0.6rem;padding:0.15rem 0.4rem;border-radius:20px;}
  .ben-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:1.1rem;}
  .ben-card{background:white;border:1px solid var(--mist);border-radius:4px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
  .ben-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,47,47,0.12);}
  .ben-header{background:linear-gradient(135deg,#E8F0E8,#D4E8D4);padding:0.95rem 1.1rem;display:flex;align-items:center;gap:0.7rem;}
  .ben-emoji{font-size:2.25rem;}
  .ben-name{font-family:'Playfair Display',serif;font-size:0.98rem;font-weight:700;color:var(--bark);}
  .ben-latin{font-style:italic;font-size:0.68rem;color:var(--soil);}
  .ben-body{padding:0.85rem 1.1rem;}
  .ben-role-label,.ben-eats-label,.ben-attract-label{font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.18rem;}
  .ben-role-label{color:var(--sage);} .ben-eats-label{color:#A05050;} .ben-attract-label{color:var(--clay);}
  .ben-role{font-size:0.77rem;color:var(--ink);margin-bottom:0.6rem;line-height:1.5;font-weight:bold;}
  .ben-eats,.ben-attract{font-size:0.77rem;color:var(--soil);margin-bottom:0.6rem;line-height:1.5;}
  .soil-sub-tabs{display:flex;gap:0.5rem;margin-bottom:1.5rem;flex-wrap:wrap;}
  .soil-sub-tab{padding:0.45rem 0.9rem;font-family:'Josefin Sans',sans-serif;font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;border:1px solid var(--mist);background:white;color:var(--soil);cursor:pointer;border-radius:3px;transition:all 0.2s;}
  .soil-sub-tab:hover,.soil-sub-tab.active{background:var(--clay);color:white;border-color:var(--clay);}
  .soil-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.1rem;}
  .soil-card{background:white;border:1px solid var(--mist);border-radius:4px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
  .soil-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,47,47,0.12);}
  .soil-swatch{height:72px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;}
  .soil-card-body{padding:0.85rem 1.1rem;}
  .soil-card-name{font-family:'Playfair Display',serif;font-size:1.02rem;font-weight:700;color:var(--bark);margin-bottom:0.2rem;}
  .soil-card-feel{font-style:italic;font-size:0.72rem;color:var(--clay);margin-bottom:0.45rem;}
  .soil-card-desc{font-size:0.77rem;color:var(--soil);line-height:1.5;}
  .cc-filters{display:flex;gap:0.4rem;margin-bottom:1.25rem;flex-wrap:wrap;align-items:center;}
  .cc-filter-label{font-family:'Josefin Sans',sans-serif;font-size:0.68rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--soil);}
  .cc-filter{padding:0.35rem 0.75rem;font-family:'Josefin Sans',sans-serif;font-size:0.67rem;letter-spacing:0.05em;text-transform:uppercase;border:1px solid var(--mist);background:white;color:var(--soil);cursor:pointer;border-radius:20px;transition:all 0.2s;}
  .cc-filter:hover,.cc-filter.active{background:var(--sage);color:white;border-color:var(--sage);}
  .cc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:1.1rem;}
  .cc-card{background:white;border:1px solid var(--mist);border-radius:4px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
  .cc-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,47,47,0.12);}
  .cc-header{padding:0.85rem 1.1rem;display:flex;align-items:center;gap:0.7rem;background:var(--mist);}
  .cc-emoji{font-size:2rem;}
  .cc-name{font-family:'Playfair Display',serif;font-size:0.98rem;font-weight:700;color:var(--bark);}
  .cc-season-tags{display:flex;gap:0.22rem;flex-wrap:wrap;margin-top:0.2rem;}
  .cc-season{font-family:'Josefin Sans',sans-serif;font-size:0.58rem;letter-spacing:0.06em;text-transform:uppercase;padding:0.12rem 0.38rem;border-radius:20px;}
  .season-spring{background:#E8F5E8;color:#2E7D32;} .season-summer{background:#FFF8E1;color:#F57F17;}
  .season-fall{background:#FFF3E0;color:#E65100;} .season-winter{background:#E3F2FD;color:#1565C0;}
  .cc-body{padding:0 1.1rem 1rem;}
  .cc-role-chips{display:flex;gap:0.22rem;flex-wrap:wrap;margin-bottom:0.6rem;padding-top:0.85rem;}
  .cc-role-chip{font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.04em;padding:0.18rem 0.45rem;border-radius:2px;}
  .role-nitrogen{background:#E8F0E8;color:#2E7D32;} .role-suppress{background:#F5F0FF;color:#6A1B9A;}
  .role-biomass{background:#FFF8E1;color:#F57F17;} .role-compaction{background:#FCE4EC;color:#880E4F;}
  .role-erosion{background:#E0F7FA;color:#00695C;} .role-pollinator{background:#FFF9C4;color:#F9A825;}
  .cc-desc{font-size:0.77rem;color:var(--soil);line-height:1.5;}
  .diagnose-wrap{max-width:600px;margin:0 auto;}
  .diagnose-card{background:white;border:1px solid var(--mist);border-radius:6px;padding:1.6rem;margin-bottom:1rem;}
  .diagnose-q{font-family:'Playfair Display',serif;font-size:1.15rem;color:var(--bark);margin-bottom:0.3rem;}
  .diagnose-hint{font-size:0.78rem;color:var(--soil);font-style:italic;margin-bottom:1rem;line-height:1.5;}
  .diagnose-options{display:flex;flex-direction:column;gap:0.45rem;}
  .diagnose-opt{padding:0.6rem 0.9rem;background:var(--mist);border:1px solid var(--dried-herb);border-radius:3px;font-family:'Josefin Sans',sans-serif;font-size:0.76rem;cursor:pointer;text-align:left;transition:all 0.2s;color:var(--ink);}
  .diagnose-opt:hover{background:var(--clay);color:white;border-color:var(--clay);}
  .diagnose-result{background:white;border:2px solid var(--sage);border-radius:6px;padding:1.6rem;}
  .diagnose-result-title{font-family:'Playfair Display',serif;font-size:1.35rem;color:var(--bark);margin-bottom:0.2rem;}
  .diagnose-result-sub{font-size:0.78rem;color:var(--clay);font-style:italic;margin-bottom:0.9rem;}
  .diagnose-actions{display:flex;gap:0.5rem;margin-top:1.1rem;flex-wrap:wrap;}
  .diagnose-restart{padding:0.5rem 1rem;background:transparent;border:1px solid var(--clay);color:var(--clay);font-family:'Josefin Sans',sans-serif;font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:all 0.2s;}
  .diagnose-restart:hover{background:var(--clay);color:white;}
  .reclaim-section{max-width:780px;}
  .reclaim-phase{background:white;border:1px solid var(--mist);border-radius:6px;overflow:hidden;margin-bottom:1.1rem;}
  .reclaim-phase-header{background:var(--bark);color:var(--parchment);padding:1rem 1.4rem;display:flex;align-items:center;gap:1rem;cursor:pointer;}
  .reclaim-phase-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--dried-herb);line-height:1;flex-shrink:0;}
  .reclaim-phase-title{font-family:'Playfair Display',serif;font-size:1.1rem;}
  .reclaim-phase-sub{font-family:'Josefin Sans',sans-serif;font-size:0.68rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--dried-herb);opacity:0.8;margin-top:0.15rem;}
  .reclaim-phase-body{padding:1.2rem 1.4rem;}
  .reclaim-steps{list-style:none;}
  .reclaim-steps li{font-size:0.82rem;padding:0.35rem 0 0.35rem 1.2rem;position:relative;color:var(--ink);line-height:1.5;border-bottom:1px solid var(--mist);}
  .reclaim-steps li:last-child{border-bottom:none;}
  .reclaim-steps li::before{content:'✦';position:absolute;left:0;color:var(--sage);font-size:0.6rem;top:0.55rem;}
  .photo-upload-area{border:2px dashed var(--dried-herb);border-radius:6px;padding:2.5rem;text-align:center;cursor:pointer;transition:all 0.2s;background:white;margin-bottom:1rem;}
  .photo-upload-area:hover{border-color:var(--sage);background:#F0F7F0;}
  .photo-upload-icon{font-size:2.5rem;margin-bottom:0.75rem;}
  .photo-upload-text{font-family:'Josefin Sans',sans-serif;font-size:0.8rem;letter-spacing:0.06em;color:var(--soil);}
  .photo-upload-sub{font-size:0.72rem;color:var(--soil);opacity:0.6;margin-top:0.35rem;font-style:italic;}
  .ai-result{background:white;border:1px solid var(--mist);border-radius:6px;padding:1.4rem;}
  .ai-result-label{font-family:'Josefin Sans',sans-serif;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--sage);margin-bottom:0.5rem;}
  .ai-loading{text-align:center;padding:2rem;color:var(--soil);font-style:italic;font-size:0.85rem;}
  .ai-loading-dot{animation:pulse 1.4s ease-in-out infinite;}
  @keyframes pulse{0%,100%{opacity:0.4;}50%{opacity:1;}}
  .paywall{position:fixed;inset:0;background:rgba(42,31,31,0.88);z-index:200;display:flex;align-items:center;justify-content:center;padding:2rem;backdrop-filter:blur(4px);}
  .paywall-box{background:var(--parchment);border-radius:6px;max-width:480px;width:100%;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,0.4);}
  .paywall-top{background:var(--bark);padding:1.75rem;text-align:center;color:var(--parchment);border-bottom:3px solid var(--clay);}
  .paywall-top h2{font-family:'Playfair Display',serif;font-size:1.5rem;margin-bottom:0.4rem;}
  .paywall-top p{font-family:'Josefin Sans',sans-serif;font-size:0.78rem;letter-spacing:0.05em;color:var(--dried-herb);opacity:0.85;}
  .paywall-body{padding:1.5rem 1.75rem;}
  .paywall-features{list-style:none;margin-bottom:1.25rem;}
  .paywall-features li{font-size:0.82rem;padding:0.32rem 0 0.32rem 1.4rem;color:var(--soil);position:relative;line-height:1.4;}
  .paywall-features li::before{content:'✦';position:absolute;left:0;color:var(--sage);font-size:0.62rem;top:0.48rem;}
  .paywall-plans{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1rem;}
  .paywall-plan{border:2px solid var(--mist);border-radius:4px;padding:1rem;text-align:center;cursor:pointer;transition:all 0.2s;position:relative;}
  .paywall-plan:hover,.paywall-plan.selected{border-color:var(--clay);background:#FFF5EE;}
  .paywall-plan-badge{position:absolute;top:-0.6rem;left:50%;transform:translateX(-50%);background:var(--sage);color:white;font-family:'Josefin Sans',sans-serif;font-size:0.6rem;letter-spacing:0.06em;text-transform:uppercase;padding:0.15rem 0.5rem;border-radius:20px;white-space:nowrap;}
  .paywall-plan-price{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:var(--bark);}
  .paywall-plan-period{font-family:'Josefin Sans',sans-serif;font-size:0.65rem;letter-spacing:0.06em;color:var(--soil);}
  .paywall-plan-save{font-family:'Josefin Sans',sans-serif;font-size:0.65rem;color:var(--sage);margin-top:0.2rem;}
  .paywall-cta{width:100%;padding:0.85rem;background:var(--clay);color:white;border:none;border-radius:3px;font-family:'Josefin Sans',sans-serif;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:background 0.2s;margin-bottom:0.6rem;}
  .paywall-cta:hover{background:var(--soil);}
  .paywall-dismiss{display:block;text-align:center;font-family:'Josefin Sans',sans-serif;font-size:0.68rem;letter-spacing:0.06em;color:var(--soil);opacity:0.5;cursor:pointer;background:none;border:none;width:100%;padding:0.4rem;}
  .paywall-dismiss:hover{opacity:1;}
  .empty{text-align:center;padding:3.5rem 2rem;color:var(--soil);}
  .empty-icon{font-size:2.75rem;margin-bottom:0.85rem;}
  .empty h3{font-family:'Playfair Display',serif;font-size:1.2rem;margin-bottom:0.4rem;}
  .empty p{font-size:0.8rem;opacity:0.65;}
  .empty-ai-btn{margin-top:1rem;padding:0.6rem 1.25rem;background:var(--sage);color:white;border:none;border-radius:3px;font-family:'Josefin Sans',sans-serif;font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;}
  .empty-ai-btn:hover{background:var(--clay);}
  @media(max-width:600px){.header{padding:1rem;}.main{padding:1rem;}.detail-grid{grid-template-columns:1fr;}.paywall-plans{grid-template-columns:1fr;}}
`;

const PLANTS = [
  {id:"tomato",cat:"Vegetable",name:"Tomato",latin:"Solanum lycopersicum",emoji:"🍅",desc:"The garden workhorse. Needs warmth, consistent water, and something to climb.",zones:"3–11 (annual)",regions:["Pacific Northwest","Southwest","Mountain West","Midwest","Southeast","Northeast"],elev:"Best below 7,000 ft. Short-season varieties at elevation. Wall-o-waters help.",elevBands:["low","mid"],light:"Full sun (8+ hrs)",soil:"Well-draining, fertile, slightly acidic (pH 6.0–6.8)",germ:"Sow indoors 6–8 weeks before last frost. 70–80°F soil temp. Transplant after all frost risk passes.",care:"Water deeply and consistently — irregular watering causes blossom end rot. Mulch heavily. Stake early. Pinch suckers on indeterminates. Feed every 2–3 weeks once flowering.",diy:"Compost tea as fertilizer. Crushed eggshells at base prevent blossom end rot. Epsom salt foliar spray for magnesium.",budget:"Start from seed — 50x cheaper than transplants. Save seed from open-pollinated varieties.",friends:["basil","carrot","marigold","borage","parsley","garlic"],foes:["fennel","brassica","corn"],pests:["aphid","hornworm","flea-beetle","leafhopper"]},
  {id:"pepper",cat:"Vegetable",name:"Pepper",latin:"Capsicum annuum",emoji:"🫑",desc:"Loves heat and hates cold feet. More heat-demanding than tomatoes.",zones:"1–11 (annual)",regions:["Southwest","Southeast","Pacific Northwest","Mountain West","Midwest","Northeast"],elev:"Challenging above 6,500 ft. Black plastic mulch and wall-o-waters essential.",elevBands:["low","mid"],light:"Full sun (8+ hrs)",soil:"Well-draining, warm, moderately fertile (pH 6.0–6.8)",germ:"Start indoors 10–12 weeks before last frost. Need 80–85°F to germinate. Heat mat essential.",care:"Don't rush transplanting — cold soil stunts permanently. Consistent moisture. Plant against thermal mass at elevation.",diy:"Compost tea for feeding. Mulch with straw to retain soil warmth.",budget:"Start from seed. Overwinter favorite varieties as houseplants.",friends:["basil","carrot","marigold","rosemary","parsley"],foes:["fennel","brassica"],pests:["aphid","flea-beetle","broad-mite","leafhopper"]},
  {id:"cucumber",cat:"Vegetable",name:"Cucumber",latin:"Cucumis sativus",emoji:"🥒",desc:"Heavy drinker. Needs airflow or you'll fight powdery mildew all season. Worth trellising.",zones:"4–11 (annual)",regions:["All US regions"],elev:"Tricky above 6,000 ft. Short-season varieties essential.",elevBands:["low","mid"],light:"Full sun (6–8 hrs)",soil:"Well-draining, warm, rich in organic matter (pH 6.0–7.0)",germ:"Direct sow after soil reaches 65°F+. Or start indoors 3 weeks before transplant.",care:"Mulch heavily. Water at base. Harvest frequently — leaving overripe fruit stops production.",diy:"Milk spray (1:9 milk to water) for powdery mildew.",budget:"Direct sow — cucumbers hate transplanting anyway. Save seed from open-pollinated varieties.",friends:["marigold","nasturtium","radish","sunflower","dill"],foes:["sage","fennel"],pests:["cucumber-beetle","aphid","leafhopper","spider-mite"]},
  {id:"squash",cat:"Vegetable",name:"Squash / Zucchini",latin:"Cucurbita spp.",emoji:"🥬",desc:"Prolific and hungry. Summer squash produces faster than you can eat it.",zones:"3–11 (annual)",regions:["All US regions"],elev:"Needs full season. At elevation choose bush varieties and short-season types.",elevBands:["low","mid"],light:"Full sun (8+ hrs)",soil:"Rich, well-draining, deeply amended (pH 6.0–7.0)",germ:"Direct sow after last frost. 2–3 seeds per hill, thin to strongest.",care:"Plant in hills with a buried compost pocket. Water at base. Check for squash vine borer weekly.",diy:"Compost pocket planting — bury a bucket of compost and plant on top.",budget:"One seed packet produces more zucchini than you'll want.",friends:["nasturtium","marigold","corn","beans"],foes:["potato","fennel"],pests:["squash-vine-borer","squash-bug","cucumber-beetle","aphid"]},
  {id:"bean",cat:"Vegetable",name:"Bean",latin:"Phaseolus vulgaris",emoji:"🫘",desc:"Nitrogen fixer. Low maintenance. Bush types need no support; pole types produce longer.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Productive at elevation. Bush types best in short seasons.",elevBands:["low","mid","high"],light:"Full sun (6+ hrs)",soil:"Average, well-draining — don't over-fertilize with nitrogen (pH 6.0–7.0)",germ:"Direct sow after last frost, 1 inch deep. Don't start indoors.",care:"Barely water once established. Don't fertilize with nitrogen. Pick regularly to keep producing.",diy:"Save seed easily — let pods dry on vine.",budget:"One of the cheapest crops to grow. Seed saves well for years.",friends:["carrot","cucumber","marigold","rosemary","squash","corn"],foes:["onion","garlic","fennel"],pests:["aphid","bean-beetle","spider-mite"]},
  {id:"pea",cat:"Vegetable",name:"Pea",latin:"Pisum sativum",emoji:"🫛",desc:"Cool-season nitrogen fixer. Plant early — they hate heat.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Excellent at elevation — thrives in cool conditions.",elevBands:["low","mid","high"],light:"Full sun to light shade",soil:"Well-draining, cool, moderately fertile (pH 6.0–7.5)",germ:"Direct sow as soon as soil can be worked. Inoculate with rhizobium.",care:"Needs trellis. Stop producing when temps hit 80°F. Succession sow every 2 weeks.",diy:"Rhizobium inoculant dramatically improves nitrogen fixation.",budget:"Easy to save seed. Cheap to buy.",friends:["carrot","radish","mint","spinach","turnip"],foes:["onion","garlic","fennel"],pests:["aphid","powdery-mildew"]},
  {id:"corn",cat:"Vegetable",name:"Corn",latin:"Zea mays",emoji:"🌽",desc:"Needs a block, not a row — wind pollinated. Part of the Three Sisters.",zones:"3–11 (annual)",regions:["All US regions"],elev:"Needs long warm season. Challenging above 6,500 ft.",elevBands:["low","mid"],light:"Full sun",soil:"Rich, deep, well-draining (pH 5.8–6.8)",germ:"Direct sow after last frost in soil above 60°F. Plant in blocks of at least 4 rows.",care:"Heavy feeder — side-dress with nitrogen mid-season. Watch ears for earworm.",diy:"Mineral oil dropped in each silk prevents corn earworm without spraying.",budget:"Three Sisters planting maximizes space and self-fertilizes.",friends:["bean","squash","cucumber","sunflower"],foes:["tomato","fennel"],pests:["corn-earworm","aphid","cucumber-beetle"]},
  {id:"potato",cat:"Vegetable",name:"Potato",latin:"Solanum tuberosum",emoji:"🥔",desc:"Heavy producer if hilled properly. Rotate beds every year.",zones:"3–10 (annual)",regions:["All US regions"],elev:"Excellent at elevation. Cool nights improve yields.",elevBands:["low","mid","high"],light:"Full sun",soil:"Loose, deep, slightly acidic (pH 4.8–5.5). Avoid liming.",germ:"Plant certified seed potatoes after last frost. Cut to pieces with 2–3 eyes, cure overnight.",care:"Hill up as vines grow. Stop watering 2 weeks before harvest. Rotate beds every year.",diy:"Save your own seed potatoes from healthy plants.",budget:"A 5-lb bag of seed potatoes yields 25–50 lbs.",friends:["horseradish","beans","marigold","nasturtium"],foes:["tomato","sunflower","fennel","cucumber"],pests:["colorado-potato-beetle","aphid","wireworm","late-blight"]},
  {id:"lettuce",cat:"Vegetable",name:"Lettuce",latin:"Lactuca sativa",emoji:"🥬",desc:"Cool-season speed crop. Harvest outer leaves for continuous production.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Thrives at elevation — cool nights extend the season.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Moist, fertile, well-draining (pH 6.0–7.0)",germ:"Direct sow or transplant. Needs light to germinate — surface sow.",care:"Keep moist. Harvest outer leaves continuously. Succession sow every 2 weeks.",diy:"Cut-and-come-again harvesting — cut 1 inch above crown and it regrows.",budget:"Seed is extremely cheap. Can grow in almost any container.",friends:["carrot","radish","strawberry","chive","dill"],foes:["fennel","celery"],pests:["aphid","slugs","leafhopper"]},
  {id:"kale",cat:"Vegetable",name:"Kale",latin:"Brassica oleracea var. sabellica",emoji:"🥦",desc:"Frost makes it sweeter. Second-year kale gets aphid pressure fast — worth rotating.",zones:"1–9",regions:["Pacific Northwest","Mountain West","Midwest","Northeast","Southeast"],elev:"Thrives at elevation. Cold-hardy to single digits with protection.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Rich, well-draining (pH 6.5–7.5)",germ:"Start indoors 4–6 weeks before transplant or direct sow.",care:"Remove second-year plants early — aphid magnets. Harvest outer leaves. Feed every 3–4 weeks.",diy:"Fermented plant juice from nettles as fertilizer.",budget:"Incredibly productive per dollar. Perennial in mild climates.",friends:["marigold","dill","nasturtium","onion"],foes:["tomato","strawberry","fennel"],pests:["aphid","flea-beetle","caterpillar","harlequin-bug","leafhopper"]},
  {id:"brassica",cat:"Vegetable",name:"Brassicas (Broccoli / Cabbage)",latin:"Brassica spp.",emoji:"🥦",desc:"Heavy feeders and heavy pest magnets. Worth the trouble. Row cover from day one.",zones:"1–9",regions:["Pacific Northwest","Mountain West","Midwest","Northeast","Southeast"],elev:"Many love cool high-elevation conditions.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Rich, slightly alkaline (pH 6.5–7.5)",germ:"Start indoors 4–6 weeks before transplant. Tolerates frost.",care:"Feed heavily. Rotate beds yearly. Check leaf undersides daily.",diy:"Fermented nettle spray as fertilizer. Soap spray for aphids.",budget:"Fall brassica crops from direct sowing are cheap and productive.",friends:["marigold","dill","nasturtium","onion","celery"],foes:["tomato","pepper","strawberry","fennel"],pests:["aphid","flea-beetle","harlequin-bug","caterpillar","leafhopper"]},
  {id:"carrot",cat:"Vegetable",name:"Carrot",latin:"Daucus carota",emoji:"🥕",desc:"Patient and rewarding. Cooler conditions improve sweetness.",zones:"3–10",regions:["All US regions"],elev:"Excellent at elevation — cool soil improves flavor.",elevBands:["low","mid","high"],light:"Full sun (6+ hrs)",soil:"Deep, loose, stone-free (pH 6.0–6.8). Clay = forked, stunted.",germ:"Direct sow only. Keep seed bed moist until germination. Thin to 2–3 inches.",care:"Low nitrogen — causes forking. Harvest after frost for sweetest flavor.",diy:"Cover seed bed with burlap until germination to retain moisture.",budget:"Direct sow is extremely cheap. Easy to save seed.",friends:["tomato","rosemary","sage","onion","leek"],foes:["dill","fennel"],pests:["carrot-fly","aphid"]},
  {id:"onion",cat:"Vegetable",name:"Onion / Garlic / Leek",latin:"Allium spp.",emoji:"🧅",desc:"Pest repellent throughout the garden. Plant near most crops to deter insects.",zones:"3–9",regions:["All US regions"],elev:"Grows well at all elevations. Garlic overwinters beautifully.",elevBands:["low","mid","high"],light:"Full sun",soil:"Well-draining, loose, fertile (pH 6.0–7.0)",germ:"Garlic: plant cloves in fall. Onion: start seeds indoors 10–12 weeks before transplant.",care:"Keep weed-free. Garlic: cure harvested bulbs 4–6 weeks.",diy:"Garlic spray as insect repellent throughout garden.",budget:"Garlic pays for itself. Save your own seed garlic each year.",friends:["carrot","tomato","pepper","lettuce","beet"],foes:["bean","pea","asparagus"],pests:["onion-fly","thrips"]},
  {id:"beet",cat:"Vegetable",name:"Beet",latin:"Beta vulgaris",emoji:"🫀",desc:"Both root and greens are edible. Fast growing.",zones:"2–10",regions:["All US regions"],elev:"Good at elevation. Cool temps improve sweetness.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Deep, loose, well-draining (pH 6.0–7.0)",germ:"Direct sow — soak seeds overnight for faster germination. Thin to 3 inches.",care:"Thin early or roots won't size up. Harvest greens throughout season.",diy:"Save seed easily from second-year plants.",budget:"High yield in small space. Greens are a free bonus harvest.",friends:["brassica","lettuce","onion"],foes:["bean","spinach"],pests:["aphid","leafminer"]},
  {id:"radish",cat:"Vegetable",name:"Radish",latin:"Raphanus sativus",emoji:"🌶️",desc:"Fastest crop in the garden. Excellent trap crop for flea beetles.",zones:"2–10 (annual)",regions:["All US regions"],elev:"Excellent at elevation in cool conditions.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Loose, well-draining, average fertility (pH 6.0–7.0)",germ:"Direct sow any time soil is workable. Germinates in 3–5 days. Succession sow every 2 weeks.",care:"Harvest promptly or they become woody.",diy:"Daikon radish as free cover crop and compaction breaker.",budget:"Cheapest crop to grow.",friends:["carrot","cucumber","brassica","nasturtium","pea"],foes:["hyssop"],pests:["flea-beetle","aphid"]},
  {id:"eggplant",cat:"Vegetable",name:"Eggplant",latin:"Solanum melongena",emoji:"🍆",desc:"Heat-loving nightshade. More demanding than peppers. Beautiful plant worth growing.",zones:"5–12 (annual)",regions:["Southeast","Southwest","Midwest"],elev:"Challenging above 5,500 ft.",elevBands:["low","mid"],light:"Full sun (8+ hrs)",soil:"Rich, well-draining, warm (pH 5.5–6.5)",germ:"Start indoors 8–10 weeks before last frost. 80–85°F for germination.",care:"Needs heat. Pair with reflective mulch. Stake heavy fruiting varieties.",diy:"Compost tea for heavy feeding demands.",budget:"Start from seed — transplants are expensive.",friends:["basil","marigold","pepper","thyme"],foes:["fennel"],pests:["aphid","flea-beetle","colorado-potato-beetle","spider-mite"]},
  {id:"spinach",cat:"Vegetable",name:"Spinach",latin:"Spinacia oleracea",emoji:"🌿",desc:"Fast and nutritious. Cool season only. Bolts quickly in heat.",zones:"2–9 (annual)",regions:["All US regions"],elev:"Excellent at elevation — bolt-resistant in cool conditions.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Fertile, moist, slightly alkaline (pH 6.5–7.5)",germ:"Direct sow in cool soil.",care:"Harvest outer leaves. Bolt at first sign of heat.",diy:"Grow in containers near the door for quick harvests.",budget:"Fast crop with high yield per square foot.",friends:["strawberry","pea","bean","celery"],foes:["fennel"],pests:["aphid","leafminer"]},
  // HERBS
  {id:"basil",cat:"Herb",name:"Basil",latin:"Ocimum basilicum",emoji:"🌿",desc:"Repels aphids and whiteflies. Improves flavor of nearby tomatoes. Hates cold.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Fine at most elevations after frost. Bolts faster at high elevation heat.",elevBands:["low","mid","high"],light:"Full sun (6–8 hrs)",soil:"Moist, well-draining, fertile (pH 6.0–7.0)",germ:"Start indoors 4–6 weeks before last frost. Needs 70°F+ to germinate.",care:"Pinch flower heads the moment they form. Water at the base. Harvest from the top down.",diy:"Dry or freeze excess for winter. Make pesto in bulk.",budget:"One plant produces abundantly. Start from seed.",friends:["tomato","pepper","oregano"],foes:["sage","fennel"],pests:["aphid"]},
  {id:"oregano",cat:"Herb",name:"Oregano",latin:"Origanum vulgare",emoji:"🌱",desc:"Perennial herb that repels aphids and cabbage moth. Thrives on neglect.",zones:"4–10",regions:["All US regions"],elev:"Excellent at elevation. Drought-tolerant once established.",elevBands:["low","mid","high"],light:"Full sun",soil:"Poor to average, well-draining (pH 6.0–8.0)",germ:"Start from cuttings or divisions. Or direct sow at 65°F.",care:"Cut back hard after flowering to keep productive.",diy:"Dry bunches for winter use. Oregano oil has antifungal properties.",budget:"Perennial investment — one plant lasts years.",friends:["tomato","pepper","brassica"],foes:[],pests:[]},
  {id:"thyme",cat:"Herb",name:"Thyme",latin:"Thymus vulgaris",emoji:"🌱",desc:"Perennial groundcover that repels cabbage worm and whitefly.",zones:"4–9",regions:["All US regions"],elev:"Hardy at elevation. Excellent in rocky, dry soil.",elevBands:["low","mid","high"],light:"Full sun",soil:"Sandy, well-draining, lean (pH 6.0–8.0)",germ:"Start from seed or cuttings. Slow from seed — 14–28 days at 70°F.",care:"Trim after flowering. Divide every 2–3 years.",diy:"Thyme tea as antifungal soil drench.",budget:"Perennial. One plant spreads over years.",friends:["brassica","tomato","eggplant","strawberry"],foes:[],pests:[]},
  {id:"sage",cat:"Herb",name:"Sage",latin:"Salvia officinalis",emoji:"🌿",desc:"Perennial that repels cabbage moth, carrot fly, and flea beetles.",zones:"4–8",regions:["All US regions"],elev:"Excellent at elevation. Drought tolerant and cold hardy.",elevBands:["low","mid","high"],light:"Full sun",soil:"Well-draining, lean, slightly alkaline (pH 6.0–7.0)",germ:"Start from cuttings or seed. Direct sow in spring at 60–70°F.",care:"Prune after flowering. Replace every 3–4 years when woody.",diy:"Sage smudge bundles. Sage-infused vinegar as cleaning spray.",budget:"Perennial. Propagate from cuttings freely.",friends:["carrot","brassica","rosemary","tomato"],foes:["basil","cucumber"],pests:[]},
  {id:"mint",cat:"Herb",name:"Mint",latin:"Mentha spp.",emoji:"🌿",desc:"Vigorous pest repellent. Repels aphids, ants, flea beetles. Contain it or it takes over.",zones:"3–11",regions:["All US regions"],elev:"Grows vigorously at most elevations.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Moist, fertile (pH 6.0–7.0)",germ:"Start from divisions or cuttings.",care:"Grow in buried containers. Cut back before flowering.",diy:"Mint spray as aphid and ant repellent.",budget:"Free once you have a start — divisions spread endlessly.",friends:["brassica","tomato","pea"],foes:["parsley"],pests:[]},
  {id:"chamomile",cat:"Herb",name:"Chamomile",latin:"Matricaria chamomilla",emoji:"🌼",desc:"Accumulates calcium and potassium. Attracts beneficial insects.",zones:"2–9 (annual/perennial)",regions:["All US regions"],elev:"Self-seeds reliably even at elevation.",elevBands:["low","mid","high"],light:"Full sun to light shade",soil:"Average, well-draining (pH 5.6–7.5)",germ:"Direct sow on soil surface — needs light to germinate.",care:"Self-seeds prolifically once established.",diy:"Chamomile tea as antifungal damping-off preventive for seedlings.",budget:"Direct sow is nearly free. Self-seeding means one purchase lasts indefinitely.",friends:["brassica","onion","cucumber","beans"],foes:[],pests:[]},
  {id:"calendula",cat:"Herb",name:"Calendula",latin:"Calendula officinalis",emoji:"🟠",desc:"Repels whitefly and asparagus beetle. Attracts beneficials. Edible and medicinal flowers.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Thrives at elevation. Self-seeds prolifically.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Average to poor, well-draining (pH 5.5–7.0)",germ:"Direct sow after last frost or start indoors 4–6 weeks early.",care:"Deadhead for continuous bloom. Harvest flowers for salves and teas.",diy:"Calendula-infused oil as the base for salves, lip balm, and skin treatments.",budget:"Self-seeding annual — buy once.",friends:["tomato","carrot","asparagus"],foes:[],pests:[]},
  {id:"cilantro",cat:"Herb",name:"Cilantro / Coriander",latin:"Coriandrum sativum",emoji:"🌿",desc:"Attracts beneficial insects when in flower. Bolts fast — sow in succession.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Prefers cool conditions. Excellent at elevation in spring and fall.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Well-draining, average fertility (pH 6.0–7.0)",germ:"Direct sow every 2–3 weeks for continuous harvest.",care:"Let some bolt to flower — that's when it attracts the most beneficials.",diy:"Save coriander seed for cooking and next year's planting.",budget:"Self-seeding once established.",friends:["dill","brassica","tomato","spinach"],foes:["fennel"],pests:["aphid"]},
  {id:"parsley",cat:"Herb",name:"Parsley",latin:"Petroselinum crispum",emoji:"🌿",desc:"Biennial that hosts black swallowtail butterfly larvae. Host plant and herb simultaneously.",zones:"2–10",regions:["All US regions"],elev:"Grows well at elevation.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Moist, rich, well-draining (pH 6.0–7.0)",germ:"Soak seed 24 hours. Start indoors 8–10 weeks before last frost.",care:"Harvest outer stems. Leave some to flower in year two for beneficials.",diy:"Parsley tea as vitamin-rich garden tonic.",budget:"Biennial — one planting gives two seasons.",friends:["tomato","asparagus","chive","carrot"],foes:["mint","onion"],pests:["aphid","carrot-fly"]},
  {id:"dill",cat:"Herb",name:"Dill",latin:"Anethum graveolens",emoji:"🪴",desc:"Attracts parasitic wasps and hoverflies. Let it bolt near brassicas.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Direct sow works well even at elevation. Self-seeds freely.",elevBands:["low","mid","high"],light:"Full sun",soil:"Well-draining, slightly acidic (pH 5.8–6.5)",germ:"Direct sow — doesn't transplant well. Succession sow every 3–4 weeks.",care:"Thin to 12 inches. Let some flower for beneficial insects.",diy:"Harvest seed heads for dill seed. Infuse vinegar.",budget:"Self-seeding annual. Direct sow is nearly free.",friends:["cucumber","brassica","lettuce"],foes:["carrot","tomato","fennel"],pests:["aphid"]},
  {id:"yarrow",cat:"Herb",name:"Yarrow",latin:"Achillea millefolium",emoji:"⚪",desc:"One of the best beneficial insect plants. Attracts ladybugs, hoverflies, parasitic wasps.",zones:"3–9",regions:["All US regions"],elev:"Excellent at elevation. Native to mountain meadows.",elevBands:["low","mid","high"],light:"Full sun",soil:"Poor to average, well-draining (pH 5.5–7.0)",germ:"Start from division or seed indoors 6–8 weeks early. Surface sow.",care:"Cut back after bloom. Divide every 2–3 years.",diy:"Yarrow tea as compost activator. Yarrow poultice for wounds.",budget:"Perennial. Spreads freely once established — divisions are free.",friends:["most vegetables","herbs"],foes:[],pests:[]},
  {id:"lavender",cat:"Herb",name:"Lavender",latin:"Lavandula spp.",emoji:"💜",desc:"Drought-tolerant, deer-resistant, pollinator magnet. Most low-maintenance plant on this list.",zones:"5–9 perennial / 2–4 annual",regions:["Pacific Northwest","Southwest","Mountain West","Northeast"],elev:"Thrives in dry high-elevation climates.",elevBands:["low","mid","high"],light:"Full sun (6–8 hrs)",soil:"Sandy, alkaline, very well-draining — wet feet kill it (pH 6.5–8.0)",germ:"Start from cuttings — seed germination is slow and unreliable.",care:"Cut back one-third after bloom — never into old wood. Mulch with gravel.",diy:"Dried lavender sachets. Lavender-infused oil.",budget:"Perennial. Propagate from cuttings freely.",friends:["rosemary","sage","tomato","brassica"],foes:[],pests:[]},
  {id:"rosemary",cat:"Herb",name:"Rosemary",latin:"Salvia rosmarinus",emoji:"🌱",desc:"Drought-tolerant perennial. Repels carrot fly and bean beetles.",zones:"7–11 perennial / 6 with protection",regions:["Pacific Northwest","Southwest","Mountain West","Southeast"],elev:"Struggles with wet winters at high elevation.",elevBands:["low","mid"],light:"Full sun (6–8 hrs)",soil:"Sandy, well-draining, lean (pH 6.0–8.0). Hates wet soil.",germ:"Better from cuttings. Seed is slow.",care:"Don't overwater. Prune after flowering. Plant against south-facing wall in marginal zones.",diy:"Rosemary infused oil and vinegar. Rosemary spray as insect repellent.",budget:"Perennial once established.",friends:["carrot","pepper","brassica","sage","lavender"],foes:[],pests:[]},
  {id:"borage",cat:"Herb",name:"Borage",latin:"Borago officinalis",emoji:"🔵",desc:"Deters tomato hornworm. Blue flowers attract pollinators constantly. Self-seeds prolifically.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Thrives at elevation. Self-seeds reliably.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Average to poor, well-draining (pH 6.0–7.0)",germ:"Direct sow after frost. Taproot hates transplanting.",care:"Plant it and leave it. Edible flowers taste like cucumber.",diy:"Edible flowers in salads and ice cubes.",budget:"Buy once, self-seeds indefinitely.",friends:["tomato","strawberry","brassica","cucumber"],foes:[],pests:[]},
  {id:"comfrey",cat:"Herb",name:"Comfrey",latin:"Symphytum officinale",emoji:"🌿",desc:"Dynamic nutrient accumulator. Deep roots mine minerals unavailable to other plants.",zones:"3–9",regions:["All US regions"],elev:"Hardy at most elevations.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Any soil — deep taproots reach beyond topsoil.",germ:"Plant root divisions. Seed is unreliable.",care:"Cut back 2–4 times per season and leave as mulch.",diy:"Comfrey liquid fertilizer: fill bucket with leaves, weigh down, fill with water, steep 4–6 weeks. Dilute 1:10.",budget:"One plant multiplies indefinitely via root divisions. Free fertility.",friends:["fruit trees","tomato","potato"],foes:[],pests:[]},
  {id:"echinacea",cat:"Herb",name:"Echinacea / Coneflower",latin:"Echinacea purpurea",emoji:"🌸",desc:"Native perennial medicinal plant. Exceptional pollinator and beneficial insect attractor.",zones:"3–9",regions:["All US regions"],elev:"Native to prairies — adapts well at elevation.",elevBands:["low","mid","high"],light:"Full sun to light shade",soil:"Average to poor, well-draining (pH 6.0–7.0)",germ:"Cold stratify seeds 4–8 weeks, then start indoors. Or direct sow in fall.",care:"Leave seed heads for birds in winter. Divide every 3–4 years.",diy:"Harvest roots in fall for echinacea tincture.",budget:"Perennial. Self-seeds after several years.",friends:["bee balm","yarrow"],foes:[],pests:[]},
  {id:"fennel",cat:"Herb",name:"Fennel",latin:"Foeniculum vulgare",emoji:"🌾",desc:"Allelopathic troublemaker. Plant well away from most vegetables in its own bed.",zones:"4–9",regions:["Pacific Northwest","Southwest","Mountain West","Southeast"],elev:"Tolerates high elevation with good drainage.",elevBands:["low","mid","high"],light:"Full sun",soil:"Well-draining, average fertility (pH 6.0–7.0)",germ:"Direct sow in spring or fall. Self-seeds aggressively.",care:"Give it its own bed. Keep it away from most vegetables.",diy:"Harvest fronds, pollen, and bulb for cooking.",budget:"Self-seeding once established.",friends:[],foes:["tomato","pepper","brassica","cucumber","carrot","dill"],pests:[]},
  // CUT FLOWERS
  {id:"marigold",cat:"Cut Flower",name:"Marigold",latin:"Tagetes spp.",emoji:"🌼",desc:"Root secretions deter nematodes. Attracts beneficials. Nearly everything likes it.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Grows well even at high elevation.",elevBands:["low","mid","high"],light:"Full sun",soil:"Any well-draining soil, tolerates poor (pH 5.8–7.0)",germ:"Direct sow after frost or start indoors 4–6 weeks early.",care:"Deadhead for continuous bloom.",diy:"Marigold petal dye for fabric.",budget:"Extremely cheap seed.",friends:["tomato","pepper","cucumber","brassica","carrot"],foes:[],pests:[]},
  {id:"zinnia",cat:"Cut Flower",name:"Zinnia",latin:"Zinnia elegans",emoji:"🌺",desc:"Best cut flower for beginners. Heat-loving, prolific bloomer. Monarch butterfly favorite.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Loves heat. At elevation choose shorter-season varieties.",elevBands:["low","mid"],light:"Full sun (8+ hrs)",soil:"Average, well-draining (pH 5.5–7.0)",germ:"Direct sow after last frost.",care:"Pinch center growing tip at 12 inches for bushier plant. Cut frequently for more blooms.",diy:"Cut-and-come-again — the more you cut, the more it blooms.",budget:"Cheap direct sow seed.",friends:["tomato","cucumber","basil"],foes:[],pests:["powdery-mildew","spider-mite"]},
  {id:"sunflower",cat:"Cut Flower",name:"Sunflower",latin:"Helianthus annuus",emoji:"🌻",desc:"Trap crop for leafhoppers and aphids. Provides structure, shade, and seed for birds.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Short-season varieties above 7,000 ft.",elevBands:["low","mid","high"],light:"Full sun",soil:"Well-draining, any fertility (pH 6.0–7.5)",germ:"Direct sow after last frost, 1 inch deep.",care:"Water deeply at base. Stake in wind. No fertilizer — too much nitrogen = tall, floppy, few flowers.",diy:"Save seeds for eating, bird feeding, or replanting.",budget:"Cheap seed. Self-seeds.",friends:["cucumber","corn","squash","nasturtium"],foes:["potato"],pests:["leafhopper","aphid"]},
  {id:"cosmos",cat:"Cut Flower",name:"Cosmos",latin:"Cosmos bipinnatus",emoji:"🌸",desc:"Feathery, airy, long-stemmed cut flower. Self-seeds. Attracts lacewings, hoverflies, parasitic wasps.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Does well at elevation. Cool nights extend bloom.",elevBands:["low","mid","high"],light:"Full sun",soil:"Poor to average — rich soil means leaves, not flowers (pH 6.0–8.0)",germ:"Direct sow after last frost.",care:"Don't fertilize. Don't fuss. Deadhead to extend bloom.",diy:"Self-seeds freely — once established, may never need to sow again.",budget:"Extremely cheap seed. Self-seeding.",friends:["most vegetables","herbs"],foes:[],pests:[]},
  {id:"nasturtium",cat:"Cut Flower",name:"Nasturtium",latin:"Tropaeolum majus",emoji:"🌸",desc:"Edible, beautiful, best trap crop for aphids. Repels squash bugs.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Thrives at elevation. Loves cool nights.",elevBands:["low","mid","high"],light:"Full sun to part shade",soil:"Poor to average (pH 6.0–7.0)",germ:"Direct sow after frost. Soak seeds overnight.",care:"Mostly ignore it. Don't fertilize. Eat the flowers and leaves.",diy:"Edible flowers and leaves. Pickled seed pods as caper substitute.",budget:"Self-seeding annual.",friends:["cucumber","brassica","tomato","radish"],foes:[],pests:["aphid"]},
  {id:"dahlia",cat:"Cut Flower",name:"Dahlia",latin:"Dahlia spp.",emoji:"🌸",desc:"Premium cut flower. Tubers multiply year after year.",zones:"8–11 perennial / 3–11 annual",regions:["Pacific Northwest","Mountain West","Midwest","Northeast","Southeast"],elev:"Good at mid-elevation. Dig tubers before hard freeze.",elevBands:["low","mid"],light:"Full sun (6–8 hrs)",soil:"Rich, well-draining, fertile (pH 6.5–7.0)",germ:"Plant tubers in spring after last frost. 4 inches deep, eye up.",care:"Pinch first bud for bushy plant. Dig tubers after frost kills foliage. Store in cool dry place.",diy:"Divide tubers each fall — one becomes 5–10.",budget:"Initial investment pays off — they multiply every year.",friends:["marigold","basil"],foes:[],pests:["aphid","earwig","powdery-mildew","spider-mite"]},
  {id:"yarrow-flower",cat:"Cut Flower",name:"Yarrow (Cut Flower)",latin:"Achillea millefolium",emoji:"⚪",desc:"Flat-topped clusters that dry beautifully. Exceptional beneficial insect plant.",zones:"3–9",regions:["All US regions"],elev:"Native to mountain meadows. Excellent at elevation.",elevBands:["low","mid","high"],light:"Full sun",soil:"Poor to average, well-draining (pH 5.5–7.0)",germ:"Start indoors 6–8 weeks. Surface sow.",care:"Cut back after bloom. Divide every 2–3 years.",diy:"Excellent dried flower. Harvest at peak and hang dry.",budget:"Perennial. Self-seeding. Near-zero cost to maintain.",friends:["most vegetables"],foes:[],pests:[]},
  {id:"strawflower",cat:"Cut Flower",name:"Strawflower",latin:"Xerochrysum bracteatum",emoji:"🌸",desc:"Papery petals that dry perfectly on the stem. Long vase life. Excellent for dried arrangements.",zones:"2–11 (annual)",regions:["All US regions"],elev:"Good at elevation — tolerates dry conditions.",elevBands:["low","mid","high"],light:"Full sun",soil:"Average, well-draining, low fertility (pH 6.0–7.5)",germ:"Start indoors 6–8 weeks. Surface sow — needs light.",care:"Harvest before fully open for best dried results. Hang upside down to dry.",diy:"Dried flowers for wreaths, arrangements, sachets.",budget:"Cheap annual seed. Highly marketable at farmers markets.",friends:["marigold","cosmos"],foes:[],pests:[]},
  // FRUIT
  {id:"strawberry",cat:"Fruit",name:"Strawberry",latin:"Fragaria × ananassa",emoji:"🍓",desc:"Ground cover that earns its space. Borage is its best companion.",zones:"3–10",regions:["All US regions"],elev:"Does well at elevation with good mulching. Everbearing varieties better at high elevation.",elevBands:["low","mid","high"],light:"Full sun (6+ hrs)",soil:"Rich, slightly acidic, well-draining (pH 5.5–6.5)",germ:"Best from runners or bare root.",care:"Mulch with straw. Remove runners from June-bearing for bigger yield.",diy:"Runner propagation — free plants every season.",budget:"Runner propagation makes this essentially free after initial planting.",friends:["borage","lettuce","onion","marigold"],foes:["brassica","fennel"],pests:["aphid","spider-mite","slugs"]},
  {id:"raspberry",cat:"Fruit",name:"Raspberry",latin:"Rubus idaeus",emoji:"🫐",desc:"Perennial cane fruit. Bears on second-year canes. Spreads via suckers.",zones:"3–9",regions:["All US regions"],elev:"Excellent at elevation. Cold-hardy and productive in short seasons.",elevBands:["low","mid","high"],light:"Full sun (6+ hrs)",soil:"Rich, slightly acidic, well-draining (pH 5.5–6.5)",germ:"Plant bare root canes in early spring. Cut to 12 inches on planting.",care:"Trellis for support. Remove fruited canes after harvest. Mulch heavily.",diy:"Propagate from suckers freely.",budget:"High long-term return. Suckers provide free plants.",friends:["marigold","garlic","yarrow"],foes:["potato","tomato"],pests:["aphid","spider-mite"]},
  {id:"blueberry",cat:"Fruit",name:"Blueberry",latin:"Vaccinium spp.",emoji:"🫐",desc:"Long-lived perennial shrub. Requires acidic soil and two varieties for fruit set.",zones:"3–7 highbush",regions:["Pacific Northwest","Northeast","Midwest","Southeast"],elev:"Excellent at elevation. Needs cold stratification.",elevBands:["low","mid","high"],light:"Full sun (6+ hrs)",soil:"Very acidic, rich in organic matter (pH 4.5–5.5). Wrong pH = failure.",germ:"Plant 2+ varieties for cross-pollination.",care:"Acidify soil with sulfur. Mulch heavily with wood chips. Prune out old wood annually.",diy:"Pine needle mulch acidifies soil naturally.",budget:"High initial cost. Long-term investment — plants live 50+ years.",friends:["yarrow","thyme","basil"],foes:["fennel"],pests:["aphid","gray-mold"]},
];


const PESTS = [
  {id:"aphid",cat:"Sucking",name:"Aphid",latin:"Aphididae family",emoji:"🐜",damage:"Curling, yellowing leaves; sticky honeydew; distorted new growth; ants tending them",visual:"Clusters of tiny soft-bodied insects on stem undersides and new growth. Green, black, grey, or white. Ants marching up stems = aphids above.",attractedTo:["tomato","brassica","kale","pepper","basil","dill","sunflower","nasturtium","strawberry","lettuce","raspberry","blueberry"],treatments:["Strong water spray daily to knock off and disorient","Retain some colonies on nasturtium/sunflower to build ladybug populations","Insecticidal soap spray on heavy infestations","Neem oil at dusk — UV degrades it fast at elevation","Introduce ladybugs, lacewings, parasitic wasps","Remove heavily infested leaves; bag and discard"],diy:"Soap spray: 1 tbsp castile soap per quart water. Garlic spray: blend 1 head garlic with 1 qt water, strain, spray.",budget:"Soap spray costs pennies. Water spray is free."},
  {id:"flea-beetle",cat:"Chewing",name:"Flea Beetle",latin:"Alticini tribe",emoji:"🪲",damage:"Tiny scattered shot-holes in leaves — looks like something used your seedling for target practice",visual:"Tiny (1–3mm), shiny black or bronze beetles that jump like fleas when disturbed. Most visible on seedlings in early spring.",attractedTo:["brassica","kale","tomato","pepper","eggplant","radish"],treatments:["Row cover immediately after transplanting","Diatomaceous earth around plant bases","Spinosad spray — more effective than neem at elevation","Kaolin clay as physical barrier","Radish or arugula as sacrificial trap crops","Delay transplanting until plants are robust"],diy:"DE dusted around base. Kaolin clay mixed with water as spray.",budget:"DE is inexpensive. Trap crop of arugula is nearly free."},
  {id:"cucumber-beetle",cat:"Chewing",name:"Cucumber Beetle",latin:"Diabrotica undecimpunctata",emoji:"🐞",damage:"Chewed flowers, scarred fruit, wilting despite water — bacterial wilt spread by feeding is the real danger",visual:"Striped or spotted yellow-green beetle, about 6mm. Check flowers in early morning when cold and sluggish.",attractedTo:["cucumber","squash","corn","tomatillo"],treatments:["Row cover until flowering — remove for pollination","Blue Hubbard squash as trap crop at field edges","Spinosad spray — most effective organic option","Kaolin clay applied before beetles arrive","Hand pick in early morning when cold","Remove spent plants — adults overwinter in debris"],diy:"Kaolin clay as deterrent spray.",budget:"Hand picking is free. Trap crop of blue Hubbard squash cheap per season."},
  {id:"leafhopper",cat:"Sucking",name:"Leafhopper",latin:"Cicadellidae family",emoji:"🦟",damage:"Stippled, pale, or bronzed leaves; tip burn; stunted growth; virus transmission",visual:"Wedge-shaped, 3–6mm, green or brown. Moves sideways and jumps instantly. Damage looks like general yellowing.",attractedTo:["brassica","kale","tomato","pepper","cucumber","sunflower","strawberry","lettuce"],treatments:["Fine mesh row cover","Kaolin clay spray","Reflective mulch disorients them","Spinosad for heavy infestation — target undersides","Remove weedy host plants at perimeter","Oil-can catch method for close-quarters hunting"],diy:"Reflective mulch from old CDs or foil. Kaolin clay mixed with water.",budget:"Reflective mulch can be made from household foil."},
  {id:"harlequin-bug",cat:"Sucking",name:"Harlequin Bug",latin:"Murgantia histrionica",emoji:"🔴",damage:"White or yellow blotches; wilting; plant death in heavy pressure",visual:"Red-and-black shield-shaped stink bug, about 9mm. Unmistakable. Barrel-shaped white eggs with black rings on leaf undersides.",attractedTo:["brassica","kale"],treatments:["Hand pick adults and crush egg masses early season","Trap crop of mustard greens — destroy when colonized","Remove all brassica debris at season end","Row cover on transplants","No highly effective organic spray — prevention is primary"],diy:"Hand removal is most effective.",budget:"Prevention through clean-up costs nothing."},
  {id:"broad-mite",cat:"Mite",name:"Broad Mite",latin:"Polyphagotarsonemus latus",emoji:"🔬",damage:"Twisted, hardened, bronzed new growth; stunted tips; scarred fruit",visual:"Invisible to naked eye (0.2mm). Distorted new growth is the tell. Use 20x hand lens on stem tips.",attractedTo:["pepper","tomato","cucumber","strawberry","eggplant"],treatments:["Sulfur spray — most effective, apply in evening","Neem oil on undersides","Remove and bag affected growing tips","Predatory mites (Neoseiulus cucumeris) for serious pressure","Never apply sulfur within 2 weeks of neem"],diy:"Sulfur is relatively inexpensive and long-lasting.",budget:"Prevention through avoiding over-fertilization with nitrogen costs nothing."},
  {id:"hornworm",cat:"Chewing",name:"Tomato Hornworm",latin:"Manduca quinquemaculata",emoji:"🐛",damage:"Rapid defoliation; large sections stripped overnight; dark frass pellets on leaves below",visual:"Enormous green caterpillar (up to 4 inches) with white diagonal stripes and red or black horn. Look for frass below.",attractedTo:["tomato","pepper","eggplant"],treatments:["Hand pick — they're large, just find and remove them","White rice-grain cocoons on hornworm = braconid wasp eggs, leave it","Bt spray for large populations — safe for beneficials","Spinosad for heavy pressure","Till soil in fall to expose overwintering pupae"],diy:"Hand picking is the best method. Bt is inexpensive and biological.",budget:"Hand picking is free. Braconid wasps are free if you attract them."},
  {id:"caterpillar",cat:"Chewing",name:"Caterpillar / Cabbage Worm",latin:"Various Lepidoptera",emoji:"🐛",damage:"Ragged holes in leaves; frass visible; plants skeletonized in heavy pressure",visual:"Velvety green caterpillars or loopers. Watch for white butterflies laying eggs. Check leaf undersides daily.",attractedTo:["brassica","kale"],treatments:["Row cover before white butterflies appear","Hand pick and drop in soapy water","Bt spray — highly effective, harmless to beneficials","Spinosad for mixed pressure","Trichogramma wasps as preventive release"],diy:"Bt is inexpensive and safe. Hand picking is free.",budget:"Prevention via row cover is cheap and eliminates the problem entirely."},
  {id:"spider-mite",cat:"Mite",name:"Spider Mite",latin:"Tetranychidae family",emoji:"🕷️",damage:"Fine stippling on leaves; silvery or bronze sheen; fine webbing on undersides in heavy infestations",visual:"Barely visible to naked eye. Look for webbing first. Tap a leaf over white paper — if specks move, it's mites. Thrives in hot, dry conditions.",attractedTo:["strawberry","pepper","tomato","cucumber","eggplant","zinnia","dahlia"],treatments:["Strong water spray daily — disrupts colonies","Raise humidity around plants","Neem oil on undersides of leaves","Predatory mites (Phytoseiulus persimilis) — very effective","Insecticidal soap in evening","Avoid dusty conditions — dust suppresses natural predators"],diy:"Water spray is free and effective.",budget:"Prevention through adequate watering and mulching costs little."},
  {id:"squash-vine-borer",cat:"Chewing",name:"Squash Vine Borer",latin:"Melittia cucurbitae",emoji:"🪲",damage:"Sudden wilting of entire plant; sawdust-like frass at base of stem; hollowed stems",visual:"Look for small entry hole with greenish-yellow frass at soil line. Adult is a moth that lays eggs at base of stem.",attractedTo:["squash"],treatments:["Row cover until flowering then remove for pollination","Wrap base of stems in tin foil as physical barrier","Inject Bt into bored stems with a syringe","Plant resistant varieties (butternut is more resistant)","Succession plant — second planting after peak moth flight avoids damage"],diy:"Foil wrap at stem base as barrier. Bt injection into stem.",budget:"Succession planting and resistant varieties cost nothing extra."},
  {id:"squash-bug",cat:"Sucking",name:"Squash Bug",latin:"Anasa tristis",emoji:"🐛",damage:"Yellow spots becoming brown, wilting, plant death in severe cases",visual:"Flat, brownish-grey shield bug about 16mm. Bronze-colored egg clusters on leaf undersides. Hides under leaves and debris.",attractedTo:["squash","cucumber"],treatments:["Hand pick and crush egg masses — most effective method","Trap with boards laid near plants — pick off in morning","Remove plant debris — they overwinter in it","Row cover until flowering","Diatomaceous earth around plant base"],diy:"Cardboard trap under plants — flip in morning and destroy.",budget:"Hand removal is free and effective."},
  {id:"colorado-potato-beetle",cat:"Chewing",name:"Colorado Potato Beetle",latin:"Leptinotarsa decemlineata",emoji:"🪲",damage:"Rapid complete defoliation; orange eggs in clusters on leaf undersides",visual:"Round, yellow-orange beetle with black stripes. Unmistakable. Bright orange egg clusters and fat yellow-orange larvae are easy to spot.",attractedTo:["potato","eggplant","tomato"],treatments:["Hand pick eggs, larvae, and adults daily","Bt var. tenebrionis (Bt-T) specifically targets this beetle","Spinosad spray — effective","Mulch heavily with straw — disrupts life cycle","Row cover on young plants"],diy:"Hand picking most effective. Bt-T is biological and inexpensive.",budget:"Straw mulch suppresses population."},
  {id:"slugs",cat:"Chewing",name:"Slugs and Snails",latin:"Gastropoda",emoji:"🐌",damage:"Ragged holes in leaves and fruits; slime trails; seedlings eaten to the ground overnight",visual:"Slime trails are the giveaway. Check under boards and pots in the morning.",attractedTo:["lettuce","strawberry","brassica","bean","basil"],treatments:["Diatomaceous earth barrier around plants","Beer trap — shallow dish of beer sunk to soil level","Copper tape as physical barrier","Hand pick at night with a headlamp","Iron phosphate bait (Sluggo) — safe for pets and wildlife","Encourage ground beetles, ducks, garter snakes"],diy:"Beer trap using any cheap beer. DE is inexpensive.",budget:"Beer traps are cheap. Hand picking is free."},
  {id:"powdery-mildew",cat:"Disease",name:"Powdery Mildew",latin:"Various Erysiphaceae",emoji:"⬜",damage:"White powdery coating on leaves; leaves yellow and die; reduced yields",visual:"Unmistakable white powdery coating, usually on upper leaf surfaces. Starts as spots, spreads to cover entire leaf.",attractedTo:["cucumber","squash","zinnia","brassica","pea","dahlia"],treatments:["Milk spray (1:9 milk:water) — surprisingly effective, apply weekly","Baking soda spray (1 tsp per quart water + few drops soap)","Improve airflow — most important preventive","Sulfur spray for established infections","Remove affected leaves immediately","Plant resistant varieties"],diy:"Milk spray is free if you have milk. Baking soda spray is nearly free.",budget:"Airflow and resistant varieties cost nothing."},
  {id:"late-blight",cat:"Disease",name:"Late Blight",latin:"Phytophthora infestans",emoji:"🟤",damage:"Water-soaked spots turning brown-black; white mold on undersides; rapid plant collapse",visual:"Dark brown-black irregular blotches with pale halo. White fuzzy growth on underside in humid conditions. Spreads devastatingly fast.",attractedTo:["tomato","potato"],treatments:["Remove infected plants immediately — do not compost","Copper spray as preventive and early treatment","Improve airflow and avoid overhead watering","Plant resistant varieties","Do not save seed from infected plants"],diy:"Copper spray is relatively affordable and effective.",budget:"Resistant varieties and airflow management are prevention without cost."},
  {id:"carrot-fly",cat:"Soil",name:"Carrot Fly",latin:"Psila rosae",emoji:"🪰",damage:"Rusty tunnels in roots; stunted plants; foliage turns yellow-red",visual:"Damage is underground — you won't see the fly. Reddish tunneling on harvested roots is the tell.",attractedTo:["carrot","parsley"],treatments:["Row cover from sowing through harvest","Interplant with onions, rosemary, sage to mask scent","Avoid crushing carrot foliage — releases scent","Delay sowings to miss first generation","Resistant varieties: Fly Away, Resistafly"],diy:"Interplanting with alliums is free and effective.",budget:"Row cover is a one-time purchase used repeatedly."},
];

const BENEFICIALS = [
  {id:"ladybug",name:"Ladybug / Lady Beetle",latin:"Coccinellidae family",emoji:"🐞",role:"Voracious predator of soft-bodied pest insects",eats:"Aphids primarily — a single ladybug eats up to 5,000 in its lifetime. Also mites, scales, mealybugs, small caterpillars.",howToAttract:"Plant dill, fennel, yarrow, marigold, sweet alyssum. Retain some aphid colonies on sacrificial nasturtium. Avoid broad-spectrum pesticides.",habitat:"Overwinters under leaf litter and bark. Leave wild areas at garden edges.",diy:"Attract rather than buy — purchased ladybugs disperse immediately."},
  {id:"lacewing",name:"Green Lacewing",latin:"Chrysoperla spp.",emoji:"🦗",role:"Larvae are aggressive predators; adults are nectar feeders",eats:"Larvae eat aphids, thrips, mites, whitefly, small caterpillars, leafhoppers, pest eggs.",howToAttract:"Plant dill, fennel, coriander, yarrow, cosmos. Lacewings need diverse bloom throughout season.",habitat:"Adults shelter in dense vegetation. Larvae active wherever prey is abundant.",diy:"Provide pollen and nectar sources — free if you already grow herbs."},
  {id:"parasitic-wasp",name:"Parasitic Wasp",latin:"Braconidae / Ichneumonidae",emoji:"🐝",role:"Parasitizes pest caterpillars, aphids, and whitefly larvae",eats:"Adults feed on nectar. Females lay eggs inside pest hosts — larvae consume pest from within.",howToAttract:"Umbelliferous flowers: dill, cilantro, yarrow, sweet alyssum. Diversity of bloom all season.",habitat:"Need diverse plantings. Zero tolerance for broad-spectrum pesticides.",diy:"Let herbs bolt and flower — free pest control."},
  {id:"hoverfly",name:"Hoverfly / Syrphid Fly",latin:"Syrphidae family",emoji:"🪰",role:"Larvae are aphid predators; adults are major pollinators",eats:"Larvae eat aphids, thrips, soft-bodied insects. Adults feed on pollen and nectar.",howToAttract:"Open-faced flowers: phacelia, buckwheat, sweet alyssum, marigold, dill, cosmos.",habitat:"Breed near aphid colonies. Adults found wherever pollen is available.",diy:"Diverse flowering plants attract them. Phacelia is especially effective."},
  {id:"ground-beetle",name:"Ground Beetle",latin:"Carabidae family",emoji:"🪲",role:"Nocturnal predator of soil-dwelling pests",eats:"Cutworms, slugs, snail eggs, root maggots, wireworms. Hunts at night on and just below the soil surface.",howToAttract:"Mulch. Reduce tillage — they build colonies in undisturbed soil.",habitat:"Need undisturbed soil and mulch for daytime shelter.",diy:"Straw mulch doubles as ground beetle habitat."},
  {id:"spider",name:"Garden Spider",latin:"Various Araneae",emoji:"🕷️",role:"Generalist predator of flying and walking insects",eats:"Leafhoppers, aphids, caterpillars, beetles, flies. Deeply underrated and completely free.",howToAttract:"Don't kill them. Provide structural diversity: trellises, tall plants, brush piles, unmowed grass at edges.",habitat:"Build webs in structural vegetation. Ground-hunting species need mulch and debris.",diy:"Just leave them alone. The best free pest control you have."},
  {id:"lizard",name:"Garden Lizard",latin:"Various species",emoji:"🦎",role:"Generalist predator of insects and small pests",eats:"Beetles, grasshoppers, caterpillars, aphids, earwigs, slugs. A single lizard patrols significant territory daily.",howToAttract:"Rocks and logs for basking and shelter. Leave unmowed edges.",habitat:"Need sun exposure for thermoregulation. Rocky areas are prime territory.",diy:"Thermal mass rocks attract lizards and warm soil. Double benefit."},
  {id:"bee",name:"Native Bee",latin:"Various Apidae / Halictidae",emoji:"🐝",role:"Primary pollinator — essential for fruit and seed set",eats:"Pollen and nectar. Without them your cucumbers, tomatoes, peppers, squash don't set fruit.",howToAttract:"Diverse successive bloom from spring through fall. Leave bare soil patches for ground-nesters. Leave dead stems for cavity-nesters.",habitat:"Ground nesters need bare or sparsely vegetated soil. Cavity nesters use hollow stems.",diy:"Leave some bare ground and dead stems — free habitat."},
  {id:"predatory-mite",name:"Predatory Mite",latin:"Phytoseiidae family",emoji:"🔬",role:"Specialist predator of pest mites and thrips",eats:"Spider mites, broad mites, russet mites, thrips larvae. Can eliminate mite colonies within weeks.",howToAttract:"Avoid pesticide use. Maintain diverse ground cover.",habitat:"Live on plant surfaces, especially undersides of leaves.",diy:"Avoid broad-spectrum pesticides and they'll establish naturally."},
  {id:"worm-snake",name:"Worm Snake / Garter Snake",latin:"Various Colubridae",emoji:"🐍",role:"Predator of slugs, cutworms, and soil pests",eats:"Slugs, cutworms, grubs, small insects. Presence indicates healthy soil biology.",howToAttract:"Brush piles, flat rocks, log edges. Reduce heavy tillage.",habitat:"Moist soil, compost, leaf litter, rocky edges.",diy:"A brush pile at the garden edge is free habitat that attracts snakes, lizards, and ground beetles simultaneously."},
];

const SOIL_TYPES = [
  {id:"clay",name:"Clay Soil",emoji:"🟤",feel:"Heavy, sticky when wet. Hard like concrete when dry. Forms a long ribbon when rolled between fingers.",color:"#8B4513",bgColor:"#D2691E22",desc:"Dense and nutrient-rich but drains poorly and compacts easily. The enemy of root crops. The friend of water-loving plants once drainage is addressed.",bestFor:"Moisture-loving plants. Naturally high in nutrients.",challenges:"Poor drainage, compaction, slow to warm in spring, cracks in drought.",amend:"Work in compost (4–6 inches) and aged manure annually. Add gypsum to break up sodium-bound clay. Never till when wet. Raised beds are often the best long-term answer.",inSeason:"Mulch heavily to prevent surface crusting. Avoid compaction. Top-dress with compost mid-season.",winter:"Plant cover crops immediately after harvest. Never leave bare clay exposed — it seals and cracks.",coverCrops:["winter-rye","crimson-clover","daikon-radish"],diy:"Compost from kitchen scraps and garden waste is free fertility. Cardboard sheet mulching suppresses weeds and feeds soil.",budget:"Free compost from food scraps. Gypsum is inexpensive.",note:"This is 4 Dog Farm's primary situation. Volcanic clay — high mineral content is an asset once drainage and structure are addressed."},
  {id:"sandy",name:"Sandy Soil",emoji:"🟡",feel:"Gritty, falls apart in your hand. Won't form a ribbon. Drains almost immediately.",color:"#C8A96E",bgColor:"#C8A96E22",desc:"Drains quickly, warms fast in spring, easy to work. Holds almost no water or nutrients.",bestFor:"Root crops, drought-tolerant herbs, strawberries, asparagus.",challenges:"Low nutrient retention, dries out fast, needs frequent watering.",amend:"Add compost generously and repeatedly. Biochar helps retain nutrients long-term. Mulch heavily.",inSeason:"Water more frequently. Liquid fertilizer works better than granular.",winter:"Plant winter rye or hairy vetch — they hold nutrients that would otherwise leach.",coverCrops:["winter-rye","hairy-vetch","buckwheat"],diy:"Compost is essential and can be made for free.",budget:"Sheet mulching with cardboard and wood chips is cheap or free."},
  {id:"loam",name:"Loam Soil",emoji:"🟢",feel:"Crumbly, slightly gritty, holds shape loosely. Dark color. Smells alive.",color:"#556B2F",bgColor:"#556B2F22",desc:"The gold standard. A balanced mix of sand, silt, and clay. Holds moisture without waterlogging. Protect it.",bestFor:"Everything. Loam grows it all.",challenges:"Can become compacted without organic matter. Maintain it.",amend:"Add 2–3 inches of compost annually. That's it.",inSeason:"Top-dress with compost. Minimal amendments needed.",winter:"Cover crops to protect structure and add organic matter.",coverCrops:["crimson-clover","hairy-vetch","winter-rye"],diy:"Compost maintenance keeps loam performing.",budget:"Low maintenance. Compost is your primary input."},
  {id:"silt",name:"Silty Soil",emoji:"🪨",feel:"Silky or soapy when wet. Smooth and floury when dry.",color:"#9E9E9E",bgColor:"#9E9E9E22",desc:"Fertile and moisture-retentive. Found in river valleys. Prone to surface crusting and compaction.",bestFor:"Most vegetables. Particularly good for leafy greens, brassicas, root crops.",challenges:"Crusts on surface, compacts under foot traffic, can waterlog.",amend:"Compost to improve structure. Avoid walking on beds.",inSeason:"Mulch to prevent surface crusting.",winter:"Cover crops prevent erosion — silt is highly erodible when left bare.",coverCrops:["crimson-clover","winter-rye","phacelia"],diy:"Permanent paths prevent compaction for free.",budget:"Compost and mulch are primary inputs."},
  {id:"volcanic",name:"Volcanic / Rocky Soil",emoji:"🌋",feel:"Gritty, mineral-forward. Often sharp-edged fragments.",color:"#4A4A4A",bgColor:"#4A4A4A22",desc:"High in minerals — iron, magnesium, calcium, potassium. Drains well. Challenge is building organic matter from near zero.",bestFor:"Drought-tolerant crops, herbs, lavender, rosemary once organic matter is established.",challenges:"Low organic matter, low water retention, slow biological development.",amend:"Compost, compost, compost. This is a long game. Biochar helps retain what you add.",inSeason:"Mulch very heavily. Worm castings as biological activator.",winter:"Cover crops with deep roots physically break up rock layers over winter.",coverCrops:["daikon-radish","hairy-vetch","buckwheat"],diy:"Worm castings from a worm bin. Comfrey chop-and-drop as free fertility.",budget:"Sheet mulching with cardboard and wood chips is cheap or free.",note:"The second layer at 4 Dog Farm — volcanic rock under the clay. Daikon radish is your best friend for breaking this up over winter."},
  {id:"hardpan",name:"Hardpan / Compacted Subsoil",emoji:"⬛",feel:"Brick-like layer you hit with a shovel 8–18 inches down. Water pools above it.",color:"#3A3A3A",bgColor:"#3A3A3A22",desc:"Dense impermeable layer blocking root growth. Roots hit it and stop — stunted plants with no visible reason.",bestFor:"Nothing grows well through hardpan. It must be addressed first.",challenges:"Roots can't penetrate. Water pools above causing root rot.",amend:"Deep-rooted cover crops are the biological solution. Raised beds bypass the problem.",inSeason:"Raised beds over hardpan. Mulch heavily above.",winter:"Plant daikon radish — they drill through hardpan and decompose, leaving channels for future roots.",coverCrops:["daikon-radish","tillage-radish","hairy-vetch"],diy:"Daikon radish is cheap seed that does the work of a subsoiler.",budget:"Sheet mulching raises growing level above hardpan."},
  {id:"caliche",name:"Caliche (Alkaline Hardpan)",emoji:"⬜",feel:"White or tan chalky layer. Hard. Found in arid and semi-arid regions.",color:"#D4C5A9",bgColor:"#D4C5A922",desc:"Calcium carbonate layer in arid climates. Highly alkaline (pH 8–9). Blocks roots and drainage.",bestFor:"Nothing grows directly through it. Surface soil above can be productive if amended.",challenges:"Extreme alkalinity locks out iron, manganese, zinc.",amend:"Sulfur to lower pH. Compost. Gypsum.",inSeason:"Acidifying fertilizers. Foliar iron if plants show yellowing.",winter:"Cover crops in soil above it.",coverCrops:["hairy-vetch","crimson-clover","phacelia"],diy:"Vinegar drench can temporarily lower pH. Sulfur is inexpensive.",budget:"Pine needle mulch acidifies soil naturally and is often free."},
  {id:"waterlogged",name:"Waterlogged / Poorly Drained",emoji:"💧",feel:"Cold and slick. Blue-grey mottling when dug. Smells sulfurous.",color:"#4A6FA5",bgColor:"#4A6FA522",desc:"Soil that stays wet long after rain. Causes root rot and plant death.",bestFor:"Nothing grows well without addressing drainage first.",challenges:"Anaerobic conditions rot roots. Cold and slow to warm in spring.",amend:"Raised beds. French drains. Break up hardpan beneath.",inSeason:"Avoid walking on beds when wet.",winter:"Improve drainage first.",coverCrops:["winter-rye"],diy:"Raised beds from reclaimed wood or logs (hugelkultur) solve drainage cheaply.",budget:"Hugelkultur (mound beds over buried wood) is free if you have logs."},
];

const COVER_CROPS = [
  {id:"crimson-clover",name:"Crimson Clover",emoji:"🌺",seasons:["fall","spring"],roles:["nitrogen","pollinator","biomass"],family:"Legume",regions:["Pacific Northwest","Southeast","Midwest","Northeast","Southwest"],elev:"Good to 5,000 ft. Less reliable above — consider hairy vetch instead.",desc:"Beautiful nitrogen-fixing legume that blooms in brilliant crimson. Fixes 70–150 lbs of nitrogen per acre. Pollinators adore it.",plantWhen:"Fall (zone 6+) or early spring as soon as soil can be worked.",terminate:"Mow or turn in at full bloom for maximum nitrogen release.",soilBenefit:"Fixes atmospheric nitrogen. Adds organic matter. Attracts beneficial insects.",seeding:"15–20 lbs/acre or about 4–5 oz per 1,000 sq ft.",diy:"Save seed from mature heads for next year.",budget:"Inexpensive seed widely available."},
  {id:"hairy-vetch",name:"Hairy Vetch",emoji:"🪴",seasons:["fall","winter"],roles:["nitrogen","biomass","suppress"],family:"Legume",regions:["All US regions"],elev:"Cold-hardy to -20°F. Excellent at high elevation.",desc:"The nitrogen heavyweight. Fixes up to 200 lbs of nitrogen per acre. Mix with winter rye for support and easier termination.",plantWhen:"Late summer to early fall. Mix with winter rye 1:1.",terminate:"Mow at flowering — re-grows from roots if terminated too early.",soilBenefit:"Highest nitrogen fixation of any common cover crop.",seeding:"Mix: 30 lbs vetch + 30 lbs rye per acre. About 1 lb each per 1,000 sq ft.",diy:"Save seed by letting some plants mature fully.",budget:"One of the cheapest ways to add significant nitrogen."},
  {id:"winter-rye",name:"Winter Rye",emoji:"🌾",seasons:["fall","winter"],roles:["biomass","suppress","erosion"],family:"Grass",regions:["All US regions"],elev:"Germinates in near-freezing soil. Excellent at all elevations.",desc:"The toughest, most reliable cover crop. Germinates in near-freezing soil, suppresses weeds aggressively, adds massive organic matter.",plantWhen:"Early fall, 4–6 weeks before hard frost. Can overseed into standing crops.",terminate:"Turn in or mow 2–3 weeks before planting. Decomposing rye temporarily suppresses transplants — give it time.",soilBenefit:"Massive organic matter. Fibrous roots improve structure.",seeding:"90–120 lbs/acre or about 2–3 lbs per 1,000 sq ft.",diy:"Save seed from mature heads for next year.",budget:"Inexpensive. Most widely available cover crop seed."},
  {id:"daikon-radish",name:"Daikon / Tillage Radish",emoji:"🌱",seasons:["fall"],roles:["compaction","biomass","suppress"],family:"Brassica",regions:["All US regions"],elev:"Needs 60+ frost-free days. At 3,300 ft plant by August 15.",desc:"The biological subsoiler. Grows a massive taproot that drills through compacted soil and hardpan, then freezes and decomposes over winter — leaving open channels.",plantWhen:"Late summer, 6–8 weeks before hard frost. At elevation: by mid-August.",terminate:"Frost kills it. Remove or incorporate in mild climates.",soilBenefit:"Deep compaction breaking. Improved drainage. Significant organic matter.",seeding:"10 lbs/acre or about 3 oz per 1,000 sq ft.",diy:"Cheap seed does the work of a mechanical subsoiler.",budget:"One of the best returns on investment in cover cropping.",note:"Perfect for 4 Dog Farm's clay-volcanic situation. Plant by August 15 at 3,300 ft."},
  {id:"buckwheat",name:"Buckwheat",emoji:"☀️",seasons:["spring","summer"],roles:["pollinator","suppress","biomass"],family:"Broadleaf",regions:["All US regions"],elev:"Warm-season only. Best below 6,500 ft.",desc:"Fastest cover crop — full bloom in 30–40 days. Excellent pollinator plant. Makes phosphorus available.",plantWhen:"After last frost through midsummer. Does not tolerate frost.",terminate:"At 10–50% bloom for best pollinator benefit. Before seed set — it reseeds aggressively.",soilBenefit:"Makes phosphorus available. Fast organic matter. Excellent weed suppressor.",seeding:"50–70 lbs/acre or about 1.5 lbs per 1,000 sq ft.",diy:"Seed can be ground into buckwheat flour — dual purpose.",budget:"Gap filler between crops that adds fertility."},
  {id:"phacelia",name:"Phacelia",emoji:"💜",seasons:["spring","fall"],roles:["pollinator","biomass","suppress"],family:"Broadleaf",regions:["Pacific Northwest","Mountain West","Southwest","Northeast"],elev:"Excellent at elevation. Cool-weather crop.",desc:"One of the best pollinator cover crops. Attracts bees, hoverflies, lacewings, parasitic wasps.",plantWhen:"Early spring or early fall. Tolerates light frost.",terminate:"Mow at bloom for maximum pollinator benefit.",soilBenefit:"Quick organic matter. Retains beneficial insect populations.",seeding:"8–10 lbs/acre or about 2 oz per 1,000 sq ft.",diy:"Excellent at building beneficial insect populations for next season.",budget:"Worth the investment for beneficial insects."},
  {id:"field-peas",name:"Field Peas",emoji:"🫛",seasons:["fall","spring"],roles:["nitrogen","biomass","suppress"],family:"Legume",regions:["All US regions"],elev:"Excellent at elevation — cold tolerant and fast growing.",desc:"Fast-growing cool-season legume. Often mixed with oats or rye. Winterkills in most zones, leaving residue that's easy to till.",plantWhen:"Early fall or early spring. Often mixed with oats or winter rye.",terminate:"Winterkills naturally in zones 3–6. Mow or till in spring in mild climates.",soilBenefit:"Good nitrogen fixation. Adds organic matter.",seeding:"2–3 lbs per 1,000 sq ft.",diy:"Mix with oats for a self-supporting combination.",budget:"Inexpensive. Winterkill means zero termination cost."},
  {id:"fava-bean",name:"Fava Bean",emoji:"🫘",seasons:["fall","spring"],roles:["nitrogen","biomass","suppress"],family:"Legume",regions:["Pacific Northwest","Southwest","Northeast","Southeast"],elev:"Tolerates frost to 15°F. Good to 5,000 ft.",desc:"Massive biomass producer and heavy nitrogen fixer. Overwintering favas produce huge returns in spring. Edible if desired.",plantWhen:"Fall in zones 7+ for overwintering. Early spring in cold climates.",terminate:"Turn in or mow at bloom. Or harvest beans and turn in residue.",soilBenefit:"High nitrogen fixation. Massive biomass. Deep roots improve structure.",seeding:"1–2 lbs per 100 sq ft.",diy:"Save seed from dried pods easily.",budget:"Dual purpose — edible and soil-building."},
  {id:"oats",name:"Oats",emoji:"🌾",seasons:["spring","fall"],roles:["biomass","suppress","erosion"],family:"Grass",regions:["All US regions"],elev:"Good at elevation in spring. Winterkills in most climates.",desc:"Fast-growing, winterkilling grass. Mixed with field peas or vetch. Winterkill means zero termination effort in cold climates.",plantWhen:"Early spring or early fall. Often mixed with legumes.",terminate:"Winterkills naturally in zones 3–6.",soilBenefit:"Good organic matter. Fast weed suppression.",seeding:"2–3 lbs per 1,000 sq ft.",diy:"Winterkill does termination for free.",budget:"Very inexpensive seed."},
  {id:"mustard",name:"Mustard",emoji:"💛",seasons:["fall","spring"],roles:["suppress","biomass","compaction"],family:"Brassica",regions:["All US regions"],elev:"Fast in cool conditions. Good at elevation.",desc:"Biofumigant cover crop — glucosinolates released during decomposition suppress soilborne diseases, nematodes, and weed seeds.",plantWhen:"Early fall or early spring.",terminate:"Incorporate when 25–50% flowering for peak biofumigant compounds.",soilBenefit:"Biofumigation suppresses soilborne pathogens. Good organic matter.",seeding:"8–10 lbs/acre or about 2 oz per 1,000 sq ft.",diy:"Biofumigation is free disease suppression.",budget:"Inexpensive seed with disease-suppression benefit."},
  {id:"tillage-radish",name:"Tillage Radish (Large)",emoji:"🔴",seasons:["fall"],roles:["compaction","biomass"],family:"Brassica",regions:["All US regions"],elev:"Same as daikon — plant by August 15 at elevation.",desc:"Bred specifically to break compaction. Grows 2–4 inch diameter root 12–24 inches deep, fracturing hardpan.",plantWhen:"Late summer, 6–8 weeks before hard frost.",terminate:"Frost kills it.",soilBenefit:"Deep compaction breaking. Improved drainage.",seeding:"8–12 lbs/acre or about 3 oz per 1,000 sq ft.",diy:"More aggressive compaction breaking than standard daikon.",budget:"More expensive than daikon but more effective on severe compaction."},
  {id:"sweet-alyssum",name:"Sweet Alyssum",emoji:"⚪",seasons:["spring","summer","fall"],roles:["pollinator","suppress"],family:"Broadleaf",regions:["All US regions"],elev:"Reseeds even at elevation. Loves cool conditions.",desc:"Tiny flowers that hoverflies and parasitic wasps can't resist. Living mulch that suppresses weeds between crops.",plantWhen:"Direct sow after last frost. Reseeds prolifically.",terminate:"Pull or mow. Reseeds if you let it.",soilBenefit:"Living mulch. Beneficial insect support.",seeding:"Scatter and press in. Extremely fine seed.",diy:"Self-seeding living mulch that's free once established.",budget:"Cheap seed. Self-seeding."},
  {id:"berseem-clover",name:"Berseem Clover",emoji:"🌿",seasons:["spring","summer","fall"],roles:["nitrogen","pollinator","biomass"],family:"Legume",regions:["Pacific Northwest","Southwest","Southeast","Midwest"],elev:"Less cold-hardy than crimson clover — best below 5,000 ft.",desc:"Multiple cuts per season — mow and it regrows, releasing nitrogen with each cut.",plantWhen:"Spring through early fall. Not for winter cover.",terminate:"Mow repeatedly in season. Final termination before hard frost.",soilBenefit:"Multiple cuts provide regular nitrogen input throughout season.",seeding:"15–20 lbs/acre.",diy:"Multiple-cut system provides free fertility through the growing season.",budget:"One seeding gives multiple cuts."},
  {id:"calendula-cc",name:"Calendula (Cover / Companion)",emoji:"🟠",seasons:["spring","fall"],roles:["pollinator","suppress"],family:"Broadleaf",regions:["All US regions"],elev:"Self-seeds reliably. Thrives in cool conditions at elevation.",desc:"Medicinal, edible, and beneficial-insect-attracting. Repels whitefly. Self-seeds freely. Harvest flowers for salves and teas while it covers the ground.",plantWhen:"Early spring or fall. Tolerates frost.",terminate:"Pull or mow at end of season. Will self-seed.",soilBenefit:"Ground cover suppresses weeds. Attracts beneficial insects.",seeding:"Direct sow after last frost.",diy:"Harvest flowers for calendula salve — high-value product from cover crop.",budget:"Buy once, self-seeds indefinitely."},
  {id:"borage-cc",name:"Borage (Cover / Companion)",emoji:"🔵",seasons:["spring","summer","fall"],roles:["pollinator","biomass"],family:"Broadleaf",regions:["All US regions"],elev:"Self-seeds reliably at elevation.",desc:"Self-seeding companion crop that attracts pollinators and beneficials. Edible flowers. Once established, free forever.",plantWhen:"After last frost. Self-seeds prolifically after first year.",terminate:"Mow or pull before seed set if you don't want it to spread.",soilBenefit:"Adds organic matter. Attracts beneficial insects throughout season.",seeding:"Direct sow after frost.",diy:"Self-seeding means free cover once established.",budget:"Buy once, self-seeds indefinitely."},
  {id:"austrian-winter-pea",name:"Austrian Winter Pea",emoji:"🫛",seasons:["fall","winter"],roles:["nitrogen","biomass","suppress"],family:"Legume",regions:["Pacific Northwest","Mountain West","Northeast","Midwest"],elev:"Cold-hardy. Good to 6,000 ft. Often mixed with rye.",desc:"Hardier than field peas. Excellent overwinter cover in cool climates. Mix with winter rye for support.",plantWhen:"Late summer to early fall. Mix with winter rye.",terminate:"Mow or till in spring at flowering.",soilBenefit:"Good nitrogen fixation. Large biomass.",seeding:"Mix 50 lbs peas + 30 lbs rye per acre.",diy:"Mix with winter rye for a self-supporting combination.",budget:"Inexpensive seed."},
  {id:"flax",name:"Flax",emoji:"🔵",seasons:["spring","fall"],roles:["biomass","pollinator"],family:"Broadleaf",regions:["Pacific Northwest","Mountain West","Midwest","Northeast"],elev:"Cool-season. Good at elevation.",desc:"Fast-growing cool-season crop with blue flowers pollinators love.",plantWhen:"Early spring or fall.",terminate:"Mow at full bloom.",soilBenefit:"Good fibrous organic matter. Pollinator attraction.",seeding:"25–40 lbs/acre.",diy:"Harvest linseed oil from seeds.",budget:"Inexpensive seed."},
];

const DIAGNOSE_STEPS = [
  {id:"wet",question:"What happens in your garden after a heavy rain?",hint:"Watch your beds for 24 hours after a good soaking.",options:[{label:"Water pools and stays for hours or days",next:"pool"},{label:"Water drains within an hour or two",next:"drain-ok"},{label:"Drains almost immediately — bone dry the next day",next:"sandy-confirm"}]},
  {id:"pool",question:"Where and how does the water pool?",hint:"Does it pool right on the surface, or is the surface dry but plants still suffer from wet roots?",options:[{label:"Pools on surface, soil looks grey or blue-grey when dug, smells sulfurous",next:"result-waterlogged"},{label:"Surface drains but I hit a brick-like layer 8–18 inches down",next:"result-hardpan"},{label:"Pools on surface, soil is very sticky and dense when wet",next:"result-clay"}]},
  {id:"drain-ok",question:"Pick up a handful of moist soil and try to roll it between your fingers. What happens?",hint:"The ribbon test is one of the most reliable ways to identify soil type.",options:[{label:"Forms a long, smooth ribbon 2+ inches — sticky and dense",next:"result-clay"},{label:"Silky and smooth, forms a ribbon but breaks short",next:"result-silt"},{label:"Crumbly and loose, holds shape briefly then falls apart",next:"result-loam"},{label:"Gritty with rock fragments, light colored, strong mineral smell",next:"result-volcanic"}]},
  {id:"sandy-confirm",question:"What does your dry soil look like?",hint:"Sandy and volcanic soils both drain fast but look very different.",options:[{label:"Loose and gritty, granular, light tan or grey, like beach sand",next:"result-sandy"},{label:"White or tan chalky crust forming on the surface after watering",next:"result-caliche"},{label:"Cracks deeply when dry, dark color, hard to dig",next:"result-clay"},{label:"Full of rock fragments and grit, dark grey or black tones",next:"result-volcanic"}]},
];

const DIAGNOSE_MAP = {"result-clay":"clay","result-sandy":"sandy","result-loam":"loam","result-silt":"silt","result-volcanic":"volcanic","result-hardpan":"hardpan","result-caliche":"caliche","result-waterlogged":"waterlogged"};

const RECLAMATION = [
  {phase:1,title:"Assess Before You Do Anything",sub:"First 2–4 weeks",body:"The impulse is to start digging. Resist. Walk the land at different times of day, in different weather. This observation tells you more than any soil test.",steps:["Mark wet zones, dry zones, compacted zones, frost pockets","Identify existing volunteer plants — they're telling you what the soil can do","Get a basic soil test (county extension often does this free or cheap)","Note where sun hits longest — those are your priority growing areas","Map existing infrastructure: trees, water sources, access points","Don't kill anything yet — vetch, scrub oak, and weeds are holding the soil"]},
  {phase:2,title:"Stop the Bleeding",sub:"First season",body:"Feral land has two immediate problems: erosion and compaction. Before you plant anything productive, stabilize the soil. This is unglamorous work that pays dividends for years.",steps:["Overseed bare areas immediately with winter rye or field peas — imperfectly beats leaving soil bare","Sheet mulch problem areas with cardboard topped with wood chips — kills weeds, feeds soil","Establish permanent paths before you start growing — compaction from walking kills soil biology","Install whatever water management you can: swales, berms, simple earthworks to slow runoff","Begin a compost pile immediately — everything that can rot, goes in","Identify your best soil area and concentrate first-year energy there"]},
  {phase:3,title:"Build the Soil Before You Plant",sub:"Season 1–2",body:"The temptation is to plant everything immediately. The farms that last are the ones that built soil first. Every dollar and hour you put into soil this year returns tenfold in yields for the next decade.",steps:["Sheet mulch future beds now: cardboard → compost → wood chips. Let sit if possible.","Plant daikon radish in compacted areas each fall — free biological tillage","Add compost to every bed before planting — at minimum 2–3 inches worked in","Prioritize cover crops in any bed not actively producing food","Plant comfrey in permanent spots — mines minerals and provides free fertility forever","Don't buy fertility you can make: compost, comfrey tea, worm castings","Inoculate legume seeds with rhizobium — cheap and dramatically improves nitrogen fixation"]},
  {phase:4,title:"Establish Perennial Structure",sub:"Year 1–3",body:"Annual vegetables are your income crops. Perennials are your infrastructure. A mature perennial system reduces inputs, increases yields, and makes the annual beds more productive.",steps:["Plant yarrow, comfrey, and borage in permanent spots — fertility and beneficials for years","Establish perennial herbs (rosemary, thyme, sage, oregano) in well-drained areas","Plant fruit trees or canes if budget allows — they start bearing in 2–3 years","Create beneficial insect corridors with flowering perennials throughout the property","Establish a permanent woodchip mulch system — source chips free from tree services","Build thermal mass where possible: rocks near frost-sensitive plants extend the season"]},
  {phase:5,title:"Manage Pests Systemically",sub:"Ongoing",body:"Feral land has built-up pest pressure because predator-prey balance was disrupted. You're not going to spray your way out of this. Build the ecosystem.",steps:["Retain some pest populations on sacrificial plants — they're the food that keeps beneficials around","Plant diverse flowering habitat throughout the garden, not just in one spot","Identify your worst pests and target companion planting specifically against them","Row cover as first line of defense — cheaper and more effective than most sprays","Spinosad and Bt for breakthrough pressure — biological, breaks down quickly","Be patient: year 3 pest pressure is significantly lower than year 1 if you build habitat"]},
  {phase:6,title:"Scale What Works",sub:"Year 2–5",body:"By year two you have real information: what grows well on this specific land, what sells, what you actually want to do. Scale the wins. Let go of what doesn't fit.",steps:["Expand beds that produced well — don't expand into problem areas prematurely","Save seed from your best performers — adapted to your specific conditions","Document everything: planting dates, yields, what pests hit what, what worked","Build infrastructure that pays off long-term: irrigation, fencing, storage","Add value-added products as the land produces surplus","This is a 5-year project minimum. The farms that last are the ones that didn't try to do everything in year one."]},
];


const plantMap = Object.fromEntries(PLANTS.map(p=>[p.id,p]));
const pestMap  = Object.fromEntries(PESTS.map(p=>[p.id,p]));
const soilMap  = Object.fromEntries(SOIL_TYPES.map(s=>[s.id,s]));
const ccMap    = Object.fromEntries(COVER_CROPS.map(c=>[c.id,c]));

const PLANT_CATS = ["All","Vegetable","Herb","Cut Flower","Fruit"];
const PEST_CATS  = ["All","Sucking","Chewing","Mite","Soil","Disease"];
const ELEV_LABELS = {low:"Low (< 3,000 ft)",mid:"Mid (3,000–6,500 ft)",high:"High (> 6,500 ft)"};
const US_REGIONS  = ["Pacific Northwest","Southwest","Mountain West","Midwest","Northeast","Southeast"];
const USDA_ZONES  = ["3","4","5","6","7","8","9","10","11"];
const FREE_LIMIT  = 3;
const CC_ROLES = {nitrogen:"N-Fixer",suppress:"Weed Suppressor",biomass:"Biomass",compaction:"Compaction Breaker",erosion:"Erosion Control",pollinator:"Pollinator"};
const CC_ROLE_CSS = {nitrogen:"role-nitrogen",suppress:"role-suppress",biomass:"role-biomass",compaction:"role-compaction",erosion:"role-erosion",pollinator:"role-pollinator"};

const PEST_PHOTOS = {"aphid":"Aphid","flea-beetle":"Flea beetle","cucumber-beetle":"Diabrotica undecimpunctata","leafhopper":"Leafhopper","harlequin-bug":"Murgantia histrionica","broad-mite":"Polyphagotarsonemus latus","hornworm":"Manduca quinquemaculata","caterpillar":"Pieris rapae","spider-mite":"Spider mite","squash-vine-borer":"Melittia cucurbitae","squash-bug":"Anasa tristis","colorado-potato-beetle":"Colorado potato beetle","slugs":"Slug","powdery-mildew":"Powdery mildew","late-blight":"Phytophthora infestans","carrot-fly":"Psila rosae"};
const BEN_PHOTOS = {"ladybug":"Coccinellidae","lacewing":"Chrysoperla","parasitic-wasp":"Braconidae","hoverfly":"Hoverfly","ground-beetle":"Carabidae","spider":"Argiope aurantia","lizard":"Western fence lizard","bee":"Halictidae","predatory-mite":"Phytoseiidae","worm-snake":"Common garter snake"};
const SOIL_PHOTOS = {"clay":"Clay soil","sandy":"Sandy soil","loam":"Loam","silt":"Silt","volcanic":"Volcanic rock","hardpan":"Hardpan","caliche":"Caliche","waterlogged":"Waterlogging"};
const PLANT_PHOTOS = {"tomato":"Tomato","pepper":"Capsicum annuum","cucumber":"Cucumber","squash":"Cucurbita","bean":"Phaseolus vulgaris","pea":"Pisum sativum","corn":"Maize","potato":"Potato","lettuce":"Lettuce","kale":"Kale","brassica":"Broccoli","carrot":"Carrot","onion":"Onion","beet":"Beetroot","radish":"Radish","eggplant":"Eggplant","spinach":"Spinach","basil":"Basil","oregano":"Oregano","thyme":"Thymus vulgaris","sage":"Salvia officinalis","mint":"Mentha","chamomile":"Matricaria chamomilla","calendula":"Calendula officinalis","cilantro":"Coriander","parsley":"Parsley","dill":"Anethum graveolens","yarrow":"Achillea millefolium","lavender":"Lavandula","rosemary":"Salvia rosmarinus","borage":"Borago officinalis","comfrey":"Symphytum","echinacea":"Echinacea purpurea","fennel":"Foeniculum vulgare","marigold":"Tagetes","zinnia":"Zinnia elegans","sunflower":"Helianthus annuus","cosmos":"Cosmos bipinnatus","nasturtium":"Tropaeolum majus","dahlia":"Dahlia","yarrow-flower":"Achillea millefolium","strawflower":"Xerochrysum bracteatum","strawberry":"Strawberry","raspberry":"Raspberry","blueberry":"Blueberry"};
const CC_PHOTOS = {"crimson-clover":"Trifolium incarnatum","hairy-vetch":"Vicia villosa","winter-rye":"Secale cereale","daikon-radish":"Daikon","buckwheat":"Fagopyrum esculentum","phacelia":"Phacelia tanacetifolia","field-peas":"Pisum sativum","fava-bean":"Vicia faba","oats":"Avena sativa","mustard":"Sinapis alba","tillage-radish":"Raphanus sativus","sweet-alyssum":"Lobularia maritima","berseem-clover":"Trifolium alexandrinum","calendula-cc":"Calendula officinalis","borage-cc":"Borago officinalis","austrian-winter-pea":"Pisum sativum","flax":"Linum usitatissimum"};

function DetailPhoto({query, alt}) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if(!query) { setLoading(false); return; }
    setLoading(true);
    setError(false);
    setUrl(null);
    // Use Wikimedia Commons API — free, no key, reliable botanical/garden photos
    const encoded = encodeURIComponent(query);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`)
      .then(r => r.json())
      .then(data => {
        if(data.thumbnail?.source) {
          // Upscale the thumbnail for better quality
          const src = data.thumbnail.source.replace(/\/\d+px-/, "/600px-");
          setUrl(src);
        } else {
          // Fallback: Wikimedia image search
          return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&pithumbsize=600&format=json&origin=*`)
            .then(r=>r.json())
            .then(d=>{
              const pages = Object.values(d?.query?.pages||{});
              const thumb = pages[0]?.thumbnail?.source;
              if(thumb) setUrl(thumb); else setError(true);
            });
        }
        setLoading(false);
      })
      .catch(()=>{ setError(true); setLoading(false); });
  }, [query]);

  if(loading) return <div style={{height:"180px",background:"var(--mist)",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",color:"var(--soil)",fontStyle:"italic",marginBottom:"1rem"}}>Loading photo…</div>;
  if(error || !url) return null;
  return <img src={url} alt={alt} onError={()=>setError(true)} style={{width:"100%",height:"200px",objectFit:"cover",borderRadius:"4px",marginBottom:"1rem",display:"block"}}/>;
}

export default function CompanionGarden() {
  const [tab, setTab]               = useState("plants");
  const [soilView, setSoilView]     = useState("types");
  const [query, setQuery]           = useState("");
  const [plantCat, setPlantCat]     = useState("All");
  const [pestCat, setPestCat]       = useState("All");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterZone, setFilterZone]     = useState("");
  const [filterElev, setFilterElev]     = useState("");
  const [ccSeason, setCcSeason]     = useState("");
  const [ccRole, setCcRole]         = useState("");
  const [searches, setSearches]     = useState(0);
  const [unlocked, setUnlocked]     = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedPest, setSelectedPest]   = useState(null);
  const [selectedBen, setSelectedBen]     = useState(null);
  const [selectedSoil, setSelectedSoil]   = useState(null);
  const [selectedCC, setSelectedCC]       = useState(null);
  const [showPaywall, setShowPaywall]     = useState(false);
  const [diagnoseStep, setDiagnoseStep]   = useState("wet");
  const [diagnoseResult, setDiagnoseResult] = useState(null);
  const [aiLoading, setAiLoading]         = useState(false);
  const [aiResult, setAiResult]           = useState(null);
  const [photoMode, setPhotoMode]         = useState(false);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const fileRef = useRef();

  const remaining = Math.max(0, FREE_LIMIT - searches);
  const paywalled = !unlocked && searches >= FREE_LIMIT;

  const track = () => {
    if (!unlocked) setSearches(s => { const n=s+1; if(n>=FREE_LIMIT) setShowPaywall(true); return n; });
  };
  const tryOpen = fn => { if(paywalled){setShowPaywall(true);return;} fn(); };

  const filteredPlants = PLANTS.filter(p => {
    const q = query.toLowerCase();
    const mQ = !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) ||
      (p.friends||[]).some(f=>plantMap[f]?.name.toLowerCase().includes(q));
    const mC = plantCat==="All" || p.cat===plantCat;
    const mR = !filterRegion || (p.regions||[]).includes(filterRegion) || (p.regions||[]).includes("All US regions");
    const mZ = !filterZone || (p.zones||"").includes(filterZone);
    const mE = !filterElev || (p.elevBands||[]).includes(filterElev);
    return mQ && mC && mR && mZ && mE;
  });

  const uniquePests = PESTS.filter((p,i,arr)=>arr.findIndex(x=>x.id===p.id)===i);
  const filteredPests = uniquePests.filter(p => {
    const q = query.toLowerCase();
    const mQ = !q || p.name.toLowerCase().includes(q) || (p.attractedTo||[]).some(id=>plantMap[id]?.name.toLowerCase().includes(q));
    const mC = pestCat==="All" || p.cat===pestCat;
    return mQ && mC;
  });

  const filteredBens = BENEFICIALS.filter(b => {
    const q = query.toLowerCase();
    return !q || b.name.toLowerCase().includes(q) || b.eats.toLowerCase().includes(q);
  });

  const filteredCC = COVER_CROPS.filter(c => {
    const mS = !ccSeason || c.seasons.includes(ccSeason);
    const mR = !ccRole   || c.roles.includes(ccRole);
    return mS && mR;
  });

  const handleSearch = v => { setQuery(v); if(v) track(); };

  const diagStep = DIAGNOSE_STEPS.find(s=>s.id===diagnoseStep);
  const diagSoilId = diagnoseResult ? DIAGNOSE_MAP[diagnoseResult] : null;
  const diagSoil   = diagSoilId ? soilMap[diagSoilId] : null;

  const handleAiSearch = async () => {
    if(!query.trim()) return;
    setAiLoading(true); setAiResult(null); setPhotoMode(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",max_tokens:1000,
          messages:[{role:"user",content:`You are a companion planting and garden expert. Generate a concise plant profile for: "${query}". Return ONLY valid JSON with these exact fields: name, latin, emoji, family, desc, zones, elev, light, soil, germ, care, diy, budget, friends (array of plant names), foes (array of plant names), pests (array of pest names). No markdown, no preamble.`}]
        })
      });
      const data = await res.json();
      const text = data.content?.map(c=>c.text||"").join("") || "";
      const clean = text.replace(/```json|```/g,"").trim();
      setAiResult(JSON.parse(clean));
    } catch(e) {
      setAiResult({name:query,desc:"Unable to generate profile. Check your connection and try again.",error:true});
    }
    setAiLoading(false);
  };

  const handlePhotoUpload = async e => {
    const file = e.target.files?.[0]; if(!file) return;
    setAiLoading(true); setAiResult(null); setPhotoMode(true);
    const reader = new FileReader();
    reader.onload = async ev => {
      const b64 = ev.target.result.split(",")[1];
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            model:"claude-sonnet-4-6",max_tokens:1000,
            messages:[{role:"user",content:[
              {type:"image",source:{type:"base64",media_type:file.type,data:b64}},
              {type:"text",text:"Identify this plant or pest from the garden photo. Return ONLY valid JSON: {type:'plant'|'pest', name, identification, description, action, diy}. No markdown."}
            ]}]
          })
        });
        const data = await res.json();
        const text = data.content?.map(c=>c.text||"").join("") || "";
        const clean = text.replace(/```json|```/g,"").trim();
        setAiResult(JSON.parse(clean));
      } catch(e) {
        setAiResult({name:"Unknown",description:"Could not identify. Try a clearer photo in good light.",error:true});
      }
      setAiLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const PlantDetail = ({plant, onClose}) => (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e=>e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-emoji">{plant.emoji}</div>
          <div style={{flex:1}}>
            <div className="detail-title">{plant.name}</div>
            <div className="detail-latin">{plant.latin}</div>
            <div className="detail-tags">
              <span className="tag tag-cat">{plant.cat}</span>
              <span className="tag tag-zone">{(plant.zones||"").split("(")[0].trim()}</span>
              {(plant.elevBands||[]).map(e=><span key={e} className="tag tag-elev">{ELEV_LABELS[e]}</span>)}
            </div>
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body">
          {PLANT_PHOTOS[plant.id] && <DetailPhoto query={PLANT_PHOTOS[plant.id]} alt={plant.name}/>}
          <p style={{fontSize:"0.86rem",lineHeight:1.65,color:"var(--soil)",marginBottom:"1rem"}}>{plant.desc}</p>
          <div className="detail-grid">
            <div className="detail-box"><div className="detail-box-label">Light</div><div className="detail-box-val">{plant.light}</div></div>
            <div className="detail-box"><div className="detail-box-label">Soil</div><div className="detail-box-val">{plant.soil}</div></div>
            <div className="detail-box"><div className="detail-box-label">Regions</div><div className="detail-box-val">{(plant.regions||[]).join(", ")}</div></div>
            <div className="detail-box"><div className="detail-box-label">Elevation</div><div className="detail-box-val">{plant.elev}</div></div>
          </div>
          {plant.germ && <div className="detail-section"><div className="section-head">Germination</div><div className="germ-note">{plant.germ}</div></div>}
          <div className="detail-section"><div className="section-head">Care Notes</div><div className="care-note">{plant.care}</div></div>
          {plant.diy && <div className="detail-section"><div className="section-head">Make It at Home</div><div className="diy-note">🌿 {plant.diy}</div></div>}
          {plant.budget && <div className="detail-section"><div className="section-head">Budget Tips</div><div className="budget-note">💰 {plant.budget}</div></div>}
          {(plant.friends||[]).length>0 && <div className="detail-section"><div className="section-head">Good Neighbors</div><div className="companion-list">{plant.friends.map(f=><span key={f} className="companion-chip chip-friend" onClick={()=>{const p=plantMap[f];if(p){onClose();setTimeout(()=>setSelectedPlant(p),50);}}}>{plantMap[f]?.emoji||"🌱"} {plantMap[f]?.name||f}</span>)}</div></div>}
          {(plant.foes||[]).length>0 && <div className="detail-section"><div className="section-head">Keep Apart From</div><div className="companion-list">{plant.foes.map(f=><span key={f} className="companion-chip chip-foe">{plantMap[f]?.emoji||"🚫"} {plantMap[f]?.name||f}</span>)}</div></div>}
          {(plant.pests||[]).length>0 && <div className="detail-section"><div className="section-head">Common Pests - tap for full details</div>{plant.pests.map(pid=>{const pest=pestMap[pid];if(!pest)return null;return<div key={pid} className="pest-card"><div className="pest-name">{pest.emoji} {pest.name}</div><div className="pest-damage">{pest.damage}</div><ul className="ul-arrow">{(pest.treatments||[]).slice(0,3).map((t,i)=><li key={i}>{t}</li>)}</ul></div>;})}</div>}
        </div>
      </div>
    </div>
  );

  const PestDetail = ({pest, onClose}) => (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e=>e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-emoji">{pest.emoji}</div>
          <div style={{flex:1}}><div className="detail-title">{pest.name}</div><div className="detail-latin">{pest.latin}</div></div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body">
          {PEST_PHOTOS[pest.id] && <DetailPhoto query={PEST_PHOTOS[pest.id]} alt={pest.name}/>}
          <div className="detail-section"><div className="section-head">How to ID the Damage</div><p style={{fontSize:"0.85rem",lineHeight:1.6,color:"var(--soil)",marginBottom:"0.75rem"}}>{pest.damage}</p><div className="damage-visual">🔍 {pest.visual}</div></div>
          <div className="detail-section"><div className="section-head">Host Plants</div><div className="companion-list">{(pest.attractedTo||[]).map(id=><span key={id} className="companion-chip chip-foe" onClick={()=>{const p=plantMap[id];if(p){onClose();setTimeout(()=>setSelectedPlant(p),50);}}}>{plantMap[id]?.emoji||"🌱"} {plantMap[id]?.name||id}</span>)}</div></div>
          <div className="detail-section"><div className="section-head">Treatment — Organic, Values-Aligned</div><ul className="ul-arrow">{(pest.treatments||[]).map((t,i)=><li key={i}>{t}</li>)}</ul></div>
          {pest.diy && <div className="detail-section"><div className="section-head">Make It at Home</div><div className="diy-note">🌿 {pest.diy}</div></div>}
          {pest.budget && <div className="detail-section"><div className="section-head">Budget Tips</div><div className="budget-note">💰 {pest.budget}</div></div>}
        </div>
      </div>
    </div>
  );

  const BenDetail = ({ben, onClose}) => (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e=>e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-emoji">{ben.emoji}</div>
          <div style={{flex:1}}><div className="detail-title">{ben.name}</div><div className="detail-latin">{ben.latin}</div></div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body">
          {BEN_PHOTOS[ben.id] && <DetailPhoto query={BEN_PHOTOS[ben.id]} alt={ben.name}/>}
          <div className="detail-section"><div className="section-head">Role in the Garden</div><div className="care-note" style={{fontWeight:"bold"}}>{ben.role}</div></div>
          <div className="detail-section"><div className="section-head">What They Eat / Control</div><div className="care-note">{ben.eats}</div></div>
          <div className="detail-section"><div className="section-head">How to Attract & Keep Them</div><div className="germ-note">{ben.howToAttract}</div></div>
          <div className="detail-section"><div className="section-head">Habitat Needs</div><p style={{fontSize:"0.83rem",color:"var(--soil)",lineHeight:1.6}}>{ben.habitat}</p></div>
          {ben.diy && <div className="detail-section"><div className="section-head">Free Habitat Tips</div><div className="diy-note">🌿 {ben.diy}</div></div>}
        </div>
      </div>
    </div>
  );

  const SoilDetail = ({soil, onClose}) => (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e=>e.stopPropagation()}>
        <div className="detail-header" style={{background:soil.color||"var(--bark)"}}>
          <div className="detail-emoji">{soil.emoji}</div>
          <div style={{flex:1}}><div className="detail-title">{soil.name}</div><div className="detail-latin">{soil.feel}</div></div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body">
          {SOIL_PHOTOS[soil.id] && <DetailPhoto query={SOIL_PHOTOS[soil.id]} alt={soil.name}/>}
          <p style={{fontSize:"0.85rem",lineHeight:1.65,color:"var(--soil)",marginBottom:"1rem"}}>{soil.desc}</p>
          {soil.note && <div className="warn-note" style={{marginBottom:"1rem"}}>📍 {soil.note}</div>}
          <div className="detail-grid">
            <div className="detail-box"><div className="detail-box-label">Best For</div><div className="detail-box-val">{soil.bestFor}</div></div>
            <div className="detail-box"><div className="detail-box-label">Main Challenges</div><div className="detail-box-val">{soil.challenges}</div></div>
          </div>
          <div className="detail-section"><div className="section-head">How to Amend</div><div className="care-note">{soil.amend}</div></div>
          <div className="detail-section"><div className="section-head">In-Season Soil Feeding</div><div className="care-note">{soil.inSeason}</div></div>
          <div className="detail-section"><div className="section-head">Make It at Home</div><div className="diy-note">🌿 {soil.diy}</div></div>
          <div className="detail-section"><div className="section-head">Budget Tips</div><div className="budget-note">💰 {soil.budget}</div></div>
          <div className="detail-section"><div className="section-head">Winter Strategy</div><div className="germ-note">{soil.winter}</div></div>
          {soil.coverCrops && <div className="detail-section"><div className="section-head">Recommended Cover Crops</div><div className="companion-list">{soil.coverCrops.map(id=>{const cc=ccMap[id];return cc?<span key={id} className="companion-chip chip-friend" onClick={()=>{onClose();setSoilView("covercrops");setTimeout(()=>setSelectedCC(cc),50);}}>{cc.emoji} {cc.name}</span>:null;})}</div></div>}
        </div>
      </div>
    </div>
  );

  const CCDetail = ({cc, onClose}) => (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e=>e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-emoji">{cc.emoji}</div>
          <div style={{flex:1}}>
            <div className="detail-title">{cc.name}</div>
            <div className="detail-tags">{cc.seasons.map(s=><span key={s} className={`cc-season season-${s}`}>{s}</span>)}<span style={{fontFamily:"'Josefin Sans',sans-serif",fontSize:"0.68rem",color:"var(--dried-herb)",marginLeft:"0.5rem"}}>{cc.family}</span></div>
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body">
          {CC_PHOTOS[cc.id] && <DetailPhoto query={CC_PHOTOS[cc.id]} alt={cc.name}/>}
          <div className="cc-role-chips">{cc.roles.map(r=><span key={r} className={`cc-role-chip ${CC_ROLE_CSS[r]}`}>{CC_ROLES[r]}</span>)}</div>
          <p style={{fontSize:"0.85rem",lineHeight:1.65,color:"var(--soil)",margin:"1rem 0"}}>{cc.desc}</p>
          {cc.note && <div className="warn-note" style={{marginBottom:"1rem"}}>📍 {cc.note}</div>}
          <div className="detail-grid">
            <div className="detail-box"><div className="detail-box-label">When to Plant</div><div className="detail-box-val">{cc.plantWhen}</div></div>
            <div className="detail-box"><div className="detail-box-label">Seeding Rate</div><div className="detail-box-val">{cc.seeding}</div></div>
            <div className="detail-box"><div className="detail-box-label">Elevation Notes</div><div className="detail-box-val">{cc.elev}</div></div>
            <div className="detail-box"><div className="detail-box-label">Soil Benefit</div><div className="detail-box-val">{cc.soilBenefit}</div></div>
          </div>
          <div className="detail-section"><div className="section-head">How to Terminate</div><div className="care-note">{cc.terminate}</div></div>
          <div className="detail-section"><div className="section-head">Budget Tips</div><div className="budget-note">💰 {cc.budget}</div></div>
          {cc.diy && <div className="detail-section"><div className="section-head">DIY / Bonus Uses</div><div className="diy-note">🌿 {cc.diy}</div></div>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div>
        <header className="header">
          <div>
            <div className="header-logo">The Companion <span>Garden</span></div>
            <div className="header-sub">by 4 Dog Farm · Southern Oregon</div>
          </div>
          <nav className="header-nav">
            {[["plants","Plants"],["pests","Pests"],["beneficials","Allies"],["soil","Soil"],["identify","📷 ID"],["reclaim","Reclaim"]].map(([t,l])=>(
              <button key={t} className={`nav-btn ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{l}</button>
            ))}
          </nav>
        </header>

        <div className="hero">
          <div className="hero-content">
            <h1>Know what grows <em>together.</em><br/>Know what's eating it.</h1>
            <p>Companion planting · pest ID · beneficial allies · soil science · reclamation guide</p>
            {tab!=="soil" && tab!=="reclaim" && tab!=="identify" && <>
              <div className="search-row">
                <input className="search-input"
                  placeholder={tab==="plants"?"Search any plant — AI generates profiles for anything not in the database…":tab==="pests"?"Search pest, disease, or host plant…":"Search beneficial or pest they control…"}
                  value={query} onChange={e=>handleSearch(e.target.value)}/>
                {tab==="plants" && <button className="photo-btn" onClick={()=>setTab("identify")}>📷 Photo ID</button>}
                <button className="search-btn" onClick={filteredPlants.length===0&&tab==="plants"?handleAiSearch:undefined}>Search</button>
              </div>
              {tab==="plants" && <>
                <div className="filter-row">
                  <select className="filter-select" value={filterRegion} onChange={e=>setFilterRegion(e.target.value)}>
                    <option value="">All Regions</option>
                    {US_REGIONS.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                  <select className="filter-select" value={filterZone} onChange={e=>setFilterZone(e.target.value)}>
                    <option value="">All USDA Zones</option>
                    {USDA_ZONES.map(z=><option key={z} value={z}>Zone {z}</option>)}
                  </select>
                  <select className="filter-select" value={filterElev} onChange={e=>setFilterElev(e.target.value)}>
                    <option value="">All Elevations</option>
                    {Object.entries(ELEV_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="cat-row" style={{marginTop:"0.5rem"}}>
                  {PLANT_CATS.map(c=><button key={c} className={`cat-btn ${plantCat===c?"active":""}`} onClick={()=>setPlantCat(c)}>{c}</button>)}
                </div>
              </>}
              {tab==="pests" && <div className="cat-row" style={{marginTop:"0.5rem"}}>
                {PEST_CATS.map(c=><button key={c} className={`cat-btn ${pestCat===c?"active":""}`} onClick={()=>setPestCat(c)}>{c}</button>)}
              </div>}
              {!unlocked && <div className={`free-counter ${remaining<=1?"urgent":""}`}>
                {remaining>0?`${remaining} free ${remaining===1?"search":"searches"} remaining`:"Subscribe to continue"}
              </div>}
            </>}
          </div>
        </div>

        <div className="tabs">
          {[["plants","🌿 Plants"],["pests","⚠️ Pests & Disease"],["beneficials","✦ Beneficial Allies"],["soil","🌍 Soil + Cover Crops"],["identify","📷 Photo ID"],["reclaim","🪴 Reclamation Guide"]].map(([t,l])=>(
            <button key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{l}</button>
          ))}
        </div>

        <main className="main">

          {tab==="plants" && <>
            {filteredPlants.length===0 && !aiLoading && !aiResult &&
              <div className="empty">
                <div className="empty-icon">🌱</div>
                <h3>"{query}" isn't in our database yet</h3>
                <p>Let AI generate a full profile for it.</p>
                <button className="empty-ai-btn" onClick={handleAiSearch}>Generate Profile with AI</button>
              </div>}
            {aiLoading && !photoMode && <div className="ai-loading"><span className="ai-loading-dot">Generating profile for "{query}"…</span></div>}
            {aiResult && !photoMode && !aiResult.error && <div className="ai-result">
              <div className="ai-result-label">AI-Generated Profile</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",fontWeight:700,color:"var(--bark)",marginBottom:"0.25rem"}}>{aiResult.emoji} {aiResult.name}</div>
              <div style={{fontStyle:"italic",fontSize:"0.75rem",color:"var(--clay)",marginBottom:"0.75rem"}}>{aiResult.latin} · {aiResult.family}</div>
              <p style={{fontSize:"0.84rem",color:"var(--soil)",lineHeight:1.6,marginBottom:"1rem"}}>{aiResult.desc}</p>
              <div className="detail-grid">
                <div className="detail-box"><div className="detail-box-label">Light</div><div className="detail-box-val">{aiResult.light}</div></div>
                <div className="detail-box"><div className="detail-box-label">Soil</div><div className="detail-box-val">{aiResult.soil}</div></div>
                <div className="detail-box"><div className="detail-box-label">Zones</div><div className="detail-box-val">{aiResult.zones}</div></div>
                <div className="detail-box"><div className="detail-box-label">Elevation</div><div className="detail-box-val">{aiResult.elev}</div></div>
              </div>
              {aiResult.germ && <div className="detail-section"><div className="section-head">Germination</div><div className="germ-note">{aiResult.germ}</div></div>}
              {aiResult.care && <div className="detail-section"><div className="section-head">Care</div><div className="care-note">{aiResult.care}</div></div>}
              {aiResult.diy && <div className="detail-section"><div className="section-head">Make It at Home</div><div className="diy-note">🌿 {aiResult.diy}</div></div>}
              {aiResult.budget && <div className="detail-section"><div className="section-head">Budget Tips</div><div className="budget-note">💰 {aiResult.budget}</div></div>}
              {aiResult.friends?.length>0 && <div className="detail-section"><div className="section-head">Good Neighbors</div><div className="attract-chips">{aiResult.friends.map((f,i)=><span key={i} className="attract-chip">{f}</span>)}</div></div>}
              {aiResult.foes?.length>0 && <div className="detail-section"><div className="section-head">Keep Apart From</div><div className="attract-chips">{aiResult.foes.map((f,i)=><span key={i} style={{background:"#F5E8E8",color:"#8B3A3A",fontFamily:"'Josefin Sans',sans-serif",fontSize:"0.62rem",padding:"0.15rem 0.4rem",borderRadius:"20px"}}>{f}</span>)}</div></div>}
              <button className="diagnose-restart" onClick={()=>{setAiResult(null);setQuery("");}}>Search another plant</button>
            </div>}
            {filteredPlants.length>0 && <div className="grid">{filteredPlants.map(p=>(
              <div key={p.id+p.name} className="card" onClick={()=>tryOpen(()=>setSelectedPlant(p))}>
                <span className="card-emoji">{p.emoji}</span>
                <div className="card-body">
                  <div className="card-name">{p.name}</div>
                  <div className="card-latin">{p.latin}</div>
                  <div className="card-desc">{p.desc}</div>
                  <div className="tag-row">
                    <span className="tag tag-cat">{p.cat}</span>
                    <span className="tag tag-zone">{(p.zones||"").split("(")[0].trim()}</span>
                    {(p.elevBands||[]).map(e=><span key={e} className="tag tag-elev">{ELEV_LABELS[e]}</span>)}
                    {(p.friends||[]).slice(0,1).map(f=><span key={f} className="tag tag-friend">+ {plantMap[f]?.name||f}</span>)}
                    {(p.pests||[]).slice(0,1).map(pe=><span key={pe} className="tag tag-pest">⚠ {pestMap[pe]?.name||pe}</span>)}
                  </div>
                </div>
              </div>))}</div>}
          </>}

          {tab==="pests" && (filteredPests.length===0
            ?<div className="empty"><div className="empty-icon">🔍</div><h3>No results</h3><p>Try a pest name or host plant.</p></div>
            :<div className="pest-grid">{filteredPests.map(pest=>(
              <div key={pest.id} className="pest-lib-card" onClick={()=>tryOpen(()=>setSelectedPest(pest))}>
                <div className="pest-lib-header">
                  <div className="pest-emoji">{pest.emoji}</div>
                  <div><div className="pest-lib-name">{pest.name}</div><div className="pest-lib-latin">{pest.latin}</div></div>
                </div>
                <div className="pest-lib-body">
                  <div className="damage-label">Damage signs</div>
                  <div className="damage-desc">{pest.damage}</div>
                  <div className="damage-visual">🔍 {(pest.visual||"").slice(0,100)}…</div>
                  <div className="attract-label">Attracted to</div>
                  <div className="attract-chips">{(pest.attractedTo||[]).slice(0,4).map(id=><span key={id} className="attract-chip">{plantMap[id]?.name||id}</span>)}</div>
                </div>
              </div>))}</div>)}

          {tab==="beneficials" && <div className="ben-grid">{filteredBens.map(b=>(
            <div key={b.id} className="ben-card" onClick={()=>tryOpen(()=>setSelectedBen(b))}>
              <div className="ben-header">
                <div className="ben-emoji">{b.emoji}</div>
                <div><div className="ben-name">{b.name}</div><div className="ben-latin">{b.latin}</div></div>
              </div>
              <div className="ben-body">
                <div className="ben-role-label">Role</div>
                <div className="ben-role">{b.role}</div>
                <div className="ben-eats-label">What they eat</div>
                <div className="ben-eats">{b.eats.slice(0,100)}…</div>
                <div className="ben-attract-label">How to attract</div>
                <div className="ben-attract">{b.howToAttract.slice(0,90)}…</div>
              </div>
            </div>))}</div>}

          {tab==="soil" && <>
            <div className="soil-sub-tabs">
              {[["types","Soil Types"],["diagnose","Diagnose My Soil"],["covercrops","Cover Crops"]].map(([v,l])=>(
                <button key={v} className={`soil-sub-tab ${soilView===v?"active":""}`} onClick={()=>setSoilView(v)}>{l}</button>
              ))}
            </div>
            {soilView==="types" && <div className="soil-grid">{SOIL_TYPES.map(s=>(
              <div key={s.id} className="soil-card" onClick={()=>setSelectedSoil(s)}>
                <div className="soil-swatch" style={{background:s.bgColor}}>{s.emoji}</div>
                <div className="soil-card-body">
                  <div className="soil-card-name">{s.name}</div>
                  <div className="soil-card-feel">{s.feel}</div>
                  <div className="soil-card-desc">{s.desc.slice(0,110)}…</div>
                </div>
              </div>))}</div>}
            {soilView==="diagnose" && <div className="diagnose-wrap">
              {!diagnoseResult
                ?<div className="diagnose-card">
                  <div className="diagnose-q">{diagStep?.question}</div>
                  <div className="diagnose-hint">{diagStep?.hint}</div>
                  <div className="diagnose-options">{diagStep?.options.map((o,i)=>(
                    <button key={i} className="diagnose-opt" onClick={()=>o.next.startsWith("result-")?setDiagnoseResult(o.next):setDiagnoseStep(o.next)}>{o.label}</button>
                  ))}</div>
                </div>
                :<div className="diagnose-result">
                  <div style={{fontSize:"3rem",marginBottom:"0.5rem"}}>{diagSoil?.emoji}</div>
                  <div className="diagnose-result-title">Looks like: {diagSoil?.name}</div>
                  <div className="diagnose-result-sub">{diagSoil?.feel}</div>
                  <p style={{fontSize:"0.83rem",color:"var(--soil)",lineHeight:1.6,marginBottom:"1rem"}}>{diagSoil?.desc}</p>
                  {diagSoil?.note && <div className="warn-note" style={{marginBottom:"1rem"}}>📍 {diagSoil.note}</div>}
                  <div className="detail-section"><div className="section-head">How to Amend</div><div className="care-note">{diagSoil?.amend}</div></div>
                  <div className="detail-section"><div className="section-head">Make It at Home</div><div className="diy-note">🌿 {diagSoil?.diy}</div></div>
                  <div className="detail-section"><div className="section-head">Budget Tips</div><div className="budget-note">💰 {diagSoil?.budget}</div></div>
                  <div className="detail-section"><div className="section-head">Winter Strategy</div><div className="germ-note">{diagSoil?.winter}</div></div>
                  {diagSoil?.coverCrops && <div className="detail-section"><div className="section-head">Recommended Cover Crops</div><div className="companion-list">{diagSoil.coverCrops.map(id=>{const cc=ccMap[id];return cc?<span key={id} className="companion-chip chip-friend" onClick={()=>{setSoilView("covercrops");setSelectedCC(cc);}}>{cc.emoji} {cc.name}</span>:null;})}</div></div>}
                  <div className="diagnose-actions">
                    <button className="diagnose-restart" onClick={()=>{setDiagnoseResult(null);setDiagnoseStep("wet");}}>Start over</button>
                    <button className="diagnose-restart" onClick={()=>setSelectedSoil(diagSoil)}>Full soil profile →</button>
                  </div>
                </div>}
            </div>}
            {soilView==="covercrops" && <>
              <div className="cc-filters">
                <span className="cc-filter-label">Season:</span>
                {["spring","summer","fall","winter"].map(s=><button key={s} className={`cc-filter ${ccSeason===s?"active":""}`} onClick={()=>setCcSeason(ccSeason===s?"":s)}>{s}</button>)}
                <span className="cc-filter-label" style={{marginLeft:"0.75rem"}}>Role:</span>
                {Object.entries(CC_ROLES).map(([k,v])=><button key={k} className={`cc-filter ${ccRole===k?"active":""}`} onClick={()=>setCcRole(ccRole===k?"":k)}>{v}</button>)}
              </div>
              <div className="cc-grid">{filteredCC.map(cc=>(
                <div key={cc.id} className="cc-card" onClick={()=>setSelectedCC(cc)}>
                  <div className="cc-header">
                    <div className="cc-emoji">{cc.emoji}</div>
                    <div>
                      <div className="cc-name">{cc.name}</div>
                      <div className="cc-season-tags">{cc.seasons.map(s=><span key={s} className={`cc-season season-${s}`}>{s}</span>)}</div>
                    </div>
                  </div>
                  <div className="cc-body">
                    <div className="cc-role-chips">{cc.roles.map(r=><span key={r} className={`cc-role-chip ${CC_ROLE_CSS[r]}`}>{CC_ROLES[r]}</span>)}</div>
                    <div className="cc-desc">{cc.desc.slice(0,130)}…</div>
                  </div>
                </div>))}</div>
            </>}
          </>}

          {tab==="identify" && <div style={{maxWidth:"640px",margin:"0 auto"}}>
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"var(--bark)",marginBottom:"0.5rem"}}>Photo Identification</div>
              <p style={{fontSize:"0.83rem",color:"var(--soil)",lineHeight:1.6}}>Upload a photo of a plant or pest — or damage you can't identify. AI tells you what it is and what to do.</p>
            </div>
            <input type="file" accept="image/*" ref={fileRef} style={{display:"none"}} onChange={handlePhotoUpload}/>
            <div className="photo-upload-area" onClick={()=>fileRef.current?.click()}>
              <div className="photo-upload-icon">📷</div>
              <div className="photo-upload-text">Tap to upload a photo</div>
              <div className="photo-upload-sub">Plant ID · Pest ID · Damage diagnosis</div>
            </div>
            {aiLoading && photoMode && <div className="ai-loading"><span className="ai-loading-dot">Analyzing your photo…</span></div>}
            {aiResult && photoMode && <div className="ai-result">
              <div className="ai-result-label">{aiResult.type==="pest"?"Pest Identified":"Plant Identified"}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",fontWeight:700,color:"var(--bark)",marginBottom:"0.5rem"}}>{aiResult.name}</div>
              <p style={{fontSize:"0.83rem",color:"var(--soil)",lineHeight:1.6,marginBottom:"1rem"}}>{aiResult.identification||aiResult.description}</p>
              <div className="detail-section"><div className="section-head">{aiResult.type==="pest"?"What to Do":"Companion Planting"}</div><div className="care-note">{aiResult.action}</div></div>
              {aiResult.diy && <div className="detail-section"><div className="section-head">Make It at Home / Budget Options</div><div className="diy-note">🌿 {aiResult.diy}</div></div>}
              <button className="diagnose-restart" style={{marginTop:"1rem"}} onClick={()=>{setAiResult(null);setPhotoMode(false);}}>Upload another photo</button>
            </div>}
          </div>}

          {tab==="reclaim" && <div className="reclaim-section">
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",color:"var(--bark)",marginBottom:"0.5rem"}}>Reclaiming Feral Land</div>
              <p style={{fontSize:"0.83rem",color:"var(--soil)",lineHeight:1.65,maxWidth:"640px"}}>A sequential roadmap for turning neglected, compacted, pest-pressured land into a productive garden ecosystem. Honest about what takes time. Specific about what to do first.</p>
            </div>
            {RECLAMATION.map(ph=>(
              <div key={ph.phase} className="reclaim-phase">
                <div className="reclaim-phase-header" onClick={()=>setExpandedPhase(expandedPhase===ph.phase?null:ph.phase)}>
                  <div className="reclaim-phase-num">0{ph.phase}</div>
                  <div>
                    <div className="reclaim-phase-title">{ph.title}</div>
                    <div className="reclaim-phase-sub">{ph.sub}</div>
                  </div>
                  <div style={{marginLeft:"auto",color:"var(--dried-herb)",fontSize:"1.2rem"}}>{expandedPhase===ph.phase?"−":"+"}</div>
                </div>
                {expandedPhase===ph.phase && <div className="reclaim-phase-body">
                  <p style={{fontSize:"0.82rem",color:"var(--soil)",lineHeight:1.65,marginBottom:"1rem"}}>{ph.body}</p>
                  <ul className="reclaim-steps">{ph.steps.map((s,i)=><li key={i}>{s}</li>)}</ul>
                </div>}
              </div>
            ))}
          </div>}

        </main>

        {selectedPlant && <PlantDetail plant={selectedPlant} onClose={()=>setSelectedPlant(null)}/>}
        {selectedPest  && <PestDetail  pest={selectedPest}   onClose={()=>setSelectedPest(null)}/>}
        {selectedBen   && <BenDetail   ben={selectedBen}     onClose={()=>setSelectedBen(null)}/>}
        {selectedSoil  && <SoilDetail  soil={selectedSoil}   onClose={()=>setSelectedSoil(null)}/>}
        {selectedCC    && <CCDetail    cc={selectedCC}       onClose={()=>setSelectedCC(null)}/>}

        {showPaywall && <div className="paywall">
          <div className="paywall-box">
            <div className="paywall-top">
              <h2>Keep growing with us.</h2>
              <p>You've used your 3 free searches. Less than a seed packet to unlock everything.</p>
            </div>
            <div className="paywall-body">
              <ul className="paywall-features">
                <li>Unlimited plant, pest, disease & beneficial searches</li>
                <li>AI-generated profiles for any plant not in the database</li>
                <li>Photo ID — upload a photo, get an instant identification</li>
                <li>Filter by region, USDA zone & elevation</li>
                <li>Complete soil type library + amendment guides</li>
                <li>17 cover crops with elevation & season filters</li>
                <li>Make-it-at-home & budget tips throughout</li>
                <li>Full reclamation guide for feral land</li>
              </ul>
              <div className="paywall-plans">
                <div className={`paywall-plan ${selectedPlan==="monthly"?"selected":""}`} onClick={()=>setSelectedPlan("monthly")}>
                  <div className="paywall-plan-price">$12</div>
                  <div className="paywall-plan-period">per month</div>
                </div>
                <div className={`paywall-plan ${selectedPlan==="annual"?"selected":""}`} onClick={()=>setSelectedPlan("annual")}>
                  <div className="paywall-plan-badge">2 months free</div>
                  <div className="paywall-plan-price">$120</div>
                  <div className="paywall-plan-period">per year</div>
                  <div className="paywall-plan-save">Save $24</div>
                </div>
              </div>
              <button className="paywall-cta" onClick={()=>{alert(`Stripe checkout for ${selectedPlan} plan opens here.`);setUnlocked(true);setShowPaywall(false);}}>
                Subscribe — {selectedPlan==="annual"?"$120/year":"$12/month"}
              </button>
              <button className="paywall-dismiss" onClick={()=>setShowPaywall(false)}>Not right now</button>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
}
