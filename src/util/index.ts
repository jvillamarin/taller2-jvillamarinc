import IStudent from "../interface/IStudent.js";

export const renderTable = (data: IStudent[] ) => {

  const studentTable = document.getElementById(
    "student-table"
  ) as HTMLDivElement;

  studentTable.innerHTML = "";

  const headerTable = `<thead>
    <tr>
      <th>Id</th>      
      <th>Nombres</th>
      <th>Apellidos</th>
      <th>Celular</th>
      <th>Correo</th>
      <th>Linkedin</th>
      <th>Github</th>
      <th>Estado</th>                  
      <th>Acciones</th>                  
    </tr>
  </thead>`;

  let bodyTableStudents = "";

  studentTable.insertAdjacentHTML("beforeend", headerTable);  

  for (const element of data) {     
    bodyTableStudents +=   
    `<tr>
      <td>${element.estudiante_id}</td>
      <td>${element.estudiante_nombres}</td>
      <td>${element.estudiante_apellidos}</td>
      <td>${element.estudiante_celular}</td>
      <td>${element.estudiante_correo}</td>
      <td>${element.estudiante_linkedin}</td>      
      <td>${element.estudiante_github}</td>
      <td>${element.estudiante_estado}</td>
      <td>
      <button type="button" id="${element.estudiante_id}" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">editar</button></td>

    </tr>`
    
  }
  studentTable.insertAdjacentHTML("beforeend", bodyTableStudents);

};

