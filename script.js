
//https://medium.com/@tchaguitos/populando-selects-de-estados-e-cidades-utilizando-geoapibrasil-b2bcb771de33

window.onload = function (){
    let url_paises = "https://servicodados.ibge.gov.br/api/v1/paises"


    const names = document.querySelector("#nome")

    fetch(url_paises)
        .then(res => res.json())
        .then (paises =>{
            paises.map(paises => {
                const option = document.createElement('option')
                option.textContent = Object.values(paises.nome)
                console.log(option)
                names.appendChild(option)
            })
        })
}
