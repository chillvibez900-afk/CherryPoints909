const packages=[
{name:'Starter',points:2000,price:5},
{name:'Basic',points:4000,price:10},
{name:'Popular',points:20000,price:50,featured:true},
{name:'Plus',points:45000,price:100},
{name:'Premium',points:125000,price:250},
{name:'VIP',points:275000,price:500},
{name:'Elite',points:600000,price:1000}
];
const deals=[
{name:'Miami Beach Hotel',type:'Hotel',icon:'🏨',cash:119,points:11900,detail:'1 night • Demo offer'},
{name:'Las Vegas Resort',type:'Hotel',icon:'🌴',cash:149,points:14900,detail:'1 night • Demo offer'},
{name:'New York Flight',type:'Flight',icon:'✈️',cash:299,points:29900,detail:'Round trip • Demo offer'}
];
let balance=Number(localStorage.getItem('cherryBalance')||1000);
function save(){localStorage.setItem('cherryBalance',balance);document.querySelector('#balance').textContent=balance.toLocaleString();document.querySelector('#statBalance').textContent=balance.toLocaleString()}
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}
function renderPackages(){document.querySelector('#packages').innerHTML=packages.map((p,i)=>`<div class="package ${p.featured?'featured':''}">${p.featured?'<span class="tag">MOST POPULAR</span>':''}<h3>${p.name}</h3><div class="points">${p.points.toLocaleString()}</div><div class="price">CherryPoints • $${p.price}</div><button onclick="buy(${i})">Buy ${p.points.toLocaleString()}</button></div>`).join('')}
function renderDeals(){document.querySelector('#dealsGrid').innerHTML=deals.map((d,i)=>`<div class="deal"><div class="deal-img">${d.icon}</div><div class="deal-body"><p>${d.type}</p><h3>${d.name}</h3><p>${d.detail}</p><div class="deal-price">${d.points.toLocaleString()} points</div><button onclick="redeem(${i})">Redeem Deal</button></div></div>`).join('')}
function modal(html){document.querySelector('#modalContent').innerHTML=html;document.querySelector('#modal').classList.remove('hidden')}
function closeModal(){document.querySelector('#modal').classList.add('hidden')}
function buy(i){const p=packages[i];modal(`<h2>Buy ${p.points.toLocaleString()} CherryPoints</h2><p>Price: <strong>$${p.price}</strong></p><p>This MVP does not process real payments yet. Connect Stripe or another payment provider for production.</p><button onclick="demoPurchase(${p.points})">Simulate Purchase</button>`)}
function demoPurchase(points){balance+=points;save();closeModal();alert(points.toLocaleString()+' CherryPoints added to your demo balance.')}
function redeem(i){const d=deals[i];if(balance<d.points){modal(`<h2>Not enough points</h2><p>You need ${(d.points-balance).toLocaleString()} more CherryPoints for this demo deal.</p><button onclick="closeModal()">Close</button>`);return}balance-=d.points;save();modal(`<h2>Deal Reserved 🎉</h2><p>${d.name} is reserved in this demo. Production booking will connect to an authorized travel supplier.</p><p><strong>${d.points.toLocaleString()}</strong> points deducted.</p><button onclick="closeModal()">Done</button>`)}
function claimWelcome(){modal('<h2>Welcome Bonus</h2><p>Your demo account already started with 1,000 points.</p><button onclick="closeModal()">Close</button>')}
function claimDaily(){let day=localStorage.getItem('daily');let today=new Date().toDateString();if(day===today){modal('<h2>Already claimed</h2><p>Your daily points were already claimed today.</p><button onclick="closeModal()">Close</button>');return}localStorage.setItem('daily',today);balance+=100;save();modal('<h2>+100 CherryPoints 🍒</h2><p>Your daily check-in points have been added.</p><button onclick="closeModal()">Done</button>')}
function claimReferral(){modal('<h2>Your Referral Code</h2><p style="font-size:28px;font-weight:900">CHERRY-FRIEND</p><p>Production version will generate unique referral codes and track qualified referrals.</p><button onclick="closeModal()">Close</button>')}
function showTransactions(){modal('<h2>Activity</h2><p>🍒 Welcome bonus: +1,000</p><p>💳 Purchases and redemptions will appear here in the production ledger.</p><button onclick="closeModal()">Close</button>')}
renderPackages();renderDeals();save();