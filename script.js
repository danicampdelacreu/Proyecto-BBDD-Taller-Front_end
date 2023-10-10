// metodo GET para ver cliente por dni
document.getElementById('see-btn-cliente').addEventListener('click', () => { // creamos un addEventListener de tipo click para recoger lo que tenemos dentro del botton see-btn-cliente
    const dni = document.getElementById('add-dni').value;// de add-dni cogemos valor de lo que usuario ha escrito
  
    fetch(`http://localhost:3000/clientes/${dni}`, { // peticion fetch a url metodo get(ver)
      method: 'GET', 
    })
      .then(response => response.json()) // enviamos peticion con el 1r then
      .then(data => { // ejecutamos la peticion en el 2ndo then

        if(data.error){
          alert('Entra Dni para buscar Cliente') // si nos da error al pedir datos  que diga entrar dni para 
        } else {
        
        const clienteContainer = document.getElementById('cliente-pantalla');// elemento donde se mostrará la información del cliente
  
        clienteContainer.innerHTML = ''; // Limpiar el contenido existente
  
        // Crear elementos para mostrar los datos del cliente
        const datosCliente = document.createElement('h3');
        datosCliente.textContent = `CLIENTE`;

        const dniElement = document.createElement('p');
        dniElement.textContent = `DNI: ${data.dni}`;
  
        const nombreElement = document.createElement('p');
        nombreElement.textContent = `Nombre: ${data.nombre}`;
  
        const apellidosElement = document.createElement('p');
        apellidosElement.textContent = `Apellidos: ${data.apellidos}`;
  
        const matriculaElement = document.createElement('p');
        matriculaElement.textContent = `Matrícula: ${data.matricula}`;
  
        const modeloElement = document.createElement('p');
        modeloElement.textContent = `Modelo: ${data.modelo}`;
  
        const motorElement = document.createElement('p');
        motorElement.textContent = `Motor: ${data.motor}`;
  
        // Agregar los elementos al contenedor
        clienteContainer.appendChild(datosCliente);
        clienteContainer.appendChild(dniElement);
        clienteContainer.appendChild(nombreElement);
        clienteContainer.appendChild(apellidosElement);
        clienteContainer.appendChild(matriculaElement);
        clienteContainer.appendChild(modeloElement);
        clienteContainer.appendChild(motorElement);
        }
      })
     
  });

// metodo POST para crear cliente nuevo por Body
document.getElementById('addbtn').addEventListener('click', () => {
    const dni = document.getElementById('add-dni').value;
    const nombre = document.getElementById('add-nombre').value;
    const apellidos = document.getElementById('add-apellidos').value;
    const matricula = document.getElementById('add-matricula').value;
    const modelo = document.getElementById('add-modelo').value;
    const motor = document.getElementById('add-motor').value;
  
    const newCliente = {
      dni: dni,
      nombre: nombre,
      apellidos: apellidos,
      matricula: matricula,
      modelo: modelo,
      motor: motor,
    };
  
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCliente),
    })
      .then(response =>{
        if (response.ok){
          return response.json();
        } else  {
          throw new Error('Dni ya guardado en base de datos / Dni no entrado correctamente')
        }
      })
      .then(data => {
        // Mostrar datos pasados por consola
        console.log(data);
        alert('Cliente guardado correctamente');
        
      })
      .catch(error => {
        // Mostrar mensaje de alerta en caso de error
        alert(error.message);
      });
  });
    
// metodo PUT para modificar cliente por Body (modificamos cualquier cosa que queramos del cliente menos dni)
document.getElementById('mod-btn').addEventListener('click', () =>{
    const dni = document.getElementById('add-dni').value;
    const nombre = document.getElementById('add-nombre').value;
    const apellidos = document.getElementById('add-apellidos').value;
    const matricula = document.getElementById('add-matricula').value;
    const modelo = document.getElementById('add-modelo').value;
    const motor = document.getElementById('add-motor').value;

    const modCliente = {
        dni: dni,
        nombre: nombre,
        apellidos: apellidos,
        matricula: matricula,
        modelo: modelo,
        motor: motor,
    }
  

    fetch('http://localhost:3000/clientes', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
      },
      body :JSON.stringify(modCliente),
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        } else {
            throw new Error ('Error al modificar el cliente');
        }
    })
    .then (data =>{
        console.log (data);
        alert('Cliente modificado y guardado correctamente');
        
    })
    .catch(error =>{
        alert(error.message);
    })
    
})
// metodo GET para ver citas registradas por Data, hacemos un data.forEach para ver todos la citas ya que necesitamos crear array para verlas
document.getElementById('see-btn-cita').addEventListener('click', () =>{
    const data = document.getElementById('res-date').value;
    console.log(data);
    fetch(`http://localhost:3000/reservas/${data}`, {
        method:'GET',
    })
    .then(response => response.json())
    .then (data => {
        // elemento donde se mostarar informacion de la reserva
        const reservaContainer = document.getElementById('reserva-pantalla');

        //Vaciar contenido ya exsistente
        reservaContainer.innerHTML ='';

        data.forEach(reserva =>{ // Hacemos forEach para enviar todo el array de reservas
      
          const diaElement = document.createElement ('h3');
          diaElement.textContent = `${reserva.data}`;

          const matriculaElement = document.createElement ('p');
          matriculaElement.textContent = `Matricula : ${reserva.matricula}`;

          const clienteElement = document.createElement ('p');
          clienteElement.textContent = `Cliente : ${reserva.cliente}`;

          const telefonoElement = document.createElement ('p');
          telefonoElement.textContent = `Telefono : ${reserva.telefono}`;

          const reparacionElement = document.createElement ('p');
          reparacionElement.textContent = `Reparacion: ${reserva.reparacion}`;

          const tiempoElement =document.createElement ('p');
          tiempoElement.textContent = `Tiempo estimado : ${reserva.tiempo}h.`;

        

          // Agregar elementos al container
          reservaContainer.appendChild(diaElement);
          reservaContainer.appendChild(matriculaElement);
          reservaContainer.appendChild(clienteElement);
          reservaContainer.appendChild(telefonoElement)
          reservaContainer.appendChild(reparacionElement);
          reservaContainer.appendChild(tiempoElement);
        });
      
    });
});

// metodo POST para crear cita por Body
document.getElementById('res-btn').addEventListener('click', () =>{
    const matricula = document.getElementById('res-matricula').value;
    const cliente = document.getElementById('res-cliente').value;
    const telefono = document.getElementById('res-telefono').value;
    const reparacion = document.getElementById('res-reparacion').value;
    const tiempo = document.getElementById('res-tiempo').value;
    const data = document.getElementById('res-date').value;

    const newReserva ={
        matricula: matricula,
        cliente : cliente,
        telefono : telefono,
        reparacion : reparacion,
        tiempo : tiempo,
        data : data
    }

    fetch ('http://localhost:3000/reservas', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newReserva),
    })
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error('Error al entrar la reserva');
        }
    })
    .then(data => {

        console.log(data);
        alert('Reserva creada correctamente')
    })
    .catch(error => {
        alert(error.message);
    });
});

// metodo DELETE para eliminar cita por Matricula ( ya que reservamos por matricula)
document.getElementById('delete-btn').addEventListener('click', () =>{
  const matricula = document.getElementById('res-matricula').value;

  fetch(`http://localhost:3000/reservas/${matricula}`,{
    method : 'DELETE',
  })
    .then(response =>{
      if(response.ok){
        alert('Reserva eliminada correctamente')
      } else {
        alert('Error al eliminar la matricula')
      }
    })
      .catch(error=>{
        alert('algo va mal');
      })
    
});

// metodo GET para ver reparaciones por Matricula Volvemos hacer forEach para traer todas la repraciones de la matricula (historial de lo que hemos echo en esta matricula)
document.getElementById('bus-btn').addEventListener('click', () =>{
  const matricula = document.getElementById('rep-matricula').value;
  console.log(matricula);
  fetch(`http://localhost:3000/reparaciones/${matricula}`,{
      method:'GET',
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data)
    const reparacionContainer = document.getElementById('reparacion-pantalla');

    reparacionContainer.innerHTML ='';

    data.forEach(rep =>{

    const matriculaElement = document.createElement ('h3');
    matriculaElement.textContent = `${rep.matricula}`;

    const kmElement = document.createElement ('p');
    kmElement.textContent = `Km: ${rep.km}`;

    const explicacionElement = document.createElement ('p');
    explicacionElement.textContent = `Reparacion realizada :${rep.explicacion}`;

    reparacionContainer.appendChild(matriculaElement);
    reparacionContainer.appendChild(kmElement);
    reparacionContainer.appendChild(explicacionElement);
    });
  });
});  

// metodo POST para crear reparacion por Body
document.getElementById('rep-btn').addEventListener('click', () =>{

  const matricula = document.getElementById('rep-matricula').value;
  const km = document.getElementById('rep-km').value;
  const explicacion = document.getElementById('rep-reparacion').value;

  const newReparacion = {
    matricula: matricula,
    km: km,
    explicacion:explicacion,
  };

  fetch('http://localhost:3000/reparaciones', {
    method: 'POST',
    headers : {
      'content-Type' : 'application/json',
    },
    body: JSON.stringify(newReparacion),
  })
    .then(response =>{
      if (response.ok){
        return response.json();
      } else  {
        throw new Error('Error al guardar la reparacion')
      }
    })
    .then(data =>{
      console.log(data);
      alert('Reparacion guardada correctamente');
    })
    .catch(error => {
      alert('No tienes reparaciones con esta matricula');
    })
});

// metodo PUT para modificar la ultima reparacion, ya que nos podemos haber equivocado al entrarla
document.getElementById('mod-btn-rep').addEventListener('click',() =>{

  const matricula = document.getElementById('rep-matricula').value;
  const km = document.getElementById('rep-km').value;
  const explicacion = document.getElementById('rep-reparacion').value;

  const modReparacion = {
    matricula : matricula,
    km : km,
    explicacion : explicacion
  }

  fetch('http://localhost:3000/reparaciones',{
    method:'PUT',
    headers: {
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(modReparacion),
  })
    .then(response =>{
      if(response.ok){
        return response.json();
      } else {
        throw new Error ('Error al modificar la reparacion')
      }
    })
    .then(data =>{
      console.log(data);
     alert('Reparacion modificada y guardada correctamente')
    })
    .catch(error=>{
      alert(error.message);
    })
})

    


      
    
    
    
    