//Name field has focus state on page load.
const nameField = document.getElementById('name');
nameField.focus();

//Other job role text field hidden by default
const otherJobTextField = document.getElementById('other-job-role');
otherJobTextField.style.display = 'none';

//If other option is selected, text field is displayed.
const selectJobRole = document.getElementById('title'); //select element for job titles
selectJobRole.addEventListener('change', e => {
    if(e.target.value === 'other'){
        otherJobTextField.style.display = 'initial';
    } else {
        otherJobTextField.style.display = 'none';
    }
});

/*********** T-SHIRT INFO ****************/


const colorSelectElement = document.getElementById('color'); //select element for shirt colors
const colorOptionElements = document.querySelectorAll('#color option'); //option children of select element

//colorSelectElement.style.display = 'none'; //color options hidden by default

colorSelectElement.disabled = 'true'; 

const designField = document.getElementById('design'); //select element for shirt designs

designField.addEventListener('change', e => {
   // colorSelectElement.style.display = '';
   colorSelectElement.disabled = ''; 
    const punOptions = document.querySelectorAll('option[data-theme="js puns"]');
    const heartOptions = document.querySelectorAll('option[data-theme="heart js"]');
    if (e.target.value === 'js puns'){
        punOptions[0].selected = true;
        for (const option of punOptions){
            option.hidden = false;
        }
         for (const option of heartOptions){
             option.hidden = true;
         }
      
        
    } else if (e.target.value === 'heart js'){
        heartOptions[0].selected = true;
        for (const option of heartOptions){
            option.hidden = false;
        }
        for (const option of punOptions){
            option.hidden = true;
        }
        
    }
});

/*********** REGISTER FOR ACTIVITIES ****************/

//grabs Register for Activities fieldset element
const activitiesFieldset = document.getElementById('activities'); 

//grabs total <p> element
const activitiesCost = document.getElementById('activities-cost');

let totalCost = 0;

activitiesFieldset.addEventListener('change', e => {
    //stores input element that has been checked
    const clicked = e.target;
    
    //Variable for clicked box 'data-cost' attribute (200 or 100)
    const clickedBoxAttribute = +(clicked.getAttribute('data-cost'));
    
    clicked.checked ? totalCost += clickedBoxAttribute : totalCost -= clickedBoxAttribute;
    activitiesCost.innerHTML = `Total: $${totalCost}`; 
});

/*********** PAYMENT INFO ****************/

const paymentSelection = document.getElementById('payment'); //select element for payment options
const paymentOptionElements = document.querySelectorAll('#payment option'); //option children of select element
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const creditDiv = document.getElementById('credit-card');

paypalDiv.hidden = true;
bitcoinDiv.hidden = true;
creditDiv.hidden = false;
paymentOptionElements[1].selected = true;

paymentSelection.addEventListener('change', e => {
    if(e.target.value === 'paypal'){
        paypalDiv.hidden = false;
        creditDiv.hidden = true;
        bitcoinDiv.hidden = true;
    } else if(e.target.value === 'bitcoin'){
        bitcoinDiv.hidden = false;
        creditDiv.hidden = true;
        paypalDiv.hidden = true;
    } else {
        creditDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
    }
});

/*********** FORM VALIDATION ****************/

const emailField = document.getElementById('email');
const ccNumField = document.getElementById('cc-num');
const zipCodeField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
//Variable for checkboxes, returns a node list
const activitiesCheckboxes = document.querySelectorAll('#activities input');

const nameValidator = () => {
    const nameValue = nameField.value;
    const nameRegex = /^[a-z]+ [a-z ,\.'-]+$/i.test(nameValue.trim()); 

    nameRegex ? validationPass(nameField) : validationFail(nameField)
    
    return nameRegex;
};

const emailValidator = () => {
    const emailValue = emailField.value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue.trim());

    emailRegex ? validationPass(emailField) : validationFail(emailField)
    
    return emailRegex;

};

const activitiesValidator = () => {
    const activitiesDiv = document.getElementById('activities-box');
    for(activity of activitiesCheckboxes){
        if(activity.checked){
            document.querySelector('p.hint').style.display = 'none';
            validationPass(activitiesDiv);
            return true
        } else {
            document.querySelector('p.hint').style.display = 'block';
            validationFail(activitiesDiv);
        }
    }
}

const cardNumValidator = () => {
    const cardNumValue = ccNumField.value;
    const cardNumRegex = /^\d{13,16}$/.test(cardNumValue.trim());

    cardNumRegex ? validationPass(ccNumField) : validationFail(ccNumField)

    return cardNumRegex;
}

const zipCodeValidator = () => {
    const zipCodeValue = zipCodeField.value;
    const zipCodeRegex = /^\d{5}$/.test(zipCodeValue.trim());

    zipCodeRegex ? validationPass(zipCodeField) : validationFail(zipCodeField)

    return zipCodeRegex;
}

const cvvValidator = () => {
    const cvvValue = cvvField.value;
    const cvvRegex = /^\d{3}$/.test(cvvValue.trim());

    cvvRegex ? validationPass(cvvField) : validationFail(cvvField)

    return cvvRegex;
}
const formElement = document.querySelector('form');

formElement.addEventListener('submit', e => { 
    if(!nameValidator()){
        e.preventDefault();
        console.log('Please enter valid name.')
    }

    if(!emailValidator()){
        e.preventDefault();
        console.log('Please enter valid email address.')
    }

    if(!activitiesValidator()){
        e.preventDefault();
        console.log('Please make at least one selection.');
    }
    if(creditDiv.hidden === false){
        if(!cardNumValidator()){
            e.preventDefault();
            console.log('Please enter valid CC number.');
        } 
        if (!zipCodeValidator()){
            e.preventDefault();
            console.log('Please enter valid zipcode.')
        }
        if(!cvvValidator()){
            e.preventDefault();
            console.log('Please enter valid CVV.')
        }
    }
});

/*********** Accessibility ****************/

function validationPass(element) {
    let parameterParent = element.parentElement;
	parameterParent.classList.add('valid');
	parameterParent.classList.remove('not-valid');
	element.nextElementSibling.style.display = 'none';
}

function validationFail(element) {
    let parameterParent = element.parentElement;
	parameterParent.classList.add('not-valid');
	parameterParent.classList.remove('valid');
	element.nextElementSibling.style.display = 'block';
}

  //Add focus for each activity

  for(const activity of activitiesCheckboxes){
    activity.addEventListener('focus', e => {
        activity.parentElement.classList.add('focus');
    });
    activity.addEventListener('blur', e => {
            activity.parentElement.classList.remove('focus');
        });
}


  
