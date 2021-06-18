import React, {Component} from 'react';
import DataObject from '../DataObject/dataobject'
import './datalist.css'
import { Scrollbars } from 'react-custom-scrollbars';
class DataList extends React.Component{
state= {
    json:[],
    query:"",
    queryjson:[]
}

    async componentDidMount(){
        let response = await fetch('https://api.jsonbin.io/b/60c7e65598ca6c704eb01d4b/2');
        let data = await response.text();
        let arr = JSON.parse(data).students;
        arr.map((e)=>{
                e.fullName = e.firstName+" "+e.lastName;
                e.tags=[]
            })
        this.setState({json:arr})
    }

    updateQuery(e){
        let arr = [];
        if(document.getElementById("searchname").value.length > 0){
            arr = this.state.json.filter((item)=>item.fullName.toLowerCase().includes(document.getElementById("searchname").value))
        }
        if(document.getElementById("searchtag").value.length > 0)
        {
            if(document.getElementById("searchname").value.length ==0){arr = this.state.json}
            arr = arr.filter((item)=>{
                return item.tags.some((m)=>{
                 return m.includes(document.getElementById("searchtag").value)
                }) 
                })
        } 
        console.log(arr)
        this.setState({queryjson:arr})
    }

    handleCallback = (id,tags) =>{
        let arr = this.state.json
         arr.find((e)=> e.id ==id).tags.push(tags)
         console.log(arr)
        this.setState({json:arr})
    }
    render(){
    return <div id="data" className="container">
       <div className="inputholder"><input type="text" placeholder="Search by name" className="inputbox" id="searchname"  onChange={(e)=>{this.updateQuery(e)}} /></div> 
        <div className="inputholder"><input type="text" placeholder="Search by tag" id="searchtag" className="inputbox" onChange={(e)=>{this.updateQuery(e)}} /></div>
            <Scrollbars className="DivHolder">
        {
            this.state.json ==[] ? "loading..." : 
            this.state.queryjson.length > 0 ? 
            this.state.queryjson.map((e)=>{
                return <DataObject data={e} parentCallback = {this.handleCallback} />
            })
            :
            this.state.json.map((e)=>{
                return <DataObject data={e} parentCallback = {this.handleCallback} />
            })
        }
        </Scrollbars>
    </div>
    }

}

export default DataList;