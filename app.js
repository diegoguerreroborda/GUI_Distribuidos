var file = "";

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

  function uploadImage(){
    const defaultBtn = document.getElementById("default-btn");
    const customBtn = document.getElementById("custom-btn");
    defaultBtn.click();
    defaultBtn.addEventListener("change", function(){
        file = this.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(){
                const result = reader.result;
                img.src = result;
                }
                reader.readAsDataURL(file);
            }
        });
  }

  //app3.seen = false

  var app4 = new Vue({
    el: '#app-2',
    data: {
        servers: []
    }
  })

function sendData(){
 var url = 'http://localhost:3050/send_image';
  var data = {image: document.getElementById("input_message").value};
  console.log(file)
  fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': file.type
    },
    body: file
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
  //loadDoc();


}

function sendData2(){
  console.log(file)
  axios({
    method: 'post',
    url: 'http://localhost:3050/send_image',
    data: {
      firstName: file.type
    }
  });
}


function loadDoc() {
  fetch('http://localhost:3050/received_image')
  .then(response => response.text())
  .then( 
      data => {
          //console.log(data)
          console.log(data)
          //window.location.href = 'data:application/octet-stream;base64,' + data;
          /*
          var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + data; //Image Base64 Goes here
          a.href = a.toDataURL("./image")
          a.download = "image.png"; //File name Here
          a.click(); //Downloaded file
          file = "data:image/png;base64," + data;
          */
         let img = document.getElementById("img-main2");
          img.src = "data:image/png;base64," + data;
          /*
          if(file){
            const reader = new FileReader();
            reader.onload = function(){
                const result = reader.result;
                img.src = result;
                }
                reader.readAsDataURL(file);
            }
            */
          //app.message = `Hola ${data}`
          //document.getElementById("btnGet").innerHTML = data;
      }
  );
}

function checkServers(){
  fetch('http://localhost:3050/info_servers')
  .then(response => response.json())
  .then( 
      data => {
        app4.servers = []
        for(let i=0; i < data.length; i++){
          app4.servers.push({path: data[i]["path"], alive: data[i]["alive"]})
        }
      }
  );
}

function sendEmail(){
  fetch('http://localhost:3050/send_email')
  .then(response => response.text())
  .then( 
      data => {
          console.log(data)
      }
  );
}
