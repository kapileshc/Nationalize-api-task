var flag=0;
var input = document.getElementById("personName");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("btn").click();
  }
});

async function getData()
{
    let name= document.getElementById("personName");
    let namekey =name.value;
    const response = await fetch(`https://api.nationalize.io/?name=${namekey}`);
    data = await response.json();

    let countryData=[],pro_Data=[],res={}
    for(i=0;i<2;i++)
    {
        countryData.push(data.country[i].country_id);
        pro_Data.push(data.country[i].probability);
    }
    res["countryData"]=countryData;
    res["pro_Data"]= pro_Data;
    return res;
}

async function getid()
{
    try 
    {
        if(flag!==0)
        onDelete();
        let result = await getData();
        
        insertNewRecord(result);
    }
    catch(err)
    {
        document.getElementById("table").setAttribute("class", "container alert alert-danger");
        document.getElementById("table").innerHTML="Name doesn't exist in API"
        
        flag=2;
    }
}


function insertNewRecord(data)
{
    let tableHead= document
    .getElementById("countryList").getElementsByTagName("thead")[0];
    //insert table head
    var newHead= tableHead.insertRow(0);
    cell1 =newHead.insertCell(0);
    cell1.innerHTML = "NATIONALITY";
    cell2 = newHead.insertCell(1);
    cell2.innerHTML ="PROPABILITY";
    
    let tablebody= document
    .getElementById("countryList").getElementsByTagName("tbody")[0];
    

    //insert row
    for(i=0;i<2;i++)
    {
    var newRow= tablebody.insertRow(0);
    cell1 =newRow.insertCell(0);
    cell1.innerHTML = data.countryData[i];
    cell2 = newRow.insertCell(1);
    cell2.innerHTML =data.pro_Data[i];  
    }
    flag=1;
    
}

function onDelete()
{
    if(flag===1)
    {
        document.getElementById("countryList").getElementsByTagName("thead")[0].deleteRow(0);
    for(i=0;i<2;i++)
    {
    document.getElementById("countryList").getElementsByTagName("tbody")[0].deleteRow(0);
    }
    }
    else if(flag===2)
    {
        document.getElementById("table").setAttribute("class", "container");
        document.getElementById("table").innerHTML="";
        
    }
    
}


