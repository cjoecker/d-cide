(this["webpackJsonpd-cide"]=this["webpackJsonpd-cide"]||[]).push([[0],{132:function(e,t,a){"use strict";var n=a(29),i=Object(n.b)({name:"Decision",initialState:[],reducers:{setDecisions:function(e,t){return t.payload}}});t.a=i},172:function(e,t,a){"use strict";a.r(t);var n=a(36),i=a(30),r=a(93),c=a(9),o=a(132),s=a(60),l=a(61),d=Object(n.c)({App:i.a.reducer,Session:r.a.reducer,Decisions:o.a.reducer,OptionsAndCriteria:c.b.reducer,WeightedCriteria:s.a.reducer,RatedOptions:l.a.reducer});t.default=d},193:function(e,t,a){},280:function(e,t,a){e.exports=a.p+"static/media/d-cide_Logo.9d73cbb7.svg"},30:function(e,t,a){"use strict";var n=a(35),i=a(29),r=Object(i.b)({name:"App",initialState:{isLoading:0,alerts:[]},reducers:{startLoading:function(e){e.isLoading+=1},endLoading:function(e){e.isLoading-=1},addAlert:function(e,t){e.alerts=e.alerts.some((function(e){return JSON.stringify(e)===JSON.stringify(t.payload)}))?e.alerts:[t.payload].concat(Object(n.a)(e.alerts))},deleteAlert:function(e,t){e.alerts=e.alerts.filter((function(e){return JSON.stringify(e)!==JSON.stringify(t.payload)}))}}});t.a=r},321:function(e,t,a){e.exports=a(322)},322:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(14),c=a.n(r),o=a(16),s=(a(193),a(58)),l=a(46),d=a(567).default;c.a.render(i.a.createElement(o.a,{store:l.a},i.a.createElement(s.a,null,i.a.createElement(d,null))),document.getElementById("root"))},46:function(e,t,a){"use strict";var n=a(29),i=a(172),r=(a(172).default,Object(n.a)({reducer:i.default}));t.a=r},567:function(e,t,a){"use strict";a.r(t);var n,i=a(0),r=a.n(i),c=(a(193),a(621)),o=a(607),s=a(610),l=a(624),d=a(625),u=a(16),m=a(623),p=a(622),g=a(58),f=a(66),h=a(572),b=a(616),E=a(35),v=a(21),O=a(11),y=a(617),j=a(630),C=a(618),x=a(619),w=a(279),S=a.n(w),k=a(278),I=a.n(k),N=a(257),T=a.n(N),B=a(573),L=a(281),R=Object(L.a)({typography:{fontFamily:["Quicksand","sans-serif"].join(","),caption:{fontWeight:500,fontSize:14,color:"#000000"},fontWeightRegular:500,fontWeightBold:600,h1:{fontWeight:600},h2:{fontWeight:600},h3:{fontWeight:600},h4:{fontWeight:600},h5:{fontWeight:600},h6:{fontWeight:600}},palette:{primary:{main:"#0f61a0",contrastText:"#fafafa"},secondary:{main:"#878787",contrastText:"#fafafa"}}}),W=a(51),A=a.n(W),D=a(611),M=a(631),H=a(262),G=a.n(H),P=a(261),z=a.n(P),K=Object(o.a)({dialogContent:{marginTop:R.spacing(-2)},closeButton:{position:"absolute",right:R.spacing(1),top:R.spacing(1)},text:{paddingTop:R.spacing(30),textAlign:"justify"}}),J=function(e){var t=e.text,a=e.show,n=e.onClose,i=K(),c=function(){n()};return r.a.createElement("div",null,r.a.createElement(M.a,{onClose:c,"aria-labelledby":"customized-dialog-title",open:a},r.a.createElement(z.a,{className:i.dialogContent},r.a.createElement(h.a,{component:"span","data-testid":"infoText",variant:"body2",className:i.text},t),r.a.createElement(D.a,{"aria-label":"Close","data-testid":"infoCloseButton",className:i.closeButton,onClick:c},r.a.createElement(G.a,null)))))},U=a(612),F=a(613),X=a(615),$=a(264),q=a.n($),Q=a(263),_=a.n(Q),V=a(569),Y=a(609),Z=a(626),ee=a(9),te=a(30),ae=[{id:1,name:"House 1",score:0},{id:2,name:"House 2",score:0},{id:3,name:"House 3",score:0}],ne=[{id:1,name:"Size",score:0},{id:2,name:"Garden",score:0},{id:3,name:"Kitchen",score:0},{id:4,name:"Neighborhood",score:0}],ie=Object(o.a)({divMain:{minWidth:R.spacing(37)},paperTitle:{marginBottom:R.spacing(2),marginRight:R.spacing(1.5),marginLeft:R.spacing(1.5)},paperItems:{marginTop:R.spacing(.5),marginRight:R.spacing(1.5),marginLeft:R.spacing(1.5),cursor:"pointer"},editButton:{marginRight:R.spacing(-1)},deleteButton:{marginRight:R.spacing(-1.5)},inputBase:{marginRight:R.spacing(2),width:"100%",wordWrap:"break-word"}}),re=function(e){var t=e.hidden,a=e.notEnoughItemsAlert,n=e.itemsKey,c=Object(i.useState)(!1),o=Object(O.a)(c,2),s=o[0],l=o[1],d=Object(i.useState)(""),m=Object(O.a)(d,2),p=m[0],g=m[1],f=Object(i.useState)([]),h=Object(O.a)(f,2),b=h[0],y=h[1],j=Object(i.useState)(!1),C=Object(O.a)(j,2),x=C[0],w=C[1],S=Object(u.d)((function(e){return e.OptionsAndCriteria[n]}),u.b),k=ie(),I=Object(u.c)();Object(i.useEffect)((function(){return function(){I(te.a.actions.deleteAlert(a))}}),[]),Object(i.useEffect)((function(){t?(y([]),w(!1),I(te.a.actions.deleteAlert(a))):(0===S.length&&T(),y(S),l(!0))}),[t]),Object(i.useEffect)((function(){S.length!==b.length&&!t&&s&&(B(),L()),!t&&s&&y(S),0===S.length&&s&&L()}),[S]);var N=function(){if(""!==p){var e={id:Math.max.apply(Math,Object(E.a)(S.map((function(e){return e.id}))).concat([0]))+1,name:p,score:0};n===ee.a.decisionOptions?I(ee.b.actions.addDecisionOption(e)):I(ee.b.actions.addSelectionCriteria(e))}},T=function(){n===ee.a.decisionOptions?I(ee.b.actions.setDecisionOptions(ae)):I(ee.b.actions.setSelectionCriteria(ne))},B=function(){S.length>0&&S[0].name===p&&g("")},L=function(){S.length<2?I(te.a.actions.addAlert(a)):I(te.a.actions.deleteAlert(a))};return r.a.createElement("div",{className:k.divMain,"data-testid":"".concat(n,"List")},r.a.createElement(U.a,null,r.a.createElement(V.a,{className:k.paperTitle,elevation:2,key:"NewEntry"},r.a.createElement(F.a,null,r.a.createElement(Z.a,{inputProps:{"data-testid":"entryInput"},variant:"standard",className:k.inputBase,placeholder:"New Entry",value:p,onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),N())},onChange:function(e){return g(e.target.value)},multiline:!0}),r.a.createElement(X.a,null,r.a.createElement(D.a,{"data-testid":"addButton","aria-label":"Add",className:k.deleteButton,onClick:function(){return N()}},r.a.createElement(_.a,null))))),b.map((function(e,t){return r.a.createElement(Y.a,{in:!0,style:{transitionDelay:"".concat(t*(x?0:100),"ms")},timeout:500,onEntered:function(){return function(e){e===b.length&&w(!0)}(t)},key:e.id},r.a.createElement(V.a,{className:k.paperItems,elevation:2},r.a.createElement(F.a,null,r.a.createElement(Z.a,{inputProps:{"data-testid":"itemInput"},className:k.inputBase,variant:"standard",value:e.name,onChange:function(t){return function(e,t){y(b.map((function(a){return a.id===t?Object(v.a)(Object(v.a)({},a),{},{name:e.target.value}):a})))}(t,e.id)},onBlur:function(){var t;""!==(t=e).name?n===ee.a.decisionOptions?I(ee.b.actions.updateDecisionOption(t)):I(ee.b.actions.updateSelectionCriteria(t)):n===ee.a.decisionOptions?I(ee.b.actions.deleteDecisionOption(t.id)):I(ee.b.actions.deleteSelectionCriteria(t.id))},multiline:!0,onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())}}),r.a.createElement(X.a,null,r.a.createElement(D.a,{"data-testid":"deleteButton".concat(t),"aria-label":"Delete",onClick:function(){return t=e,void(n===ee.a.decisionOptions?I(ee.b.actions.deleteDecisionOption(t.id)):I(ee.b.actions.deleteSelectionCriteria(t.id)));var t},className:k.deleteButton},r.a.createElement(q.a,null))))))}))))},ce=r.a.createElement("div",null,r.a.createElement("h2",null,"Decision Options"),r.a.createElement("p",null,"Write every decision option you need to decide for.",r.a.createElement("br",null),"If you need to decide which house to buy, you may write something like this:"),r.a.createElement("ul",null,r.a.createElement("li",null,"House in Albert road"),r.a.createElement("li",null,"House in Crown avenue"),r.a.createElement("li",null,"House in East street")),r.a.createElement("p",null,'Take some time to think about every other option "out of the box" that may also exist.',r.a.createElement("br",null),"For example your parent's house, a trailer, a tent, etc. ",r.a.createElement("br",null),r.a.createElement("br",null),"In case you have a binary decision (yes/no), you should write two decision options. ",r.a.createElement("br",null),"For example:",r.a.createElement("ul",null,r.a.createElement("li",null,"To divorce"),r.a.createElement("li",null,"Not to divorce.")))),oe=r.a.createElement("div",null,r.a.createElement("h2",null,"Selection Criteria"),r.a.createElement("p",null,"Write every important selection criteria that play a role in your decision."),r.a.createElement("p",null,"If you need to decide which house to buy, you may write something like this:",r.a.createElement("ul",null,r.a.createElement("li",null,"Neighborhood"),r.a.createElement("li",null,"Size"),r.a.createElement("li",null,"Garden"),r.a.createElement("li",null,"Kitchen",r.a.createElement("br",null),r.a.createElement("br",null))))),se=r.a.createElement("div",null,r.a.createElement("h2",null,"Weight Criteria"),r.a.createElement("p",null,"Decisions require always trade-offs. If not, no decision will be necessary.",r.a.createElement("br",null),"Under this principle, you should weight your selection criteria.",r.a.createElement("br",null),"Which of both criteria are you willing to sacrifice to get the other one?",r.a.createElement("br",null),r.a.createElement("br",null),"Move the slider to the left or right depending on what is more important to you.",r.a.createElement("br",null),"The distance moved in the slider is proportional to the importance of criteria compared to the other.",r.a.createElement("br",null),"This as the slider would be a balance between both criteria.")),le=r.a.createElement("div",null,r.a.createElement("h2",null,"Rate Options"),r.a.createElement("p",null,"Rate every decision option for every selection criteria.",r.a.createElement("br",null),"Move the slider to the right or left rate it.")),de=r.a.createElement("div",null,r.a.createElement("h2",null,"Decision Options Ranking"),r.a.createElement("p",null,"The chart shows you the best option based on your previous input.",r.a.createElement("br",null),"It's shown on a scale from 0 to 10, being 10 the best possible rating.",r.a.createElement("br",null),r.a.createElement("br",null),"The best option is the one with the highest scores in the most important criteria for you. It's also the one, in which you are facing the minimum amount of trade-offs.")),ue=r.a.createElement("div",null,r.a.createElement("h2",null,"Selection Criteria Ranking"),r.a.createElement("p",null,"The chart shows you on a scale from 0 to 10, which criteria is the most important for your decision."));!function(e){e.error="error",e.warning="warning",e.info="info",e.success="success"}(n||(n={}));var me={type:n.error,allowClose:!0,autoHide:!1,text:""},pe={type:n.error,allowClose:!0,autoHide:!1,text:""},ge={type:n.warning,allowClose:!1,autoHide:!1,text:"At least two decision options are necessary! "},fe={type:n.warning,allowClose:!1,autoHide:!1,text:"At least two selection criteria are necessary! "},he=Object(o.a)({divMain:{paddingTop:R.spacing(2.5),paddingBottom:R.spacing(5.5),textAlign:"center"},infoButton:{bottom:R.spacing(.25),left:R.spacing(1.2)},gridItem:{maxWidth:R.spacing(62),marginRight:R.spacing(2),marginLeft:R.spacing(2),marginBottom:R.spacing(4)},emptySpace:{height:R.spacing(4)}}),be=function(e){var t=Object(i.useState)(!1),a=Object(O.a)(t,2),n=a[0],c=a[1],o=Object(i.useState)(!1),s=Object(O.a)(o,2),l=s[0],d=s[1],u=e.hidden,m=he();return r.a.createElement("div",{className:m.divMain},r.a.createElement(b.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(b.a,{item:!0,xs:6,className:m.gridItem},r.a.createElement(h.a,{component:"span",variant:"h5"},"Decision Options",r.a.createElement(D.a,{"aria-label":"Help","data-testid":"".concat(ee.a.decisionOptions,"InfoButton"),className:m.infoButton,onClick:function(){return c(!0)}},r.a.createElement(A.a,{color:"secondary"}))),r.a.createElement(re,{itemsKey:ee.a.decisionOptions,notEnoughItemsAlert:ge,hidden:u})),r.a.createElement(b.a,{item:!0,xs:6,className:m.gridItem},r.a.createElement(h.a,{component:"span",variant:"h5"},"Selection Criteria",r.a.createElement(D.a,{"aria-label":"Help","data-testid":"".concat(ee.a.selectionCriteria,"InfoButton"),className:m.infoButton,onClick:function(){return d(!0)}},r.a.createElement(A.a,{color:"secondary"}))),r.a.createElement(re,{itemsKey:ee.a.selectionCriteria,notEnoughItemsAlert:fe,hidden:u}))),r.a.createElement("div",{className:m.emptySpace}),r.a.createElement(J,{text:ce,show:n,onClose:function(){return c(!1)}}),r.a.createElement(J,{text:oe,show:l,onClose:function(){return d(!1)}}))},Ee=a(632),ve=a(60),Oe=Object(o.a)({divMain:{paddingTop:R.spacing(2.5),paddingBottom:R.spacing(5.5),textAlign:"center",alignContent:"center"},title:{paddingBottom:R.spacing(1.5)},infoButton:{bottom:R.spacing(.25),left:R.spacing(1.2)},paper:{padding:R.spacing(1),marginBottom:R.spacing(2),marginRight:R.spacing(1),marginLeft:R.spacing(1),width:"100%"},gridItemCriteria:{minWidth:R.spacing(40),maxWidth:R.spacing(50),display:"flex",alignItems:"center"},sliderMarks:{height:8,width:1,marginTop:-3,backgroundColor:R.palette.primary.main},sliderTrack:{opacity:100},gridItemSlider:{marginTop:R.spacing(-2),marginBottom:R.spacing(-1),marginLeft:R.spacing(1),marginRight:R.spacing(1)},gridItemSliderInfo:{marginTop:R.spacing(-2.5)},emptySpace:{height:R.spacing(4)}}),ye=function(e){Object(f.g)().decisionId;var t=e.hidden,a=Object(i.useState)(!1),n=Object(O.a)(a,2),c=n[0],o=n[1],s=Object(i.useState)([]),l=Object(O.a)(s,2),d=l[0],m=l[1],p=Object(u.d)((function(e){return e.OptionsAndCriteria.selectionCriteria}),u.b),g=Object(u.d)((function(e){return e.WeightedCriteria}),u.b),y=Oe(),j=Object(u.c)(),C=[{value:-66.6},{value:-33.3},{value:0},{value:33.3},{value:66.6}];Object(i.useEffect)((function(){t?m([]):x()}),[t]);var x=function(){for(var e=g,t=Math.max.apply(Math,Object(E.a)(g.map((function(e){return e.id}))).concat([0]))+1,a=function(a){for(var n=function(n){null==e.find((function(e){return e.selectionCriteria1Id===p[a].id&&e.selectionCriteria2Id===p[n].id||e.selectionCriteria1Id===p[n].id&&e.selectionCriteria2Id===p[a].id}))&&(e=[].concat(Object(E.a)(e),[{id:t,weight:0,selectionCriteria1Id:p[a].id,selectionCriteria2Id:p[n].id}]),t+=1)},i=a+1;i<p.length;i+=1)n(i)},n=0;n<p.length;n+=1)a(n);j(ve.a.actions.setWeightedCriteria(e))},w=function(e){var t=p.find((function(t){return t.id===e}));return null==t?"Loading...":t.name};return r.a.createElement("div",{className:y.divMain},r.a.createElement(b.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement("div",{className:y.title},r.a.createElement(h.a,{component:"span",variant:"h5",gutterBottom:!0},"Weight Criteria",r.a.createElement(D.a,{"data-testid":"WeightCriteriaInfoButton","aria-label":"Help",className:y.infoButton,onClick:function(){return o(!0)}},r.a.createElement(A.a,{color:"secondary"}))))),g.map((function(e,t){return r.a.createElement(Y.a,{in:!0,timeout:500,style:{transitionDelay:"".concat(100*t,"ms")},key:e.id},r.a.createElement(b.a,{item:!0,xs:6,className:y.gridItemCriteria,key:e.id},r.a.createElement(V.a,{elevation:2,className:y.paper},r.a.createElement(b.a,{container:!0,spacing:2,alignItems:"center"},r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(h.a,{component:"span","data-testid":"textSlider".concat(t,"CriteriaLeft"),variant:"body1"},w(e.selectionCriteria1Id))),r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(h.a,{component:"span","data-testid":"textSlider".concat(t,"CriteriaRight"),variant:"body1"},w(e.selectionCriteria2Id))),r.a.createElement(b.a,{item:!0,xs:12,zeroMinWidth:!0,className:y.gridItemSlider},r.a.createElement(Ee.a,{"data-testid":"slider".concat(t),classes:{track:y.sliderTrack,rail:y.sliderTrack,mark:y.sliderMarks,markActive:y.sliderMarks},value:e.weight,min:-100,max:100,step:1,marks:C,onChange:function(t,a){return function(e,t,a){j(ve.a.actions.updateWeightedCriteria(Object(v.a)(Object(v.a)({},a),{},{weight:t}))),m(d.map((function(e){return e.id===a.id?Object(v.a)(Object(v.a)({},e),{},{weight:t}):e})))}(0,a,e)},onChangeCommitted:function(t,a){return function(e,t){j(ve.a.actions.updateWeightedCriteria(Object(v.a)(Object(v.a)({},t),{},{weight:e})))}(a,e)}})),r.a.createElement(b.a,{item:!0,xs:12,className:y.gridItemSliderInfo},r.a.createElement(h.a,{component:"span","data-testid":"infoTextSlider".concat(t),variant:"caption"},function(e,t,a){var n=w(t),i=w(a);switch(!0){case e<-66:return"".concat(n," is way more important than ").concat(i);case e<-33:return"".concat(n," is more important than ").concat(i);case e<-5:return"".concat(n," is a little more important than ").concat(i);case e<5:return"".concat(n," is as important as ").concat(i);case e<33:return"".concat(i," is a little more important than ").concat(n);case e<66:return"".concat(i," is more important than ").concat(n);case e<=100:return"".concat(i," is way more important than ").concat(n);default:return""}}(e.weight,e.selectionCriteria1Id,e.selectionCriteria2Id)))))))}))),r.a.createElement("div",{className:y.emptySpace}),r.a.createElement(J,{text:se,show:c,onClose:function(){return o(!1)}}))},je=a(38),Ce=a.n(je),xe=a(46),we=a(96),Se=a.n(we),ke=a(266),Ie=function(e,t){var a,n,i=Object(v.a)(Object(v.a)({},pe),{},{text:"".concat(null===(a=t.response)||void 0===a?void 0:a.statusText," (").concat(null===(n=t.response)||void 0===n?void 0:n.status,")")});e(te.a.actions.addAlert(i))},Ne=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return function(){var r=Object(ke.a)(Se.a.mark((function r(c){return Se.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,c(te.a.actions.startLoading());case 2:e.then((function(e){c(t(null==i?e.data:i)),null!=a&&a(c,e)})).catch((function(e){null!=n?n(c,e,i):Ie(c,e)})).finally((function(){c(te.a.actions.endLoading())}));case 3:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()},Te=a(61),Be=function(e,t,a){Ie(e,t),Le(e,a)},Le=function(e,t){var a=xe.a.getState().RatedOptions.find((function(e){return e.id===t.id}));e(Te.a.actions.updateRatedOptions(a))},Re=function(e,t,a,n){var i={params:{calculatedScore:n}},r=a===ee.a.decisionOptions?ee.b.actions.setDecisionOptions.bind(null):ee.b.actions.setSelectionCriteria.bind(null);e(Ne(Ce.a.get("/api/decisions/".concat(t,"/").concat(a,"/"),i),r))},We=Object(o.a)({divMain:{paddingTop:R.spacing(2.5),paddingBottom:R.spacing(5.5),textAlign:"center",alignContent:"center"},infoButton:{bottom:R.spacing(.25),left:R.spacing(1)},paper:{padding:R.spacing(1),marginBottom:R.spacing(2),marginRight:R.spacing(2),marginLeft:R.spacing(2)},mainGridItem:{minWidth:R.spacing(40),maxWidth:R.spacing(50),marginTop:R.spacing(1)},titleGridItem:{marginTop:R.spacing(1),marginBottom:R.spacing(1)},gridItemGridContainer:{paddingBottom:R.spacing(2)},gridItemGridContainerTitle:{paddingLeft:R.spacing(2)},sliderLeftText:{paddingLeft:R.spacing(1.8),paddingRight:R.spacing(1.8),marginTop:R.spacing(1),textAlign:"left"},sliderRightText:{paddingLeft:R.spacing(1.8),paddingRight:R.spacing(1.8),marginTop:R.spacing(1),textAlign:"right"},gridItemSlider:{marginTop:R.spacing(-2),marginLeft:R.spacing(1),marginRight:R.spacing(1)},sliderMarks:{height:8,width:1,marginTop:-3,backgroundColor:R.palette.primary.main},sliderTrack:{opacity:100},emptySpace:{height:R.spacing(4)}}),Ae=function(e){var t=Object(f.g)().decisionId,a=e.hidden,n=Object(i.useState)(!1),c=Object(O.a)(n,2),o=c[0],s=c[1],l=Object(i.useState)(!1),d=Object(O.a)(l,2),m=d[0],p=d[1],g=Object(i.useState)([]),E=Object(O.a)(g,2),y=E[0],j=E[1],C=Object(u.d)((function(e){return e.OptionsAndCriteria}),u.b),x=C.selectionCriteria,w=C.decisionOptions,S=Object(u.d)((function(e){return e.RatedOptions}),u.b),k=We(),I=Object(u.c)(),N=[{value:2},{value:26},{value:50},{value:74},{value:98}];Object(i.useEffect)((function(){a?(j([]),p(!1)):(Re(I,t,ee.a.selectionCriteria,!1),Re(I,t,ee.a.decisionOptions,!1),function(e,t){e(Ne(Ce.a.get("/api/decisions/".concat(t,"/ratedOptions")),Te.a.actions.setRatedOptions.bind(null)))}(I,t))}),[a]),Object(i.useEffect)((function(){S.length!==y.length&&p(!0),S.length>0&&j(S)}),[S]);var T=function(e,a,n){var i=y.find((function(e){return e.selectionCriteriaId===a&&e.decisionOptionId===n}));!function(e,t,a){e(Ne(Ce.a.put("/api/decisions/".concat(t,"/ratedOptions/"),a),Te.a.actions.updateRatedOptions.bind(null),null,Be.bind(null),a))}(I,t,Object(v.a)(Object(v.a)({},i),{},{score:e}))},B=function(e,t){var a=y.find((function(a){return a.selectionCriteriaId===e&&a.decisionOptionId===t}));return null==a?50:a.score};return r.a.createElement("div",{className:k.divMain},r.a.createElement(b.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(h.a,{component:"span",variant:"h5",gutterBottom:!0},"Rate Options",r.a.createElement(D.a,{"data-testid":"RateOptionsInfoButton","aria-label":"Help",className:k.infoButton,onClick:function(){return s(!0)}},r.a.createElement(A.a,{color:"secondary"})))),!a&&x.map((function(e,t){return r.a.createElement(Y.a,{key:e.id,in:m,timeout:500,style:{transitionDelay:"".concat(100*t,"ms")}},r.a.createElement(b.a,{item:!0,xs:6,className:k.mainGridItem,key:e.id},r.a.createElement(V.a,{className:k.paper,elevation:2,key:e.id},r.a.createElement("div",null,r.a.createElement(b.a,{container:!0},r.a.createElement(b.a,{item:!0,xs:12,className:k.titleGridItem},r.a.createElement(h.a,{component:"span",variant:"h6"},e.name)),w.map((function(a,n){return r.a.createElement(b.a,{container:!0,justify:"center",alignItems:"center",className:k.gridItemGridContainer,key:a.id},r.a.createElement(b.a,{item:!0,xs:4,className:k.gridItemGridContainerTitle},r.a.createElement(h.a,{component:"span",variant:"body1"},a.name)),r.a.createElement(b.a,{item:!0,xs:8},r.a.createElement(b.a,{container:!0},r.a.createElement(b.a,{item:!0,xs:6,className:k.sliderLeftText},r.a.createElement(h.a,{variant:"caption",style:{fontSize:11}},"Bad")),r.a.createElement(b.a,{item:!0,xs:6,className:k.sliderRightText},r.a.createElement(h.a,{variant:"caption",style:{fontSize:11}},"Good")),r.a.createElement(b.a,{item:!0,xs:12,className:k.gridItemSlider},r.a.createElement(Ee.a,{"data-testid":"slider".concat(t).concat(n),classes:{track:k.sliderTrack,rail:k.sliderTrack,mark:k.sliderMarks,markActive:k.sliderMarks},value:B(e.id,a.id),min:0,max:100,step:1,marks:N,onChange:function(t,n){return i=e.id,r=a.id,c=n,void j(y.map((function(e){return e.selectionCriteriaId===i&&e.decisionOptionId===r?Object(v.a)(Object(v.a)({},e),{},{score:c}):e})));var i,r,c},onChangeCommitted:function(t,n){return T(n,e.id,a.id)}})))))})))))))}))),r.a.createElement("div",{className:k.emptySpace}),r.a.createElement(J,{text:le,show:o,onClose:function(){return s(!1)}}))},De=a(53),Me=Object(o.a)({divMain:{paddingTop:R.spacing(.8),paddingLeft:R.spacing(.8),paddingRight:R.spacing(.8)},title:{paddingTop:R.spacing(2)},chartContainer:{marginLeft:R.spacing(2)},infoButton:{bottom:R.spacing(.25),left:R.spacing(1.2)},bars:{width:R.spacing(19)}}),He=function(e){var t=Object(i.useState)([]),a=Object(O.a)(t,2),n=a[0],c=a[1],o=Object(i.useState)(!1),s=Object(O.a)(o,2),l=s[0],d=s[1],m=Object(i.useState)(!1),p=Object(O.a)(m,2),g=p[0],b=p[1],E=e.hidden,y=e.itemsKey,j=e.title,C=e.infoText,x=Object(u.d)((function(e){return e.OptionsAndCriteria[y]}),u.b),w=Object(f.g)().decisionId,S=Me(),k=Object(u.c)();Object(i.useEffect)((function(){E?(c([]),b(!1)):Re(k,w,y,!0)}),[E]),Object(i.useEffect)((function(){x.length===n.length||E||(c(I(x)),b(!0))}),[x]);var I=function(e){return e.map((function(e){if(e.name.length>13){var t=new RegExp("([^s]{".concat(13,"})"),"g"),a=new RegExp("-\n$","g"),n=e.name.replace(t,"$1-\n").replace(a,"");return Object(v.a)(Object(v.a)({},e),{},{name:n})}return e}))};return r.a.createElement("div",{className:S.divMain,"data-testid":"".concat(y,"Diagram")},r.a.createElement(Y.a,{in:g,timeout:500},r.a.createElement(V.a,{elevation:2,key:"Option"},r.a.createElement(h.a,{variant:"h5",gutterBottom:!0,className:S.title},j,r.a.createElement(D.a,{"data-testid":"".concat(y,"ResultsInfoButton"),"aria-label":"Help",className:S.infoButton,onClick:function(){return d(!0)}},r.a.createElement(A.a,{color:"secondary"}))),r.a.createElement(h.a,{component:"span",variant:"body1"},r.a.createElement(De.f,{height:n.length*R.spacing(9)+R.spacing(5),width:"98%",className:S.chartContainer},r.a.createElement(De.b,{data:n,margin:{top:R.spacing(0),right:R.spacing(5),left:R.spacing(5),bottom:R.spacing(1)},layout:"vertical",barCategoryGap:"20%",maxBarSize:10},r.a.createElement(De.c,{horizontal:!1,stroke:"#a0a0a0",strokeWidth:.5}),r.a.createElement(De.g,{dataKey:"score",type:"number",dy:-5,axisLine:!1,tickLine:!1,domain:[0,10],ticks:[0,2.5,5,7.5,10],stroke:"#a0a0a0",tick:{fontSize:"0.8rem"}}),r.a.createElement(De.h,{type:"category",dataKey:"name",width:R.spacing(10)}),r.a.createElement(De.a,{dataKey:"score",animationDuration:1e3,label:{position:"right"},shape:r.a.createElement(De.e,{className:S.bars,radius:[0,10,10,0]})},n.map((function(e,t){return r.a.createElement(De.d,{key:e.id,fill:function(){switch(t){case 0:return"#0f61a0";case 1:return"#646464";default:return"#a0a0a0"}}()})})))))))),r.a.createElement(J,{text:C,show:l,onClose:function(){return d(!1)}}))},Ge=Object(o.a)({divMain:{paddingTop:R.spacing(2.5),paddingBottom:R.spacing(5.5),textAlign:"center"},gridItem:{maxWidth:R.spacing(75),minWidth:R.spacing(38),margin:R.spacing(2)}}),Pe=function(e){var t=e.hidden,a=Ge();return r.a.createElement("div",{className:a.divMain},r.a.createElement(b.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(b.a,{className:a.gridItem,key:"1",item:!0,xs:12},r.a.createElement(He,{itemsKey:ee.a.decisionOptions,hidden:t,title:"Decision Options Ranking",infoText:de})),r.a.createElement(b.a,{className:a.gridItem,key:"2",item:!0,xs:12},r.a.createElement(He,{itemsKey:ee.a.selectionCriteria,hidden:t,title:"Selection Criteria Ranking",infoText:ue}))))},ze=Object(o.a)({divMain:{flexGrow:1,width:"100%",overflowX:"hidden"},stepper:{backgroundColor:"transparent"},stepperLabel:{marginBottom:R.spacing(-1.5)},buttonNext:{position:"fixed",bottom:0,right:0,margin:R.spacing(1)},buttonBack:{position:"fixed",bottom:0,left:0,margin:R.spacing(1)}}),Ke=function(){var e=Object(i.useState)(1),t=Object(O.a)(e,2),a=t[0],n=t[1],c=Object(i.useState)(1),o=Object(O.a)(c,2),s=o[0],l=o[1],d=Object(i.useState)(!1),m=Object(O.a)(d,2),p=m[0],g=m[1],f=Object(i.useState)([{number:1,name:"Options and selection criteria",disabled:!1,completed:!1},{number:2,name:"Weight criteria",disabled:!1,completed:!1},{number:3,name:"Rate options",disabled:!1,completed:!1},{number:4,name:"Result",disabled:!1,completed:!1}]),h=Object(O.a)(f,2),b=h[0],w=h[1],k=Object(u.d)((function(e){return e.App}),u.b).alerts,N=ze();Object(i.useEffect)((function(){return function(){n(0),l(0)}}),[]),Object(i.useEffect)((function(){L(k.includes(ge)||k.includes(fe))}),[k]);var L=function(e){g(e),w(b.map((function(t){return t.number>1?Object(v.a)(Object(v.a)({},t),{},{disabled:e}):t})))},W=function(e){!function(e){var t=Object(E.a)(b),a=t.findIndex((function(t){return t.number===e}));t[a].completed=!0,w(t)}(a),n(e)};return r.a.createElement("div",{className:N.divMain},r.a.createElement(j.a,{className:N.stepper,alternativeLabel:!0,nonLinear:!0,activeStep:a-1},b.map((function(e){return r.a.createElement(y.a,{key:e.number},r.a.createElement(C.a,{"data-testid":"Step".concat(e.number,"Button"),onClick:function(){return W(e.number)},completed:e.completed,disabled:e.disabled},r.a.createElement(B.a,{StepIconProps:{classes:{root:N.stepperLabel}}},e.name)))}))),r.a.createElement(T.a,{axis:"rtl"===R.direction?"x-reverse":"x",index:a-1,onTransitionEnd:function(){return l(a)}},r.a.createElement(be,{hidden:1!==s}),r.a.createElement(ye,{hidden:2!==s}),r.a.createElement(Ae,{hidden:3!==s}),r.a.createElement(Pe,{hidden:4!==s})),1!==a?r.a.createElement(x.a,{"data-testid":"PrevStepButton",color:"secondary","aria-label":"Previous Step",size:"medium",className:N.buttonBack,onClick:function(){return W(a-1)}},r.a.createElement(I.a,null)):null,a!==b.length?r.a.createElement(x.a,{"data-testid":"NextStepButton",color:"primary","aria-label":"Next Step",size:"medium",className:N.buttonNext,onClick:function(){return W(a+1)},disabled:p},r.a.createElement(S.a,null)):null)},Je=a(629),Ue=a(627),Fe=function(){var e=Object(u.d)((function(e){return e.App}),u.b).alerts,t=Object(i.useState)(0),a=Object(O.a)(t,2),c=a[0],o=a[1],s=Object(i.useState)(!1),l=Object(O.a)(s,2),d=l[0],m=l[1],p=Object(i.useState)(me),g=Object(O.a)(p,2),f=g[0],h=g[1],b=Object(u.c)();Object(i.useEffect)((function(){null!=e[0]&&""!==e[0].text?(h(y(e)),o(v(e[0])),m(!0)):m(!1)}),[e]);var E=function(e,t){"clickaway"!==t&&(m(!1),b(te.a.actions.deleteAlert(f)))},v=function(e){if(!e.autoHide)return 0;var t=String(e.text).match(/[\w\d\u2019-]+/gi);return(t?t.length:0)/3.3*1500},y=function(e){var t=e.filter((function(e){return e.type===n.error}));if(t.length>0)return t[0];var a=e.filter((function(e){return e.type===n.warning}));if(a.length>0)return a[0];var i=e.filter((function(e){return e.type===n.success}));if(i.length>0)return i[0];var r=e.filter((function(e){return e.type===n.info}));return r.length>0?r[0]:e[0]};return r.a.createElement("div",null,r.a.createElement(Je.a,{open:d,autoHideDuration:0!==c?c:void 0,onClose:E},r.a.createElement(Ue.a,{"data-testid":"".concat(f.type,"Alert"),onClose:f.allowClose?E:void 0,variant:"filled",severity:f.type},f.text)))},Xe=a(280),$e=a.n(Xe),qe=a(131),Qe=a.n(qe),_e=a(93),Ve=a(132),Ye=function(e){localStorage.setItem("token",e),Ce.a.defaults.headers.common.Authorization=e},Ze=function(){localStorage.removeItem("token"),delete Ce.a.defaults.headers.common.Authorization},et=a(620),tt=Object(o.a)({divMain:{textAlign:"center",marginTop:R.spacing(3)},TitleTypography:{marginTop:R.spacing(1)},gridContainer:{minWidth:R.spacing(40),maxWidth:R.spacing(63)},paper:{margin:R.spacing(1)},TitleGridItem:{paddingTop:R.spacing(4)},TextGridItem:{paddingTop:R.spacing(2)},button:{paddingTop:R.spacing(3),paddingBottom:R.spacing(3)}}),at=function(){var e=tt(),t=Object(f.f)();return r.a.createElement("div",{className:e.divMain},r.a.createElement(b.a,{container:!0,justify:"center"},r.a.createElement(V.a,{elevation:2,key:"mainPaper",className:e.paper},r.a.createElement(b.a,{container:!0,justify:"center",alignItems:"center",spacing:0,className:e.gridContainer},r.a.createElement(b.a,{item:!0,xs:12,className:e.TitleGridItem},r.a.createElement(h.a,{component:"span",variant:"h4",gutterBottom:!0},"Oops!")),r.a.createElement(b.a,{item:!0,xs:12,className:e.TextGridItem},r.a.createElement(h.a,{component:"span",variant:"body1",gutterBottom:!0},"Page not found...")),r.a.createElement(b.a,{item:!0,xs:12,className:e.button},r.a.createElement(et.a,{"data-testid":"GoHomeButton",variant:"contained",color:"primary",onClick:function(){return t.push("/")}},"GO HOME"))))))};!function(e){if(""!==e&&void 0!==e){var t,a=Qe()(e),n=Date.now()/1e3;if(a.exp<n)(t=xe.a.dispatch)(Ve.a.actions.setDecisions([])),t(ee.b.actions.setDecisionOptions([])),t(ee.b.actions.setSelectionCriteria([])),t(Te.a.actions.setRatedOptions([])),t(_e.a.actions.deleteSession()),t(ve.a.actions.setWeightedCriteria([])),Ze();else{var i={success:!0,token:e};xe.a.dispatch(_e.a.actions.setSession(i)),Ye(e)}}}(localStorage.token);var nt=Object(o.a)({divMain:{flexGrow:1,width:"100%",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:"100vh"},appBar:{position:"fixed",Top:0,marginBottom:R.spacing(2),height:R.spacing(6),width:"100%",justifyContent:"center",justifyItems:"center"},linearProgress:{position:"fixed",marginTop:R.spacing(6),Top:0,width:"100%"},divLogoDcide:{height:"100%",marginLeft:R.spacing(-1)},imgDcideLogo:{width:R.spacing(17),height:"100%"},divLogoMaibornWolff:{position:"absolute",right:R.spacing(1),height:"60%"},imgMaibornWolffLogo:{width:R.spacing(7),height:"100%"},divRouter:{marginTop:R.spacing(6)},footer:{marginTop:"auto",marginBottom:R.spacing(.5)},footerLegalText:{marginTop:-R.spacing(.5)},link:{cursor:"pointer"}});t.default=function(){var e=Object(u.d)((function(e){return e.App}),u.b).isLoading,t=nt();return r.a.createElement(s.a,{theme:R},r.a.createElement("div",{className:t.divMain},r.a.createElement(c.a,{position:"static",color:"primary",className:t.appBar},r.a.createElement(p.a,null,r.a.createElement("div",{className:t.divLogoDcide,"data-testid":"d-cideLogo"},r.a.createElement(m.a,{href:"/",style:{textDecoration:"none"}},r.a.createElement(l.a,{className:t.imgDcideLogo,image:$e.a,title:"d-cide imgDcideLogo"}))))),r.a.createElement("div",{className:t.linearProgress},e>0&&r.a.createElement(d.a,{color:"secondary"})),r.a.createElement("div",{className:t.divRouter},r.a.createElement(g.b,{basename:"/d-cide"},r.a.createElement(f.c,null,r.a.createElement(f.a,{exact:!0,path:"/",component:Ke}),r.a.createElement(f.a,{component:at})))),r.a.createElement(b.a,{className:t.footer,container:!0,justify:"center",alignContent:"center"},r.a.createElement(h.a,{component:"span",variant:"caption",align:"center"},r.a.createElement(b.a,{item:!0,xs:12},"Made with \xa0",r.a.createElement("span",{role:"img","aria-label":"love"},"\ud83d\udc96"),"\xa0 by Christian J\xf6cker"),r.a.createElement(b.a,{style:{marginTop:R.spacing(-.5)},item:!0,xs:12},r.a.createElement(m.a,{href:"/",className:t.link,underline:"always"},"Privacy"),"\xa0\xa0\xa0",r.a.createElement(m.a,{href:"/",className:t.link,underline:"always"},"Imprint")))),r.a.createElement(Fe,null)))}},60:function(e,t,a){"use strict";var n=a(29),i=Object(n.b)({name:"WeightedCriteria",initialState:[],reducers:{setWeightedCriteria:function(e,t){return t.payload},updateWeightedCriteria:function(e,t){return e.map((function(e){return e.id===t.payload.id?t.payload:e}))}}});t.a=i},61:function(e,t,a){"use strict";var n=a(29),i=Object(n.b)({name:"RatedOptions",initialState:[],reducers:{setRatedOptions:function(e,t){return t.payload},updateRatedOptions:function(e,t){return e.map((function(e){return e.decisionOptionId===t.payload.decisionOptionId&&e.selectionCriteriaId===t.payload.selectionCriteriaId?t.payload:e}))}}});t.a=i},9:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n,i=a(35),r=a(29);!function(e){e.decisionOptions="decisionOptions",e.selectionCriteria="selectionCriteria"}(n||(n={}));var c=Object(r.b)({name:"OptionsAndCriteria",initialState:{decisionOptions:[],selectionCriteria:[]},reducers:{setDecisionOptions:function(e,t){e.decisionOptions=t.payload},addDecisionOption:function(e,t){e.decisionOptions=[t.payload].concat(Object(i.a)(e.decisionOptions))},updateDecisionOption:function(e,t){e.decisionOptions=e.decisionOptions.map((function(e){return e.id===t.payload.id?t.payload:e}))},deleteDecisionOption:function(e,t){e.decisionOptions=e.decisionOptions.filter((function(e){return e.id!==t.payload}))},setSelectionCriteria:function(e,t){e.selectionCriteria=t.payload},addSelectionCriteria:function(e,t){e.selectionCriteria=[t.payload].concat(Object(i.a)(e.selectionCriteria))},updateSelectionCriteria:function(e,t){e.selectionCriteria=e.selectionCriteria.map((function(e){return e.id===t.payload.id?t.payload:e}))},deleteSelectionCriteria:function(e,t){e.selectionCriteria=e.selectionCriteria.filter((function(e){return e.id!==t.payload}))}}});t.b=c},93:function(e,t,a){"use strict";var n=a(29),i=a(131),r=a.n(i),c={signUpSuccessful:!1,wrongPassword:!1,token:"",user:{registeredUser:!1,fullName:"",id:0,exp:0,iat:0,username:""},signUpErrors:{username:"",fullName:"",password:"",confirmPassword:""}},o=Object(n.b)({name:"Session",initialState:c,reducers:{setSession:function(e,t){e.token=t.payload.token,e.user=r()(t.payload.token),e.wrongPassword=!1},deleteSession:function(e){e.token="",e.user=c.user,e.wrongPassword=!1}}});t.a=o}},[[321,1,2]]]);
//# sourceMappingURL=main.1ba28df1.chunk.js.map