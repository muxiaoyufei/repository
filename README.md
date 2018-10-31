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
    - 性能优化
      Brunch 为了创建最高效的Brunch生产版本。需要安装uglify-js-brunch插件。
      Browserify 为了创建最高效的Browserify生产版本，需要安装一些插件：npm install --save-dev bundle-collapser envify uglify-js uglifyify
      ---envify该插件确保正确的编译环境。
      ---uglifyify该插件移除了开发接口。
      ---bundle-collapser该插件用数字替代了长长的模块ID
      ---最后，以上结果都被输添加至uglify-js来得到整合。
      例：
      browserify ./index.js \
      -g [ envify --NODE_ENV production ] \
      -g uglifyify \
      -p bundle-collapser/plugin \
      | uglifyjs --compress --mangle > ./bundle.js
      /**注意：包的名称是uglify-js,但是它提供的文件叫uglifyjs**/
      **注意只有生产版本需要这样操作。不要再开发环境中安装这些插件，因为它们会隐藏掉有用的react警告并使结构过程更慢**
      Rollup 为了创建最高效的Rollup生产版本，需要安装一些插件：
      npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify 
      ---replace该插件确保正确的编译环境。
      ---commonjs该插件在Rollup内提供对CommonJS的支持。
      ---uglify该插件压缩生成最终版本。
      例：plugins: [
          // ...
          require('rollup-plugin-replace')({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          require('rollup-plugin-commonjs')(),
          require('rollup-plugin-uglify')(),
          // ...
        ]
      Webpack为了创建最高效的Webpack生产版本，需要在生产版本的配置中添加这些插件：
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
      **注意只有生产版本需要这样操作。不要在开发环境中安装UglifyJsPlugin和DefinePlugin，因为它们会隐藏掉有用的React警告并使构建过程更慢。**
      继承自React.PureComponent
      class CounterButton extends React.PureComponent {
        constructor(props) {
          super(props);
          this.state = {count: 1};
        }

        render() {
          return (
            <button
              color={this.props.color}
              onClick={() => this.setState(state => ({count: state.count + 1}))}>
              Count: {this.state.count}
            </button>
          );
        }
      }
      大部分情况下，你可以使用React.PureComponent而不必写你自己的shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。
      *不会突变的数据的力量
      避免此类问题最简单的方式是避免使用值可能会突变的属性或状态
      ES6支持数组的spread语法可以让它变得更容易。如果你使用的是Create React App，那么此语法默认可用。
      handleClick() {
        this.setState(prevState => ({
          words: [...prevState.words, 'marklar'],
        }));
      };
      你也可以用相似的方式重写可以会突变的对象。例如，假设我们有一个叫colormap的对象，我们想写一个把colormap.right改变成'blue'的函数，我们应该写：
      function updateColorMap(colormap) {
        colormap.right = 'blue';
      }
      想要实现代码而不污染原始对象，我们可以使用Object.assign方法：
      function updateColorMap(colormap) {
        return Object.assign({}, colormap, {right: 'blue'});
      }
      updateColorMap现在会返回一个新对象，而不会改变之前的旧对象。Object.assign在ES6中，需要polyfill支持。
      有一个JavaScript提议来添加对象spread属性以便不会突然变化的更新对象：
      function updateColorMap(colormap) {
        return {...colormap, right: 'blue'};
      }
      *使用不可突变的数据结构
        Immutable.js是解决这个问题的另一种方法。它通过结构共享提供不可突变的，持久的集合：

        ---不可突变:一旦创建，集合就不能在另一个时间点改变。
        ---持久性:可以使用原始集合和一个突变来创建新的集合。原始集合在新集合创建后仍然可用。
        ---结构共享:新集合尽可能多的使用原始集合的结构来创建，以便将复制操作降至最少从而提升性能。
      还有两个库可以帮助我们使用不可突变数据：seamless-immutable 和immutability-helper。
      *Mixin(混入)
      **注：ES6 本身是不包含混入支持的。因此，如果你使用 class 关键字创建组件，那就不能使用混入功能了。**
  - 协调
  - Context
    Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。
    *何时使用Context
      Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言
      例: 未使用 Context
      function ThemedButton(props) {
        return <Button theme={props.theme} />;
      }

      // 中间组件
      function Toolbar(props) {
        // Toolbar 组件必须添加一个额外的 theme 属性
        // 然后传递它给 ThemedButton 组件
        return (
          <div>
            <ThemedButton theme={props.theme} />
          </div>
        );
      }

      class App extends React.Component {
        render() {
          return <Toolbar theme="dark" />;
        }
      }
      使用Context可以避免通过中间元素传递props：
      // 创建一个 theme Context,  默认 theme 的值为 light
      const ThemeContext = React.createContext('light');

      function ThemedButton(props) {
        // ThemedButton 组件从 context 接收 theme
        return (
          <ThemeContext.Consumer>
            {theme => <Button {...props} theme={theme} />}
          </ThemeContext.Consumer>
        );
      }

      // 中间组件
      function Toolbar(props) {
        return (
          <div>
            <ThemedButton />
          </div>
        );
      }

      class App extends React.Component {
        render() {
          return (
            <ThemeContext.Provider value="dark">
              <Toolbar />
            </ThemeContext.Provider>
          );
        }
      }
      **注意 不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。**
      https://react.docschina.org/docs/context.html
  - Fragments
    React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。
    * 动机
      一个常见模式是为一个组件返回一个子元素列表。
      https://react.docschina.org/docs/fragments.html