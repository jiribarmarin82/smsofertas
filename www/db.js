let db = null;
function InitDB() {
    db = new Dexie('smsofertasdb');
    db.version(1).stores({
        productos: "++id,nombre,precio",  // tabla productos
        contactos: "++id,nombre,telefono", // tabla contactos
        propietario: "++id,nombre_negocio,nombre_propietario,telefono,direccion" // tabla propietario
    });

    db.version(2).stores({
        productos: "++id,nombre,precio",  // tabla productos
        contactos: "++id,nombre,telefono", // tabla contactos
        propietario: "++id,nombre_negocio,nombre_propietario,telefono,direccion" // tabla propietario
    });

    // Dexie "abre" la DB y garantiza que se pueda usar
    db.open().catch(function (err) {
        console.error("Falló abrir la DB: " + err.stack || err);
    });
}

// Insertar productos
async function addProducto(nombre, precio) {
    await db.productos.add({ nombre, precio });
}

// Insertar contactos
async function addContacto(nombre, telefono) {
    await db.contactos.add({ nombre, telefono });
}

// Insertar propietario
async function addPropietario(negocio, nombre, telefono, direccion) {
    await db.propietario.add({ negocio, nombre, telefono, direccion });
}

async function getProductos() {
    let productos = await db.productos.toArray();
    console.log("Productos:", productos);
    return productos;
}

async function getContactos() {
    let contactos = await db.contactos.toArray();
    console.log("Contactos:", contactos);
    return contactos;
}

async function getPropietario() {
    let propietario = await db.propietario.toArray();
    console.log("Propietario:", propietario);
    return propietario;
}

// Actualizar producto
async function updateProducto(id, nuevoNombre, nuevoPrecio) {
    await db.productos.update(id, { nombre: nuevoNombre, precio: nuevoPrecio });
}

// Actualizar propietario
async function updatePropietario(id, negocio, nombre, telefono, direccion) {
    await db.propietario.update(id, { 
        nombre_negocio: negocio, 
        nombre_propietario: nombre,
        telefono: telefono,
        direccion: direccion
    });
}

// Borrar contacto
async function deleteContacto(id) {
    await db.contactos.delete(id);
}

// Borrar producto
async function deleteProducto(id) {
    await db.productos.delete(id);
}