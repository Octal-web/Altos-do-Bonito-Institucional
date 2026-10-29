const p=t=>String(t??"").replace(/<[^>]*>/g," ").replace(/&(nbsp|amp|quot|apos|lt|gt);/g,(e,a)=>({nbsp:" ",amp:"&",quot:'"',apos:"'",lt:"<",gt:">"})[a]).replace(/\s+/g," ").trim();export{p as a};
