window.onload = function () {
    var areaTotal = document.getElementById('area')
    const localizacao = document.getElementById('localizacao')
    const lingua = document.getElementById('linguas')

    const selectPaises = document.querySelector('#nome')
    let url_paises = "https://servicodados.ibge.gov.br/api/v1/paises"

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






    const sle = document.querySelector('#nome')
    sle.addEventListener('click', () => {
        let sigla
        const select = document.querySelector('#nome')
        var valor = select.options[select.selectedIndex].value
        for (const i in valor) {
            sigla = valor[0] + valor[2]
        }
        function refatoraJson(obj){
            let b = JSON.stringify(obj)
            b = b.replace(/-/gi,"")
            b = JSON.parse(b)
            return b
        }


        fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${sigla}`)
            .then(res => res.json())
            .then(data => {
                data.map(p => {

                    let subloc = refatoraJson(p)
                    let a = subloc.localizacao
                    console.log(subloc.localizacao['regiaointermediaria']['nome'])
                    document.getElementById('area').value = p['area']['total']+" km²"
                    document.getElementById('localizacao').value = p['localizacao']['regiao']['nome']
                    document.getElementById('linguas').value = [p.linguas]['0']['0']['nome']
                    document.getElementById('governo').value = p['governo']['capital']['nome']
                    document.getElementById('sub-regiao').value = subloc.localizacao['subregiao']['nome']
                    document.getElementById('regiao-intermediaria').value 
                    document.getElementById('historico').value = p['historico']
                })
            })
    })
}


