document.write("<script type='text/javascript' src='js/FileSaver.js-master/src/FileSaver.js'></script>"); 

function upload(){

    document.getElementById("previous-btn").disabled=false;
    document.getElementById("next-btn").disabled=false;

    let reads = new FileReader();
    file = document.getElementById('upload_files').files[0];
    reads.readAsText(file, 'utf-8');
    console.log(reads);
    reads.onload = function (e) {
        console.log(e);
        // document.getElementById('result').innerText = this.result
        data = e.target.result;
        lines = data.split("\n");
        id = 0;
        for (var i=0; i<lines.length - 2; i++){
            line = lines[i].split("\t");
            tag_value = parseInt(line[3]);
            if (isNaN(tag_value)){
                break;
            }
            id = id + 1;
        };
        line = lines[id].split("\t");
        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response').innerText = line[2];
        document.getElementById('lines_id').value = id;
        data = data.replace(/\n/g, "&");
        document.getElementById('data').value = data;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

        if((id - 1) == -1){
            document.getElementById("previous-btn").disabled=true;
        }
        if((id + 1) == (lines.length - 1)){
            document.getElementById("next-btn").disabled=true;
        }

        document.getElementById("submit-btn").disabled=true;
    };
}

function score(score_value){

    document.getElementById("previous-btn").disabled=false;
    document.getElementById("next-btn").disabled=false;

    var data = document.getElementById('data').value;
    var lines = data.split("&");
    var id = parseInt(document.getElementById('lines_id').value);
    var values = lines[id].split("\t");

    var context = values[0].replace("&", "").replace("\t", "");
    var post = values[1].replace("&", "").replace("\t", "");
    var response = values[2].replace("&", "").replace("\t", "");

    lines[id] = context + "\t" + post + "\t" + response + "\t" + score_value.toString();

    var new_data = ""
    for (var i=0; i<lines.length - 1; i++){
        new_line = lines[i].replace(new RegExp("&", "gm"), "");
        new_data = new_data + new_line + "&";
    };
    last_index = lines.length - 1
    new_line = lines[last_index].replace(new RegExp("&", "gm"), "");
    new_data = new_data + new_line;
    document.getElementById('data').value = new_data;

    if((id + 1) < (lines.length - 1)){
        id = id + 1;
        var current_value = lines[id].toString();
        var line = current_value.split("\t");
        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response').innerText = line[2];
        document.getElementById('lines_id').value = id;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();
    }
    else{
        alert("Finish, thank you!");
    }

    if((id - 1) == -1){
        document.getElementById("previous-btn").disabled=true;
    }
    if((id + 1) == (lines.length - 1)){
        document.getElementById("next-btn").disabled=true;
    }
}


function score2(score_value, pos){

    document.getElementById("previous-btn").disabled=false;
    document.getElementById("next-btn").disabled=false;

    var info_btn_list = new Array();
    info_btn_list[0] = document.getElementById("inform-btn-0");
    info_btn_list[1] = document.getElementById("inform-btn-1");
    info_btn_list[2] = document.getElementById("inform-btn-2");
    info_btn_list[3] = document.getElementById("inform-btn-3");

    var appro_btn_list = new Array();
    appro_btn_list[0] = document.getElementById("appro-btn-0");
    appro_btn_list[1] = document.getElementById("appro-btn-1");
    appro_btn_list[2] = document.getElementById("appro-btn-2");
    appro_btn_list[3] = document.getElementById("appro-btn-3");


    var data = document.getElementById('data').value;
    var lines = data.split("&");
    var id = parseInt(document.getElementById('lines_id').value);
    var values = lines[id].split("\t");

    var context = values[0].replace("&", "").replace("\t", "");
    var post = values[1].replace("&", "").replace("\t", "");
    var response = values[2].replace("&", "").replace("\t", "");
    var score1 = values[3].replace("&", "").replace("\t", "");
    var score2 = values[4].replace("&", "").replace("\t", "");

    if(pos == 0){
        score1 = score_value.toString();

        for (i = 0; i < 4; i++) { 
            info_btn_list[i].classList.add("btn-info");
            info_btn_list[i].classList.remove("btn-warning");
        }
        info_btn_list[parseInt(score1) + 1].classList.add("btn-warning");
    }
    else{
        score2 = score_value.toString();

        for (i = 0; i < 4; i++) { 
            appro_btn_list[i].classList.add("btn-info");
            appro_btn_list[i].classList.remove("btn-warning");
        }
        appro_btn_list[parseInt(score2) + 1].classList.add("btn-warning");
    }

    lines[id] = context + "\t" + post + "\t" + response + "\t" + score1 + "\t" + score2;

    var new_data = ""
    for (var i=0; i<lines.length - 1; i++){
        new_line = lines[i].replace(new RegExp("&", "gm"), "");
        new_data = new_data + new_line + "&";
    };
    last_index = lines.length - 1
    new_line = lines[last_index].replace(new RegExp("&", "gm"), "");
    new_data = new_data + new_line;
    document.getElementById('data').value = new_data;

    if(score1 != "" & score2 != ""){
        if((id + 1) < (lines.length - 1)){
            id = id + 1;
            var current_value = lines[id].toString();
            var line = current_value.split("\t");
            document.getElementById('context').innerText = line[0];
            document.getElementById('post').innerText = line[1];
            document.getElementById('response').innerText = line[2];
            document.getElementById('lines_id').value = id;
            document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

            for (i = 0; i < 4; i++) { 
                info_btn_list[i].classList.add("btn-info");
                info_btn_list[i].classList.remove("btn-warning");
                appro_btn_list[i].classList.add("btn-info");
                appro_btn_list[i].classList.remove("btn-warning");
            }
        }
        else{
            alert("Finish, thank you!");
        }

    }
    if((id - 1) == -1){
        document.getElementById("previous-btn").disabled=true;
    }
    if((id + 1) == (lines.length - 1)){
        document.getElementById("next-btn").disabled=true;
    }
}

function save(){
    var file_name = prompt("Filename:", ".csv");
    var data = document.getElementById('data').value;
    var lines = data.split("&");
    var tag_result = new Array();
    for (var i=0; i<lines.length - 1; i++){
        lines[i] = lines[i].replace(new RegExp("&", "gm"), "");
        tag_result.push(lines[i] + "\n");
    };
    last_index = lines.length - 1
    lines[last_index] = lines[i].replace(new RegExp("&", "gm"), "");
    tag_result.push(lines[last_index]);
    var new_file = new File(tag_result, file_name, { type: "text/plain;charset=utf-8" });
    saveAs(new_file);
}

function next(){
    var id = parseInt(document.getElementById('lines_id').value);
    if((id + 1) < (lines.length - 1)){
        document.getElementById("previous-btn").disabled=false;
        id = id + 1;
        var current_value = lines[id].toString();
        var line = current_value.split("\t");
        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response').innerText = line[2];
        document.getElementById('lines_id').value = id;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

        if((id + 1) == (lines.length - 1)){
            document.getElementById("next-btn").disabled=true;
        }

    }
    else{
        alert("The last");
    }
}

function previous(){
    var id = parseInt(document.getElementById('lines_id').value);
    if((id - 1) > -1){
        document.getElementById("next-btn").disabled=false;
        id = id - 1;
        var current_value = lines[id].toString();
        var line = current_value.split("\t");
        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response').innerText = line[2];
        document.getElementById('lines_id').value = id;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

        if((id - 1) == -1){
            document.getElementById("previous-btn").disabled=true;
        }

    }
    else{
        alert("The last");
    }
}