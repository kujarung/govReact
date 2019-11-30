import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  /*
  * props
  *
  * <App name="홍길동" /> => props.name ="홍길동"
  * state : 변경이 가능한 값
  * ref => input, button => 참조
  * Flux(Front => MVC) => Redux
  * 선언 => this.state = {
  *   movie : [],
  *   page:1,
  *   movie_detail:{}
  * }
  *
  *
  *  class A extents Component {
  *   constructor(props) {
  *     super(props) => Component class의 생성자
  *     this.state = {
  *         movie : []
  *     }
  *
  *     render() {
  *       return(
  *         <B movie={this.state.movie} />
  *       )
  *     }
  *   }
  * }
  *
  * class B extents Component {
  *
  * }
  *
  * */
  //App() =>  변수 선언(props, state, ref), 이벤트 등록
  constructor(props) {
    super(props);
    // state 선언
    this.state = {
      text : "",
    }
    // 이벤트 등록
    this.onChange = this.onChange.bind(this); // 이벤트 권장 사항
    console.log("constructor(props) call...");
  }

  // 사용자 정의 함수
  onChange(e) {
    this.setState({ text:e.target.value })
  }


  // 데이터 수집(서버에서 전송 된 값) => state의 초기값
  async componentWillMount() {
    console.log("componentWillMount call...");
  }

  // Jquery, Angular를 영동 ==> window.onload => $(function(){})
  componentDidMount() {
    console.log("componentDidMount call...");
  }

  //this.setState() => shouldComponentUpdate(return 값을 받아서) => render => componentDidUpdate
  // 데이터가 수정 되기 전
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("shouldComponentUpdate call...");
    return nextState;
  }

  // 수정이 완료
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate call...");
  }

  // 메모리(Dom)에서 제거 => 화면 이동, 새로 고침, 서버 연결 해제
  componentWillUnmount() {
    console.log("componentWillUnmount call...");
  }

  // 화면 ui 출력
  // html 코드로 변경 => 메모리에 저장 => 브라우저에서 읽어서 출력
  render() {
    console.log("render call");
    return (
        <div>
          <h1>Event & 생명주기 예제</h1>
          <input type={"text"} size={"20"} onChange={this.onChange}/>
          <br/>
          <span>{this.state.text}</span>
        </div>
    )
  }
}


export default App;
