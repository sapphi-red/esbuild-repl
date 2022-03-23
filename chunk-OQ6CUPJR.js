import{c as l,d as b,e as E,g as f,h as x,i as R,ma as _,na as $,oa as m,pa as M,qa as w}from"./chunk-3JCEGZ6A.js";import{a as d,b as I}from"./chunk-ON5OQYWL.js";var D=d((K,k)=>{function a(e,t){typeof t=="boolean"&&(t={forever:t}),this._originalTimeouts=JSON.parse(JSON.stringify(e)),this._timeouts=e,this._options=t||{},this._maxRetryTime=t&&t.maxRetryTime||1/0,this._fn=null,this._errors=[],this._attempts=1,this._operationTimeout=null,this._operationTimeoutCb=null,this._timeout=null,this._operationStart=null,this._timer=null,this._options.forever&&(this._cachedTimeouts=this._timeouts.slice(0))}k.exports=a;a.prototype.reset=function(){this._attempts=1,this._timeouts=this._originalTimeouts.slice(0)};a.prototype.stop=function(){this._timeout&&clearTimeout(this._timeout),this._timer&&clearTimeout(this._timer),this._timeouts=[],this._cachedTimeouts=null};a.prototype.retry=function(e){if(this._timeout&&clearTimeout(this._timeout),!e)return!1;var t=new Date().getTime();if(e&&t-this._operationStart>=this._maxRetryTime)return this._errors.push(e),this._errors.unshift(new Error("RetryOperation timeout occurred")),!1;this._errors.push(e);var i=this._timeouts.shift();if(i===void 0)if(this._cachedTimeouts)this._errors.splice(0,this._errors.length-1),i=this._cachedTimeouts.slice(-1);else return!1;var r=this;return this._timer=setTimeout(function(){r._attempts++,r._operationTimeoutCb&&(r._timeout=setTimeout(function(){r._operationTimeoutCb(r._attempts)},r._operationTimeout),r._options.unref&&r._timeout.unref()),r._fn(r._attempts)},i),this._options.unref&&this._timer.unref(),!0};a.prototype.attempt=function(e,t){this._fn=e,t&&(t.timeout&&(this._operationTimeout=t.timeout),t.cb&&(this._operationTimeoutCb=t.cb));var i=this;this._operationTimeoutCb&&(this._timeout=setTimeout(function(){i._operationTimeoutCb()},i._operationTimeout)),this._operationStart=new Date().getTime(),this._fn(this._attempts)};a.prototype.try=function(e){console.log("Using RetryOperation.try() is deprecated"),this.attempt(e)};a.prototype.start=function(e){console.log("Using RetryOperation.start() is deprecated"),this.attempt(e)};a.prototype.start=a.prototype.try;a.prototype.errors=function(){return this._errors};a.prototype.attempts=function(){return this._attempts};a.prototype.mainError=function(){if(this._errors.length===0)return null;for(var e={},t=null,i=0,r=0;r<this._errors.length;r++){var o=this._errors[r],s=o.message,n=(e[s]||0)+1;e[s]=n,n>=i&&(t=o,i=n)}return t}});var C=d(u=>{var P=D();u.operation=function(e){var t=u.timeouts(e);return new P(t,{forever:e&&(e.forever||e.retries===1/0),unref:e&&e.unref,maxRetryTime:e&&e.maxRetryTime})};u.timeouts=function(e){if(e instanceof Array)return[].concat(e);var t={retries:10,factor:2,minTimeout:1*1e3,maxTimeout:1/0,randomize:!1};for(var i in e)t[i]=e[i];if(t.minTimeout>t.maxTimeout)throw new Error("minTimeout is greater than maxTimeout");for(var r=[],o=0;o<t.retries;o++)r.push(this.createTimeout(o,t));return e&&e.forever&&!r.length&&r.push(this.createTimeout(o,t)),r.sort(function(s,n){return s-n}),r};u.createTimeout=function(e,t){var i=t.randomize?Math.random()+1:1,r=Math.round(i*Math.max(t.minTimeout,1)*Math.pow(t.factor,e));return r=Math.min(r,t.maxTimeout),r};u.wrap=function(e,t,i){if(t instanceof Array&&(i=t,t=null),!i){i=[];for(var r in e)typeof e[r]=="function"&&i.push(r)}for(var o=0;o<i.length;o++){var s=i[o],n=e[s];e[s]=function(z){var h=u.operation(t),p=Array.prototype.slice.call(arguments,1),N=p.pop();p.push(function(T){h.retry(T)||(T&&(arguments[0]=h.mainError()),N.apply(this,arguments))}),h.attempt(function(){z.apply(e,p)})}.bind(e,n),e[s].options=t}}});var L=d((Z,S)=>{S.exports=C()});var A=I(L(),1),W=new Set(["Failed to fetch","NetworkError when attempting to fetch resource.","The Internet connection appears to be offline.","Network request failed"]),F=class extends Error{constructor(t){super();t instanceof Error?(this.originalError=t,{message:t}=t):(this.originalError=new Error(t),this.originalError.stack=this.stack),this.name="AbortError",this.message=t}},q=(e,t,i)=>{let r=i.retries-(t-1);return e.attemptNumber=t,e.retriesLeft=r,e},B=e=>W.has(e),U=e=>globalThis.DOMException===void 0?new Error(e):new DOMException(e);async function c(e,t){return new Promise((i,r)=>{t={onFailedAttempt(){},retries:10,...t};let o=A.default.operation(t);o.attempt(async s=>{try{i(await e(s))}catch(n){if(!(n instanceof Error)){r(new TypeError(`Non-error was thrown: "${n}". You should only throw errors.`));return}if(n instanceof F)o.stop(),r(n.originalError);else if(n instanceof TypeError&&!B(n.message))o.stop(),r(n);else{q(n,s,t);try{await t.onFailedAttempt(n)}catch(v){r(v);return}o.retry(n)||r(o.mainError())}}}),t.signal&&!t.signal.aborted&&t.signal.addEventListener("abort",()=>{o.stop();let s=t.signal.reason===void 0?U("The operation was aborted."):t.signal.reason;r(s instanceof Error?s:U(s))},{once:!0})})}var y=["https://cdn.jsdelivr.net/npm","https://unpkg.com"],J=(e,t)=>`${y[e]}/esbuild-wasm@${t}/lib/browser.min.js`,Q=(e,t)=>`${y[e]}/esbuild-wasm@${t}/esbuild.wasm`;async function V(){let e=R().version||"latest";console.log("loading esbuild @",e);let t={initialize:l,build:l,formatMessages:l,transform:l,version:"none"};if(!f){w.set(t);return}for(let i=0;i<y.length;++i)try{let r=J(i,e);m.set("Fetching "+r),await c(()=>O(Y(r,()=>b(window.esbuild))),{retries:3}),t=window.esbuild,M.set(t.version);let o=Q(i,t.version);m.set("Downloading "+o),await c(()=>O(t.initialize({wasmURL:o})),{retries:3}),await t.transform("let a = 1");break}catch{continue}if(t.version==="none")throw new Error("Error: failed to load esbuild-wasm, try refresh the page.");w.set(t),console.log("loaded esbuild @",t.version)}async function O(e){try{return await e}catch(t){throw m.set(String(t)),console.error(t),t}}function Y(e,t){return new Promise((i,r)=>{let o=document.createElement("script");o.onload=async()=>{t()&&i();for(let s=0;s<10;++s)await E(100),t()&&i();r(new Error(`Failed to import ${e}.`))},o.onerror=()=>{o.remove(),r()},o.src=e,document.head.append(o)})}(async()=>{try{await V(),m.set("Ready."),$.set(!1)}catch(e){m.set(String(e)),console.error(e)}})();navigator.serviceWorker?.register("./sw.js").then(e=>console.log("registered sw.js in scope:",e.scope)).catch(e=>console.log("failed to register sw.js:",e));var g=f&&window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null;if(g){let e=()=>_.set(g.matches?"dark":"light");g.addEventListener("change",e),e()}_.subscribe(e=>{f&&(document.body.dataset.theme=e)});x?import("./editor-T46RCK72.js"):import("./editor-T46RCK72.js");
//# sourceMappingURL=chunk-OQ6CUPJR.js.map