window.onload = function () {
    const sle = document.querySelector('#nome')
    const selectPaises = document.querySelector('#nome')
    let url_paises = "https://servicodados.ibge.gov.br/api/v1/paises"

    fetch(url_paises)
        .then(resposta => resposta.json())
        .then(paises => {
            paises.map(pais => {
                const add = document.createElement('option')
                add.setAttribute('value', pais.id["ISO-3166-1-ALPHA-2"])
                add.textContent = pais.nome.abreviado
                selectPaises.appendChild(add)
            })
        })





    sle.addEventListener('click', () => {
        const select = document.querySelector('#nome')


        //retorna o JSON sem os caracteres especiais
        function refatoraJson(obj) {
            let b = JSON.stringify(obj)
            b = b.replace(/-/gi, "")
            b = JSON.parse(b)
            return b
        }


        fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${select.options[select.selectedIndex].value}`)
            .then(res => res.json())
            .then(data => {
                data.map(p => {

                    let subloc = refatoraJson(p)
                    document.getElementById('area').value = p['area']['total'] + " km²"
                    document.getElementById('localizacao').value = p['localizacao']['regiao']['nome']
                    document.getElementById('linguas').value = [p.linguas]['0']['0']['nome']
                    document.getElementById('governo').value = p['governo']['capital']['nome']
                    document.getElementById('sub-regiao').value = subloc.localizacao['subregiao']['nome']
                    document.getElementById('historico').value = p['historico']
                    document.getElementById('unidades-monetarias').value = subloc.unidadesmonetarias['0']['id']['ISO4217ALPHA'] + ' - ' + subloc.unidadesmonetarias['0']['nome']
                })
            })
    })
}


