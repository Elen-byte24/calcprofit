(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&f(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const{jsPDF:I}=window.jspdf;let v=[];document.querySelector("#app").innerHTML+=`
  <form id="calc-form">
    <div class="form-grid">
      <div class="form-group">
        <label for="clientsNormal">Клиенты в обычный месяц</label>
        <input id="clientsNormal" type="number" required />
      </div>
      <div class="form-group">
        <label for="clientsHoliday">Клиенты в праздничный месяц</label>
        <input id="clientsHoliday" type="number" required />
      </div>
      <div class="form-group">
        <label for="price">Средний чек (руб.)</label>
        <input id="price" type="number" required />
      </div>
      <div class="form-group">
        <label for="priceIncrease">Увеличение цены через 6 месяцев (%)</label>
        <input id="priceIncrease" type="number" value="0" />
      </div>
      <div class="form-group">
        <label for="rent">Аренда (руб./мес)</label>
        <input id="rent" type="number" required />
      </div>
      <div class="form-group">
        <label for="salary">Зарплата сотрудника (руб.)</label>
        <input id="salary" type="number" required />
      </div>
      <div class="form-group">
        <label for="partner">Доля партнёра (%)</label>
        <input id="partner" type="number" required />
      </div>
      <div class="form-group">
        <label for="accounting">Бухгалтерия (руб./мес)</label>
        <input id="accounting" type="number" required />
      </div>
      <div class="form-group">
        <label for="marketing">Маркетинг (руб./мес)</label>
        <input id="marketing" type="number" required />
      </div>
      <div class="form-group">
        <label for="purchase">Закупка товаров (руб./мес)</label>
        <input id="purchase" type="number" required />
      </div>
      <div class="form-group">
        <label for="tax">Налоговая система</label>
        <select id="tax" required>
          <option value="usn6">УСН Доходы (6%)</option>
          <option value="usn15">УСН Доходы минус расходы (15%)</option>
          <option value="osno">ОСНО (20% налог на прибыль + НДС)</option>
          <option value="ndsOnly">Только НДС</option>
        </select>
      </div>
      <div class="form-group">
        <label for="ndsRate">Ставка НДС (%)</label>
        <select id="ndsRate">
          <option value="20">20%</option>
          <option value="10">10%</option>
          <option value="5">5%</option>
          <option value="0">0%</option>
        </select>
      </div>
    </div>
    <button type="submit">Рассчитать</button>
  </form>
  <div style="margin-top: 20px;">
    <button id="exportExcel">Скачать в Excel</button>
    <button id="exportPdf">Скачать PDF</button>
  </div>
  <div id="results"></div>
`;var P;(P=document.getElementById("calc-form"))==null||P.addEventListener("submit",function(a){a.preventDefault();const e=l=>{const b=document.getElementById(l);return b&&b.value?parseFloat(b.value):0},r=e("clientsNormal"),f=e("clientsHoliday"),t=e("price"),o=e("priceIncrease")/100,u=e("rent"),w=e("salary"),B=e("partner"),H=e("accounting"),$=e("marketing"),k=e("purchase"),F=document.getElementById("tax"),m=F?F.value:"usn6",L=document.getElementById("ndsRate"),y=L?parseFloat(L.value):20;v=[];let g=`
    <h2>Результаты по месяцам:</h2>
    <table>
      <thead>
        <tr>
          <th>Месяц</th>
          <th>Клиенты</th>
          <th>Цена</th>
          <th>Выручка</th>
          <th>Расходы</th>
          <th>Доля партнёра</th>
          <th>Налог</th>
          <th>Чистая прибыль</th>
        </tr>
      </thead>
      <tbody>
  `;for(let l=1;l<=12;l++){const h=[1,2,12].includes(l)?f:r,x=l>6?t*(1+o):t,n=h*x,O=u+w+H+$,s=n*(B/100),d=O+k;let i=0,c=0;if(m==="usn6")i=n*.06,c=n-d-s-i;else if(m==="usn15"){const p=n-d-s;i=p>0?p*.15:n*.01,c=n-d-s-i}else if(m==="osno"){const p=n*(100/(100+y)),T=n-p,q=p-d-s,j=q>0?q*.2:0;i=T+j,c=n-d-s-i}else m==="ndsOnly"&&(i=n*(y/(100+y)),c=n-d-s-i);v.push({Месяц:l,Клиенты:h,Цена:x.toFixed(2),Выручка:n,Расходы:d,"Доля партнёра":s,Налог:i,"Чистая прибыль":c});const N=c>=0?'style="background-color:#d4edda;"':'style="background-color:#f8d7da;"';g+=`
      <tr ${N}>
        <td>${l}</td>
        <td>${h}</td>
        <td>${x.toFixed(2)}</td>
        <td>${n.toFixed(0)}</td>
        <td>${d.toFixed(0)}</td>
        <td>${s.toFixed(0)}</td>
        <td>${i.toFixed(0)}</td>
        <td><strong>${c.toFixed(0)}</strong></td>
      </tr>
    `}g+="</tbody></table>";const E=document.getElementById("results");E&&(E.innerHTML=g)});var S;(S=document.getElementById("exportExcel"))==null||S.addEventListener("click",()=>{if(typeof window.XLSX>"u"){alert("Библиотека XLSX не загружена. Проверьте подключение скрипта в index.html");return}const a=window.XLSX.utils.json_to_sheet(v),e=window.XLSX.utils.book_new();window.XLSX.utils.book_append_sheet(e,a,"Отчёт"),window.XLSX.writeFile(e,"calc-report.xlsx")});var X;(X=document.getElementById("exportPdf"))==null||X.addEventListener("click",()=>{if(typeof I>"u"){alert(`Библиотека jsPDF не загружена. Убедитесь, что она установлена:
npm install jspdf jspdf-autotable`);return}const a=new I,e=v.map(r=>[r.Месяц,r.Клиенты,r.Цена,r.Выручка.toFixed(0),r.Расходы.toFixed(0),r["Доля партнёра"].toFixed(0),r.Налог.toFixed(0),r["Чистая прибыль"].toFixed(0)]);a.autoTable({head:[["","","","","","","",""]],body:e,startY:10,styles:{fontSize:10}}),a.save("calc-report.pdf")});
