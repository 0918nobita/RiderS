webpackJsonp([2],{B1lJ:function(t,n,e){"use strict";var s=function(){var t=this.$createElement,n=this._self._c||t;return n("section",{staticClass:"container"},[n("div",[n("h1",[this._v("サンプルページ")]),n("p",[this._v("count = "+this._s(this.count))]),n("button",{on:{click:this.addCount}},[this._v("カウントアップ")])])])};s._withStripped=!0;var i={render:s,staticRenderFns:[]};n.a=i},BUZI:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("DnLj"),i=e("B1lJ"),o=e("VU/8")(s.a,i.a,!1,null,null,null);o.options.__file="pages\\sample\\index.vue",n.default=o.exports},DnLj:function(t,n,e){"use strict";n.a={computed:{count:function(){return this.$store.state.counter.count}},methods:{addCount:function(t){this.$store.commit("counter/add")}}}}});