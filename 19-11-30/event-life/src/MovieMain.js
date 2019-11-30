import React,{Component,Fragment} from 'react'
import axios from 'axios'
import { Zoom } from 'react-slideshow-image';

// 외부서버에서 데이터 읽기
class MovieMain extends Component{
    constructor(props) {
        super(props);
        this.state={
            title:'박스오피스',
            movie_data:[],
            movie_detail:{},
            open:false,
        }
    }
    // state에 대한 초기값 ==> movie?no=1
    /*
           class A
           {
               A(){
                  this => A
               }
               B b=new B(){
                  this => B
               }
           }
           class B
           {
           }
     */
    componentDidMount() {
        var _this=this;
        axios.get('http://127.0.0.1:3355/movie',{
            params:{
                no:1
            }
        }).then(function (response) {
            const img =[];

            _this.setState({movie_data:response.data}) // render()

        })
    }

    onBtnClick(no){
        var _this=this;
        axios.get('http://127.0.0.1:3355/movie',{
            params:{
                no:no
            }
        }).then(function (response) {
            console.log(response.data)
            _this.setState({movie_data:response.data}) // render()

        })
        if(no===1){
            this.setState({title:'박스오피스'})
        }
        else if(no===2){
            this.setState({title:'실시간 예매율'})
        }
        else if(no===3){
            this.setState({title:'좌석 점유율'})
        }
        else if(no===4){
            this.setState({title:'온라인 이용순위'}) // render()
        }

    }

    onMovieDetail (m) {
        this.setState({ movie_detail : m, open : true } )
    }

    render() {
        const style={
            "margin":"0px auto",
            "width":"1280px"
        }
        /*
          "thumbUrl":"/common/mast/movie/2019/11/thumb/thn_5658
           d961585b46dd8b05225665af2c5a.jpg"
         */
        const html=this.state.movie_data.map((m,index)=>
            <tr key={index} onClick={this.onMovieDetail.bind(this, m)}>
                <td><img src={"http://www.kobis.or.kr/"+m.thumbUrl} width={"35"} height="35"/></td>
                <td>{m.movieNm}</td>
                <td>{m.genre}</td>
                <td>{m.openDt}</td>
            </tr>
        )
        return (
            <Fragment>
                <div className={"row"} style={style}>
                    <SlideShow images={this.state.movie_data }/>
                </div>
                <div className={"row"} style={style}>
                    <h1 className={"text-center"}>{this.state.title}</h1>
                </div>
                <div className={"row"} style={style}>
                    <div className={"col-sm-7"}>
                        {this.state.open?<MovieDetail m={this.state.movie_detail} /> : null}
                    </div>
                    <div className={"col-sm-5"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr className={"success"}>
                                <th></th>
                                <th>영화명</th>
                                <th>장르</th>
                                <th>개봉일</th>
                            </tr>
                            </thead>
                            <tbody>
                            {html}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"row"} style={style}>
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"박스오피스"}
                           onClick={this.onBtnClick.bind(this,1)}
                    />
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"실시간 예매율"}
                           onClick={this.onBtnClick.bind(this,2)}
                    />
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"좌석 점유율"}
                           onClick={this.onBtnClick.bind(this,3)}
                    />
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"온라인 이용순위"}
                           onClick={this.onBtnClick.bind(this,4)}
                    />
                </div>
            </Fragment>
        )
    }
}

class MovieDetail extends Component{
    render() {
        return(
            <table className={"table table-hover"}>
                <tbody>
                    <tr>
                        <td className={"text-center"} width={"30%"} rowSpan={"9"}>
                            <img src={"http://www.kobis.or.kr/"+ this.props.m.thumbUrl} width={"350"} height={"550"}/>
                        </td>
                        <td colSpan={"2"} className={"text-center"}>
                            <h3> { this.props.m.movieNm } </h3>
                            <sub style={{"color":"gray"}}> { this.props.m.movieNmEn } </sub>
                        </td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>개봉일</b></td>
                        <td width={"55%"} className={"text-left"}> { this.props.m.openDt } </td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>제작상태</b></td>
                        <td width={"55%"} className={"text-left"}> { this.props.m.moviePrdtStat } </td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>영화구분</b></td>
                        <td width={"55%"} className={"text-left"}> { this.props.m.movieType } </td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>관람등급</b></td>
                        <td width={"55%"} className={"text-left"}>{ this.props.m.watchGradeNm }</td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>상영시간</b></td>
                        <td width={"55%"} className={"text-left"}>{ this.props.m.showTm }</td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>제작국가</b></td>
                        <td width={"55%"} className={"text-left"}>{ this.props.m.repNationCd }</td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>감독</b></td>
                        <td width={"55%"} className={"text-left"}>{ this.props.m.director }</td>
                    </tr>

                    <tr>
                        <td width={"15%"} className={"text-right"}><b>장르</b></td>
                        <td width={"55%"} className={"text-left"}>{ this.props.m.genre }</td>
                    </tr>

                    <tr>
                        <td colSpan={"3"} className={"text-left"}>
                            { this.props.m.synop }
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images : [],
            proper : {
                duration : 500,
                transitionDuration:500,
                infinite :true,
                indicator:true,
                scale:0.4,
                arrows:true
            }
        }
    }

    // ... => spread연산자
    // const A = [1,2,3]
    // {...A}
    //const B = [1,...A,5,6]
    // B = 1,1,2,3,5,6asv

    render() {
        return (
            <div className={"slide-container"} style={{"margin" : "0 auto" , "width" : "480px"}}>
                <Zoom {...this.state.proper}>
                    {
                        this.props.images.map((m,index) =>
                            <img src={ "http://www.kobis.or.kr/" + m.thumbUrl} key = {index}
                                 style={{"width" : "300px%" , "height" : "300px", "margin":"0 auto"}} />
                        )
                    }
                </Zoom>
            </div>
        );
    }

}

export default MovieMain