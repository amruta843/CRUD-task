
let cl=console.log;

const stdForm=document.getElementById("stdForm");

const fnameControl =document.getElementById("fname")
const lnameControl=document.getElementById("lname")
const emailControl=document.getElementById("email")
const contactControl=document.getElementById("contact")
const stdInfoContainer=document.getElementById("stdInfoContainer")
const stdTable=document.getElementById("stdTable")
const noStdData=document.getElementById("noStdData")
const noOfStds=document.getElementById("noOfStds")
const stdSubmitBtn=document.getElementById("stdSubmitBtn")
const stdUpdateBtn=document.getElementById("stdUpdateBtn")



let stdArr=[];


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
 

const trTempleting= (arr) =>{
let result = " ";
arr.forEach((ele, i) => {
  result += `
              <tr id="${ele.stdId}">
                  <td>${i + 1}</td>
                  <td>${ele.fname}</td>
                  <td>${ele.lname}</td>
                  <td>${ele.email}</td>
                  <td>${ele.contact}</td>
                  <td class="text-center" > <i class="fa-solid fa-2x fa-pen-to-square mr-2 edit" onclick="OnstdEdit(this)"></i>
                  </i></td>
                  <td class="text-center"><i class="fa-solid fa-2x fa-trash-can delete" onclick="OnstdDelete(this)"></i></td>
              </tr>
              `
});
stdInfoContainer.innerHTML=result;


}

const OnstdEdit= (ele) =>{
  cl(ele.closest("tr").id,"Edited")
  // let editId=ele.closest("tr").id
  let editId=ele.closest("tr").getAttribute("id");

  localStorage.setItem("editId", editId);
  cl(editId)
  
  let editObj=stdArr.find(std=>{
    return std.stdId===editId
  })
  cl(editObj)
  fnameControl.value=editObj.fname;
  lnameControl.value=editObj.lname;
  emailControl.value=editObj.email;
  contactControl.value=editObj.contact;
  stdUpdateBtn.classList.remove("d-none");
  stdSubmitBtn.classList.add("d-none")
}
const OnstdDelete= (ele) =>{
  cl(ele.closest("tr").id,"Deleted")
  
  let deleteId=ele.closest("tr").id
  cl(deleteId);

  let deletedValue = document.getElementById(deleteId);

  let confirmDelete= confirm(`Are you sure, to delete the record  ${deletedValue}?`)

  if(confirmDelete)
  { 
   stdArr=stdArr.filter(std=>std.stdId !== deleteId)
   localStorage.setItem("stdData", JSON.stringify(stdArr))
   document.getElementById(deleteId).remove();
   noStdData.innerHTML= `No of Students are ${stdArr.length}`
   Swal.fire({
    icon: 'success',
    text: `Record ${deletedValue} is deleted successfully!!`,
    timer: 3000
})
   
  }
  else{
    return
  }
}


if(localStorage.getItem("stdData")){
 let data = JSON.parse(localStorage.getItem("stdData"));
 stdArr = data;
 trTempleting(data);
 stdTable.classList.remove('d-none');
// noStdData.classList.add('d-none');
noStdData.innerHTML= `No of Students are ${data.length}`
}else{
  stdTable.classList.add('d-none');
  noStdData.classList.remove('d-none');
}

const OnstdAdd=(eve)=>{
  eve.preventDefault();
    let stdObj = {
      fname : fnameControl.value,
      lname : lnameControl.value,
      email : emailControl.value,
      contact : contactControl.value,
      stdId : uuid ()
    }
    cl(stdObj)


    stdArr.unshift(stdObj)
    Swal.fire({
      icon: 'success',
      text: `New record with ${stdObj.fname.toUpperCase()} ${stdObj.lname.toUpperCase()} is added successfully!!`,
      timer: 3000
  })
    noStdData.innerHTML= `No of Students are ${stdArr.length}`
    eve.target.reset();
    stdTable.classList.remove('d-none');
  //noStdData.classList.add('d-none');
    trTempleting(stdArr);
    localStorage.setItem("stdData", JSON.stringify(stdArr))
}

const onStdInfoUpdate = ()=>{
  let UpdatedId=localStorage.getItem("editId")
  localStorage.removeItem("editId")
  let UpdateObj = {
      fname : fnameControl.value,
      lname : lnameControl.value,
      email : emailControl.value,
      contact : contactControl.value,
  }
  cl(UpdateObj)

  for(let i=0; i<=stdArr.length; i++)
  {
    if(stdArr[i].stdId === UpdatedId){
      stdArr[i].fname = UpdateObj.fname;
      stdArr[i].lname = UpdateObj.lname;
      stdArr[i].email = UpdateObj.email;
      stdArr[i].contact = UpdateObj.contact;
      break;
    }
  }
  localStorage.setItem("stdData", JSON.stringify(stdArr));
  //trTempleting(stdArr)
  let tr =[... document.getElementById(UpdatedId).children];
  tr[1].innerHTML=UpdateObj.fname;
  tr[2].innerHTML=UpdateObj.lname;
  tr[3].innerHTML=UpdateObj.email;
  tr[4].innerHTML=UpdateObj.contact;
//   cl(tr)
//  cl( tr.children)

Swal.fire({
  icon: 'success',
  title: `student ${UpdateObj.fname}'s record is updated successfully!!`,
  timer: 3000
})

  stdForm.reset()
  stdUpdateBtn.classList.add("d-none");
  stdSubmitBtn.classList.remove("d-none")
  
}

stdForm.addEventListener("submit", OnstdAdd)
stdUpdateBtn.addEventListener("click", onStdInfoUpdate)