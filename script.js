
window.onload = function () {
    const areaTotal = document.getElementById('area')
    const localizacao = document.getElementById('localizacao')

    const sle = document.querySelector('#nome')
    const selectPaises = document.querySelector('#nome')
    let url_paises = "https://servicodados.ibge.gov.br/api/v1/paises"
    function setPaises() {
        fetch(url_paises)
            .then(resposta => resposta.json())
            .then(paises => {
                paises.map(pais => {
                    const add = document.createElement('option')
                    add.setAttribute('value', Object.values(pais.id["ISO-3166-1-ALPHA-2"]))
                    add.textContent = Object.values(pais.nome)
                    selectPaises.appendChild(add)
                })
            })
    }
    setPaises()


    function letras(value){
        if (value != ','){
            return value
        }
    }


    //pega o valor do value no <option>
    sle.addEventListener('click', () => {
        let sigla
        const select = document.querySelector('#nome')
        var valor = select.options[select.selectedIndex].value
        for (const i in valor) {
            sigla = valor[0] + valor[2]
        }
        fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${sigla}`)
            .then(res => res.json())
            .then(data => {
                data.map(nome => {
                    const area = areaTotal
                    area.textContent = Object.values(nome.area["total"]).filter(n => Number(n) || n == false).join(``)+"  km²"


                    const local = localizacao
                    local.textContent =Object.values(nome.localizacao["regiao"]["nome"])
                    local.textContent = local.textContent.replace(',','').replace(',','').replace(',','').replace(',','').replace(',','').replace(',','')

                })
            })

    })

}
