//Alisa Uthikamporn Sec2 6188025

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var numberWork = [39, 93, 45, 46, 56, 78, 87]; 
var list_phone = [];
var list_sum = [];
var hasClicked = false;

//Function for changing phone number when click random again
function clickAgain()
{
    if(hasClicked == false)
    {
        randomPhoneNum();
        hasClicked = true;
    }
    else
    {
        setTimeout(function() {
            //reset the phone number and sum, then call functions to random phone number and calculate sum again 
            list_phone = [];
            list_sum = [];
            randomPhoneNum(); }, 200);
    }
}

//Function to random phone number
function randomPhoneNum()
{    
    var message, messageRef,phoneNum, phoneListRef, positionNumWork, count, maxSize = 5;
    phoneListRef = document.getElementById("phoneList");
    messageRef = document.getElementById("message");
    removeNumberInList();
    //----------------Create phone number that contains lucky number------------------
    positionNumWork = 0;
    count = 0;
    while(count < maxSize * numberWork.length)
    {
        //Initiate phone number        
        phoneNum = [0, 8, 6];
        //Put lucky number into phone number
        var temp = numberWork[positionNumWork];
        phoneNum.push(Math.floor(temp / 10));
        phoneNum.push(temp % 10);
        //Put random number
        for(var i = 5; i < 10; i++)     
            phoneNum.push(numbers[Math.floor(Math.random() * numbers.length)]);
        //If sum equals to the lucky number(work), push it in the list     
        if(numberWork.includes(phoneNum.reduce(sumPhoneNum,0)))
        {
            list_phone.push(phoneNum.join("")); 
            //Find sum
            list_sum.push(phoneNum.reduce(sumPhoneNum,0));
            count++;
            //Each lucky number will have 5 phone number
            if(count % maxSize == 0)
                positionNumWork++;      //Change to other lucky number
        }        
    }    
    //--------------------------------------------------------------------------------
    //show the result
    message = 'List of Phone Number';
    messageRef.innerText = message;
    var listHTML = '';
    for(var i = 0; i < list_phone.length; i++)
        listHTML += list_phone[i] + '<br>';     //"&nbsp ------>&nbsp Sum is " + list_sum[i]   <--To show summation
    listHTML = '<div>' + listHTML + '</div>';
    phoneListRef.innerHTML = listHTML;
    //---------------------------------------------------------------------------------
}

//Function to find summation
function sumPhoneNum(total, num){
    return total + num;
}

//Function to remove the number that user doesn't want in the list of number and lucky number
function removeNumberInList(){
    var excludedNum;
    //-------To delete number that users don't want to include it from the list--------
    excludedNum = document.getElementById("dislikeNum").value;
    excludedNum = excludedNum.split(" ");
    for(var j = 0; j < numberWork.length; j++)
    {
        for(var i = 0; i < excludedNum.length; i++)
        {
            //Delete number that user doesn't want from a list of numbers
            delete numbers[excludedNum[i]]; 
            
            //Delete number that user doesn't want from the lucky number list
            if(Math.floor(numberWork[j] / 10) == excludedNum[i] || numberWork[j] % 10 == excludedNum[i])
            {
                numberWork.splice(j,1);
                //Go back 1 index since the index is removed from slice()
                j--;
            }
        }   
    }   
    //---------------------------------------------------------------------------------
}