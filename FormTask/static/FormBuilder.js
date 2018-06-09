

var result = init_form_json();
var fieldsCounter = 1;
var field_value = '';

//creating json sturcture
function init_form_json(){
    var form = new Object();
    var fields = [];
    var formPackage = new Object();
    formPackage.form_name = "";
    formPackage.fields = fields

    return formPackage;

}

$('#addField').click( function(){
    //extract the input from the fields
    var id = fieldsCounter;
    var lable = $("#field_lable").val();
    var name = $('#field_name').val();
    var type = $('#field_type').val();

    if(validate_fields(lable, name)){
        var field = Object();
        init_field_info(field,id,lable,name,type);
        fieldsCounter = fieldsCounter +1;
        show_field(field,fieldsCounter);
        $('input[class = form-control').val("") //refresh the input fields
    }
    else{
        alert("All fields are required!")
    }
});


function init_field_info(field,id,lable,name,type){
    field.id = id;
    field.lable = lable;
    field.name = name;
    field.type = type;
    result['fields'].push(field);
}

//display the created field on screen
function show_field(field,fieldsCounter){
    field_value = "<td>"+(fieldsCounter-1)+"</td><td>"+ field.lable +" </td><td>"+ field.name +"</td><td>"+ field.type + "</td>";
    $('.fields').append("<tr>"+ field_value +"</tr>");
}

$('#save_btn').click( function(){
    var form_name  = $('#Form_name').val();
    if(validate_formName(form_name)){
        result['form_name'] = form_name;
        var FormStr = JSON.stringify(result);
        postData('/formBuilder', FormStr);
        window.location.href='/formList';
    }
    else{ alert("Please Enter Form Name"); }
});

$('#back_btn').click( function(){
    window.location.href='/formList';
});

function validate_fields(lable, name) {
  if(lable == '' || name == ''){
    return false;
    }
  return true;
}

function validate_formName(name){
    if(name == ''){
        return false;
    }
    return true;
}


function postData(url, data) {
  console.log(url);
  return fetch(url, {
	method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },

      body: data // must match 'Content-Type' header
  })
  .then(response => response.json()) // parses response to JSON
  .then(data => console.log(data))
  .catch(error => console.error(error));
}