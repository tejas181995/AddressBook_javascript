const usrInput = require("readline-sync");
const fields = ["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];
const regexPattern = ["^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[0-9]{6,}", "^[0-9]{2}[ ][6-9]{1}[0-9]{9}$", "^[A-Za-z0-9+-]+(\\.[A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]{2,}){1,2}$"]

let contactDetails = new Array(fields.length);
let addressBook = new Array();

var Contact = function (contactDetails) {
    this.contactDetails = contactDetails;
}
function createContact() {
    let contactDetails = new Array(fields.length);
    let temp;
    for (var i = 0; i <= fields.length - 1; i++) {
        let input = true;
        while (input) {
            temp = usrInput.question(`Enter ${fields[i]}: `);
            if (temp.match(regexPattern[i])) {
                contactDetails[i] = temp;
                input = false;
            }
            else {
                try {
                    throw new Error('Invalid Input Enter a valid input');
                }
                catch (error) {
                    console.log(error);
                    continue;
                }
            }

        }
    }
    return contactDetails;
}
function printContact() {
    let counter = 0;
    for (var i = 0; i <= addressBook.length - 1; i++) {
        counter++;
        console.log(addressBook[i]);
    }
    return counter;
}
function deleteEntry() {
    let deleteContactName = String(usrInput.question("enter contact to be edit: "));
    for (var i = 0; i <= addressBook.length - 1; i++) {
        if (addressBook[i].contactDetails[0] == deleteContactName) {
            addressBook.splice(i, 1);
        }
    }
}
function addContactTOAddressBook() {
    let noOFContact = usrInput.question("No of contact to be added:  ");
    for (var i = 0; i <= noOFContact - 1; i++) {
        addressBook.push((new Contact(createContact())));
    }
}
function changeEntery(index) {

    let choice = usrInput.question(`enter option to edit 1. firstName, 2. lastName, 3. address, 4. city, 5. state, 6. zipCode, 7. phoneNumber, 8. email, 9. another change `);
    let newValue;
    if (choice <= 8 && choice >= 1) {
        newValue = usrInput.question("Enter new detail:  ");
        addressBook[index].contactDetails[choice - 1] = newValue;
    }
    else if (choice == 9) {
        changeEntery(index);
    }


}
function editEntry() {
    let editContactName = String(usrInput.question("enter contact to be edit: "));
    for (var i = 0; i <= addressBook.length - 1; i++) {
        if (addressBook[i].contactDetails[0] == editContactName) {
            console.log(i);
            changeEntery(i);
        }
    }
}
function getNoOfContacts() {
    const count = addressBook.reduce((counter, obj) => {
        counter += 1
        return counter;
    }, 0);
    console.log(`total contacts: ${count}`);
}

function addressBookSystem() {
    let choice;
    while (choice != 6) {
        choice = parseInt(usrInput.question(`Enter 1.to add contact in address book \n 2. print contact in address book \n 3. edit contact\n 4. delete contact \n 5. get total count \n 6. Exist:-`));
        switch (choice) {
            case 1:
                addContactTOAddressBook();
                break;
            case 2:
                printContact();
                break;
            case 3:
                editEntry();
                break;
            case 4:
                deleteEntry();
                break;
            case 5:
                getNoOfContacts();
                break
            case 6:
                console.log("thank you...!!!");
                break;
            default:
                console.log("Wrong Choice...!!");
                addressBookSystem();
        }
    }

}


addressBookSystem();





