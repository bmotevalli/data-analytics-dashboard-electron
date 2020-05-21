var fileselect = $id("fileselect"),
    filedrag = $id("filedrag"),
    submitbutton = $id("submitbutton"),
    dataHolder = $id("data-holder"),
    dataLoadView = $id("data-load-view");


function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }  
        result.push(obj);  
    }

    console.log(result)
  
    //return result; //JavaScript object
    return result // JSON.stringify(result); //JSON
}

// getElementById
function $id(id) {
	return document.getElementById(id);
}

//
// output information
function Output(msg) {
	var m = $id("messages");
	m.innerHTML = msg; // + m.innerHTML;
}

// call initialization file
if (window.File && window.FileList && window.FileReader) {
	Init();
}

//
// initialize
function Init() {

	// file select
    fileselect.addEventListener("change", FileSelectHandler, false);
    dataHolder.addEventListener('DOMSubtreeModified', DataLoadHandler);

	// is XHR2 available?
	var xhr = new XMLHttpRequest();
	if (xhr.upload) {
	
		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
		filedrag.style.display = "block";
		
		// remove submit button
		submitbutton.style.display = "none";
	}

}

// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
        ParseFile(f);
        ReadFile(f);
	}

}

function ParseFile(file) {

	Output(
		"<p><strong>" + file.name +
		"</strong> (type: <strong>" + file.type +
		"</strong> size: <strong>" + (parseFloat(file.size) / 1000).toString() +
		"</strong> kb)</p>"
	);
	
}

function ReadFile(file) {
    var dataHolder = $id("data-holder");
    var fileMeta = "<p>File information: <strong>" + file.name +
    "</strong> type: <strong>" + file.type +
    "</strong> size: <strong>" + (parseFloat(file.size) / 1000).toString() +
    "</strong> kb</p>";
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        dataHolder.innerText = JSON.stringify({
            "content": csvJSON(event.target.result),
            "meta": fileMeta
        });
      });
    reader.readAsText(file);
}

function createDataLoadView() {
    var json_cont = JSON.parse(dataHolder.innerText)
    var data      = json_cont["content"];
    var cols      = Object.keys(data[0]);

    var tblContent = `<thead class="thead-dark">`
    tblContent += "<thead>"
    for (var j=0; j < cols.length; j++){ 
        tblContent += `<th scope="col">${[cols[j]]}</th>`;
    }
    tblContent += "</thead>"
    
    tblContent += "<tbody>"
    for (var i=0, size=data.length; i<size; i++){
        tblContent += '<tr>';
        for (var j=0; j < cols.length; j++){ 
            tblContent += `<td>${data[i][cols[j]]}</td>`;
        }
        tblContent += '</tr>'
    }
    tblContent += "</tbody>"
    $('#data-load-view').html(tblContent); 
}

function DataLoadHandler(e) {
    // console.log(e.target.innerText)
    // var data = JSON.parse(e.target.innerText);
    createDataLoadView();    
}



