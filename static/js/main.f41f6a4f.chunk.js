(this["webpackJsonpd-cide"]=this["webpackJsonpd-cide"]||[]).push([[0],{16:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n,i=a(25),r=a(33);!function(e){e.decisionOptions="decisionOptions",e.selectionCriteria="selectionCriteria"}(n||(n={}));var c=Object(r.b)({name:"OptionsAndCriteria",initialState:{decisionOptions:[],selectionCriteria:[]},reducers:{setDecisionOptions:function(e,t){e.decisionOptions=t.payload},addDecisionOption:function(e,t){e.decisionOptions=[t.payload].concat(Object(i.a)(e.decisionOptions))},updateDecisionOption:function(e,t){e.decisionOptions=e.decisionOptions.map((function(e){return e.id===t.payload.id?t.payload:e}))},deleteDecisionOption:function(e,t){e.decisionOptions=e.decisionOptions.filter((function(e){return e.id!==t.payload}))},setSelectionCriteria:function(e,t){e.selectionCriteria=t.payload},addSelectionCriteria:function(e,t){e.selectionCriteria=[t.payload].concat(Object(i.a)(e.selectionCriteria))},updateSelectionCriteria:function(e,t){e.selectionCriteria=e.selectionCriteria.map((function(e){return e.id===t.payload.id?t.payload:e}))},deleteSelectionCriteria:function(e,t){e.selectionCriteria=e.selectionCriteria.filter((function(e){return e.id!==t.payload}))}}});t.b=c},162:function(e,t,a){"use strict";a.r(t);var n=a(31),i=a(45),r=a(16),c=a(96),o=a(97),l=Object(n.c)({App:i.a.reducer,OptionsAndCriteria:r.b.reducer,WeightedCriteria:c.a.reducer,RatedOptions:o.a.reducer});t.default=l},182:function(e,t,a){},258:function(e,t,a){e.exports=a.p+"static/media/d-cide_Logo.9d73cbb7.svg"},299:function(e,t,a){e.exports=a(527)},45:function(e,t,a){"use strict";var n=a(25),i=a(33),r=Object(i.b)({name:"App",initialState:{alerts:[]},reducers:{addAlert:function(e,t){e.alerts=e.alerts.some((function(e){return JSON.stringify(e)===JSON.stringify(t.payload)}))?e.alerts:[t.payload].concat(Object(n.a)(e.alerts))},deleteAlert:function(e,t){e.alerts=e.alerts.filter((function(e){return JSON.stringify(e)!==JSON.stringify(t.payload)}))}}});t.a=r},526:function(e,t,a){"use strict";a.r(t);var n,i=a(0),r=a.n(i),c=(a(182),a(576)),o=a(562),l=a(565),s=a(577),d=a(566),u=a(572),m=a(21),p=a(25),g=a(22),f=a(9),h=a(573),b=a(582),E=a(574),v=a(575),y=a(257),O=a.n(y),C=a(256),j=a.n(C),x=a(237),w=a.n(x),S=a(532),I=a(12),k=a(259),N=Object(k.a)({typography:{fontFamily:["Quicksand","sans-serif"].join(","),caption:{fontWeight:500,fontSize:14,color:"#000000"},fontWeightRegular:500,fontWeightBold:600,h1:{fontWeight:600},h2:{fontWeight:600},h3:{fontWeight:600},h4:{fontWeight:600},h5:{fontWeight:600},h6:{fontWeight:600}},palette:{primary:{main:"#0f61a0",contrastText:"#fafafa"},secondary:{main:"#878787",contrastText:"#fafafa"}}}),B=a(44),T=a.n(B),A=a(567),R=a(583),D=a(242),M=a.n(D),W=a(241),L=a.n(W),H=Object(o.a)({dialogContent:{marginTop:N.spacing(-2)},closeButton:{position:"absolute",right:N.spacing(1),top:N.spacing(1),backgroundColor:"white"},text:{textAlign:"justify"}}),G=function(e){var t=e.text,a=e.show,n=e.onClose,c=H(),o=Object(i.useState)(!1),l=Object(f.a)(o,2),s=l[0],u=l[1];Object(i.useEffect)((function(){u(!0)}),[]),Object(i.useEffect)((function(){if(s){var e=t.props.children.find((function(e){return"h2"===e.type})).props.children;a?m.a.event({category:"Info dialog",action:"Open dialog ".concat(e)}):m.a.event({category:"Info dialog",action:"Close dialog ".concat(e)})}}),[a]);var p=function(){n()};return r.a.createElement("div",null,r.a.createElement(R.a,{onClose:p,"aria-labelledby":"customized-dialog-title",open:a},r.a.createElement(L.a,{className:c.dialogContent},r.a.createElement(d.a,{component:"span","data-testid":"infoText",variant:"body1",className:c.text},t),r.a.createElement(A.a,{"aria-label":"Close","data-testid":"infoCloseButton",className:c.closeButton,onClick:p},r.a.createElement(M.a,null)))))},z=a(568),K=a(569),J=a(571),P=a(244),F=a.n(P),U=a(243),X=a.n(U),$=a(529),q=a(564),Q=a(578),_=a(16),V=a(45),Y=[{id:1,name:"House 1",score:0},{id:2,name:"House 2",score:0},{id:3,name:"House 3",score:0}],Z=[{id:1,name:"Size",score:0},{id:2,name:"Garden",score:0},{id:3,name:"Kitchen",score:0},{id:4,name:"Neighborhood",score:0}],ee=Object(o.a)({divMain:{minWidth:N.spacing(37)},paperTitle:{marginBottom:N.spacing(2),marginRight:N.spacing(1.5),marginLeft:N.spacing(1.5)},paperItems:{marginTop:N.spacing(.5),marginRight:N.spacing(1.5),marginLeft:N.spacing(1.5),cursor:"pointer"},editButton:{marginRight:N.spacing(-1)},deleteButton:{marginRight:N.spacing(-1.5)},inputBase:{marginRight:N.spacing(2),width:"100%",wordWrap:"break-word"}}),te=function(e){var t=e.hidden,a=e.notEnoughItemsAlert,n=e.itemsKey,c=Object(i.useState)(!1),o=Object(f.a)(c,2),l=o[0],s=o[1],d=Object(i.useState)(""),u=Object(f.a)(d,2),h=u[0],b=u[1],E=Object(i.useState)([]),v=Object(f.a)(E,2),y=v[0],O=v[1],C=Object(i.useState)(!1),j=Object(f.a)(C,2),x=j[0],w=j[1],S=Object(I.d)((function(e){return e.OptionsAndCriteria[n]}),I.b),k=ee(),N=Object(I.c)();Object(i.useEffect)((function(){return function(){N(V.a.actions.deleteAlert(a))}}),[]),Object(i.useEffect)((function(){t?(O([]),w(!1),N(V.a.actions.deleteAlert(a))):(0===S.length&&T(),O(S),s(!0))}),[t]),Object(i.useEffect)((function(){S.length!==y.length&&!t&&l&&(R(),D(),n===_.a.decisionOptions?m.a.event({category:"Selection criteria",action:"Items number",value:S.length}):m.a.event({category:"Decision options",action:"Items number",value:S.length})),!t&&l&&O(S),0===S.length&&l&&D()}),[S]);var B=function(){if(""!==h){var e={id:Math.max.apply(Math,Object(p.a)(S.map((function(e){return e.id}))).concat([0]))+1,name:h,score:0};n===_.a.decisionOptions?(N(_.b.actions.addDecisionOption(e)),m.a.event({category:"Decision options",action:"Create"})):(N(_.b.actions.addSelectionCriteria(e)),m.a.event({category:"Selection criteria",action:"Create"}))}},T=function(){n===_.a.decisionOptions?N(_.b.actions.setDecisionOptions(Y)):N(_.b.actions.setSelectionCriteria(Z))},R=function(){S.length>0&&S[0].name===h&&b("")},D=function(){S.length<2?N(V.a.actions.addAlert(a)):N(V.a.actions.deleteAlert(a))};return r.a.createElement("div",{className:k.divMain,"data-testid":"".concat(n,"List")},r.a.createElement(z.a,null,r.a.createElement($.a,{className:k.paperTitle,elevation:2,key:"NewEntry"},r.a.createElement(K.a,null,r.a.createElement(Q.a,{inputProps:{"data-testid":"entryInput"},variant:"standard",className:k.inputBase,placeholder:"New Entry",value:h,onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),B())},onChange:function(e){return b(e.target.value)},multiline:!0}),r.a.createElement(J.a,null,r.a.createElement(A.a,{"data-testid":"addButton","aria-label":"Add",className:k.deleteButton,onClick:function(){return B()}},r.a.createElement(X.a,null))))),y.map((function(e,t){return r.a.createElement(q.a,{in:!0,style:{transitionDelay:"".concat(t*(x?0:100),"ms")},timeout:500,onEntered:function(){return function(e){e===y.length&&w(!0)}(t)},key:e.id},r.a.createElement($.a,{className:k.paperItems,elevation:2},r.a.createElement(K.a,null,r.a.createElement(Q.a,{inputProps:{"data-testid":"itemInput"},className:k.inputBase,variant:"standard",value:e.name,onChange:function(t){return function(e,t){O(y.map((function(a){return a.id===t?Object(g.a)(Object(g.a)({},a),{},{name:e.target.value}):a})))}(t,e.id)},onBlur:function(){var t;""!==(t=e).name?n===_.a.decisionOptions?(N(_.b.actions.updateDecisionOption(t)),m.a.event({category:"Decision options",action:"Edit"})):(N(_.b.actions.updateSelectionCriteria(t)),m.a.event({category:"Selection criteria",action:"Edit"})):n===_.a.decisionOptions?(N(_.b.actions.deleteDecisionOption(t.id)),m.a.event({category:"Decision options",action:"Delete empty after edit"})):(N(_.b.actions.deleteSelectionCriteria(t.id)),m.a.event({category:"Selection criteria",action:"Delete empty after edit"}))},multiline:!0,onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())}}),r.a.createElement(J.a,null,r.a.createElement(A.a,{"data-testid":"deleteButton".concat(t),"aria-label":"Delete",onClick:function(){return t=e,void(n===_.a.decisionOptions?(N(_.b.actions.deleteDecisionOption(t.id)),m.a.event({category:"Decision options",action:"Delete"})):(N(_.b.actions.deleteSelectionCriteria(t.id)),m.a.event({category:"Selection criteria",action:"Delete"})));var t},className:k.deleteButton},r.a.createElement(F.a,null))))))}))))},ae=r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"left"}},"Decision Options"),r.a.createElement("p",null,"Write every decision option you need to decide for.",r.a.createElement("br",null),"If you need to decide which house to buy, you may write something like this:"),r.a.createElement("ul",null,r.a.createElement("li",null,"House in Albert road"),r.a.createElement("li",null,"House in Crown avenue"),r.a.createElement("li",null,"House in East street")),r.a.createElement("p",null,'Take some time to think about every other option "out of the box" that may also exist.',r.a.createElement("br",null),"For example your parent's house, a trailer, a tent, etc. ",r.a.createElement("br",null),r.a.createElement("br",null),"In case you have a binary decision (yes/no), you should write two decision options. ",r.a.createElement("br",null),"For example:",r.a.createElement("ul",null,r.a.createElement("li",null,"To divorce"),r.a.createElement("li",null,"Not to divorce.")))),ne=r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"left"}},"Selection Criteria"),r.a.createElement("p",null,"Write every important selection criteria that play a role in your decision."),r.a.createElement("p",null,"If you need to decide which house to buy, you may write something like this:",r.a.createElement("ul",null,r.a.createElement("li",null,"Neighborhood"),r.a.createElement("li",null,"Size"),r.a.createElement("li",null,"Garden"),r.a.createElement("li",null,"Kitchen",r.a.createElement("br",null),r.a.createElement("br",null))))),ie=r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"left"}},"Weight Criteria"),r.a.createElement("p",null,"Decisions require always trade-offs. If not, no decision will be necessary.",r.a.createElement("br",null),"Under this principle, you should weight your selection criteria.",r.a.createElement("br",null),"Which of both criteria are you willing to sacrifice to get the other one?",r.a.createElement("br",null),r.a.createElement("br",null),"Move the slider to the left or right depending on what is more important to you.",r.a.createElement("br",null),"The distance moved in the slider is proportional to the importance of criteria compared to the other.",r.a.createElement("br",null),"This as the slider would be a balance between both criteria.")),re=r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"left"}},"Rate Options"),r.a.createElement("p",null,"Rate every decision option for every selection criteria.",r.a.createElement("br",null),"Move the slider to the right or left rate it.")),ce=r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"left"}},"Decision Options Ranking"),r.a.createElement("p",null,"The chart shows you the best option based on your previous input.",r.a.createElement("br",null),"It's shown on a scale from 0 to 10, being 10 the best possible rating.",r.a.createElement("br",null),r.a.createElement("br",null),"The best option is the one with the highest scores in the most important criteria for you. It's also the one, in which you are facing the minimum amount of trade-offs.")),oe=r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"left"}},"Selection Criteria Ranking"),r.a.createElement("p",null,"The chart shows you on a scale from 0 to 10, which criteria is the most important for your decision."));!function(e){e.error="error",e.warning="warning",e.info="info",e.success="success"}(n||(n={}));var le={type:n.error,allowClose:!0,autoHide:!1,text:""},se={type:n.warning,allowClose:!1,autoHide:!1,text:"At least two decision options are necessary! "},de={type:n.warning,allowClose:!1,autoHide:!1,text:"At least two selection criteria are necessary! "},ue=Object(o.a)({divMain:{paddingTop:N.spacing(2.5),paddingBottom:N.spacing(5.5),textAlign:"center"},infoButton:{bottom:N.spacing(.25),left:N.spacing(1.2)},gridItem:{maxWidth:N.spacing(62),marginRight:N.spacing(2),marginLeft:N.spacing(2),marginBottom:N.spacing(4)},emptySpace:{height:N.spacing(4)}}),me=function(e){var t=Object(i.useState)(!1),a=Object(f.a)(t,2),n=a[0],c=a[1],o=Object(i.useState)(!1),l=Object(f.a)(o,2),s=l[0],m=l[1],p=e.hidden,g=ue();return r.a.createElement("div",{className:g.divMain},r.a.createElement(u.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(u.a,{item:!0,xs:6,className:g.gridItem},r.a.createElement(d.a,{component:"span",variant:"h5"},"Decision Options",r.a.createElement(A.a,{"aria-label":"Help","data-testid":"".concat(_.a.decisionOptions,"InfoButton"),className:g.infoButton,onClick:function(){return c(!0)}},r.a.createElement(T.a,{color:"secondary"}))),r.a.createElement(te,{itemsKey:_.a.decisionOptions,notEnoughItemsAlert:se,hidden:p})),r.a.createElement(u.a,{item:!0,xs:6,className:g.gridItem},r.a.createElement(d.a,{component:"span",variant:"h5"},"Selection Criteria",r.a.createElement(A.a,{"aria-label":"Help","data-testid":"".concat(_.a.selectionCriteria,"InfoButton"),className:g.infoButton,onClick:function(){return m(!0)}},r.a.createElement(T.a,{color:"secondary"}))),r.a.createElement(te,{itemsKey:_.a.selectionCriteria,notEnoughItemsAlert:de,hidden:p}))),r.a.createElement("div",{className:g.emptySpace}),r.a.createElement(G,{text:ae,show:n,onClose:function(){return c(!1)}}),r.a.createElement(G,{text:ne,show:s,onClose:function(){return m(!1)}}))},pe=a(584),ge=a(96),fe=Object(o.a)({divMain:{paddingTop:N.spacing(2.5),paddingBottom:N.spacing(5.5),textAlign:"center",alignContent:"center"},title:{paddingBottom:N.spacing(1.5)},infoButton:{bottom:N.spacing(.25),left:N.spacing(1.2)},paper:{padding:N.spacing(1),marginBottom:N.spacing(2),marginRight:N.spacing(1),marginLeft:N.spacing(1),width:"100%"},gridItemCriteria:{minWidth:N.spacing(40),maxWidth:N.spacing(50),display:"flex",alignItems:"center"},sliderMarks:{height:8,width:1,marginTop:-3,backgroundColor:N.palette.primary.main},sliderTrack:{opacity:100},gridItemSlider:{marginTop:N.spacing(-2),marginBottom:N.spacing(-1),marginLeft:N.spacing(1),marginRight:N.spacing(1)},gridItemSliderInfo:{marginTop:N.spacing(-2.5)},emptySpace:{height:N.spacing(4)}}),he=function(e){var t=e.hidden,a=Object(i.useState)(!1),n=Object(f.a)(a,2),c=n[0],o=n[1],l=Object(i.useState)(!1),s=Object(f.a)(l,2),m=s[0],h=s[1],b=Object(I.d)((function(e){return e.OptionsAndCriteria.selectionCriteria}),I.b),E=Object(I.d)((function(e){return e.WeightedCriteria}),I.b),v=fe(),y=Object(I.c)(),O=[{value:-66.6},{value:-33.3},{value:0},{value:33.3},{value:66.6}];Object(i.useEffect)((function(){t?h(!1):(C(),h(!0))}),[t]);var C=function(){for(var e=E,t=Math.max.apply(Math,Object(p.a)(E.map((function(e){return e.id}))).concat([0]))+1,a=function(a){for(var n=function(n){null==e.find((function(e){return e.selectionCriteria1Id===b[a].id&&e.selectionCriteria2Id===b[n].id||e.selectionCriteria1Id===b[n].id&&e.selectionCriteria2Id===b[a].id}))&&(e=[].concat(Object(p.a)(e),[{id:t,weight:0,selectionCriteria1Id:b[a].id,selectionCriteria2Id:b[n].id}]),t+=1)},i=a+1;i<b.length;i+=1)n(i)},n=0;n<b.length;n+=1)a(n);y(ge.a.actions.setWeightedCriteria(e))},j=function(e){var t=b.find((function(t){return t.id===e}));return null==t?"Loading...":t.name};return r.a.createElement("div",{className:v.divMain},r.a.createElement(u.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(u.a,{item:!0,xs:12},r.a.createElement("div",{className:v.title},r.a.createElement(d.a,{component:"span",variant:"h5",gutterBottom:!0},"Weight Criteria",r.a.createElement(A.a,{"data-testid":"WeightCriteriaInfoButton","aria-label":"Help",className:v.infoButton,onClick:function(){return o(!0)}},r.a.createElement(T.a,{color:"secondary"}))))),E.map((function(e,t){return r.a.createElement(q.a,{in:m,timeout:500,style:{transitionDelay:"".concat(100*t,"ms")},key:e.id},r.a.createElement(u.a,{item:!0,xs:6,className:v.gridItemCriteria,key:e.id},r.a.createElement($.a,{elevation:2,className:v.paper},r.a.createElement(u.a,{container:!0,spacing:2,alignItems:"center"},r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(d.a,{component:"span","data-testid":"textSlider".concat(t,"CriteriaLeft"),variant:"body1"},j(e.selectionCriteria1Id))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(d.a,{component:"span","data-testid":"textSlider".concat(t,"CriteriaRight"),variant:"body1"},j(e.selectionCriteria2Id))),r.a.createElement(u.a,{item:!0,xs:12,zeroMinWidth:!0,className:v.gridItemSlider},r.a.createElement(pe.a,{"data-testid":"slider".concat(t),classes:{track:v.sliderTrack,rail:v.sliderTrack,mark:v.sliderMarks,markActive:v.sliderMarks},value:e.weight,min:-100,max:100,step:1,marks:O,onChange:function(t,a){return function(e,t,a){E.forEach((function(e){e.id===a.id&&y(ge.a.actions.updateWeightedCriteria(Object(g.a)(Object(g.a)({},e),{},{weight:t})))}))}(0,a,e)}})),r.a.createElement(u.a,{item:!0,xs:12,className:v.gridItemSliderInfo},r.a.createElement(d.a,{component:"span","data-testid":"infoTextSlider".concat(t),variant:"caption"},function(e,t,a){var n=j(t),i=j(a);switch(!0){case e<-66:return"".concat(n," is way more important than ").concat(i);case e<-33:return"".concat(n," is more important than ").concat(i);case e<-5:return"".concat(n," is a little more important than ").concat(i);case e<5:return"".concat(n," is as important as ").concat(i);case e<33:return"".concat(i," is a little more important than ").concat(n);case e<66:return"".concat(i," is more important than ").concat(n);case e<=100:return"".concat(i," is way more important than ").concat(n);default:return""}}(e.weight,e.selectionCriteria1Id,e.selectionCriteria2Id)))))))}))),r.a.createElement("div",{className:v.emptySpace}),r.a.createElement(G,{text:ie,show:c,onClose:function(){return o(!1)}}))},be=a(97),Ee=Object(o.a)({divMain:{paddingTop:N.spacing(2.5),paddingBottom:N.spacing(5.5),textAlign:"center",alignContent:"center"},infoButton:{bottom:N.spacing(.25),left:N.spacing(1)},paper:{padding:N.spacing(1),marginBottom:N.spacing(2),marginRight:N.spacing(2),marginLeft:N.spacing(2)},mainGridItem:{minWidth:N.spacing(40),maxWidth:N.spacing(50),marginTop:N.spacing(1)},titleGridItem:{marginTop:N.spacing(1),marginBottom:N.spacing(1)},gridItemGridContainer:{paddingBottom:N.spacing(1)},gridItemGridContainerTitle:{paddingLeft:N.spacing(2)},sliderLeftText:{paddingLeft:N.spacing(1.8),paddingRight:N.spacing(1.8),marginTop:N.spacing(1),textAlign:"left"},sliderRightText:{paddingLeft:N.spacing(1.8),paddingRight:N.spacing(1.8),marginTop:N.spacing(1),textAlign:"right"},gridItemSlider:{marginTop:N.spacing(-2),marginLeft:N.spacing(1),marginRight:N.spacing(1)},sliderMarks:{height:8,width:1,marginTop:-3,backgroundColor:N.palette.primary.main},sliderTrack:{opacity:100},emptySpace:{height:N.spacing(4)}}),ve=function(e){var t=e.hidden,a=Object(i.useState)(!1),n=Object(f.a)(a,2),c=n[0],o=n[1],l=Object(i.useState)(!1),s=Object(f.a)(l,2),m=s[0],h=s[1],b=Object(I.d)((function(e){return e.OptionsAndCriteria}),I.b),E=b.selectionCriteria,v=b.decisionOptions,y=Object(I.d)((function(e){return e.RatedOptions}),I.b),O=Ee(),C=Object(I.c)(),j=[{value:2},{value:26},{value:50},{value:74},{value:98}];Object(i.useEffect)((function(){t?h(!1):(x(),h(!0))}),[t]);var x=function(){var e=y,t=Math.max.apply(Math,Object(p.a)(y.map((function(e){return e.id}))).concat([0]))+1;v.forEach((function(a){E.forEach((function(n){null==y.find((function(e){return e.selectionCriteriaId===n.id&&e.decisionOptionId===a.id}))&&(e=[].concat(Object(p.a)(e),[{id:t,score:50,decisionOptionId:a.id,selectionCriteriaId:n.id}]),t+=1)}))})),C(be.a.actions.setRatedOptions(e))},w=function(e,t){var a=y.find((function(a){return a.selectionCriteriaId===e&&a.decisionOptionId===t}));return null==a?50:a.score};return r.a.createElement("div",{className:O.divMain},r.a.createElement(u.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(u.a,{item:!0,xs:12},r.a.createElement(d.a,{component:"span",variant:"h5",gutterBottom:!0},"Rate Options",r.a.createElement(A.a,{"data-testid":"RateOptionsInfoButton","aria-label":"Help",className:O.infoButton,onClick:function(){return o(!0)}},r.a.createElement(T.a,{color:"secondary"})))),!t&&E.map((function(e,t){return r.a.createElement(q.a,{key:e.id,in:m,timeout:500,style:{transitionDelay:"".concat(100*t,"ms")}},r.a.createElement(u.a,{item:!0,xs:6,className:O.mainGridItem,key:e.id},r.a.createElement($.a,{className:O.paper,elevation:2,key:e.id},r.a.createElement("div",null,r.a.createElement(u.a,{container:!0},r.a.createElement(u.a,{item:!0,xs:12,className:O.titleGridItem},r.a.createElement(d.a,{component:"span",variant:"h6"},e.name)),v.map((function(a,n){return r.a.createElement(u.a,{container:!0,justify:"center",alignItems:"center",className:O.gridItemGridContainer,key:a.id},r.a.createElement(u.a,{item:!0,xs:4,className:O.gridItemGridContainerTitle},r.a.createElement(d.a,{component:"span",variant:"body1"},a.name)),r.a.createElement(u.a,{item:!0,xs:8},r.a.createElement(u.a,{container:!0},r.a.createElement(u.a,{item:!0,xs:6,className:O.sliderLeftText},r.a.createElement(d.a,{variant:"caption",style:{fontSize:11}},"Bad")),r.a.createElement(u.a,{item:!0,xs:6,className:O.sliderRightText},r.a.createElement(d.a,{variant:"caption",style:{fontSize:11}},"Good")),r.a.createElement(u.a,{item:!0,xs:12,className:O.gridItemSlider},r.a.createElement(pe.a,{"data-testid":"slider".concat(t).concat(n),classes:{track:O.sliderTrack,rail:O.sliderTrack,mark:O.sliderMarks,markActive:O.sliderMarks},value:w(e.id,a.id),min:0,max:100,step:1,marks:j,onChange:function(t,n){return i=e.id,r=a.id,c=n,void y.forEach((function(e){e.selectionCriteriaId===i&&e.decisionOptionId===r&&C(be.a.actions.updateRatedOptions(Object(g.a)(Object(g.a)({},e),{},{score:c})))}));var i,r,c}})))))})))))))}))),r.a.createElement("div",{className:O.emptySpace}),r.a.createElement(G,{text:re,show:c,onClose:function(){return o(!1)}}))},ye=a(47),Oe=Object(o.a)({divMain:{paddingTop:N.spacing(.8),paddingLeft:N.spacing(.8),paddingRight:N.spacing(.8)},title:{padding:N.spacing(2,3,0,3)},chartContainer:{marginLeft:N.spacing(2)},infoButton:{bottom:N.spacing(.25),left:N.spacing(1.2)},bars:{width:N.spacing(19)}}),Ce=function(e){var t=Object(i.useState)([]),a=Object(f.a)(t,2),n=a[0],c=a[1],o=Object(i.useState)(!1),l=Object(f.a)(o,2),s=l[0],u=l[1],m=Object(i.useState)(!1),h=Object(f.a)(m,2),b=h[0],E=h[1],v=e.hidden,y=e.itemsKey,O=e.title,C=e.infoText,j=Object(I.d)((function(e){return e.OptionsAndCriteria[y]}),I.b),x=Oe();Object(i.useEffect)((function(){v?E(!1):(c(w(S(j))),E(!0))}),[v]);var w=function(e){return e.map((function(e){if(e.name.length>13){var t=new RegExp("([^s]{".concat(13,"})"),"g"),a=new RegExp("-\n$","g"),n=e.name.replace(t,"$1-\n").replace(a,"");return Object(g.a)(Object(g.a)({},e),{},{name:n})}return e}))},S=function(e){return Object(p.a)(e).sort((function(e,t){return t.score-e.score}))};return r.a.createElement("div",{className:x.divMain,"data-testid":"".concat(y,"Diagram")},r.a.createElement(q.a,{in:b,timeout:500},r.a.createElement($.a,{elevation:2,key:"Option"},r.a.createElement(d.a,{variant:"h5",gutterBottom:!0,className:x.title},O,r.a.createElement(A.a,{"data-testid":"".concat(y,"ResultsInfoButton"),"aria-label":"Help",className:x.infoButton,onClick:function(){return u(!0)}},r.a.createElement(T.a,{color:"secondary"}))),r.a.createElement(d.a,{component:"span",variant:"body1"},r.a.createElement(ye.f,{height:n.length*N.spacing(9)+N.spacing(5),width:"98%",className:x.chartContainer},r.a.createElement(ye.b,{data:n,margin:{top:N.spacing(0),right:N.spacing(5),left:N.spacing(5),bottom:N.spacing(1)},layout:"vertical",barCategoryGap:"20%",maxBarSize:10},r.a.createElement(ye.c,{horizontal:!1,stroke:"#a0a0a0",strokeWidth:.5}),r.a.createElement(ye.g,{dataKey:"score",type:"number",dy:-5,axisLine:!1,tickLine:!1,domain:[0,10],ticks:[0,2.5,5,7.5,10],stroke:"#a0a0a0",tick:{fontSize:"0.8rem"}}),r.a.createElement(ye.h,{type:"category",dataKey:"name",width:N.spacing(10)}),r.a.createElement(ye.a,{dataKey:"score",animationDuration:1e3,label:{position:"right"},shape:r.a.createElement(ye.e,{className:x.bars,radius:[0,10,10,0]})},n.map((function(e,t){return r.a.createElement(ye.d,{key:e.id,fill:function(){switch(t){case 0:return"#0f61a0";case 1:return"#646464";default:return"#a0a0a0"}}()})})))))))),r.a.createElement(G,{text:C,show:s,onClose:function(){return u(!1)}}))},je=function(e,t){var a=0;return e.forEach((function(e){(e.selectionCriteria1Id===t&&e.weight<=0||e.selectionCriteria2Id===t&&e.weight>0)&&(a+=Math.abs(e.weight))})),a},xe=Object(o.a)({divMain:{paddingTop:N.spacing(2.5),paddingBottom:N.spacing(5.5),textAlign:"center"},gridItem:{maxWidth:N.spacing(75),minWidth:N.spacing(38),margin:N.spacing(2)}}),we=function(e){var t=Object(i.useState)(!0),a=Object(f.a)(t,2),n=a[0],c=a[1],o=Object(I.d)((function(e){return e.OptionsAndCriteria}),I.b),l=o.selectionCriteria,s=o.decisionOptions,d=Object(I.d)((function(e){return e.RatedOptions}),I.b),m=Object(I.d)((function(e){return e.WeightedCriteria}),I.b),p=e.hidden,h=Object(I.c)(),b=xe();return Object(i.useEffect)((function(){p?c(!0):h(_.b.actions.setSelectionCriteria(function(e,t,a){var n=[],i=a.reduce((function(e,t){return+e+ +Math.abs(t.weight)}),0);return t.forEach((function(e){var t=0,r=je(a,e.id);0!==r&&(t=+Math.min(r/i*10,10).toFixed(1)),n.push(Object(g.a)(Object(g.a)({},e),{},{score:t}))})),n}(0,l,m)))}),[p]),Object(i.useEffect)((function(){p||(h(_.b.actions.setDecisionOptions(function(e,t,a,n){var i=[],r=a.reduce((function(e,t){return+e+ +Math.abs(t.weight)}),0);return e.forEach((function(e){var a=0;n.filter((function(t){return t.decisionOptionId===e.id})).forEach((function(e){var n=t.find((function(t){return t.id===e.selectionCriteriaId}));null!=n&&(a+=e.score*n.score)})),a=0===r?0:+Math.min(a/100,10).toFixed(1),i.push(Object(g.a)(Object(g.a)({},e),{},{score:a}))})),i}(s,l,m,d))),c(!1))}),[l]),r.a.createElement("div",{className:b.divMain},r.a.createElement(u.a,{container:!0,justify:"center",alignContent:"center"},r.a.createElement(u.a,{className:b.gridItem,key:"1",item:!0,xs:12},r.a.createElement(Ce,{itemsKey:_.a.decisionOptions,hidden:n,title:"Decision Options Ranking",infoText:ce})),r.a.createElement(u.a,{className:b.gridItem,key:"2",item:!0,xs:12},r.a.createElement(Ce,{itemsKey:_.a.selectionCriteria,hidden:n,title:"Selection Criteria Ranking",infoText:oe}))))},Se=Object(o.a)({divMain:{flexGrow:1,width:"100%",overflowX:"hidden"},stepper:{backgroundColor:"transparent"},stepperLabel:{marginBottom:N.spacing(-1.5)},buttonNext:{position:"fixed",bottom:"env(safe-area-inset-bottom)",right:"env(safe-area-inset-right)",margin:N.spacing(0,2,2,0)},buttonBack:{position:"fixed",bottom:"env(safe-area-inset-bottom)",left:"env(safe-area-inset-left)",margin:N.spacing(0,0,2,2)}}),Ie=function(){var e=Object(i.useState)(1),t=Object(f.a)(e,2),a=t[0],n=t[1],c=Object(i.useState)(1),o=Object(f.a)(c,2),l=o[0],s=o[1],d=Object(i.useState)(!1),u=Object(f.a)(d,2),y=u[0],C=u[1],x=Object(i.useState)([{number:1,name:"Options and selection criteria",disabled:!1,completed:!1},{number:2,name:"Weight criteria",disabled:!1,completed:!1},{number:3,name:"Rate options",disabled:!1,completed:!1},{number:4,name:"Result",disabled:!1,completed:!1}]),k=Object(f.a)(x,2),B=k[0],T=k[1],A=Object(I.d)((function(e){return e.App}),I.b).alerts,R=Se();Object(i.useEffect)((function(){return function(){n(0),s(0)}}),[]),Object(i.useEffect)((function(){D(A.includes(se)||A.includes(de)),A.forEach((function(e){return m.a.event({category:"Alerts",action:e.text})}))}),[A]);var D=function(e){C(e),T(B.map((function(t){return t.number>1?Object(g.a)(Object(g.a)({},t),{},{disabled:e}):t})))},M=function(e,t){!function(e){var t=Object(p.a)(B),a=t.findIndex((function(t){return t.number===e}));t[a].completed=!0,T(t)}(a),n(e),window.scrollTo(0,0),m.a.event({category:"Change step",action:t,value:e})};return r.a.createElement("div",{className:R.divMain},r.a.createElement(b.a,{className:R.stepper,alternativeLabel:!0,nonLinear:!0,activeStep:a-1},B.map((function(e){return r.a.createElement(h.a,{key:e.number},r.a.createElement(E.a,{"data-testid":"Step ".concat(e.number," button"),onClick:function(){return M(e.number,"stepButton")},completed:e.completed,disabled:e.disabled},r.a.createElement(S.a,{StepIconProps:{classes:{root:R.stepperLabel}}},e.name)))}))),r.a.createElement(w.a,{disabled:!0,axis:"rtl"===N.direction?"x-reverse":"x",index:a-1,onTransitionEnd:function(){s(a),m.a.modalview("Step ".concat(a))}},r.a.createElement(me,{hidden:1!==l}),r.a.createElement(he,{hidden:2!==l}),r.a.createElement(ve,{hidden:3!==l}),r.a.createElement(we,{hidden:4!==l})),1!==a?r.a.createElement(v.a,{"data-testid":"PrevStepButton",color:"secondary","aria-label":"Previous Step",size:"medium",className:R.buttonBack,onClick:function(){return M(a-1,"previous button")}},r.a.createElement(j.a,null)):null,a!==B.length?r.a.createElement(v.a,{"data-testid":"NextStepButton",color:"primary","aria-label":"Next Step",size:"medium",className:R.buttonNext,onClick:function(){return M(a+1,"next button")},disabled:y},r.a.createElement(O.a,null)):null)},ke=a(581),Ne=a(579),Be=function(){var e=Object(I.d)((function(e){return e.App}),I.b).alerts,t=Object(i.useState)(0),a=Object(f.a)(t,2),c=a[0],o=a[1],l=Object(i.useState)(!1),s=Object(f.a)(l,2),d=s[0],u=s[1],m=Object(i.useState)(le),p=Object(f.a)(m,2),g=p[0],h=p[1],b=Object(I.c)();Object(i.useEffect)((function(){null!=e[0]&&""!==e[0].text?(h(y(e)),o(v(e[0])),u(!0)):u(!1)}),[e]);var E=function(e,t){"clickaway"!==t&&(u(!1),b(V.a.actions.deleteAlert(g)))},v=function(e){if(!e.autoHide)return 0;var t=String(e.text).match(/[\w\d\u2019-]+/gi);return(t?t.length:0)/3.3*1500},y=function(e){var t=e.filter((function(e){return e.type===n.error}));if(t.length>0)return t[0];var a=e.filter((function(e){return e.type===n.warning}));if(a.length>0)return a[0];var i=e.filter((function(e){return e.type===n.success}));if(i.length>0)return i[0];var r=e.filter((function(e){return e.type===n.info}));return r.length>0?r[0]:e[0]};return r.a.createElement("div",null,r.a.createElement(ke.a,{open:d,autoHideDuration:0!==c?c:void 0,onClose:E},r.a.createElement(Ne.a,{"data-testid":"".concat(g.type,"Alert"),onClose:g.allowClose?E:void 0,variant:"filled",severity:g.type},g.text)))},Te=a(258),Ae=a.n(Te),Re=Object(o.a)({divMain:{flexGrow:1,width:"100%",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:"100vh"},appBar:{position:"fixed",Top:"env(safe-area-inset-top)",marginBottom:N.spacing(2),height:N.spacing(6),justifyContent:"center",justifyItems:"center",paddingLeft:"env(safe-area-inset-left)",paddingRight:"env(safe-area-inset-right)"},imgDcideLogo:{maxWidth:N.spacing(17),marginLeft:N.spacing(-1)},divRouter:{marginTop:N.spacing(6)},footer:{marginTop:"auto",marginBottom:N.spacing(.5),paddingBottom:"env(safe-area-inset-bottom)"},footerLegalText:{marginTop:-N.spacing(.5)},link:{cursor:"pointer"}});t.default=function(){var e=Re();return m.a.initialize("***REMOVED***"),m.a.pageview(window.location.pathname+window.location.search),r.a.createElement(l.a,{theme:N},r.a.createElement("div",{className:e.divMain},r.a.createElement(c.a,{position:"static",color:"primary",className:e.appBar},r.a.createElement(s.a,null,r.a.createElement("img",{className:e.imgDcideLogo,src:Ae.a,alt:"d-cide imgDcideLogo"}))),r.a.createElement("div",{className:e.divRouter},r.a.createElement(Ie,null)),r.a.createElement(u.a,{className:e.footer,container:!0,justify:"center",alignContent:"center"},r.a.createElement(d.a,{component:"span",variant:"caption",align:"center"},r.a.createElement(u.a,{item:!0,xs:12},"Made with \xa0",r.a.createElement("span",{role:"img","aria-label":"love"},"\ud83d\udc96"),"\xa0 by Christian J\xf6cker"))),r.a.createElement(Be,null)))}},527:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(13),c=a.n(r),o=a(12),l=(a(182),a(33)),s=a(162);a(162).default;var d=Object(l.a)({reducer:s.default}),u=a(526).default;console.log("".concat("d-cide"," ").concat("1.13.0")),c.a.render(i.a.createElement(o.a,{store:d},i.a.createElement(u,null)),document.getElementById("root"))},96:function(e,t,a){"use strict";var n=a(33),i=Object(n.b)({name:"WeightedCriteria",initialState:[],reducers:{setWeightedCriteria:function(e,t){return t.payload},updateWeightedCriteria:function(e,t){return e.map((function(e){return e.id===t.payload.id?t.payload:e}))}}});t.a=i},97:function(e,t,a){"use strict";var n=a(33),i=Object(n.b)({name:"RatedOptions",initialState:[],reducers:{setRatedOptions:function(e,t){return t.payload},updateRatedOptions:function(e,t){return e.map((function(e){return e.decisionOptionId===t.payload.decisionOptionId&&e.selectionCriteriaId===t.payload.selectionCriteriaId?t.payload:e}))}}});t.a=i}},[[299,1,2]]]);
//# sourceMappingURL=main.f41f6a4f.chunk.js.map