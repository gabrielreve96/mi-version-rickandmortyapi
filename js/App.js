let personajes =[]
let info=[]
document.addEventListener("DOMContentLoaded" ,  async (e)=>{
   

    fetch("https://rickandmortyapi.com/api/character")
    .then(response=>response.json())
    .then(data=>{
     if(data){
        info.push(data.info)
        document.querySelector(".espisode").textContent = `Episodio ${info[0].next}`
        data.results.forEach(element => {
            console.log(element)
            personajes.push(element)
        });
         //incluyo lo generos para el filtro

         incluyendoGneros()

         ///rendrizamos personajes

         renderizarPersonajes()
         
          
     }else{
        alert("no infor")
     }
     })
    .catch(e=>console.log(e))
     
    

})

let seleccion =document.querySelector(".selectro_genero")
console.log(seleccion)
function incluyendoGneros(){
  
    const generoNoReopetidos = new Set()
    
    if(personajes.length > 0 ){
         personajes.forEach(genero => generoNoReopetidos.add(genero.gender))
         
    }   
    
    if(generoNoReopetidos.size > 0 ){
       
        generoNoReopetidos.forEach(element => {
            let opcion = document.createElement('option'); 
            opcion.textContent = element;
            seleccion.appendChild(opcion); 
        });
    
    }


    
}




let seccionPersonajes = document.querySelector(".cards")
let templatePersonajes = document.querySelector(".template_cards ")
console.log(seccionPersonajes, templatePersonajes)
function renderizarPersonajes() {
    const html = personajes.reduce((acc, personaje) => {
        return acc + `
            <div class="card_ricky">
                <img src="${personaje.image}" alt="" class="imge_rick">
                
                    <section class="action">
                        <ul class="bodry_cards_action_ul">
                            <li><a href="">locations🔎 </a></li>
                            <li><a href="">origin 🌍</a></li>
                            <li><a href="">Episode 📺</a></li>
                        </ul>
                    </section>
                    <section class="datos">
                        <p>${personaje.name}</p>
                        <p>${personaje.gender}</p>
                        <p>${personaje.species}<p>
                       
                    </section>
            
            </div>
        `;
    }, "");

    seccionPersonajes.innerHTML = html;
}

// Llama a la función para renderizar los personajes
renderizarPersonajes();




let form_filtros= document.querySelector(".form").addEventListener("submit", async e=>{
    e.preventDefault()
    let input_personaje = document.querySelector(".personaje").value
    let selecion_genero=document.querySelector(".selectro_genero").value
    
    fetch(`https://rickandmortyapi.com/api/character/?name=${input_personaje}&gender=${selecion_genero}`)
    .then(listas_filtrado=>listas_filtrado.json())
    .then(filtro_aplicado=>{



        if(filtro_aplicado.status !=404){
          personajes=[]
           filtro_aplicado.results.forEach(elemnt=>{
            personajes.push(elemnt)
           })
           renderizarPersonajes()
        }

        
       
        
        
    })
    .catch(e=>console.log(e))
    
    

})




////delegancion de eventos
const container_next = document.querySelector(".container").addEventListener("click", async (e) => {
    if (e.target.matches(".boton_next")) {
        // Verificar si info[0].next está definido
        if (info[0].next) {
            document.querySelector(".espisode").textContent = `Episodio ${info[0].next}`;
            fetch(info[0].next)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        personajes = [];
                        info = [];
                        info.push(data.info);
                        data.results.forEach(element => personajes.push(element));
                        renderizarPersonajes();
                    }
                })
                .catch(e => console.log(e));
        }
    }


    if (e.target.matches(".boton_prev")) {
        // Verificar si info[0].next está definido
        if (info[0].prev) {
            document.querySelector(".espisode").textContent = `Episodio ${info[0].prev}`;
            fetch(info[0].prev)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        personajes = [];
                        info = [];
                        info.push(data.info);
                        data.results.forEach(element => personajes.push(element));
                        renderizarPersonajes();
                    }
                })
                .catch(e => console.log(e));
        }
    }


     
});
























