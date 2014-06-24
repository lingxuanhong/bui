define("bui/toolbar",["bui/common","bui/toolbar/baritem","bui/toolbar/bar","bui/toolbar/pagingbar","bui/toolbar/numberpagingbar"],function(require){var t=require("bui/common"),e=t.namespace("Toolbar");return t.mix(e,{BarItem:require("bui/toolbar/baritem"),Bar:require("bui/toolbar/bar"),PagingBar:require("bui/toolbar/pagingbar"),NumberPagingBar:require("bui/toolbar/numberpagingbar")}),e}),define("bui/toolbar/baritem",function(){var t=BUI.prefix,e=BUI.Component,a=e.UIBase,n=e.View.extend([a.ListItemView]),r=e.Controller.extend([a.ListItem],{renderUI:function(){var e=this.get("el");e.addClass(t+"inline-block"),e.attr("id")||e.attr("id",this.get("id"))}},{ATTRS:{elTagName:{view:!0,value:"li"},selectable:{value:!1},focusable:{value:!1},xview:{value:n}}},{xclass:"bar-item",priority:1}),i=r.extend({_uiSetDisabled:function(e){var a=this,n=a.get("el"),r=e?"addClass":"removeClass";n.find("button").attr("disabled",e)[r](t+"button-disabled")},_uiSetChecked:function(e){var a=this,n=a.get("el"),r=e?"addClass":"removeClass";n.find("button")[r](t+"button-checked")},_uiSetText:function(t){var e=this,a=e.get("el");a.find("button").text(t)},_uiSetbtnCls:function(t){var e=this,a=e.get("el");a.find("button").addClass(t)}},{ATTRS:{checked:{value:!1},tpl:{view:!0,value:'<button type="button" class="{btnCls}">{text}</button>'},btnCls:{sync:!1},text:{sync:!1,value:""}}},{xclass:"bar-item-button",priority:2}),u=r.extend({renderUI:function(){var t=this.get("el");t.attr("role","separator")}},{xclass:"bar-item-separator",priority:2}),o=r.extend({},{ATTRS:{width:{view:!0,value:2}}},{xclass:"bar-item-spacer",priority:2}),s=r.extend({_uiSetText:function(t){var e=this,a=e.get("el");a.html(t)}},{ATTRS:{text:{value:""}}},{xclass:"bar-item-text",priority:2});return r.types={button:i,separator:u,spacer:o,text:s},r}),define("bui/toolbar/bar",function(){var t=BUI.Component,e=t.UIBase,a=t.View.extend({renderUI:function(){var t=this.get("el");t.attr("role","toolbar"),t.attr("id")||t.attr("id",BUI.guid("bar"))}}),n=t.Controller.extend([e.ChildList],{getItem:function(t){return this.getChild(t)}},{ATTRS:{elTagName:{view:!0,value:"ul"},defaultChildClass:{value:"bar-item"},focusable:{value:!1},xview:{value:a}}},{xclass:"bar",priority:1});return n}),define("bui/toolbar/pagingbar",["bui/toolbar/bar"],function(require){var t=require("bui/toolbar/bar"),e=BUI.Component,a=e.UIBase.Bindable,n=BUI.prefix,r="first",i="prev",u="next",o="last",s="skip",l="refresh",g="totalPage",b="curPage",c="totalCount",m=[r,i,u,o,s,l],p=[g,b,c],v=t.extend([a],{initializer:function(){var t=this,e=t.get("children"),a=t.get("items"),n=t.get("store");a?BUI.each(a,function(a){BUI.isString(a)&&(a=BUI.Array.contains(a,m)?t._getButtonItem(a):BUI.Array.contains(a,p)?t._getTextItem(a):{xtype:a}),e.push(a)}):(a=t._getItems(),BUI.each(a,function(t){e.push(t)})),n&&n.get("pageSize")&&t.set("pageSize",n.get("pageSize"))},bindUI:function(){var t=this;t._bindButtonEvent()},jumpToPage:function(t){if(!(0>=t||t>this.get("totalPage"))){var e=this,a=e.get("store"),n=e.get("pageSize"),r=t-1,i=r*n,u=e.fire("beforepagechange",{from:e.get("curPage"),to:t});a&&u!==!1&&a.load({start:i,limit:n,pageIndex:r})}},_afterStoreLoad:function(t){var e,a,n,r,i=this,u=i.get("pageSize"),o=0;o=t.get("start"),a=t.getTotalCount(),e=a-o>u?o+t.getCount()-1:a,r=parseInt((a+u-1)/u,10),r=r>0?r:1,n=parseInt(o/u,10)+1,i.set("start",o),i.set("end",e),i.set("totalCount",a),i.set("curPage",n),i.set("totalPage",r),i._setAllButtonsState(),i._setNumberPages()},_bindButtonEvent:function(){function t(){var t=parseInt(e._getCurrentPageValue(),10);e._isPageAllowRedirect(t)?e.jumpToPage(t):e._setCurrentPageValue(e.get("curPage"))}var e=this;e._bindButtonItemEvent(r,function(){e.jumpToPage(1)}),e._bindButtonItemEvent(i,function(){e.jumpToPage(e.get("curPage")-1)}),e._bindButtonItemEvent(u,function(){e.jumpToPage(e.get("curPage")+1)}),e._bindButtonItemEvent(o,function(){e.jumpToPage(e.get("totalPage"))}),e._bindButtonItemEvent(s,function(){t()}),e._bindButtonItemEvent(l,function(){e.jumpToPage(e.get("curPage"))});var a=e.getItem(b);a&&a.get("el").on("keyup",function(e){e.stopPropagation(),13===e.keyCode&&t()})},_bindButtonItemEvent:function(t,e){var a=this,n=a.getItem(t);n&&n.on("click",e)},onLoad:function(t){var e=this,a=e.get("store");e._afterStoreLoad(a,t)},_getItems:function(){var t=this,e=t.get("items");return e&&e.length?e:(e=[],e.push(t._getButtonItem(r)),e.push(t._getButtonItem(i)),e.push(t._getSeparator()),e.push(t._getTextItem(g)),e.push(t._getTextItem(b)),e.push(t._getButtonItem(s)),e.push(t._getSeparator()),e.push(t._getButtonItem(u)),e.push(t._getButtonItem(o)),e.push(t._getSeparator()),e.push(t._getTextItem(c)),e)},_getButtonItem:function(t){var e=this;return{id:t,xclass:"bar-item-button",text:e.get(t+"Text"),disabled:!0,elCls:e.get(t+"Cls")}},_getSeparator:function(){return{xclass:"bar-item-separator"}},_getTextItem:function(t){var e=this;return{id:t,xclass:"bar-item-text",text:e._getTextItemTpl(t)}},_getTextItemTpl:function(t){var e=this,a=e.getAttrVals();return BUI.substitute(this.get(t+"Tpl"),a)},_isPageAllowRedirect:function(t){var e=this;return t&&t>0&&t<=e.get("totalPage")&&t!==e.get("curPage")},_setAllButtonsState:function(){var t=this,e=t.get("store");e&&t._setButtonsState([i,u,r,o,s],!0),1===t.get("curPage")&&t._setButtonsState([i,r],!1),t.get("curPage")===t.get("totalPage")&&t._setButtonsState([u,o],!1)},_setButtonsState:function(t,e){var a=this,n=a.get("children");BUI.each(n,function(a){-1!==BUI.Array.indexOf(a.get("id"),t)&&a.set("disabled",!e)})},_setNumberPages:function(){var t=this,e=t.getItems();BUI.each(e,function(e){"bar-item-text"===e.__xclass&&e.set("content",t._getTextItemTpl(e.get("id")))})},_getCurrentPageValue:function(t){var e=this;if(t=t||e.getItem(b)){var a=t.get("el").find("input");return a.val()}},_setCurrentPageValue:function(t,e){var a=this;if(e=e||a.getItem(b)){var n=e.get("el").find("input");n.val(t)}}},{ATTRS:{firstText:{value:"\u9996 \u9875"},firstCls:{value:n+"pb-first"},prevText:{value:"\u4e0a\u4e00\u9875"},prevCls:{value:n+"pb-prev"},nextText:{value:"\u4e0b\u4e00\u9875"},nextCls:{value:n+"pb-next"},lastText:{value:"\u672b \u9875"},lastCls:{value:n+"pb-last"},skipText:{value:"\u786e\u5b9a"},skipCls:{value:n+"pb-skip"},refreshText:{value:"\u5237\u65b0"},refreshCls:{value:n+"pb-refresh"},totalPageTpl:{value:"\u5171 {totalPage} \u9875"},curPageTpl:{value:'\u7b2c <input type="text" autocomplete="off" class="'+n+'pb-page" size="20" value="{curPage}" name="inputItem"> \u9875'},totalCountTpl:{value:"\u5171{totalCount}\u6761\u8bb0\u5f55"},autoInitItems:{value:!1},curPage:{value:0},totalPage:{value:0},totalCount:{value:0},pageSize:{value:30},store:{}},ID_FIRST:r,ID_PREV:i,ID_NEXT:u,ID_LAST:o,ID_SKIP:s,ID_REFRESH:l,ID_TOTAL_PAGE:g,ID_CURRENT_PAGE:b,ID_TOTAL_COUNT:c},{xclass:"pagingbar",priority:2});return v}),define("bui/toolbar/numberpagingbar",["bui/toolbar/pagingbar"],function(require){var t=(BUI.Component,require("bui/toolbar/pagingbar")),e=BUI.prefix,a=e+"button-number",n=t.extend({_getItems:function(){var e=this,a=e.get("items");return a?a:(a=[],a.push(e._getButtonItem(t.ID_PREV)),a.push(e._getButtonItem(t.ID_NEXT)),a)},_getButtonItem:function(t){var e=this;return{id:t,content:'<a href="javascript:;">'+e.get(t+"Text")+"</a>",disabled:!0}},_bindButtonEvent:function(){var t=this,e=t.get("numberButtonCls");t.constructor.superclass._bindButtonEvent.call(this),t.get("el").delegate("a","click",function(t){t.preventDefault()}),t.on("click",function(a){var n=a.target;if(n&&n.get("el").hasClass(e)){var r=n.get("id");t.jumpToPage(r)}})},_setNumberPages:function(){var t=this;t._setNumberButtons()},_setNumberButtons:function(){var t,e=this,a=e.get("curPage"),n=e.get("totalPage"),r=e._getNumberItems(a,n);e._clearNumberButtons(),BUI.each(r,function(t){e._appendNumberButton(t)}),t=e.getItem(a),t&&t.set("selected",!0)},_appendNumberButton:function(t){{var e=this,a=e.getItemCount();e.addItemAt(t,a-1)}},_clearNumberButtons:function(){for(var t=this,e=(t.getItems(),t.getItemCount());e>2;)t.removeItemAt(e-2),e=t.getItemCount()},_getNumberItems:function(t,e){function a(t,e){for(var a=t;e>=a;a++)u.push(i._getNumberItem(a))}function n(){u.push(i._getEllipsisItem())}var r,i=this,u=[],o=i.get("maxLimitCount"),s=i.get("showRangeCount");if(o>e)r=e,a(1,e);else{var l=o>=t?1:t-s,g=t+s,b=e>g?g>o?g:o:e;l>1&&(a(1,1),l>2&&n()),r=b,a(l,b)}return e>r&&(e-1>r&&n(),a(e,e)),u},_getEllipsisItem:function(){var t=this;return{disabled:!0,content:t.get("ellipsisTpl")}},_getNumberItem:function(t){var e=this;return{id:t,elCls:e.get("numberButtonCls")}}},{ATTRS:{itemStatusCls:{value:{selected:"active",disabled:"disabled"}},itemTpl:{value:'<a href="">{id}</a>'},prevText:{value:"<<"},nextText:{value:">>"},maxLimitCount:{value:4},showRangeCount:{value:1},numberButtonCls:{value:a},ellipsisTpl:{value:'<a href="#">...</a>'}}},{xclass:"pagingbar-number",priority:3});return n});