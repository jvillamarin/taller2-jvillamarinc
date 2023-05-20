import {
  renderTable,
  newStudent,
  getStudentInfo,
  changeStudent,
  changeState,
} from "./services/apiStudent.js";
import Iinputs from "./interface/Iinputs.js";
declare var bootstrap: any;

const form = document.getElementById("students-form") as HTMLFormElement;
const idType = document.getElementById("id-type") as HTMLSelectElement;
const idNumber = document.getElementById("number-id") as HTMLInputElement;
const nameInput = document.getElementById("name-input") as HTMLInputElement;
const lastName = document.getElementById("lastName-input") as HTMLInputElement;
const email = document.getElementById("email-input") as HTMLInputElement;
const numberPhone = document.getElementById(
  "numberPhone-input"
) as HTMLInputElement;
const linkedinInput = document.getElementById(
  "linkedin-input"
) as HTMLInputElement;
const gitHubInput = document.getElementById("github-input") as HTMLInputElement;
const register = document.getElementById("register") as HTMLButtonElement;
const stateStudentRadio = document.querySelectorAll('input[name="status"]');
const showStudentsBtn = document.getElementById(
  "show-students"
) as HTMLButtonElement;
const btnSave = document.getElementById("save-btn") as HTMLButtonElement;
const studentTable = document.getElementById("student-table") as HTMLDivElement;
const myModal = new bootstrap.Modal("#exampleModal");

const errorForm = document.getElementById("error-form") as HTMLInputElement;
const successfulMessage = document.getElementById(
  "successful-message"
) as HTMLInputElement;
const inputs: NodeListOf<Element> = document.querySelectorAll(
  "#students-form input, #students-form select"
);
const inputsUpdate = Array.from(
  document.querySelectorAll("#students-form input")
);
const spanError: NodeListOf<Element> =
  document.querySelectorAll(".error-message");
const inputsHiddenUpdate = document.querySelectorAll(".hidden");

let updateStudent: boolean;
let idStudent: number;

///////////////////// CLEAR VALIDATION ///////////////////////

const clearValidation = () => {
  spanError.forEach((span) => {
    span.classList.remove("error-active");
  });

  inputs.forEach((input) => {
    input.classList.remove("invalid");
  });
  successfulMessage.classList.remove("successful-message-active");
};

///////////////////////////////// ADD O UPDATE STUDENT ///////////////////

const saveData = () => {
  if (updateStudent) {
    let bodyContent = JSON.stringify({
      nombres: nameInput.value,
      apellidos: lastName.value,
      celular: parseInt(numberPhone.value),
      correo: email.value,
      linkedin: linkedinInput.value,
      github: gitHubInput.value,
    });

    changeStudent(bodyContent, idStudent);

    updateStudent = false;
    showStudents();
    myModal.hide();
  } else {
    let bodyContent = JSON.stringify({
      tipoIdentificacion: parseInt(idType.value),
      numeroIdentificacion: parseInt(idNumber.value),
      nombres: nameInput.value,
      apellidos: lastName.value,
      celular: parseInt(numberPhone.value),
      correo: email.value,
      linkedin: linkedinInput.value,
      github: gitHubInput.value,
    });

    newStudent(bodyContent);
  }
  form.reset();
};
//////////////////////////////////// SHOW STUDENTS //////////////////////////////
const showStudents = () => {
  renderTable();
};

///////////////////////////////////// UPDATE STATE ///////////////////////////////
stateStudentRadio.forEach((radio) => {
  radio.addEventListener("change", (event: Event) => {
    let bodyContent = JSON.stringify({
      estado: (event.target as HTMLButtonElement).value,
    });
    changeState(bodyContent, idStudent);
  });
});

////////////////////////// OPEN MODAL FORM NEW STUDENT///////////////////////////////

register.addEventListener("click", () => {
  updateStudent = false;
  clearValidation();
  form.reset();  

  inputsHiddenUpdate.forEach((input: Element) => {
    const element = input as HTMLDivElement;
    element.style.display = "flex";
  });

  const radios = stateStudentRadio;
  radios.forEach((element) => {
    (element as HTMLInputElement).setAttribute("disabled", "");
  });
});

////////////////////////// OPEN MODAL FORM UPDATE STUDENT/////////////////////////////// 

studentTable.addEventListener("click", (e) => {
  const radios = stateStudentRadio;
  radios.forEach((element) => {
    (element as HTMLInputElement).removeAttribute("disabled");
  });

  updateStudent = true;

  inputsHiddenUpdate.forEach((input: Element) => {
    const element = input as HTMLDivElement;
    element.style.display = "none";
  });

  const target = e.target as HTMLButtonElement;

  if (target.closest(".btn-edit")) {
    clearValidation();

    idStudent = parseInt(target.id);

    getStudentInfo(idStudent).then((data) => {
      nameInput.value = data.estudiante_nombres;
      lastName.value = data.estudiante_apellidos;
      numberPhone.value = data.estudiante_celular;
      email.value = data.estudiante_correo;
      linkedinInput.value = data.estudiante_linkedin;
      gitHubInput.value = data.estudiante_github;
      stateStudentRadio.values = data.estudiante_estado;

      stateStudentRadio.forEach((radio) => {
        const dataRadio = data.estudiante_estado;

        if (
          (radio as HTMLInputElement).value ==
          dataRadio.charAt(0).toUpperCase() + dataRadio.slice(1)
        ) {
          (radio as HTMLInputElement).checked = true;
        } else {
          (radio as HTMLInputElement).checked = false;
        }
      });
    });
  }
});


showStudentsBtn.addEventListener("click", showStudents);

//////////////////////////////// SAVE FORM //////////////////
btnSave.addEventListener("click", () => {
  switch (updateStudent) {
    case true:
      const inputsExceptFirst = inputsUpdate.slice(1);

      inputsExceptFirst.forEach((input: Element) => {
        const element = input as HTMLInputElement;
        if (element.value !== "") {
          inputsReturn[element.name] = true;
        }
      });
      if (
        inputsReturn.firstName &&
        inputsReturn.lastName &&
        inputsReturn.phone &&
        inputsReturn.email &&
        inputsReturn.linkedin &&
        inputsReturn.github
      ) {
        saveData();
        errorForm.classList.remove("error-active");
        successfulMessage.classList.add("successful-message-active");
        for (const key in inputsReturn) {
          inputsReturn[key] = false;
        }
      } else {
        for (const key in inputsReturn) {
          if (inputsReturn[key] === false) {
            const input = document.querySelector(
              `[name=${key}]`
            ) as HTMLInputElement;
            input.classList.add("invalid");
          }
        }
        errorForm.classList.add("error-active");
        successfulMessage.classList.remove("successful-message-active");
      }

      break;
    case false:
      if (
        inputsReturn.idType &&
        inputsReturn.idNumber &&
        inputsReturn.firstName &&
        inputsReturn.lastName &&
        inputsReturn.phone &&
        inputsReturn.email &&
        inputsReturn.linkedin &&
        inputsReturn.github
      ) {
        saveData();
        form.reset();
        errorForm.classList.remove("error-active");
        successfulMessage.classList.add("successful-message-active");
        for (const key in inputsReturn) {
          inputsReturn[key] = false;
        }
      } else {
        for (const key in inputsReturn) {
          if (inputsReturn[key] === false) {
            const input = document.querySelector(
              `[name=${key}]`
            ) as HTMLInputElement;
            input.classList.add("invalid");
          }
        }
        errorForm.classList.add("error-active");
        successfulMessage.classList.remove("successful-message-active");
      }

      break;
    default:
      break;
  }
});

//////////////////////////// VALIDATION INPUTS ///////////////////////////////////

const expresions = {
  idType: /^[1-6]$/, // valida que ingrese numero del 1 al 6
  idNumber: /^\d{6,10}$/, // valida 8 0 10 numeros
  firstName: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/, //valida que el nombre contenga solamente letras, espacios, guiones y apóstrofes. Los caracteres acentuados, como á, é, í, ó, ú, ñ y Ñ también se permiten.
  lastName: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/, //valida que el nombre contenga solamente letras, espacios, guiones y apóstrofes. Los caracteres acentuados, como á, é, í, ó, ú, ñ y Ñ también se permiten.
  phone: /^\d{7,10}$/, //valida de 7 a 10 numeros
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //validacion del email, requiere @ punto y com
  linkedin: /^(https?:\/\/)?([a-z0-9-]+\.)*[a-z0-9-]+(\.[a-z]{2,})(\/.*)*$/i,
  github: /^(https?:\/\/)?([a-z0-9-]+\.)*[a-z0-9-]+(\.[a-z]{2,})(\/.*)*$/i,
};

const inputsReturn: Iinputs = {
  idType: false,
  idNumber: false,
  firstName: false,
  lastName: false,
  phone: false,
  email: false,
  linkedin: false,
  github: false,
};

const checkFields = (
  expresions: RegExp,
  valueInput: string,
  inputName: string
) => {
  const input = document.querySelector(
    `[name=${inputName}]`
  ) as HTMLInputElement;
  const nextElement = input.nextElementSibling as HTMLSpanElement;
 
  if (!expresions.test(valueInput)) {
    input.classList.add("invalid");
    nextElement.classList.add("error-active");
    inputsReturn[inputName] = false;
  } else {
    input.classList.remove("invalid");
    nextElement.classList.remove("error-active");
    inputsReturn[inputName] = true;
    errorForm.classList.remove("error-active");
  }
};

const checkForm = (e: Event) => {
  const element = e.target as HTMLInputElement;
  const inputName = element.name;
  const valueInput = element.value;

  switch (inputName) {
    case "idType":
      checkFields(expresions.idType, valueInput, inputName);
      break;
    case "idNumber":
      checkFields(expresions.idNumber, valueInput, inputName);

      break;
    case "firstName":
      checkFields(expresions.firstName, valueInput, inputName);

      break;
    case "lastName":
      checkFields(expresions.lastName, valueInput, inputName);
      break;
    case "phone":
      checkFields(expresions.phone, valueInput, inputName);
      break;
    case "email":
      checkFields(expresions.email, valueInput, inputName);
      break;
    case "linkedin":
      checkFields(expresions.linkedin, valueInput, inputName);
      break;
    case "github":
      checkFields(expresions.github, valueInput, inputName);
      break;
    default:
      break;
  }
};
inputs.forEach((input) => {
  input.addEventListener("keyup", checkForm);
  input.addEventListener("blur", checkForm);
  input.addEventListener("change", checkForm);
});
