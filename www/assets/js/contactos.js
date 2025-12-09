//contactos.js
function initContactos() {

    InitDB();

    $('.lista-contactos').empty();

    async function mostrarContactos() {
        let contactos = await getContactos();
        for (let contacto of contactos) {
            $('.lista-contactos').append(`
                <li data-id="${contacto.id}" class="border-bottom d-flex align-items-center gap-3 p-3" style="cursor: pointer;">
                    <section class="text-center">
                        <i class="fas fa-user-circle text-black-50 fs-2"></i>
                    </section>
                    <section class="flex-fill d-flex flex-column">
                        <span class="nombre_contacto">${contacto.nombre}</span>
                        <span class="numero_telefono">${contacto.telefono}</span>
                    </section>
                    <section class="d-flex align-items-center gap-2">
                        <i class="fas fa-phone text-black-50 fs-1"></i>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" />
                        </div>
                    </section>
                </li>
            `);
        }
    }

    mostrarContactos();

    // Click en cada contacto
    $(document).off('click', '.lista-contactos li').on('click', '.lista-contactos li', function (event) {
        let checkbox = $(this).find('.form-check-input');

        // Si se hace click en el LI pero no directamente en el checkbox
        if (!$(event.target).is('.form-check-input')) {
            checkbox.prop('checked', !checkbox.prop('checked'));
        }

        // Cambiar color del li cuando está marcado
        $(this).toggleClass('bg-success bg-opacity-25', checkbox.prop('checked'));

        // Verificar si hay al menos un checkbox marcado
        if ($('.lista-contactos .form-check-input:checked').length > 0) {
            $('.tool-bar').removeClass('d-none'); // mostrar toolbar
        } else {
            $('.tool-bar').addClass('d-none'); // ocultar toolbar

        }
    });

    // Seleccionar / deseleccionar todos
    $(document).off('change', '.check-all').on('change', '.check-all', function () {
        const marcado = $(this).is(':checked');
        $('.lista-contactos li').each(function () {
            $(this).find('.form-check-input').prop('checked', marcado);
            $(this).toggleClass('bg-success bg-opacity-25', marcado);
        });

        // Mostrar / ocultar toolbar según checkboxes activos
        if ($('.lista-contactos .form-check-input:checked').length > 0) {
            $('.tool-bar').removeClass('d-none');
        } else {
            $('.tool-bar').addClass('d-none');
        }
    });


    // Botón enviar SMS
    $(document).off('click', '.button-send-sms').on('click', '.button-send-sms', async function () {
        try {

            let formato_sms = '';

            let propietario = await getPropietario();

            let negocio_value = null;
            let propietario_value = null;
            let telefono_value = null;
            let direccion_value = null;

            if (propietario.length > 0) {
                let row = propietario[0]; // solo debería haber uno

                negocio_value = row.nombre_negocio;
                propietario_value = row.nombre_propietario;
                telefono_value = row.telefono;
                direccion_value = row.direccion;

            }

            let productos = await getProductos();
            if (!productos || productos.length === 0) {
                alert('No hay productos para enviar.');
                return;
            }

            formato_sms += 'Negocio:%20' + negocio_value + '%0A%0A';

            for (let producto of productos) {
                const nombre = producto.nombre ?? '[sin nombre]';
                const precio = producto.precio ?? '[sin precio]';
                formato_sms += '===================%0A%0A';
                formato_sms += `Producto:%20${nombre}%0A`;
                formato_sms += `Precio:%20$${precio}%0A`;
                formato_sms += '%0A';
            }

            formato_sms += '===================%0A';
            formato_sms += '%0A%0A';

            let formato_telefono = [];
            $('.lista-contactos li .form-check-input:checked').each(function () {
                let num = $(this).closest('li').find('.numero_telefono').text().trim();
                if (num) formato_telefono.push(num);
            });

            if (formato_telefono.length === 0) {
                alert('Debes seleccionar al menos un contacto.');
                return;
            }

            formato_sms += `Propietario:%20${propietario_value}%0A`;
            formato_sms += `Teléfono:%20${telefono_value}%0A`;
            formato_sms += `Dirección:%20${direccion_value}%0A`;

            const recipients = formato_telefono.join(';'); // mejor usar ; que ,
            const sms = `sms:${recipients}?body=${formato_sms}`;
            window.location.href = sms;

        } catch (err) {
            console.error('Error al preparar SMS:', err);
            alert('Ocurrió un error al preparar el SMS.');
        }
    });

    // Botón agregar contacto
    /*$(document).off('click', '.button-add').on('click', '.button-add', function (event) {
        event.preventDefault();
        window.location.href = './add_contacto.html';
    });*/


    // Evento para botón eliminar (se registra una sola vez)
    $(document).off('click', '.button-delete').on('click', '.button-delete', async function (event) {
        event.preventDefault();

        if (confirm("¿Seguro que quieres eliminar los contactos seleccionados?")) {
            // Recorremos los li seleccionados
            $('.lista-contactos .form-check-input:checked').each(async function () {
                let id = $(this).closest('li').data('id');
                await deleteContacto(id);   // Llamada a tu API
            });

            // Refrescamos la lista
            $('.lista-contactos').empty();
            mostrarContactos();
        }
    });

}

initContactos();
