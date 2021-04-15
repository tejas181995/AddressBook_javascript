const usrInput = require("readline-sync");
const fields = ["firstName", "lastName", "address", "city", "state", "zipCode", "phoneNumber", "email"];
const regexPattern = ["^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{3,14}$", "^[A-Z]{1}[a-z]{2,14}$", "^[0-9]{6,}", "^[0-9]{2}[ ][6-9]{1}[0-9]{9}$", "^[A-Za-z0-9+-]+(\\.[A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]{2,}){1,2}$"]

let contactDetails = new Array(fields.length);
let addressBook = new Array();

var Contact = function(contactDetails) {
    this.contactDetails = contactDetails;
}

function createContact() {
    let addressBook = new Array();
    let contactDetails = new Array(fields.length);
    let temp = " ";
    let tempArr = new Array();
    for (var i = 0; i <= fields.length - 1; i++) {
        let input = true;
        while (input) {
            temp = usrInput.question(`Enter ${fields[i]}: `);
            if (temp.match(regexPattern[i])) {
                tempArr[i] = temp;
                input = false;
            } else {
                try {
                    throw new Error('Invalid Input Enter a valid input');
                } catch (error) {
                    console.log(error);
                    continue;
                }
            }

        }

    }

    if (addressBook.length === 0) {
        contactDetails = tempArr;
        console.log(contactDetails);
        return contactDetails;
    } else {
        for (i = 0; i <= addressBook.length - 1; i++) {
            if ((addressBook[i].contactDetails[0]).includes(tempArr[0])) {
                console.log(`contact already exist`);
                createContact();
            } else {
                contactDetails = tempArr;
                return contactDetails;
            }
        }


    }


}

function getPersonFromCityAndState(index) {
    let count = 0;
    let value = usrInput.question(`Enter ${fields[index]} :   `);
    for (var i = 0; i <= addressBook.length - 1; i++) {
        if (addressBook[i].contactDetails[index] == value) {
            count++
            console.log(`persons in same ${fields[index]} ${addressBook[i].contactDetails[0]}`);
        }
    }
    return count;
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
    } else if (choice == 9) {
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

function sortByParameter(index) {
    addressBook.sort((a, b) => a.contactDetails[index].localeCompare(b.contactDetails[index]));
}

function sort() {
    let choice = parseInt(usrInput.question("1.sort by name\n2. sort by city \n 3 sort by state."));
    switch (choice) {
        case 1:
            sortByParameter(0);
            break;
        case 2:
            sortByParameter(3);
            break;
        case 3:
            sortByParameter(4);
            break;
        default:
            console.log('enter valid choice');
            sort();
    }
}

function addressBookSystem() {
    let choice;
    while (choice != 11) {
        choice = parseInt(usrInput.question(`Enter 1.to add contact in address book \n 2. print contact in address book \n 3. edit contact\n 4. delete contact \n 5. get total count \n 6. view person from same city \n 7. view person from same state \n 8. count person from same city \n 9. count person from same state \n 10.sort by parameter \n. 11. Exit:-`));
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
                break;
            case 6:
                getPersonFromCityAndState(3);
                break;
            case 7:
                getPersonFromCityAndState(4);
                break;
            case 8:
                let count = getPersonFromCityAndState(3)
                console.log("count person from same city:  " + count);
                break;
            case 9:
                let count_1 = getPersonFromCityAndState(4);
                console.log("count person from same state:  " + count_1);
                break;
            case 10:
                sort();
                break;
            case 11:
                console.log('thank you');
                break;
            default:
                console.log("Wrong Choice...!!");
                addressBookSystem();
        }
    }

}
addressBookSystem();