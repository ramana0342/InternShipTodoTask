import React from 'react'

function FilterTask({filterData,taskBoxStatusFun,deleteStatus,DeleteTask,UpdateStatus,UpdateSymbolClick,filterValue,setInputPurpose,UserTasks}) {


    function filtertaskInfomation(){
          //console.log("123")
           if(filterValue=="Completed" && UserTasks.length>0){
              return <div className="Empty-Task-div"><h1>Task Completed Empty</h1></div>
           }else if(filterValue=="notCompleted" && UserTasks.length>0){
               return <div className="Empty-Task-div"><h1>All Task Completed</h1></div> 
           }else{
                return <div className="Empty-Task-div"><h1>Empty Tasks,Create Your Tasks</h1></div>
           }
    }
    
        
  return (<>

{filterData.length > 0 ? filterData.map((item, index) => {
                       // console.log(item)
                        return (<> 
                            <div className="GetTask-Inner-Container d-flex justify-content-between" style={{ padding: "0px 15px", overflow: "auto"}}>
                                <div style={{marginTop:"12px",display:"flex"}}>
                                <span style={{width:"10px",marginRight:"25px"}}>  
                           {taskBoxStatusFun(item)}</span>
                    <h5><p>{item.Task}</p></h5>
                    </div>
                               
                                <div  className="d-flex" style={{marginTop:"12px",marginLeft:"25px"}}>
                                {deleteStatus === item._id ? <div style={{ marginRight: "10px" }} class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div> 
                                    :<div  onClick={() => { DeleteTask(item._id) }} style={{ marginRight: "10px" , cursor:"pointer"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg></div>}
                                     
                                        { UpdateStatus===item._id ? <button style={{marginTop:"0px",paddingTop:"0px" ,height:"30px"}} class="btn btn-primary" type="button" disabled><span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Updating...</span></button> 
                                        : <div onClick={() => { UpdateSymbolClick(item._id, item.Task) ;setInputPurpose("")}}><i style={{ fontSize: "25px", cursor:"pointer"}} class="fa-solid fa-pen-to-square"></i></div> }
                                </div>
                            </div>

                        </>)
                    })


                        : filtertaskInfomation()} 

  </> )
}

export default FilterTask