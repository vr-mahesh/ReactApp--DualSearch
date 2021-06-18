import React, {Component} from 'react';
import './dataobject.css'
function DataObject(props) {
     const toggleView=(e)=>{
        let clickedElement = e.target;
        let target = e.target.previousElementSibling.lastElementChild.previousElementSibling.previousElementSibling;
        let style = getComputedStyle(target);
        let displayValue = style.getPropertyValue('display');
        if(displayValue=="none"){
          target.style.cssText+="display: block"
          clickedElement.classList.remove("plus")
          clickedElement.classList.add("minus")
        }
        else{
         target.style.cssText+="display: none"
         clickedElement.classList.remove("minus")
          clickedElement.classList.add("plus")
        }
      }
    const addTag =(e)=>{
      if (e.keyCode === 13) {
       props.parentCallback(e.target.parentElement.parentElement.id,e.target.value);
        e.preventDefault();
      }
    } 
    return (
      <div className="row eachrow" id={props.data.id}>
     <div className="col-md-3"><img className="profileimg" src={props.data.pic} /></div>
     <div className="col-md-7">
     <h2> <b>{props.data.fullName.toUpperCase()}</b></h2>
     <div>Email : {props.data.email} </div>
     <div>Company: {props.data.company}</div>
     <div>Skill: {props.data.skill}</div>
     <div>Average: { 
       ((props.data.grades.map((i) => Number(i)).reduce((total,current)=>total + current))/props.data.grades.length).toFixed(2) + "%"}</div>
     <div className="addtionalDetails" style={{display:"none"}}>
       <div className="Marks">{
            props.data.grades.map((element,index)=>{
              return <div>Test{index+1} : {element}</div>
            })
       }</div>
     </div>
     <div className="tags">{
       props.data.tags.map((e)=>{
         return <div className="tag">{e}</div>
       })
     }</div>
     <input type="text"  placeholder="Add a tag" className="inputbox tagholder" onKeyDown={(e)=>addTag(e)} />
     </div> 
     <div className="col-md-1 plus" onClick={(e)=>toggleView(e)}></div>
     </div>
    );
  }

 
  

export default DataObject;