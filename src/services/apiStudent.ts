import { myHeaders } from "../constants/index.js";
import { createStudent, getAllStudents, getStudentsId, updateStudent, updateState } from "../controller/index.js";

export const renderTable = () =>{
  return getAllStudents(myHeaders);
}

export const newStudent = (bodyContent:string) =>{
  return createStudent(bodyContent, myHeaders);
}

export const getStudentInfo = async(id:number) => {
  return getStudentsId(myHeaders, id);
}

export const changeStudent = (bodyContent:string, id:number) =>{  
  return updateStudent(myHeaders, bodyContent, id );
}

export const changeState = (bodyContent:string, id:number) => {
  return updateState(myHeaders,bodyContent, id);
}

