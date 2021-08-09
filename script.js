
window.onload = function () {
    const selectPaises = document.querySelector('#nome')
    let url_paises = "https://servicodados.ibge.gov.br/api/v1/paises"
    function setPaises() {
        fetch(url_paises)
            .then(resposta => resposta.json())
            .then(paises => {
                paises.map(pais => {
                    const add = document.createElement('option')
                    add.setAttribute('value',Object.values(pais.id["ISO-3166-1-ALPHA-3"]))
                    add.textContent = `${Object.values(pais.id["ISO-3166-1-ALPHA-3"])}:${Object.values(pais.nome)}`
                    selectPaises.appendChild(add)
                    console.log(add)
                })
            })
    }
    setPaises()
}
