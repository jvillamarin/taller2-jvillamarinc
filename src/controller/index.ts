import { renderTable } from "../util/index.js";

export const getAllStudents = async (myHeaders: Headers) => {

  try {
    let response = await fetch("https://apiestudiantes.maosystems.dev/estudiantes", {
      method: "GET",
      headers: myHeaders
    });

    let data = await response.json();
    renderTable(data.data)
  }
  catch (error) {
    console.log(error);
  }
}

export const createStudent = async (bodyContent: string, myHeaders: Headers) => {  

  try {
    let response = await fetch("https://apiestudiantes.maosystems.dev/estudiantes/", {
      method: "POST",
      headers: myHeaders,
      body: bodyContent
    });

    let data = await response.json();
    return data
  }
  catch (error) {
    console.log(error)
  }
}

export const getStudentsId = async (myHeaders: Headers, idStudent: number) => {

  try {
    let response = await fetch(`https://apiestudiantes.maosystems.dev/estudiantes/${idStudent}`, {
      method: "GET",
      headers: myHeaders
    });

    let data = await response.json();
    return data.data[0];
  }
  catch (error) {
    console.log(error);
  }
}

export const updateStudent = async (myHeaders: Headers, bodyContent: string, idStudent: number) => {
  try {
    let response = await fetch(`https://apiestudiantes.maosystems.dev/estudiantes/${idStudent}`, {
      method: "PUT",
      body: bodyContent,
      headers: myHeaders
    });

    let data = await response.json();    
  } catch (error) {
    console.log(error);
  }
}

export const updateState = async (myHeaders: Headers, bodyContent: string, idStudent: number) => {

  try {
    let response = await fetch(`https://apiestudiantes.maosystems.dev/estudiantes/estado/${idStudent}`, {
      method: "PUT",
      body: bodyContent,
      headers: myHeaders
    });

    let data = await response.json();    
  }
  catch (error) {
    console.log(error);
  }
}



