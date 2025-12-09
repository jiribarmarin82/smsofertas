function initPropietario() {

    InitDB();

    // Mostrar propietario en el formulario
    async function mostrarPropietario() {
        let propietario = await getPropietario();
        if (propietario.length > 0) {
            let row = propietario[0]; // solo debería haber uno
            $('input[name="negocio"]').val(row.nombre_negocio);
            $('input[name="nombre"]').val(row.nombre_propietario);
            $('input[name="telefono"]').val(row.telefono);
            $('textarea[name="direccion"]').val(row.direccion);
        }
    }

    // Guardar / Actualizar propietario
    $('.button-guardar').on('click', async function () {
        let negocio = $('input[name="negocio"]').val();
        let nombre = $('input[name="nombre"]').val();
        let telefono = $('input[name="telefono"]').val();
        let direccion = $('textarea[name="direccion"]').val();

        let propietario = await getPropietario();

        if (propietario.length === 0) {
            // No hay → insertar
            await addPropietario(negocio, nombre, telefono, direccion);
            console.log("Propietario creado");
        } else {
            // Ya existe → actualizar el primero
            await updatePropietario(propietario[0].id, negocio, nombre, telefono, direccion);
            console.log("Propietario actualizado");
        }

    });

    mostrarPropietario();

}

initPropietario();