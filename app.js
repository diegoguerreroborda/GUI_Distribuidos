var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

  function uploadImage(){
    const defaultBtn = document.getElementById("default-btn");
    const customBtn = document.getElementById("custom-btn");
    const img = document.getElementById("img-main");
    defaultBtn.click();
    defaultBtn.addEventListener("change", function(){
        const file = this.files[0];
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
  var data = {username: document.getElementById("input_message").value};
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data.username), // data can be `string` or {object}!
    headers:{
      'Content-Type': document.getElementById("input_message").value
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
  //loadDoc();
}


function loadDoc() {
  fetch('http://localhost:3050/received_image')
  .then(response => response.text())
  .then( 
      data => {
          console.log(data)
          app.message = `Hola ${data}`
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