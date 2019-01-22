var header = $("meta[name='_csrf_header']").attr("content");
var token = $("meta[name='_csrf']").attr("content");

$(document).ready(function () {
    console.log("AAAA8888")
    findDataMail();
    findBySender();
    $('#txt-modal-calendar').daterangepicker()


    $('#add-responsible').on('click',function () {

        var countries = ["Chitsanu","Yotsaporn"];
        autocomplete(document.getElementById("add-responsible"), countries);

    })
    $('#btn-add').on('click',function () {
        $('#content').empty();
        $('#content').val("");
    })

    $('#btn-Edit-modal').on('click', function () {
        console.log("***************")

        var id = $('#edit-id').text();
        console.log("-->"+id);

        var json = JSON.parse(findSender());
        var indexjson = 0;
        for(var i=0;i<json.length;i++){
            if(parseInt(json[i].id) == parseInt(id)){indexjson=i;}
        }
        console.log(json[indexjson]);

        $('#edit2-id').html(json[indexjson].id);
        $('#edit2-sender').val(json[indexjson].sender);
        $('#edit2-subject').val(json[indexjson].subject);
        $('#edit2-email').val(json[indexjson].email);
        $('#edit2-type').val(json[indexjson].type);
        $('#edit2-status').val(json[indexjson].status);
        $('#edit2-level').val(json[indexjson].level);
        $('#edit2-responsible').val(json[indexjson].responsible);
        $('#edit2-content').val(json[indexjson].msg);

    })
    /*$('#edit-btn2').on('click', function () {
        console.log("******")
        update();
        $('#modal-alert-update').modal('show');

        setTimeout(function() {
            $('#modal-alert-update').modal('hide');
        }, 2000);

    })*/

    $('#add-btn-save').on('click',function () {
        insert();
    })
    $('#modal-btn-del').on('click',function () {
        deleteID();
    })
    $('#btn-search').on('click',function () {
        $('#modal-alert-loading').modal('show');
        setTimeout(function () {
            findNewDataMail();
        },1000)

    })
    $('#modal-find').on('click',function () {
        console.log("btn");
           // editSearchCustom();
            //findBySenderAndType();
    })
    $('input[name="dates"]').daterangepicker();

    $('#dateFlatPicker').flatpickr({
        dateFormat: "d/m/Y"
    });
    $('#btn-select').on('click',function () {
        selectSearch();
        findBySenderAndType();
        findSenderAndType();
    })
    $('#btn-modal-calendar').on('click',function () {
        insertCalendar();
    })

});
//===============================================================

function findBySenderAndType() {
 var x;
    if(($('#ch-line').is(':checked'))&&$('#ch-email').is(':checked')){
        console.log("email and line checked");
        x="";
    }
    else if($('#ch-line').is(':checked')){
        console.log("line checked");
        x="LINE";
    }else if($('#ch-email').is(':checked')){
        console.log("email checked");
        x="email";
    }

    let json = $.ajax({
        url: session.context + "/appUsers/findBySenderAndType",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {
            sender: $("#btn-select option:selected").val(),
            type: x
        },
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    console.log(json)
    return json;
}
function customSearch() {
    var sender = $('#search-sender').val();
    var subject= $('#search-subject').val();
    var email = $('#search-email').val();
    var respon = $('#search-responsible').val();
    var msg = $('#search-content').val();
    var status = $('#search-status').val();
    var level = $('#search-level').val();
    var type = $('#search-type').val();

    console.log(sender);
    console.log(subject);
    console.log(email);
    console.log(respon);
    console.log(msg);
    console.log(status);
    console.log(level);
    console.log(type);

    console.log("function custom Search");
    let json = $.ajax({
        url: session.context + "/appUsers/findByAll",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {
            sender: $('#search-sender').val(),
             subject: $('#search-subject').val(),
             email: $('#search-email').val(),
             responsible: $('#search-responsible').val(),
                msg: $('#search-content').val(),
             status: $('#search-status').val(),
             level: $('#search-level').val(),
             type: $('#search-type').val()
        },
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    console.log(json)
    return json;
}
//===============================================================
function nn() {
    let json = $.ajax({
        url: session.context + "/appUsers/findBySender",
        contentType: "application/json;charset=UTF-8",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        //data: {firstName: $('#inputsearch').val()},
        data: {sender: $('#inputsearch').val()},
        async: false
    }).done(function () {
    }).responseText;
    console.log(json);
    //json = JSON.parse(json);
    json = JSON.parse(json);
    console.log(json);
    $('#tbody').empty();
    if (json.length > 0) {
        for (let x of json) {
            $('#tbody').append('' +
                '<tr>' +
                '<td class="text-center">' + x.id + '</td>' +
                '<td> ' + x.sender + '</td>' +
                '<td> ' + x.send_To + '</td>' +
                '<td> ' + x.subject + '</td>' +
                '<td> ' + x.email + '</td>' +
                '<td> ' + x.sentDate + '</td>' +
                '<td> ' + x.level + '</td>' +
                '<td> ' + x.status + '</td>' +
                '<td> ' + x.type + '</td>' +
                '<td class="text-center">' + x.deseription + '</td>' +
                '<td class="text-center"><button type="button" class="btn btn-outline-success" name="editButton" data-toggle="modal" data-target="#exampleModal" value="' + x.id + " " + x.sender + " " + x.send_To + " " + x.subject + " " + x.email + " " + x.sentDate + " " + x.level + " " + x.status + " " + type +" " +'">Edit</button>' + " " +
                '<button type="button" class="btn btn-outline-dark" name="deleteButton" data-toggle="modal" data-target="#exampleModal2" value="' + x.id + '" >Delete</button>' +
                '</td>' +
                '</tr>');
        }
        $('button[name="deleteButton"]').click(function () {
            $('button[name="delc"]').val($(this).val()).on('click', function () {
                deleDataToTable($(this).val());
                loadDataToTable();
            })
        })
        $('button[name="editButton"]').on('click', function () {
            let value = ($(this).val());
            value = value.split(" ");
            $('#addfirst').val(value[1]);
            $('#addlast').val(value[2]);
            $('#adddescription').val(value[3]);

            $('#edit-btn2').val(value[0]).on('click', function () {
                editDataToTable($(this).val());
                loadDataToTable();
            })
        })
    } else {
        $('#tbody').append('<tr><td style="text-align: center;" colspan="5">No data.</td></tr>');
    }
}


//**************************************************************************
function editSearchCustom() {
    console.log("function");
    json = JSON.parse(customSearch());
    console.log(json);

    $('#tbody1').empty();
    if (json.length > 0) {
        let x;
        for (x of json) {
            console.log("x " + x);
            console.log("json length " + json.length);
            $('#tbody1').append('' +
                '<tr data-idd="'+x.id+ '">' +
                '<td>' + x.id + '</td>' +
                '<td>' + x.sender + '</td>' +
                '<td>' + x.subject + '</td>' +
                '<td>' + x.email + '</td>' +
                '<td>' + x.responsible + '</td>' +
                '<td>' + x.sentDate + '</td>' +
                '<td>' + x.level + '</td>' +
                '<td>' + x.status + '</td>' +
                '<td>' + x.type + '</td>' +
                '<td class="text-center"> <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-edit" onclick="modalEdit('+x.id+')">edit</button>' +
                ' <button type="button" class="btn btn-danger btn-sm" data-toggle="modal"  data-target="#modal-del" onclick="modalDel('+x.id+')">del</button> </td>' +
                '</tr>');
        }
    } else {
        $('#tbody1').append('<tr><td style="text-align: center;" colspan="10">No data.</td></tr>');
    }

}


function downloadFile(filename) {

    console.log(filename);
    location.href= session.context+'/appUsers/download?filename='+filename;
}
function downloadFile1(filename) {

    console.log(filename);
    location.href= session.context+'/appUsers/download1?filename='+filename;
}
function insertCalendar() {
    var data;
    data = $('#txt-modal-calendar').val();
    console.log(data)
    $('#searchValue').val(data)
}
function selectSearch() {
    console.log("pang")

    console.log($("#btn-select option:selected").text())
    if($("#btn-select option:selected" ).text()=="date") {
        $('#modal-calendar').modal();
    }
    else if($("#btn-select option:selected" ).text()=="sender"){

    } else{
        $('input[name="searchValue"]').val("");

    }
}
function modalDel(id) {
    var json = JSON.parse(selectFind());
    var indexjson = 0;
    for(var i=0;i<json.length;i++){
        if(parseInt(json[i].id) == parseInt(id)){indexjson=i;}
    }
    console.log(json[indexjson]);

    $('#del-id').text(json[indexjson].id);
    $('#del-sender').text(json[indexjson].sender);
    $('#del-subject').text(json[indexjson].subject);
    $('#del-email').text(json[indexjson].email);
    $('#del-type').text(json[indexjson].type);
    $('#del-status').text(json[indexjson].status);
    $('#del-date').text(json[indexjson].sentDate);
    $('#del-responsible').text(json[indexjson].msg);

}
function modalEdit(id) {
    var json = JSON.parse(selectFind());

    var x = id;

    var indexjson = 0;
    for(var i=0;i<json.length;i++){
        if(parseInt(json[i].id) == parseInt(id)){indexjson=i;}
    }
    console.log(json[indexjson]);

    $('#edit-sender').text(json[indexjson].sender);
    $('#edit-id').text(json[indexjson].id);
    $('#edit-subject').text(json[indexjson].subject);
    $('#edit-email').text(json[indexjson].email);
    $('#edit-BCC').text(json[indexjson].bcc);
    $('#edit-CC').text(json[indexjson].cc);
    $('#edit-date').text(json[indexjson].sentDate);
    $('#edit-content').text(json[indexjson].msg);
    $('#edit-attachments').empty();
    var filenameAll = json[indexjson].attachments;
    var idline = json[indexjson].idline;
    var type = json[indexjson].type;

        try {
            filenameAll = filenameAll.split(", ");

            $('#edit-attachments').empty();
            let count;
            for (count=0;count<filenameAll.length;count++){
                console.log(filenameAll[count]);
                filenameAll[count];
                $('#edit-attachments').append(
                    '' + '<label style="text-decoration: underline" onclick="downloadFile(\'' + filenameAll[count] + '\')">' + filenameAll[count] + '</label>'
                );
            }
        }catch (e) {

        }


}
function findSender() {
    let json = $.ajax({
        url: session.context + "/appUsers/findBySender",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {sender: $('#searchValue').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    return json;
}
function findSuject() {
    let json = $.ajax({
        url: session.context + "/appUsers/findBySubject",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {subject: $('#searchValue').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    return json;
}
function findEmail() {
    let json = $.ajax({
        url: session.context + "/appUsers/findByEmail",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {email: $('#searchValue').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    return json;
}
function findResponsible() {
    let json = $.ajax({
        url: session.context + "/appUsers/findByResponsible",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {responsible: $('#searchValue').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    return json;
}
function findContent() {
    let json = $.ajax({
        url: session.context + "/appUsers/findByContent",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {content: $('#searchValue').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    return json;
}
function canlenderPicker() {
    $('#calenderPicker').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M/DD hh:mm A'
        }
    });
}
function selectFind() {
    var jsonData;
    if($("#btn-select option:selected" ).text()=="date") {

    }
    else if($("#btn-select option:selected" ).text()=="sender"){
        jsonData = findSender();
    }
    else if($("#btn-select option:selected" ).text()=="subject"){
        jsonData = findSuject();
    }
    else if($("#btn-select option:selected" ).text()=="e-mail"){
        jsonData = findEmail();
    }
    else if($("#btn-select option:selected" ).text()=="responsible"){
        jsonData = findResponsible();
    }
    //edit--------------------------------------------------------
    else if($("#btn-select option:selected" ).text()=="content"){
        jsonData = findContent();
    }
    //edit--------------------------------------------------------
    return jsonData;
}
function findBySender() {
    console.log("find By Sender");
    var jsonData;
    if($("#btn-select option:selected" ).text()=="date") {

    }
    else if($("#btn-select option:selected" ).text()=="sender"){
        jsonData = findSender();
    }
    else if($("#btn-select option:selected" ).text()=="subject"){
        jsonData = findSuject();
    }
    else if($("#btn-select option:selected" ).text()=="e-mail"){
        jsonData = findEmail();
    }
    else if($("#btn-select option:selected" ).text()=="responsible"){
        jsonData = findResponsible();
    }
    //edit--------------------------------------------------------
    else if($("#btn-select option:selected" ).text()=="content"){
        jsonData = findContent();
    }

    //edit--------------------------------------------------------

    //ลบ refresh

    json = JSON.parse(jsonData);
    console.log(json);

    $('#tbody1').empty();
    if (json.length > 0) {
        let x;
        for (x of json) {
            console.log("x " + x);
            console.log("json length " + json.length);
            $('#tbody1').append('' +
                '<tr data-idd="'+x.id+ '">' +
                '<td>' + x.id + '</td>' +
                '<td>' + x.sender + '</td>' +
                '<td>' + x.subject + '</td>' +
                '<td>' + x.email + '</td>' +
                '<td>' + x.responsible + '</td>' +
                '<td>' + x.sentDate + '</td>' +
                '<td>' + x.level + '</td>' +
                '<td>' + x.status + '</td>' +
                '<td>' + x.type + '</td>' +
                '<td class="text-center"> <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-edit" onclick="modalEdit('+x.id+')">edit</button>' +
                ' <button type="button" class="btn btn-danger btn-sm" data-toggle="modal"  data-target="#modal-del" onclick="modalDel('+x.id+')">del</button> </td>' +
                '</tr>');
        }
    } else {
        $('#tbody1').append('<tr><td style="text-align: center;" colspan="10">No data.</td></tr>');
    }


}

function deleteID() {
    console.log("Delete");
    let id=$('#del-id').html();

    $.ajax({
        url: session.context + "/appUsers/del/"+id,
        contentType : "application/json",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "DELETE",
        beforeSend: function(xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + ": " + thrownError);
        },
        async: false
    })
    console.log("Delete id :" + id +" success");
}

function update() {
    console.log("Update")
    let id=$('#edit2-id').html();
    var jsonData = {
        sender: $('#edit2-sender').val(),
        subject: $('#edit2-subject').val(),
        email: $('#edit2-email').val(),
        responsible: $('#edit2-responsible').val(),
        sentDate: $('#edit-date').html(),
        msg: $('#edit2-content').val(),
        cc: $('#edit-CC').html(),
        bcc: $('#edit-BCC').html(),
        level: $('#edit2-level').val(),
        status: $('#edit2-status').val(),
        type: $('#edit2-type').val(),
    }
    console.log(jsonData);

    $.ajax({
        url: session.context + "/appUsers/update/"+id,
        contentType : "application/json",
        headers: {Accept: "application/json"},
        type: "PUT",
        data:JSON.stringify(jsonData),
        beforeSend: function(xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + ": " + thrownError);
        },
        async: false
    })
}
function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1  + '%';
            if (width==30){
                findNewDataMail();
            }else if (width==100){
                //location.reload();
            }
        }
    }
    var elem = document.getElementById("myBar");
}
function findNewDataMail() {


    let json = $.ajax({
        url: session.context + "/appUsers/findNewDataMail",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {sender: $('#searchValue').val()},
        async: false,
        complete:function (xhr) {
            $('#modal-alert-update').modal('hide');
            console.log("complete")
        }
    }).done(function () {
        console.log('done')

        $('#modal-alert-loading').modal('hide');
    }).responseText;
    json = JSON.parse(json);
    console.log(json);
    $('#tbody1').empty();
    if (json.length > 0) {
        let x;
        for (x of json) {
            console.log("x " + x);
            console.log("json length " + json.length);
            $('#tbody1').append('' +
                '<tr>' +
                '<td>' + x.id + '</td>' +
                '<td>' + x.sender + '</td>' +
                '<td>' + x.subject + '</td>' +
                '<td>' + x.email + '</td>' +
                '<td>' + x.responsible + '</td>' +
                '<td>' + x.sentDate + '</td>' +
                '<td>' + x.level + '</td>' +
                '<td>' + x.status + '</td>' +
                '<td>' + x.type + '</td>' +
                '<td class="text-center"> <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-edit"  onclick="modalEdit('+x.id+')" >edit</button>' +
                '            <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" onclick="modalDel('+x.id+')" data-target="#modal-del" >del</button> </td>' +
                '</tr>');
        }
    } else {
        $('#tbody1').append('<tr><td style="text-align: center;" colspan="10">No data.</td></tr>');
    }

    findBySender();

}
function btnEdit(){

}
function insert() {
    var dateNow = new Date();

    var weekday = new Array(7);
    weekday[0] =  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jue";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var sender;
    var subject;
    var email;
    var responsible;
    var sentDate = weekday[dateNow.getDay()]+" "+month[dateNow.getMonth()]+" "+dateNow.getDate()+" "+dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds()+" "+"ICT"+" "+dateNow.getFullYear();
    var status = $('#add-status').val();
    var type = $('#add-type').val();
    var level = $('#add-level').val();
    var msg = $('#add-content').val();
    var cc;
    var bcc;

    if($('#add-sender').val()==''){
        sender="--";
    }else{sender = $('#add-sender').val();}

    if($('#add-subject').val()==''){
        subject="--";
    }else{subject = $('#add-subject').val();}

    if($('#add-email').val()==''){
        email="--";
    }else{email = $('#add-email').val();}

    if($('#add-responsible').val()==''){
        responsible="----";
    }else{responsible = $('#add-responsible').val();}



    var jsonData = {sender,subject,email,responsible,sentDate,status,type,level,msg}

    $.ajax({
        url: session.context + "/appUsers/insert",
        contentType: "application/json",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "POST",
        data: JSON.stringify(jsonData),
        beforeSend: function(xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + ": " + thrownError);
        },
        async: false
    })
    console.log("insert complete")
}
function findDataMail() {
    let json = $.ajax({
        url: session.context + "/appUsers/findDataMail",
        headers: {Accept: "application/json;charset=UTF-8"},
        type: "GET",
        data: {sender: $('#searchValue').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    json = JSON.parse(json);
    console.log(json);
    $('#tbody1').empty();
    if (json.length > 0) {
        let x;
        for (x of json) {
            console.log("x " + x);
            console.log("json length " + json.length);
            $('#tbody1').append('' +
                '<tr>' +
                '<td>' + x.id + '</td>' +
                '<td>' + x.sender + '</td>' +
                '<td>' + x.subject + '</td>' +
                '<td>' + x.email + '</td>' +
                '<td>' + x.responsible + '</td>' +
                '<td>' + x.sentDate + '</td>' +
                '<td>' + x.level + '</td>' +
                '<td>' + x.status + '</td>' +
                '<td>' + x.type + '</td>' +
                '<td class="text-center"> <button type="button" class="btn btn-primary btn-sm" data-toggle="modal"  data-target="#modal-edit" onclick="modalEdit('+x.id+')" >edit</button>' +
                '            <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-del" onclick="modalDel('+x.id+')">del</button> </td>' +
                '</tr>');
        }
    } else {
        $('#tbody1').append('<tr><td style="text-align: center;" colspan="10">No data.</td></tr>');
    }

}

function loadDataToTable() {

    let json = $.ajax({
        url: session.context + "/appUsers/findByFirstName",
        headers: {Accept: "application/json"},
        type: "GET",
        data: {firstName: $('#inputSearchFirstName').val()},
        async: false
    }).done(function () {
        console.log('done')
    }).responseText;
    json = JSON.parse(json);
    console.log(json);
    $('#tbody').empty();
    if (json.length > 0) {
        for (let x of json) {
            console.log(x);
            $('#tbody').append('' +
                '<tr>' +
                '<td>' + x.id + '</td>' +
                '<td>' + x.firstName + '</td>' +
                '<td>' + x.lastName + '</td>' +
                '<td>' + x.description + '</td>' +
                '</tr>');
        }
    } else {
        $('#tbody').append('<tr><td style="text-align: center;" colspan="4">No data.</td></tr>');
    }

}
function findSenderAndType() {
    json = JSON.parse(findBySenderAndType());
    console.log(json);
    $('#tbody1').empty();
    if (json.length > 0) {
        let x;
        for (x of json) {
            console.log("x " + x);
            console.log("json length " + json.length);
            $('#tbody1').append('' +
                '<tr>' +
                '<td>' + x.id + '</td>' +
                '<td>' + x.sender + '</td>' +
                '<td>' + x.subject + '</td>' +
                '<td>' + x.email + '</td>' +
                '<td>' + x.responsible + '</td>' +
                '<td>' + x.sentDate + '</td>' +
                '<td>' + x.level + '</td>' +
                '<td>' + x.status + '</td>' +
                '<td>' + x.type + '</td>' +
                '<td class="text-center"> <button type="button" class="btn btn-primary btn-sm" data-toggle="modal"  data-target="#modal-edit" onclick="modalEdit('+x.id+')" >edit</button>' +
                '            <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-del" onclick="modalDel('+x.id+')">del</button> </td>' +
                '</tr>');
        }
    } else {
        $('#tbody1').append('<tr><td style="text-align: center;" colspan="10">No data.</td></tr>');
    }

}
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

}

