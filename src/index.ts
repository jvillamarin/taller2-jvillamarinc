const form = document.getElementById('students-form') as HTMLFormElement
const btnSave = document.getElementById('save-btn') as HTMLButtonElement

btnSave.addEventListener('click', ()=>{
    console.log("click btn");

    const idType = document.getElementById('id-type') as HTMLSelectElement
    const nameInput = document.getElementById('name-input') as HTMLInputElement
    const numberId = document.getElementById('number-id') as HTMLInputElement
    const lastName = document.getElementById('lastName-input') as HTMLInputElement
    const email = document.getElementById('email-input') as HTMLInputElement
    const numberPhone = document.getElementById('numberPhone-input') as HTMLInputElement
    const linkedinInput = document.getElementById('linkedin-input') as HTMLInputElement
    const gitHubInput = document.getElementById('github-input') as HTMLInputElement
    
    console.log(idType.value);
    console.log(nameInput.value);
    console.log(numberId.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(numberPhone.value);
    console.log(linkedinInput.value);
    console.log(gitHubInput.value);
    
})
