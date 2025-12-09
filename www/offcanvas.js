$(document).ready(function(){
    const offcanvas = `
    <div id="offcanvas-1" class="offcanvas offcanvas-start w-75" tabindex="-1">
        <div class="offcanvas-header" style="background: var(--bs-green);">
            <h5 class="offcanvas-title text-light text-opacity-50">Configuración</h5>
            <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-0">
            <ul class="list-unstyled">

                <li class="pt-3 pb-3 border-bottom">                    
                    
                    <a class="btn d-flex align-items-center gap-3" href="../views/contactos.html">
                        <span class="text-center" style="width: 50px;">
                            <i class="fas fa-users text-black-50 fs-2"></i>
                        </span>
                        <span>Contactos</span>
                    </a>

                </li>

                <li class="pt-3 pb-3 border-bottom">

                    <a class="btn d-flex align-items-center gap-3" href="../views/productos.html">
                        <span class="text-center" style="width: 50px;">
                            <i class="fas fa-clipboard-list text-black-50 fs-2"></i>
                        </span>
                        <span>Productos</span>
                    </a> 

                </li>

                <li class="pt-3 pb-3 border-bottom d-flex align-items-center gap-3">

                    <a class="btn d-flex align-items-center gap-3" href="../views/propietario.html">
                        <span class="text-center" style="width: 50px;">
                            <i class="fas fa-user-tie text-black-50 fs-2"></i>
                        </span>
                        <span>Propietario</span>
                    </a>

                </li>
                
            </ul>
        </div>
    </div>
    `;
    $('body').append(offcanvas);


    /*$(document).on('click', '.offcanvas-body ul li a', function (event) {
        event.preventDefault();
        LoadView($(this).attr('href'));
    });*/

});