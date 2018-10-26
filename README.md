# repository
# javascript.js
  - js基础知识点总结
# react 笔记

  - react 事件中如果你没有在事件方法后添加(),例如 onClick={this.handleClick},你应该为这个方法绑定this。

  - 两种方式解决 bind 的使用
    1. 使用属性初始化器来正确的绑定回调函数
    class LoggingButton extends React.Component {
      // This syntax ensures `this` is bound within handleClick.
      // Warning: this is *experimental* syntax.
      handleClick = () => {
        console.log('this is:', this);
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            Click me
          </button>
        );
      }
    }
    * 这个语法在 Create React App 中默认开启。

    2. 在回调函数中使用箭头函数
    class LoggingButton extends React.Component {
      handleClick() {
        console.log('this is:', this);
      }

      render() {
        // This syntax ensures `this` is bound within handleClick
        return (
          <button onClick={(e) => this.handleClick(e)}>
            Click me
          </button>
        );
      }
    }
    * 使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

    *****注意事项*****
    向事件处理程序传递参数时，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面。
    例如：
    class Popper extends React.Component{
      constructor(){
          super();
          this.state = {name:'Hello world!'};
      }
      
      preventPop(name, e){    //事件对象e要放在最后
          e.preventDefault();
          alert(name);
      }
      
      render(){
          return (
              <div>
                  <p>hello</p>
                  {/* Pass params via bind() method. */}
                  <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
              </div>
          );
      }
    }

    - 条件渲染
    * 与运算符
    你可以通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素。
    function Mailbox(props) {
      const unreadMessages = props.unreadMessages;
      return (
        <div>
          <h1>Hello!</h1>
          {unreadMessages.length > 0 &&
            <h2>
              You have {unreadMessages.length} unread messages.
            </h2>
          }
        </div>
      );
    }

    const messages = ['React', 'Re: React', 'Re:Re: React'];
    ReactDOM.render(
      <Mailbox unreadMessages={messages} />,
      document.getElementById('root')
    );
    之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。

    因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。  

    - 状态提升
    在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升

    - 适合使用refs的情况
      处理焦点、文本选择或媒体控制。
      触发强制动画。
      集成第三方 DOM 库
    - refs 的使用
      1) 下面的例子已经用 React v16.3 引入的 React.createRef() API 更新。如果你正在使用 React 更早的发布版，我们推荐使用回调形式的 refs。
      2) 回调方式
      /**注: String 类型的 Refs 不建议再使用**/
      /**注意: 如果 ref 回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是 null ，之后参数是 DOM 元素。这是因为在每次渲染中都会创建一个新的函数实例。因此，React 需要清理旧的 ref 并且设置新的。通过将 ref 的回调函数定义成类的绑定函数的方式可以避免上述问题，但是大多数情况下无关紧要。**/
      https://react.docschina.org/docs/refs-and-the-dom.html#callback-refs
      
    - 非受控组件

