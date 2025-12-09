function initProductos() {

    InitDB();

    $('.lista-productos').empty();

    async function mostrarProductos() {
        let productos = await getProductos();
        for (let producto of productos) {
            $('.lista-productos').append(`
                <!--<li class="pt-3 pb-3 border-bottom d-flex align-items-center gap-3" style="cursor: pointer;">
                    <span class="text-center" style="width: 50px;">
                        <i class="fas fa-shopping-bag text-black-50 fs-2"></i>
                    </span>
                    <section class="flex-fill d-flex justify-content-between align-items-center pe-2">
                        <span>${producto.nombre}</span>
                        <span>$${producto.precio}</span>
                    </section>
                    <section class="d-flex align-items-center gap-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" />
                        </div>
                    </section>
                </li>-->

                <li data-id="${producto.id}" class="border-bottom d-flex align-items-center gap-3 p-3" style="cursor: pointer;">
                    <section class="text-center">
                        <i class="fas fa-shopping-bag text-black-50 fs-2"></i>
                    </section>
                    <section class="flex-fill d-flex justify-content-between align-items-center pe-2">
                        <span>${producto.nombre}</span>
                        <span class="w-25">$${producto.precio}</span>
                    </section>
                    <section class="d-flex align-items-center gap-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" />
                        </div>
                    </section>
                </li>

            `);
        }
    }

    mostrarProductos();

    // Botón agregar producto
    $(document).off('click', '.button-add').on('click', '.button-add', function (event) {
        event.preventDefault();
        LoadView('add_productos.html');
    });


    // Click en cada producto (marcar / desmarcar)
    $(document).off('click', '.lista-productos li').on('click', '.lista-productos li', function (event) {
        let checkbox = $(this).find('.form-check-input');

        // Si se hace click en el LI pero no directamente en el checkbox
        if (!$(event.target).is('.form-check-input')) {
            checkbox.prop('checked', !checkbox.prop('checked'));
        }

        // Cambiar color del li cuando está marcado
        $(this).toggleClass('bg-success bg-opacity-25', checkbox.prop('checked'));

        // Mostrar / ocultar toolbar según si hay checkboxes seleccionados
        if ($('.lista-productos .form-check-input:checked').length > 0) {
            $('.tool-bar').removeClass('d-none');
        } else {
            $('.tool-bar').addClass('d-none');
        }
    });

    // Evento para botón eliminar (se registra una sola vez)
    $(document).off('click', '.button-delete').on('click', '.button-delete', async function (event) {
        event.preventDefault();

        if (confirm("¿Seguro que quieres eliminar los productos seleccionados?")) {
            // Recorremos los li seleccionados
            $('.lista-productos .form-check-input:checked').each(async function () {
                let id = $(this).closest('li').data('id');
                await deleteProducto(id);   // Llamada a tu API
            });

            // Refrescamos la lista
            $('.lista-productos').empty();
            mostrarProductos();
        }
    });


    // Seleccionar / deseleccionar todos
    $(document).off('change', '.check-all').on('change', '.check-all', function () {
        const marcado = $(this).is(':checked');
        $('.lista-productos li').each(function () {
            $(this).find('.form-check-input').prop('checked', marcado);
            $(this).toggleClass('bg-success bg-opacity-25', marcado);
        });

        // Mostrar / ocultar toolbar según checkboxes activos
        if ($('.lista-productos .form-check-input:checked').length > 0) {
            $('.tool-bar').removeClass('d-none');
        } else {
            $('.tool-bar').addClass('d-none');
        }
    });

}

initProductos();
