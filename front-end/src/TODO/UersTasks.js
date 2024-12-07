import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import InitialUserTasks from "./initialUserTasks";
import FilterTask from "./filterTask";
import SearchComponent from "./searchComponent";


const UserTasks = ({ 
    setUpdateFun,
    setUpdateTask, 
    DOMUpdate, 
    setDOMUpdate ,
    UpdateStatus,
    setUpdateStatus,
    inputPurpose,
    setInputPurpose,
    UserallTasks, 
    setUserTasks,
    filterData,
    setFilterData, 
    searchFilterData,
    setSaerchFilterData,
    inputValue,setInutValue}) => {

 

    const [deleteStatus,setDeleteStatus] = useState()

    const [taskBoxID,settaskBoxID] = useState()

   

    const [filterValue,setFilterValue] = useState("")


    // =====>  Initial GET data from Back-End   
    useEffect(() => {
        let token = JSON.parse(sessionStorage.getItem("Token"))
        const headers = {
            "Authorization": `${token}`
        }
        axios.get("https://internshiptodotask.onrender.com/getUserTasks", { headers }).then((res) => {
           // console.log(res.data.Data)
            setUserTasks(res.data.Data)
            if(filterValue){
                let filterData = res.data.Data.filter((item)=>{
                    if(item.isComplete==true && filterValue=="Completed"){
                                return true     
                    }else if(item.isComplete==false && filterValue=="notCompleted"){
                             return true
                    }
             })
             // console.log(filterData)
             setFilterData(filterData)
            }
           
             
        }).catch((err)=>{
               console.log(err)
        })
    }, [DOMUpdate])


    // ===>>>   Delete Task  Event

    const DeleteTask = (TaskId) => {
        setDOMUpdate()
        setDeleteStatus(TaskId)
        let token = JSON.parse(sessionStorage.getItem("Token"))
        //console.log(token)
        let headers = {
            "Authorization": `${token}`,
            "Content-Type": 'application/json'
        }
        axios.delete(`https://internshiptodotask.onrender.com/DeleteTask/${TaskId}`,{headers}).then((res) => {
            console.log(res.data)
            setUserTasks(res.data.Data)
           if(inputValue!==""){
            if(filterData.length>0){
                let SearchData = filterData.filter((item)=>{
                                 if(item.Task.toLowerCase().includes(inputValue.toLowerCase())==true){
                                    return true
                                 }
                })
                setSaerchFilterData(SearchData)
            }else{
                let SearchData = UserallTasks.filter((item)=>{
                    if(`${item.Task}`.toLowerCase().includes(inputValue.toLowerCase())==true){
                       return true
                    }
   })
   console.log(SearchData)
   setSaerchFilterData(SearchData)
            }
          
        
    
           }
            setDeleteStatus()
        })
    }

    const UpdateSymbolClick = (ID, task) => {
        setUpdateStatus(ID)
        setUpdateFun({ TaskId: ID, Task: task })
        setUpdateTask({ Task: task })
    }

    const taskStatuseFun=(id,taskstatus)=>{
        
        let token = JSON.parse(sessionStorage.getItem("Token"))
        //console.log(token)
        let headers = {
            "Authorization": `${token}`,
            "Content-Type": 'application/json'
        }
                   
               axios.put("https://internshiptodotask.onrender.com/taskStatus", {taskID:id,Status:taskstatus},{headers}).then((res)=>{
                setUserTasks(res.data.result)
                settaskBoxID()
                if(filterValue){
                let filterData = res.data.result.filter((item)=>{
                    if(item.isComplete==true && filterValue=="Completed"){
                                return true     
                    }else if(item.isComplete==false && filterValue=="notCompleted"){
                             return true
                    }
             })
             // console.log(filterData)
             setFilterData(filterData)
            }
              
               }).catch((err)=>{
                        console.log(err)
               })
             
    }


    const taskBoxStatusFun=(item)=>{
             if(item._id==taskBoxID){
                return  <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div> 
             }
            else if(item.isComplete && taskBoxID!=item._id){
                      return <svg onClick={()=>{taskStatuseFun(item._id,"isNotCompeleted");settaskBoxID(item._id)}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                     </svg>
            }else if(!item.isComplete && taskBoxID!=item._id){
                     return  <svg onClick={()=>{taskStatuseFun(item._id,"isCompeleted");settaskBoxID(item._id)}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                     <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                     </svg>
            }
           
    }

    const  filterFun=(value)=>{
                  setSaerchFilterData([])
                         let filterData = UserallTasks.filter((item)=>{
                                if(item.isComplete==true && value=="Completed"){
                                            return true     
                                }else if(item.isComplete==false && value=="notCompleted"){
                                         return true
                                }
                         })
                          console.log(filterData)
                         setFilterData(filterData)
                        
                   
    }


    const displayDataFun=()=>{
             if(filterData.length>=0 && filterValue!==""  && inputValue==""){
                     return <FilterTask filterData={filterData} taskBoxStatusFun={taskBoxStatusFun} deleteStatus={deleteStatus} DeleteTask={DeleteTask} UpdateStatus={UpdateStatus} UpdateSymbolClick={UpdateSymbolClick} filterValue={filterValue} setInputPurpose={setInputPurpose} UserallTasks={UserallTasks}/>
             }else if(filterData.length==0 && filterValue==""  && inputValue==""){
                        return <InitialUserTasks UserallTasks={UserallTasks} taskBoxStatusFun={taskBoxStatusFun} deleteStatus={deleteStatus} DeleteTask={DeleteTask} UpdateStatus={UpdateStatus} UpdateSymbolClick={UpdateSymbolClick} setInputPurpose={setInputPurpose}/>
             }else if(searchFilterData.length>0 && inputValue!=="" ){
                return <SearchComponent searchFilterData={searchFilterData} taskBoxStatusFun={taskBoxStatusFun} deleteStatus={deleteStatus} DeleteTask={DeleteTask} UpdateStatus={UpdateStatus} UpdateSymbolClick={UpdateSymbolClick} filterValue={filterValue} setInputPurpose={setInputPurpose} UserallTasks={UserallTasks} filterData={filterData}/>
             }
    }


    


    return (<>
        <div className="container GetTask-OUter-Container" style={{ color: "black", marginTop: "130px" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                  {UserallTasks.length>0 ? <div style={{marginTop:"-25px" ,display:"flex",justifyContent:"space-between"}}><select onChange={(e)=>{filterFun(e.target.value);setFilterValue(e.target.value)}}>
                        <option value="">select Filter</option>
                        <option value="Completed">Compeleted</option>
                        <option value="notCompleted">Not Compeleted</option>
                        </select> <span>{inputPurpose=="Search" ? <button onClick={()=>{setInputPurpose("AddTask"); setUpdateStatus()}}>AddTask</button>: <button onClick={()=>{setInputPurpose("Search"); setUpdateStatus()}}>Search</button>}</span></div>:""}
                      {displayDataFun()}
                </div>
            </div>
        </div>

    </>)

}



/*=======================================UserActivity Functional Components===================================================*/

const UserActivity = () => {


    const [userTask, setUserTask] = useState({ Task: "", UserID: "" });   // state  for storing Task Add Task Input Field  for when  ADD Task Event

    const [UpdateFun, setUpdateFun] = useState(null);                // state for Storing the taskID,Task  from GetTasks i.e..  useful to Desides Add Task (or) Update Task buttons

    const [updateTask, setUpdateTask] = useState({ Task: "" })          // state for storing Task in Update Input field When  Update Task Event 

    const [DOMUpdate, setDOMUpdate] = useState()                     // state for Updating DOM  after Tasks Added,Update,Delete Section
 
    const [BtnStatus,setBtnStatus]=useState()

    const [UpdateStatus,setUpdateStatus]=useState()

    const [inputPurpose,setInputPurpose] = useState("AddTask")

    const [UserallTasks, setUserTasks] = useState([])

    const [inputValue,setInutValue]= useState("")

    const [filterData,setFilterData] = useState([])

    const [searchFilterData,setSaerchFilterData] = useState([])

    

    // ======> OnChange Event Trigger When Task is Typing in Input field

    const handleChange = (field, value) => {
        setUserTask({ ...userTask, [field]: value })
    }


    let token = JSON.parse(sessionStorage.getItem("Token"))
    //console.log(token)
    let headers = {
        "Authorization": `${token}`,
        "Content-Type": 'application/json'
    }

    //  ====> Onclick Event Trigger  When Click On the Add Task Button

    const AddTaskEvent = () => {
        setBtnStatus(true)
        if (userTask.Task !== "") {
            axios.put("https://internshiptodotask.onrender.com/addTask", userTask, { headers }).then((res) => {
                console.log(res.data)
                setUserTasks(res.data.Data)
                setUserTask({ Task: "" })
               setBtnStatus()
                
            })
        } else {
            alert("Enter Any Task")
            setBtnStatus()
        }
    }


    // =====> OnChange Event Trigger When Type Task When Updating The Task       
    const updateHandleChange = (field, value) => {
        setUpdateTask({ [field]: value })
    }




    // ====> Onclick Event Trigger  When Click On the Update Button      

    const UpdatingTask = (TaskId) => {
         console.log(TaskId)
        setBtnStatus(true)
        if (updateTask.Task !== "") {
            let token = JSON.parse(sessionStorage.getItem("Token"))
    //console.log(token)
    let headers = {
        "Authorization": `${token}`,
        "Content-Type": 'application/json'
    }
            axios.put(`https://internshiptodotask.onrender.com/UpDataTask/${TaskId}`, updateTask, {headers}).then((res) => {
                if (res.data.Success) {
                    setUserTasks(res.data.Data)
                    setInputPurpose("AddTask")
                    setUpdateFun(null)
                    setBtnStatus()
                    setUpdateStatus()
                }
            })
        } else {
            alert("Type Upadated Task")
            
        }
    }

    const inputHandlerFun=()=>{
                if(UpdateFun == null && inputPurpose=="AddTask"){
                       return <><input onChange={(e) => { handleChange("Task", e.target.value) }} type="text" class="form-control" value={userTask.Task} placeholder="Enter Your Task"/>
                       { BtnStatus ?  <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button>
                       : <input onClick={() => { AddTaskEvent() }} class="btn btn-primary" type="submit" value="Add Task" id="submitBtn" /> }</>
                }else if(inputPurpose=="Search"){
                   return  <input type="text" class="form-control"  placeholder="Search Any Task" onChange={(e)=>{handleChangeSearchInput(e)}}/>
                }else{
                       return <><input onChange={(e) => { updateHandleChange("Task", e.target.value) }} type="text" class="form-control" value={updateTask.Task} placeholder="Update Your Task"/>
                       {BtnStatus ? <button class="btn btn-warning" type="button" disabled><span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Loading...</span></button>
                       :<input onClick={() => { UpdatingTask(UpdateFun.TaskId) }} class="btn btn-warning" type="submit" value="Update" id="submitBtn" />}</>
                }
    }

    const handleChangeSearchInput=(e)=>{
        setInutValue(e.target.value)
            if(filterData.length>0){
                let SearchData = filterData.filter((item)=>{
                                 if(item.Task.toLowerCase().includes(e.target.value.toLowerCase())==true){
                                    return true
                                 }
                })
                setSaerchFilterData(SearchData)
            }else{
                let SearchData = UserallTasks.filter((item)=>{
                    if(`${item.Task}`.toLowerCase().includes(e.target.value.toLowerCase())==true){
                       return true
                    }
   })
   console.log(SearchData)
   setSaerchFilterData(SearchData)
            }
          
        
    }




    return (<>
        <div className="Main-Div">
        <div className="container">
        <div className="row">

                <div class="col d-flex justify-content-center">
                    <div class="input-group flex-nowrap" id="inputFields">
                         {inputHandlerFun()} 
                    </div>
                    </div>
                    </div>
                </div>
                <UserTasks 
                setUpdateFun={setUpdateFun} 
                DOMUpdate={DOMUpdate} 
                setDOMUpdate={setDOMUpdate} 
                setUpdateTask={setUpdateTask} 
                UpdateStatus={UpdateStatus} 
                setUpdateStatus={setUpdateStatus} 
                inputPurpose={inputPurpose} 
                setInputPurpose={setInputPurpose} 
                UserallTasks={UserallTasks} 
                setUserTasks={setUserTasks} 
                filterData ={filterData}
                setFilterData = {setFilterData}
                searchFilterData ={searchFilterData}
                setSaerchFilterData={setSaerchFilterData}
                setInutValue={ setInutValue}
                inputValue={inputValue}
                />
         
        </div>
    </>)

}


export default UserActivity;