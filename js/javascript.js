/**
 *  jqurery中提供了四种事件监听方式，分别是 bind、 live、delegate、on, 对应的解除监听的函数分别是 unbind、die、undelegate、off。
 * 
 *  @ bind(type,[data],function(eventObject))
 * 
 *  bind 是使用频率较高的一种，作用就是在选择到的元素上绑定特定事件类型的监听函数，参数的含义如下
 *  
 *  type: 事件类型，如 click、change、mouseover 等；
 *  data: 传入监听函数的参数， 通过 event.data取到；
 *  function：监听函数，可传入event对象，这里的event是jquery封装的 event 对象。
 *  /
 /** 源码：***/
	bind:function(types,data,fn){
		return this.on(types,null,data,fn)
	}
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