const usrInput = require("readline-sync");
const fields = ["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];
const regexPattern = ["^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[0-9]{6,}", "^[0-9]{2}[ ][6-9]{1}[0-9]{9}$", "^[A-Za-z0-9+-]+(\\.[A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]{2,}){1,2}$"]

let contactDetails = new Array()
let addressBook = new Array();

var Contact = function (contactDetails) {
    this.contactDetails = contactDetails;
    this.printContact = function () {
        console.log(contact);
    }
}
function createContact() {
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
function addContactTOAddressBook() {
    let noOFContact = usrInput.question("No of contact to be added:  ");
    for (var i = 0; i <= noOFContact - 1; i++) {
        console.log(i)
        addressBook.push(createContact(new Contact(contactDetails)));
    }
}
function addressBookSystem() {
    choice = parseInt(usrInput.question(`Enter 1.to add contact in address book 
     2. print contact in address book \n:-`));
    switch (choice) {
        case 1:
            addContactTOAddressBook();
            break;
        case 2:
            console.log(`contacts in Address book: ${addressBook}`);
            break;
        default:
            console.log("Wrong Choice...!!");
            addressBookSystem();
    }
}

addressBookSystem();





