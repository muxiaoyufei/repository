/**
 *  jqurery中提供了四种事件监听方式，分别是 bind、 live、delegate、on, 对应的解除监听的函数分别是 unbind、die、undelegate、off。
 * 
 *  已知有4个列表元素:
 *
 *　列表元素1
 *
 *　列表元素2
 *
 *　列表元素3
 *
 *　列表元素4
 * 
 *  @ bind(type,[data],function(eventObject))
 * 
 *  bind 是使用频率较高的一种，作用就是在选择到的元素上绑定特定事件类型的监听函数，参数的含义如下
 *  
 *  type: 事件类型，如 click、change、mouseover 等；
 *  data: 传入监听函数的参数， 通过 event.data取到；
 *  function：监听函数，可传入event对象，这里的event是jquery封装的 event 对象。
 * 
 *  源码：
 *	bind:function(types,data,fn){
 *		return this.on(types,null,data,fn)
 *  } 
 * 
 * 	可以看到内部是调用了on方法。
 *   
 *  bind的特点就是会把监听器绑定到目标元素上，有一个绑一个，在页面上的元素不会动态添加的时候使用它没什么问题。
 *  但如果列表中动态增加一个 “列表5”，点击它是没有反应的，必须再 bind 一次才行
 * 
 * 测试代码
 * 	$(function(){
 *		$('div').bind('click',function(){	
 *			if($(this).text()=='列表4'){
 *				$(this).after('<div>列表5</div>');
 *			}
 *			alert($(this).text());
 *		})
 *	})

 */
  $(function(){
		$('div').bind('click',function(){
			if($(this)){}
		})
	})
 /**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */