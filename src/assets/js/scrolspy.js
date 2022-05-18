function myFunction() {
    var element = document.getElementById("myDIV");
    element.classList.add("mystyle");
    var elementtwo =  document.getElementById("myDIV2");
    elementtwo.classList.remove("mystyle");
    var elementthree =  document.getElementById("myDIV3");
    elementthree.classList.remove("mystyle");
    var elementfour =  document.getElementById("myDIV4");
    elementfour.classList.remove("mystyle");
}

function myFunctionTwo(){
    var element = document.getElementById("myDIV");
    element.classList.remove("mystyle");
    var elementtwo =  document.getElementById("myDIV2");
    elementtwo.classList.add("mystyle");
    var elementthree =  document.getElementById("myDIV3");
    elementthree.classList.remove("mystyle");
    var elementfour =  document.getElementById("myDIV4");
    elementfour.classList.remove("mystyle");
}
function myFunctionThree(){
    var element = document.getElementById("myDIV");
    element.classList.remove("mystyle");
    var elementtwo =  document.getElementById("myDIV2");
    elementtwo.classList.remove("mystyle");
    var elementthree =  document.getElementById("myDIV3");
    elementthree.classList.add("mystyle");
    var elementfour =  document.getElementById("myDIV4");
    elementfour.classList.remove("mystyle");
}
function myFunctionFour(){
    var element = document.getElementById("myDIV");
    element.classList.remove("mystyle");
    var elementtwo =  document.getElementById("myDIV2");
    elementtwo.classList.remove("mystyle");
    var elementthree =  document.getElementById("myDIV3");
    elementthree.classList.remove("mystyle");
    var elementfour =  document.getElementById("myDIV4");
    elementfour.classList.add("mystyle");
}

myFunction(); myFunctionTwo(); myFunctionThree(); myFunctionFour()