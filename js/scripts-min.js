function setupCover(){var a=document.getElementById("thepage");document.body.style.paddingBottom=a.clientHeight+"px",document.body.classList.toggle("cover-closed");var b=null,c=function(){document.body.classList.toggle("cover-closed",window.scrollY<=window.innerHeight)};window.addEventListener("scroll",c,{passive:!0});var d=function(){null===b&&(b=setTimeout(function(){a=document.getElementById("thepage"),document.body.style.paddingBottom=a.clientHeight+"px"},200))};window.addEventListener("resize",d,{passive:!0})}function scribbleTitle(){var a=document.getElementById("sitetitle").getContext("2d"),b=50,c=b,d=10,e="CITR",f=30,g=0;a.font="92px scriptorama-tradeshow-jf, sans-serif",a.lineWidth=1,a.lineJoin="round",a.globalAlpha=1,a.strokeStyle=a.fillStyle="white",function h(){a.setLineDash([b-c,c-d]),c-=d,a.strokeText(e[g],f,90),c>0?requestAnimationFrame(h):(a.fillText(e[g],f,90),c=b,f+=a.measureText(e[g++]).width+a.lineWidth*Math.random(),a.setTransform(1,0,0,1,0,3*Math.random()),a.rotate(.005*Math.random()),g<e.length&&requestAnimationFrame(h))}()}function infinitescroll(){var a=$(".infinitescroll"),b=$(a).children(".load-more"),c=2,d=!1,e={allow:!0,reallow:function(){e.allow=!0},delay:400};$(window).scroll(function(){if(d===!1&&e.allow){e.allow=!1,setTimeout(e.reallow,e.delay);var f=$(b).offset().top-$(window).scrollTop();1200>f&&d===!1&&(d=!0,$.getJSON("/wp-json/wp/v2/posts?page="+c,function(b){var e;console.log("Loaded page "+c),b.forEach(function(a,b){e+='<article class="archive block">\n\t\t\t\t\t\t\t\t<div class="image">\n\t\t\t\t\t\t\t\t\t<a href="'+a.link+'" name="'+a.title.rendered+'">\n\t\t\t\t\t\t\t\t\t\t<img srcset="'+a.featured_image_srcset+'" alt="'+a.title.rendered+'" title="'+a.title.rendered+'" />\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="info">\n\t\t\t\t\t\t\t\t\t<a href="'+a.link+'" name="'+a.title.rendered+'" class="simple">\n\t\t\t\t\t\t\t\t\t\t'+a.custom_title+"\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<p>"+a.custom_excerpt+'</p>\n\t\t\t\t\t\t\t\t\t<span class="more">\n\t\t\t\t\t\t\t\t\t\t<a href="'+a.link+'" name="'+a.title.rendered+'">Read more</a>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</article>'}),a.append(e),c++,d=!1}))}})}!function(a,b){"function"==typeof define&&define.amd?define(function(){return b(a)}):b(a)}(this,function(a){var b=function(){function b(a){return null==a?String(a):X[Y.call(a)]||"object"}function c(a){return"function"==b(a)}function d(a){return null!=a&&a==a.window}function e(a){return null!=a&&a.nodeType==a.DOCUMENT_NODE}function f(a){return"object"==b(a)}function g(a){return f(a)&&!d(a)&&Object.getPrototypeOf(a)==Object.prototype}function h(a){var b=!!a&&"length"in a&&a.length,c=z.type(a);return"function"!=c&&!d(a)&&("array"==c||0===b||"number"==typeof b&&b>0&&b-1 in a)}function i(a){return F.call(a,function(a){return null!=a})}function j(a){return a.length>0?z.fn.concat.apply([],a):a}function k(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(a){return a in J?J[a]:J[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function m(a,b){return"number"!=typeof b||K[k(a)]?b:b+"px"}function n(a){var b,c;return I[a]||(b=H.createElement(a),H.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),I[a]=c),I[a]}function o(a){return"children"in a?G.call(a.children):z.map(a.childNodes,function(a){return 1==a.nodeType?a:void 0})}function p(a,b){var c,d=a?a.length:0;for(c=0;d>c;c++)this[c]=a[c];this.length=d,this.selector=b||""}function q(a,b,c){for(y in b)c&&(g(b[y])||aa(b[y]))?(g(b[y])&&!g(a[y])&&(a[y]={}),aa(b[y])&&!aa(a[y])&&(a[y]=[]),q(a[y],b[y],c)):b[y]!==x&&(a[y]=b[y])}function r(a,b){return null==b?z(a):z(a).filter(b)}function s(a,b,d,e){return c(b)?b.call(a,d,e):b}function t(a,b,c){null==c?a.removeAttribute(b):a.setAttribute(b,c)}function u(a,b){var c=a.className||"",d=c&&c.baseVal!==x;return b===x?d?c.baseVal:c:void(d?c.baseVal=b:a.className=b)}function v(a){try{return a?"true"==a||"false"!=a&&("null"==a?null:+a+""==a?+a:/^[\[\{]/.test(a)?z.parseJSON(a):a):a}catch(b){return a}}function w(a,b){b(a);for(var c=0,d=a.childNodes.length;d>c;c++)w(a.childNodes[c],b)}var x,y,z,A,B,C,D=[],E=D.concat,F=D.filter,G=D.slice,H=a.document,I={},J={},K={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},L=/^\s*<(\w+|!)[^>]*>/,M=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,N=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,O=/^(?:body|html)$/i,P=/([A-Z])/g,Q=["val","css","html","text","data","width","height","offset"],R=["after","prepend","before","append"],S=H.createElement("table"),T=H.createElement("tr"),U={tr:H.createElement("tbody"),tbody:S,thead:S,tfoot:S,td:T,th:T,"*":H.createElement("div")},V=/complete|loaded|interactive/,W=/^[\w-]*$/,X={},Y=X.toString,Z={},$=H.createElement("div"),_={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},aa=Array.isArray||function(a){return a instanceof Array};return Z.matches=function(a,b){if(!b||!a||1!==a.nodeType)return!1;var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=$).appendChild(a),d=~Z.qsa(e,b).indexOf(a),f&&$.removeChild(a),d},B=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},C=function(a){return F.call(a,function(b,c){return a.indexOf(b)==c})},Z.fragment=function(a,b,c){var d,e,f;return M.test(a)&&(d=z(H.createElement(RegExp.$1))),d||(a.replace&&(a=a.replace(N,"<$1></$2>")),b===x&&(b=L.test(a)&&RegExp.$1),b in U||(b="*"),f=U[b],f.innerHTML=""+a,d=z.each(G.call(f.childNodes),function(){f.removeChild(this)})),g(c)&&(e=z(d),z.each(c,function(a,b){Q.indexOf(a)>-1?e[a](b):e.attr(a,b)})),d},Z.Z=function(a,b){return new p(a,b)},Z.isZ=function(a){return a instanceof Z.Z},Z.init=function(a,b){var d;if(!a)return Z.Z();if("string"==typeof a)if(a=a.trim(),"<"==a[0]&&L.test(a))d=Z.fragment(a,RegExp.$1,b),a=null;else{if(b!==x)return z(b).find(a);d=Z.qsa(H,a)}else{if(c(a))return z(H).ready(a);if(Z.isZ(a))return a;if(aa(a))d=i(a);else if(f(a))d=[a],a=null;else if(L.test(a))d=Z.fragment(a.trim(),RegExp.$1,b),a=null;else{if(b!==x)return z(b).find(a);d=Z.qsa(H,a)}}return Z.Z(d,a)},z=function(a,b){return Z.init(a,b)},z.extend=function(a){var b,c=G.call(arguments,1);return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c){q(a,c,b)}),a},Z.qsa=function(a,b){var c,d="#"==b[0],e=!d&&"."==b[0],f=d||e?b.slice(1):b,g=W.test(f);return a.getElementById&&g&&d?(c=a.getElementById(f))?[c]:[]:1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType?[]:G.call(g&&!d&&a.getElementsByClassName?e?a.getElementsByClassName(f):a.getElementsByTagName(b):a.querySelectorAll(b))},z.contains=H.documentElement.contains?function(a,b){return a!==b&&a.contains(b)}:function(a,b){for(;b&&(b=b.parentNode);)if(b===a)return!0;return!1},z.type=b,z.isFunction=c,z.isWindow=d,z.isArray=aa,z.isPlainObject=g,z.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},z.isNumeric=function(a){var b=Number(a),c=typeof a;return null!=a&&"boolean"!=c&&("string"!=c||a.length)&&!isNaN(b)&&isFinite(b)||!1},z.inArray=function(a,b,c){return D.indexOf.call(b,a,c)},z.camelCase=B,z.trim=function(a){return null==a?"":String.prototype.trim.call(a)},z.uuid=0,z.support={},z.expr={},z.noop=function(){},z.map=function(a,b){var c,d,e,f=[];if(h(a))for(d=0;d<a.length;d++)c=b(a[d],d),null!=c&&f.push(c);else for(e in a)c=b(a[e],e),null!=c&&f.push(c);return j(f)},z.each=function(a,b){var c,d;if(h(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},z.grep=function(a,b){return F.call(a,b)},a.JSON&&(z.parseJSON=JSON.parse),z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){X["[object "+b+"]"]=b.toLowerCase()}),z.fn={constructor:Z.Z,length:0,forEach:D.forEach,reduce:D.reduce,push:D.push,sort:D.sort,splice:D.splice,indexOf:D.indexOf,concat:function(){var a,b,c=[];for(a=0;a<arguments.length;a++)b=arguments[a],c[a]=Z.isZ(b)?b.toArray():b;return E.apply(Z.isZ(this)?this.toArray():this,c)},map:function(a){return z(z.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return z(G.apply(this,arguments))},ready:function(a){return V.test(H.readyState)&&H.body?a(z):H.addEventListener("DOMContentLoaded",function(){a(z)},!1),this},get:function(a){return a===x?G.call(this):this[a>=0?a:a+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(a){return D.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return c(a)?this.not(this.not(a)):z(F.call(this,function(b){return Z.matches(b,a)}))},add:function(a,b){return z(C(this.concat(z(a,b))))},is:function(a){return this.length>0&&Z.matches(this[0],a)},not:function(a){var b=[];if(c(a)&&a.call!==x)this.each(function(c){a.call(this,c)||b.push(this)});else{var d="string"==typeof a?this.filter(a):h(a)&&c(a.item)?G.call(a):z(a);this.forEach(function(a){d.indexOf(a)<0&&b.push(a)})}return z(b)},has:function(a){return this.filter(function(){return f(a)?z.contains(this,a):z(this).find(a).size()})},eq:function(a){return-1===a?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!f(a)?a:z(a)},last:function(){var a=this[this.length-1];return a&&!f(a)?a:z(a)},find:function(a){var b,c=this;return b=a?"object"==typeof a?z(a).filter(function(){var a=this;return D.some.call(c,function(b){return z.contains(b,a)})}):1==this.length?z(Z.qsa(this[0],a)):this.map(function(){return Z.qsa(this,a)}):z()},closest:function(a,b){var c=[],d="object"==typeof a&&z(a);return this.each(function(f,g){for(;g&&!(d?d.indexOf(g)>=0:Z.matches(g,a));)g=g!==b&&!e(g)&&g.parentNode;g&&c.indexOf(g)<0&&c.push(g)}),z(c)},parents:function(a){for(var b=[],c=this;c.length>0;)c=z.map(c,function(a){return(a=a.parentNode)&&!e(a)&&b.indexOf(a)<0?(b.push(a),a):void 0});return r(b,a)},parent:function(a){return r(C(this.pluck("parentNode")),a)},children:function(a){return r(this.map(function(){return o(this)}),a)},contents:function(){return this.map(function(){return this.contentDocument||G.call(this.childNodes)})},siblings:function(a){return r(this.map(function(a,b){return F.call(o(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return z.map(this,function(b){return b[a]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=n(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=c(a);if(this[0]&&!b)var d=z(a).get(0),e=d.parentNode||this.length>1;return this.each(function(c){z(this).wrapAll(b?a.call(this,c):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){z(this[0]).before(a=z(a));for(var b;(b=a.children()).length;)a=b.first();z(a).append(this)}return this},wrapInner:function(a){var b=c(a);return this.each(function(c){var d=z(this),e=d.contents(),f=b?a.call(this,c):a;e.length?e.wrapAll(f):d.append(f)})},unwrap:function(){return this.parent().each(function(){z(this).replaceWith(z(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(a){return this.each(function(){var b=z(this);(a===x?"none"==b.css("display"):a)?b.show():b.hide()})},prev:function(a){return z(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return z(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return 0 in arguments?this.each(function(b){var c=this.innerHTML;z(this).empty().append(s(this,a,b,c))}):0 in this?this[0].innerHTML:null},text:function(a){return 0 in arguments?this.each(function(b){var c=s(this,a,b,this.textContent);this.textContent=null==c?"":""+c}):0 in this?this.pluck("textContent").join(""):null},attr:function(a,b){var c;return"string"!=typeof a||1 in arguments?this.each(function(c){if(1===this.nodeType)if(f(a))for(y in a)t(this,y,a[y]);else t(this,a,s(this,b,c,this.getAttribute(a)))}):0 in this&&1==this[0].nodeType&&null!=(c=this[0].getAttribute(a))?c:x},removeAttr:function(a){return this.each(function(){1===this.nodeType&&a.split(" ").forEach(function(a){t(this,a)},this)})},prop:function(a,b){return a=_[a]||a,1 in arguments?this.each(function(c){this[a]=s(this,b,c,this[a])}):this[0]&&this[0][a]},removeProp:function(a){return a=_[a]||a,this.each(function(){delete this[a]})},data:function(a,b){var c="data-"+a.replace(P,"-$1").toLowerCase(),d=1 in arguments?this.attr(c,b):this.attr(c);return null!==d?v(d):x},val:function(a){return 0 in arguments?(null==a&&(a=""),this.each(function(b){this.value=s(this,a,b,this.value)})):this[0]&&(this[0].multiple?z(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(b){if(b)return this.each(function(a){var c=z(this),d=s(this,b,a,c.offset()),e=c.offsetParent().offset(),f={top:d.top-e.top,left:d.left-e.left};"static"==c.css("position")&&(f.position="relative"),c.css(f)});if(!this.length)return null;if(H.documentElement!==this[0]&&!z.contains(H.documentElement,this[0]))return{top:0,left:0};var c=this[0].getBoundingClientRect();return{left:c.left+a.pageXOffset,top:c.top+a.pageYOffset,width:Math.round(c.width),height:Math.round(c.height)}},css:function(a,c){if(arguments.length<2){var d=this[0];if("string"==typeof a){if(!d)return;return d.style[B(a)]||getComputedStyle(d,"").getPropertyValue(a)}if(aa(a)){if(!d)return;var e={},f=getComputedStyle(d,"");return z.each(a,function(a,b){e[b]=d.style[B(b)]||f.getPropertyValue(b)}),e}}var g="";if("string"==b(a))c||0===c?g=k(a)+":"+m(a,c):this.each(function(){this.style.removeProperty(k(a))});else for(y in a)a[y]||0===a[y]?g+=k(y)+":"+m(y,a[y])+";":this.each(function(){this.style.removeProperty(k(y))});return this.each(function(){this.style.cssText+=";"+g})},index:function(a){return a?this.indexOf(z(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return!!a&&D.some.call(this,function(a){return this.test(u(a))},l(a))},addClass:function(a){return a?this.each(function(b){if("className"in this){A=[];var c=u(this),d=s(this,a,b,c);d.split(/\s+/g).forEach(function(a){z(this).hasClass(a)||A.push(a)},this),A.length&&u(this,c+(c?" ":"")+A.join(" "))}}):this},removeClass:function(a){return this.each(function(b){if("className"in this){if(a===x)return u(this,"");A=u(this),s(this,a,b,A).split(/\s+/g).forEach(function(a){A=A.replace(l(a)," ")}),u(this,A.trim())}})},toggleClass:function(a,b){return a?this.each(function(c){var d=z(this),e=s(this,a,c,u(this));e.split(/\s+/g).forEach(function(a){(b===x?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)})}):this},scrollTop:function(a){if(this.length){var b="scrollTop"in this[0];return a===x?b?this[0].scrollTop:this[0].pageYOffset:this.each(b?function(){this.scrollTop=a}:function(){this.scrollTo(this.scrollX,a)})}},scrollLeft:function(a){if(this.length){var b="scrollLeft"in this[0];return a===x?b?this[0].scrollLeft:this[0].pageXOffset:this.each(b?function(){this.scrollLeft=a}:function(){this.scrollTo(a,this.scrollY)})}},position:function(){if(this.length){var a=this[0],b=this.offsetParent(),c=this.offset(),d=O.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(z(a).css("margin-top"))||0,c.left-=parseFloat(z(a).css("margin-left"))||0,d.top+=parseFloat(z(b[0]).css("border-top-width"))||0,d.left+=parseFloat(z(b[0]).css("border-left-width"))||0,{top:c.top-d.top,left:c.left-d.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||H.body;a&&!O.test(a.nodeName)&&"static"==z(a).css("position");)a=a.offsetParent;return a})}},z.fn.detach=z.fn.remove,["width","height"].forEach(function(a){var b=a.replace(/./,function(a){return a[0].toUpperCase()});z.fn[a]=function(c){var f,g=this[0];return c===x?d(g)?g["inner"+b]:e(g)?g.documentElement["scroll"+b]:(f=this.offset())&&f[a]:this.each(function(b){g=z(this),g.css(a,s(this,c,b,g[a]()))})}}),R.forEach(function(c,d){var e=d%2;z.fn[c]=function(){var c,f,g=z.map(arguments,function(a){var d=[];return c=b(a),"array"==c?(a.forEach(function(a){return a.nodeType!==x?d.push(a):z.zepto.isZ(a)?d=d.concat(a.get()):void(d=d.concat(Z.fragment(a)))}),d):"object"==c||null==a?a:Z.fragment(a)}),h=this.length>1;return g.length<1?this:this.each(function(b,c){f=e?c:c.parentNode,c=0==d?c.nextSibling:1==d?c.firstChild:2==d?c:null;var i=z.contains(H.documentElement,f);g.forEach(function(b){if(h)b=b.cloneNode(!0);else if(!f)return z(b).remove();f.insertBefore(b,c),i&&w(b,function(b){if(!(null==b.nodeName||"SCRIPT"!==b.nodeName.toUpperCase()||b.type&&"text/javascript"!==b.type||b.src)){var c=b.ownerDocument?b.ownerDocument.defaultView:a;c.eval.call(c,b.innerHTML)}})})})},z.fn[e?c+"To":"insert"+(d?"Before":"After")]=function(a){return z(a)[c](this),this}}),Z.Z.prototype=p.prototype=z.fn,Z.uniq=C,Z.deserializeValue=v,z.zepto=Z,z}();return a.Zepto=b,void 0===a.$&&(a.$=b),function(b){function c(a){return a._zid||(a._zid=n++)}function d(a,b,d,g){if(b=e(b),b.ns)var h=f(b.ns);return(r[c(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||h.test(a.ns))&&(!d||c(a.fn)===c(d))&&(!g||a.sel==g)})}function e(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function f(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function g(a,b){return a.del&&!t&&a.e in u||!!b}function h(a){return v[a]||t&&u[a]||a}function i(a,d,f,i,j,l,n){var o=c(a),p=r[o]||(r[o]=[]);d.split(/\s/).forEach(function(c){if("ready"==c)return b(document).ready(f);var d=e(c);d.fn=f,d.sel=j,d.e in v&&(f=function(a){var c=a.relatedTarget;return!c||c!==this&&!b.contains(this,c)?d.fn.apply(this,arguments):void 0}),d.del=l;var o=l||f;d.proxy=function(b){if(b=k(b),!b.isImmediatePropagationStopped()){b.data=i;var c=o.apply(a,b._args==m?[b]:[b].concat(b._args));return c===!1&&(b.preventDefault(),b.stopPropagation()),c}},d.i=p.length,p.push(d),"addEventListener"in a&&a.addEventListener(h(d.e),d.proxy,g(d,n))})}function j(a,b,e,f,i){var j=c(a);(b||"").split(/\s/).forEach(function(b){d(a,b,e,f).forEach(function(b){delete r[j][b.i],"removeEventListener"in a&&a.removeEventListener(h(b.e),b.proxy,g(b,i))})})}function k(a,c){return(c||!a.isDefaultPrevented)&&(c||(c=a),b.each(z,function(b,d){var e=c[b];a[b]=function(){return this[d]=w,e&&e.apply(c,arguments)},a[d]=x}),a.timeStamp||(a.timeStamp=Date.now()),(c.defaultPrevented!==m?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())&&(a.isDefaultPrevented=w)),a}function l(a){var b,c={originalEvent:a};for(b in a)y.test(b)||a[b]===m||(c[b]=a[b]);return k(c,a)}var m,n=1,o=Array.prototype.slice,p=b.isFunction,q=function(a){return"string"==typeof a},r={},s={},t="onfocusin"in a,u={focus:"focusin",blur:"focusout"},v={mouseenter:"mouseover",mouseleave:"mouseout"};s.click=s.mousedown=s.mouseup=s.mousemove="MouseEvents",b.event={add:i,remove:j},b.proxy=function(a,d){var e=2 in arguments&&o.call(arguments,2);if(p(a)){var f=function(){return a.apply(d,e?e.concat(o.call(arguments)):arguments)};return f._zid=c(a),f}if(q(d))return e?(e.unshift(a[d],a),b.proxy.apply(null,e)):b.proxy(a[d],a);throw new TypeError("expected function")},b.fn.bind=function(a,b,c){return this.on(a,b,c)},b.fn.unbind=function(a,b){return this.off(a,b)},b.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var w=function(){return!0},x=function(){return!1},y=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,z={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};b.fn.delegate=function(a,b,c){return this.on(b,a,c)},b.fn.undelegate=function(a,b,c){return this.off(b,a,c)},b.fn.live=function(a,c){return b(document.body).delegate(this.selector,a,c),this},b.fn.die=function(a,c){return b(document.body).undelegate(this.selector,a,c),this},b.fn.on=function(a,c,d,e,f){var g,h,k=this;return a&&!q(a)?(b.each(a,function(a,b){k.on(a,c,d,b,f)}),k):(q(c)||p(e)||e===!1||(e=d,d=c,c=m),(e===m||d===!1)&&(e=d,d=m),e===!1&&(e=x),k.each(function(k,m){f&&(g=function(a){return j(m,a.type,e),e.apply(this,arguments)}),c&&(h=function(a){var d,f=b(a.target).closest(c,m).get(0);return f&&f!==m?(d=b.extend(l(a),{currentTarget:f,liveFired:m}),(g||e).apply(f,[d].concat(o.call(arguments,1)))):void 0}),i(m,a,e,d,c,h||g)}))},b.fn.off=function(a,c,d){var e=this;return a&&!q(a)?(b.each(a,function(a,b){e.off(a,c,b)}),e):(q(c)||p(d)||d===!1||(d=c,c=m),d===!1&&(d=x),e.each(function(){j(this,a,d,c)}))},b.fn.trigger=function(a,c){return a=q(a)||b.isPlainObject(a)?b.Event(a):k(a),a._args=c,this.each(function(){a.type in u&&"function"==typeof this[a.type]?this[a.type]():"dispatchEvent"in this?this.dispatchEvent(a):b(this).triggerHandler(a,c)})},b.fn.triggerHandler=function(a,c){var e,f;return this.each(function(g,h){e=l(q(a)?b.Event(a):a),e._args=c,e.target=h,b.each(d(h,a.type||a),function(a,b){return f=b.proxy(e),!e.isImmediatePropagationStopped()&&void 0})}),f},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(a){b.fn[a]=function(b){return 0 in arguments?this.bind(a,b):this.trigger(a)}}),b.Event=function(a,b){q(a)||(b=a,a=b.type);var c=document.createEvent(s[a]||"Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),k(c)}}(b),function(b){function c(a,c,d){var e=b.Event(c);return b(a).trigger(e,d),!e.isDefaultPrevented()}function d(a,b,d,e){return a.global?c(b||u,d,e):void 0}function e(a){a.global&&0===b.active++&&d(a,null,"ajaxStart")}function f(a){a.global&&!--b.active&&d(a,null,"ajaxStop")}function g(a,b){var c=b.context;return b.beforeSend.call(c,a,b)!==!1&&d(b,c,"ajaxBeforeSend",[a,b])!==!1&&void d(b,c,"ajaxSend",[a,b])}function h(a,b,c,e){var f=c.context,g="success";c.success.call(f,a,g,b),e&&e.resolveWith(f,[a,g,b]),d(c,f,"ajaxSuccess",[b,c,a]),j(g,b,c)}function i(a,b,c,e,f){var g=e.context;e.error.call(g,c,b,a),f&&f.rejectWith(g,[c,b,a]),d(e,g,"ajaxError",[c,e,a||b]),j(b,c,e)}function j(a,b,c){var e=c.context;c.complete.call(e,b,a),d(c,e,"ajaxComplete",[b,c]),f(c)}function k(a,b,c){if(c.dataFilter==l)return a;var d=c.context;return c.dataFilter.call(d,a,b)}function l(){}function m(a){return a&&(a=a.split(";",2)[0]),a&&(a==z?"html":a==y?"json":w.test(a)?"script":x.test(a)&&"xml")||"text"}function n(a,b){return""==b?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function o(a){a.processData&&a.data&&"string"!=b.type(a.data)&&(a.data=b.param(a.data,a.traditional)),!a.data||a.type&&"GET"!=a.type.toUpperCase()&&"jsonp"!=a.dataType||(a.url=n(a.url,a.data),a.data=void 0)}function p(a,c,d,e){return b.isFunction(c)&&(e=d,d=c,c=void 0),b.isFunction(d)||(e=d,d=void 0),{url:a,data:c,success:d,dataType:e}}function q(a,c,d,e){var f,g=b.isArray(c),h=b.isPlainObject(c);b.each(c,function(c,i){f=b.type(i),e&&(c=d?e:e+"["+(h||"object"==f||"array"==f?c:"")+"]"),!e&&g?a.add(i.name,i.value):"array"==f||!d&&"object"==f?q(a,i,d,c):a.add(c,i)})}var r,s,t=+new Date,u=a.document,v=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,w=/^(?:text|application)\/javascript/i,x=/^(?:text|application)\/xml/i,y="application/json",z="text/html",A=/^\s*$/,B=u.createElement("a");B.href=a.location.href,b.active=0,b.ajaxJSONP=function(c,d){if(!("type"in c))return b.ajax(c);var e,f,j=c.jsonpCallback,k=(b.isFunction(j)?j():j)||"Zepto"+t++,l=u.createElement("script"),m=a[k],n=function(a){b(l).triggerHandler("error",a||"abort")},o={abort:n};return d&&d.promise(o),b(l).on("load error",function(g,j){clearTimeout(f),b(l).off().remove(),"error"!=g.type&&e?h(e[0],o,c,d):i(null,j||"error",o,c,d),a[k]=m,e&&b.isFunction(m)&&m(e[0]),m=e=void 0}),g(o,c)===!1?(n("abort"),o):(a[k]=function(){e=arguments},l.src=c.url.replace(/\?(.+)=\?/,"?$1="+k),u.head.appendChild(l),c.timeout>0&&(f=setTimeout(function(){n("timeout")},c.timeout)),o)},b.ajaxSettings={type:"GET",beforeSend:l,success:l,error:l,complete:l,context:null,global:!0,xhr:function(){return new a.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:y,xml:"application/xml, text/xml",html:z,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:l},b.ajax=function(c){var d,f,j=b.extend({},c||{}),p=b.Deferred&&b.Deferred();for(r in b.ajaxSettings)void 0===j[r]&&(j[r]=b.ajaxSettings[r]);e(j),j.crossDomain||(d=u.createElement("a"),d.href=j.url,d.href=d.href,j.crossDomain=B.protocol+"//"+B.host!=d.protocol+"//"+d.host),j.url||(j.url=a.location.toString()),(f=j.url.indexOf("#"))>-1&&(j.url=j.url.slice(0,f)),o(j);var q=j.dataType,t=/\?.+=\?/.test(j.url);if(t&&(q="jsonp"),j.cache!==!1&&(c&&c.cache===!0||"script"!=q&&"jsonp"!=q)||(j.url=n(j.url,"_="+Date.now())),"jsonp"==q)return t||(j.url=n(j.url,j.jsonp?j.jsonp+"=?":j.jsonp===!1?"":"callback=?")),b.ajaxJSONP(j,p);var v,w=j.accepts[q],x={},y=function(a,b){x[a.toLowerCase()]=[a,b]},z=/^([\w-]+:)\/\//.test(j.url)?RegExp.$1:a.location.protocol,C=j.xhr(),D=C.setRequestHeader;if(p&&p.promise(C),j.crossDomain||y("X-Requested-With","XMLHttpRequest"),y("Accept",w||"*/*"),(w=j.mimeType||w)&&(w.indexOf(",")>-1&&(w=w.split(",",2)[0]),C.overrideMimeType&&C.overrideMimeType(w)),(j.contentType||j.contentType!==!1&&j.data&&"GET"!=j.type.toUpperCase())&&y("Content-Type",j.contentType||"application/x-www-form-urlencoded"),j.headers)for(s in j.headers)y(s,j.headers[s]);if(C.setRequestHeader=y,C.onreadystatechange=function(){if(4==C.readyState){C.onreadystatechange=l,clearTimeout(v);var a,c=!1;if(C.status>=200&&C.status<300||304==C.status||0==C.status&&"file:"==z){if(q=q||m(j.mimeType||C.getResponseHeader("content-type")),"arraybuffer"==C.responseType||"blob"==C.responseType)a=C.response;else{a=C.responseText;try{a=k(a,q,j),"script"==q?(0,eval)(a):"xml"==q?a=C.responseXML:"json"==q&&(a=A.test(a)?null:b.parseJSON(a))}catch(a){c=a}if(c)return i(c,"parsererror",C,j,p)}h(a,C,j,p)}else i(C.statusText||null,C.status?"error":"abort",C,j,p)}},g(C,j)===!1)return C.abort(),i(null,"abort",C,j,p),C;var E=!("async"in j)||j.async;if(C.open(j.type,j.url,E,j.username,j.password),j.xhrFields)for(s in j.xhrFields)C[s]=j.xhrFields[s];for(s in x)D.apply(C,x[s]);return j.timeout>0&&(v=setTimeout(function(){C.onreadystatechange=l,C.abort(),i(null,"timeout",C,j,p)},j.timeout)),C.send(j.data?j.data:null),C},b.get=function(){return b.ajax(p.apply(null,arguments))},b.post=function(){var a=p.apply(null,arguments);return a.type="POST",b.ajax(a)},b.getJSON=function(){var a=p.apply(null,arguments);return a.dataType="json",b.ajax(a)},b.fn.load=function(a,c,d){if(!this.length)return this;var e,f=this,g=a.split(/\s/),h=p(a,c,d),i=h.success;return g.length>1&&(h.url=g[0],e=g[1]),h.success=function(a){f.html(e?b("<div>").html(a.replace(v,"")).find(e):a),i&&i.apply(f,arguments)},b.ajax(h),this};var C=encodeURIComponent;b.param=function(a,c){var d=[];return d.add=function(a,c){b.isFunction(c)&&(c=c()),null==c&&(c=""),this.push(C(a)+"="+C(c))},q(d,a,c),d.join("&").replace(/%20/g,"+")}}(b),function(a){a.fn.serializeArray=function(){var b,c,d=[],e=function(a){return a.forEach?a.forEach(e):void d.push({name:b,value:a})};return this[0]&&a.each(this[0].elements,function(d,f){c=f.type,b=f.name,b&&"fieldset"!=f.nodeName.toLowerCase()&&!f.disabled&&"submit"!=c&&"reset"!=c&&"button"!=c&&"file"!=c&&("radio"!=c&&"checkbox"!=c||f.checked)&&e(a(f).val())}),d},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(0 in arguments)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()}return this}}(b),function(){try{getComputedStyle(void 0)}catch(c){var b=getComputedStyle;a.getComputedStyle=function(a,c){try{return b(a,c)}catch(a){return null}}}}(),b}),!function(a,b,c,d){function e(a,b){return a[b]===d?t[b]:a[b]}function f(){var a=b.pageYOffset;return a===d?r.scrollTop:a}function g(a,b){var c=t["on"+a];c&&(w(c)?c.call(b[0]):(c.addClass&&b.addClass(c.addClass),c.removeClass&&b.removeClass(c.removeClass))),b.trigger("lazy"+a,[b]),k()}function h(b){g(b.type,a(this).off(p,h))}function i(c){if(z.length){c=c||t.forceLoad,A=1/0;var d,e,i=f(),j=b.innerHeight||r.clientHeight,k=b.innerWidth||r.clientWidth;for(d=0,e=z.length;e>d;d++){var l,m=z[d],q=m[0],s=m[n],u=!1,v=c||y(q,o)<0;if(a.contains(r,q)){if(c||!s.visibleOnly||q.offsetWidth||q.offsetHeight){if(!v){var x=q.getBoundingClientRect(),B=s.edgeX,C=s.edgeY;l=x.top+i-C-j,v=i>=l&&x.bottom>-C&&x.left<=k+B&&x.right>-B}if(v){m.on(p,h),g("show",m);var D=s.srcAttr,E=w(D)?D(m):q.getAttribute(D);E&&(q.src=E),u=!0}else A>l&&(A=l)}}else u=!0;u&&(y(q,o,0),z.splice(d--,1),e--)}e||g("complete",a(r))}}function j(){B>1?(B=1,i(),setTimeout(j,t.throttle)):B=0}function k(a){z.length&&(a&&"scroll"===a.type&&a.currentTarget===b&&A>=f()||(B||setTimeout(j,0),B=2))}function l(){v.lazyLoadXT()}function m(){i(!0)}var n="lazyLoadXT",o="lazied",p="load error",q="lazy-hidden",r=c.documentElement||c.body,s=b.onscroll===d||!!b.operamini||!r.getBoundingClientRect,t={autoInit:!0,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:s,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"lazyloadall",oninit:{removeClass:"lazy"},onshow:{addClass:q},onload:{removeClass:q,addClass:"lazy-loaded"},onerror:{removeClass:q},checkDuplicates:!0},u={srcAttr:"data-src",edgeX:0,edgeY:0,visibleOnly:!0},v=a(b),w=a.isFunction,x=a.extend,y=a.data||function(b,c){return a(b).data(c)},z=[],A=0,B=0;a[n]=x(t,u,a[n]),a.fn[n]=function(c){c=c||{};var d,f=e(c,"blankImage"),h=e(c,"checkDuplicates"),i=e(c,"scrollContainer"),j=e(c,"show"),l={};a(i).on("scroll",k);for(d in u)l[d]=e(c,d);return this.each(function(d,e){if(e===b)a(t.selector).lazyLoadXT(c);else{var i=h&&y(e,o),m=a(e).data(o,j?-1:1);if(i)return void k();f&&"IMG"===e.tagName&&!e.src&&(e.src=f),m[n]=x({},l),g("init",m),z.push(m),k()}})},a(c).ready(function(){g("start",v),v.on(t.updateEvent,k).on(t.forceEvent,m),a(c).on(t.updateEvent,k),t.autoInit&&(v.on(t.loadEvent,l),l())})}(window.jQuery||window.Zepto||window.$,window,document),$(".playlists > .more, .playlists > .less").on("click",function(){$(".playlists").toggleClass("open")}),$('a[data-action="openMenu"], li.close').on("click",function(a){return $("body").toggleClass("menuopen"),!1}),$(document).ready(function(){setupCover(),setTimeout(scribbleTitle,100),document.querySelector(".infinitescroll .load-more")&&infinitescroll()});