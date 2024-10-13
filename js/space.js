const inputSearch = document.getElementById('inputBuscar');
const btnSearch = document.getElementById('btnBuscar');
const galeria = document.getElementById('contenedor');

const obtenerImagenesNASA = () => {
    const textoBusqueda = inputSearch.value;
    if (textoBusqueda === '') {
        alert('Por favor ingrese un término');
        return;
    }

    const urlDeLaAPI = `https://images-api.nasa.gov/search?q=${textoBusqueda}`;

    fetch(urlDeLaAPI)
        .then(respuesta => respuesta.json())
        .then(datos => {
            galeria.innerHTML = '';

            const itemsResultados = datos.collection.items;
            if (itemsResultados.length === 0) {
                galeria.innerHTML = '<p>No se encontraron resultados.</p>';
                return;
            }

            itemsResultados.forEach(item => {
                const urlDeImagen = item.links && item.links.length > 0 ? item.links[0].href : '';
                const tituloImagen = item.data[0].title || 'Sin Título';
                const descripcionImagen = item.data[0].description || 'Sin Descripción';
                const fechaImagen = item.data[0].date_created || 'Fecha desconocida';

                // mostrar tarjeta 
                const tarjetaHtml = `
                    <div class="col-md-4 my-3"> <!-- Asegúrate de que la tarjeta esté en una columna -->
                        <div class="card" style="margin: 10px;">
                            ${urlDeImagen ? `<img src="${urlDeImagen}" alt="${tituloImagen}" class="card-img-top" style="max-height: 200px; object-fit: cover;">` : ''}
                            <div class="card-body">
                                <h3 class="card-title">${tituloImagen}</h3>
                                <p class="card-text">${descripcionImagen}</p>
                                <p class="card-text"><small>${fechaImagen}</small></p>
                            </div>
                        </div>
                    </div>
                `;

                // agregar la tarjeta
                galeria.innerHTML += tarjetaHtml;
            });
        })
        .catch(error => {
            console.error('Ocurrió un error:', error);
            galeria.innerHTML = '<p>Ocurrió un error al realizar la búsqueda.</p>';
        });
};

btnSearch.addEventListener('click', obtenerImagenesNASA);
